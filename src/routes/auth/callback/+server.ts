import { redirect } from '@sveltejs/kit';

// import EmailService from '$lib/services/email/data-provider';
import UserService from '$lib/services/user/data-provider';

const ONE_YEAR = 60 * 60 * 24 * 30 * 12;

export const GET = async (event) => {
	const {
		url,
		cookies,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/';
	const userProvider = new UserService(supabase);
	// const emailProvider = new EmailService();
	let error = false;

	if (code) {
		try {
			const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

			const userInformation = await userProvider.getUserById(data?.user?.id);
			const fullName = data?.user?.user_metadata?.full_name.split(' ');
			console.log({ userInformation })
			if (!userInformation?.data?.first_name && !userInformation?.data?.last_name) {
				const { data: updatedUserInformation } = await userProvider.updateUserById({
					userId: data?.user?.id,
					data: {
						email: data?.user?.email,
						avatar_url: data?.user?.user_metadata?.avatar_url,
						first_name: fullName[0],
						last_name: fullName[1]
					}
				});
				const { error } = await emailProvider.createContact({
					email: data?.user?.email,
					firstName: fullName[0],
					lastName: fullName[1] && "",
					source: 'user_signup',
					userGroup: 'user',
					userId: data?.user?.id
				})

				if (error) {
					// logger.error(`Error creating contact in Loops for email ${data?.user?.email}`, error);
				}
				const { error: eventError } = await emailProvider.sendEvent({
					email: data?.user?.email,
					userId: data?.user?.id,
					eventName: 'user_signed_up'
				});

				if (eventError) {
					// logger.error(`Error sending event (user_signed_up) in Loops for email ${data?.user?.email}`, eventError);
				}

				cookies.set('userInformation', JSON.stringify(updatedUserInformation), {
					path: '/',
					httpOnly: false,
					maxAge: ONE_YEAR
				});
			} else {
				cookies.set('userInformation', JSON.stringify(userInformation.data), {
					path: '/',
					httpOnly: false,
					maxAge: ONE_YEAR
				});
			}
			error = !!exchangeError;
		} catch (error) {
			console.log({ error })
			// logger.error('Error exchanging code for session', error);
			redirect(303, '/auth/auth-code-error');
		}
		if (!error) {
			redirect(303, `/${next.slice(1)}`);
		}
	}

	// return the user to an error page with instructions
	redirect(303, '/auth/auth-code-error');
};
