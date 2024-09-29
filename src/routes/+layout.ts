import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import type { Database } from '$lib/database.types';

export const load = async ({ fetch, data, depends }) => {
    depends('supabase:auth');

    const supabase = isBrowser()
        ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            global: {
                fetch,
            },
        })
        : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            global: {
                fetch,
            },
            cookies: {
                getAll() {
                    return data.cookies
                },
            },
        })

    const {
        data: { session },
    } = await supabase.auth.getSession()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const userInformation = data.userInformation;

    return { supabase, session, userInformation, user };
};
