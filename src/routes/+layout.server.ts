import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession, userInformation }, cookies }) => {
    const { session } = await safeGetSession()
    return {
        userInformation,
        session,
        cookies: cookies.getAll(),
    }
}