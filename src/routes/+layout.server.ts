export const load = async ({ locals: { getSession, userInformation } }) => {
    return {
        session: await getSession(),
        userInformation
    };
};
