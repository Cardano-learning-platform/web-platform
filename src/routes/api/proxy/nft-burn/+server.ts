import { json } from '@sveltejs/kit';
import { PUBLIC_BACKEND_ENDPOINT } from '$env/static/public';

export async function POST({ request }) {
    try {

        const requestData = await request.json();


        const response = await fetch(`${PUBLIC_BACKEND_ENDPOINT}api/exercise/nft-burn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: requestData.code
            })
        });


        const result = await response.json();


        return json(result);
    } catch (error) {
        console.error('Proxy error:', error);
        return json({
            success: false,
            error: `Proxy error: ${error.message}`
        }, { status: 500 });
    }
}