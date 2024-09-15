// import Sentry from '@sentry/node';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { destr } from 'destr'

import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,

} from '$env/static/public';
import type { Database } from '$lib/database.types';

type UserInformation = Database['public']['Tables']['profiles']['Row'];

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	const userInformationFn = () => {
		try {
			return destr<UserInformation>(event.cookies.get('userInformation') || 'null');
		} catch (err) {
			return null;
		}
	};

	event.locals.userInformation = userInformationFn();

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
