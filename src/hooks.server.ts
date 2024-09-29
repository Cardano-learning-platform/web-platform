import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import { destr } from 'destr'
import { createServerClient } from '@supabase/ssr'
import { sequence } from '@sveltejs/kit/hooks'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

import type { Database } from '$lib/database.types';

type UserInformation = Database['public']['Tables']['profiles']['Row'];

const supabase: Handle = async ({ event, resolve }) => {
	/**
	 * Creates a Supabase client specific to this server request.
	 *
	 * The Supabase client gets the Auth token from the request cookies.
	 */
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			/**
			 * SvelteKit's cookies API requires `path` to be explicitly set in
			 * the cookie options. Setting `path` to `/` replicates previous/
			 * standard behavior.
			 */
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' })
				})
			},
		},
	})

	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session _without_
	 * validating the JWT, this function also calls `getUser()` to validate the
	 * JWT before returning the session.
	 */
	event.locals.safeGetSession = async () => {
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession()
		if (!session) {
			return { session: null, user: null }
		}

		const {
			data: { user },
			error,
		} = await event.locals.supabase.auth.getUser()
		if (error) {
			// JWT validation has failed
			return { session: null, user: null }
		}

		return { session, user }
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			/**
			 * Supabase libraries use the `content-range` and `x-supabase-api-version`
			 * headers, so we need to tell SvelteKit to pass it through.
			 */
			return name === 'content-range' || name === 'x-supabase-api-version'
		},
	})
}

const addUserInformation: Handle = ({ event, resolve }) => {
	try {
		const user = destr<UserInformation>(event.cookies.get('userInformation') || 'null');
		event.locals.userInformation = user;
		return resolve(event)
	} catch (err) {
		return resolve(event)
	}
};
export const handle: Handle = sequence(supabase, addUserInformation)

// export const handle: Handle = async ({ event, resolve }) => {
// 	event.locals.supabase = createSupabaseServerClient<Database>({
// 		supabaseUrl: PUBLIC_SUPABASE_URL,
// 		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
// 		event
// 	});

// 	event.locals.getSession = async () => {
// 		const {
// 			data: { session }
// 		} = await event.locals.supabase.auth.getSession();
// 		return session;
// 	};

// const userInformationFn = () => {
// 	try {
// 		return destr<UserInformation>(event.cookies.get('userInformation') || 'null');
// 	} catch (err) {
// 		return null;
// 	}
// };

// 	event.locals.userInformation = userInformationFn();

// 	return resolve(event, {
// 		filterSerializedResponseHeaders(name) {
// 			return name === 'content-range';
// 		}
// 	});
// };
