import type { Supabase, UpdateUserParams, DeductUserCreditsParams } from './types';
class DataProvider {
	supabase: Supabase;
	constructor(supabase: Supabase) {
		this.supabase = supabase;
	}
	getUserById = async (userId: string | null | undefined) => {
		try {
			if (!userId) return { data: null, error: 'getUserById(): userId is required' };
			const { data: userInformation, error: userInformationError } = await this.supabase
				.from('profiles')
				.select('*')
				.eq('user_id', userId)
				.single();
			if (userInformationError) return { data: null, error: userInformationError.message };
			return { data: { ...userInformation }, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};

	updateUserById = async ({ userId, data }: UpdateUserParams) => {
		try {
			const { data: updatedData, error: errorUpdatingData } = await this.supabase
				.from('profiles')
				.update({
					email: data.email,
					first_name: data.first_name,
					last_name: data.last_name,
					avatar_url: data.avatar_url ?? ''
				})
				.eq('user_id', userId)
				.select()
				.single();
			if (errorUpdatingData) return { data: null, error: errorUpdatingData.message };
			return { data: updatedData, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};
	getUserCredits = async (userId: number | null | undefined) => {
		if (!userId) return { data: null, error: 'getUserCredits(): userId is required' };
		try {
			const { data: userCredits, error: userCreditsError } = await this.supabase
				.from('credits')
				.select(
					`
					id,
					credit_amount,
					user:credits_profile_links!inner(
						profile_id
					)
				`
				)
				.eq('user.profile_id', userId)
				.single();

			if (userCreditsError) return { data: null, error: userCreditsError.message };
			return { data: userCredits, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};
	deductUserCredits = async ({ token, userId, transactionId }: DeductUserCreditsParams) => {
		if (!userId || !token || !transactionId) {
			return {
				data: null,
				error: 'deductUserCredits(): userId, transactionId and amount are required'
			};
		}

		const { data: userCredit, error: userCreditError } = await this.getUserCredits(userId);
		if (userCreditError || !userCredit?.id) return { data: null, error: userCreditError };
		try {
			const { data, error } = await this.supabase.rpc('deduct_transaction_and_credit', {
				token,
				transaction_id: transactionId,
				credit_id: userCredit.id,
				userid: userId
			});
			if (error) return { data: null, error: error.message };
			return { data, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};
	addUserCredits = async ({ token, userId, transactionId }: DeductUserCreditsParams) => {
		if (!userId || !token || !transactionId) {
			return {
				data: null,
				error: 'deductUserCredits(): userId, transactionId and amount are required'
			};
		}

		const { data: userCredit, error: userCreditError } = await this.getUserCredits(userId);
		if (userCreditError || !userCredit?.id) return { data: null, error: userCreditError };
		try {
			const { data, error } = await this.supabase.rpc('add_transaction_and_credit', {
				credit_id: userCredit.id,
				token,
				transaction_id: transactionId,
				userid: userId
			});
			if (error) return { data: null, error: error.message };
			return { data, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};
}
export default DataProvider;
