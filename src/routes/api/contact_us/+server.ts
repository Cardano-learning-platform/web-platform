import { LOOPS_EMAIL_ENDPOINT } from '$env/static/private'
// import { logger } from '$lib/logger';
import ContactUsSchema from '$lib/schema/contactUs';
import type { RequestHandler } from './$types';


export const POST = (async ({ request }) => {
    const data = await request.json();
    const validationResult = ContactUsSchema.safeParse(data);

    if (!validationResult.success) {
        return new Response(JSON.stringify(validationResult.error.issues), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const { name, email, message } = data;
    try {
        const formBody = `firstName=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&notes=${encodeURIComponent(message)}&userGroup=visitors&source=contact_form`;
        const res = await fetch(LOOPS_EMAIL_ENDPOINT, {
            method: "POST",
            body: formBody,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        if (!res.ok) {
            // logger.error(`Error sending contact form for email ${email}`, res);
            return new Response('Error', {
                status: 500
            })
        }

        return new Response('OK')
    } catch (error) {
        // logger.error(`Error sending contact form for email ${email}`, error);
        console.log(error);
        return new Response('Error', {
            status: 500
        })
    }

}) satisfies RequestHandler;