import { createClient } from '@supabase/supabase-js'

import { SUPABASE_SERVICE_ROLE } from '$env/static/private'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import type { RequestHandler } from './$types';


export const GET: RequestHandler = async ({ locals: { safeGetSession, supabase } }) => {
    const session = await safeGetSession();
    const userId = session?.user?.id
    if (!userId) {
        return new Response('Unauthorized', { status: 401 })
    }

    const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    const { error } = await supabase.from('archived_users').insert({ user_id: userId });
    if (error) {
        console.error(error)
        return new Response('Error', { status: 500 })
    }

    const { error: removeError } = await supabaseAdmin.auth.admin.deleteUser(
        userId
    )
    if (removeError) {
        console.error(removeError)
        return new Response('Error', { status: 500 })
    }

    return new Response("User deleted successfully", { status: 200, statusText: "OK" });
};