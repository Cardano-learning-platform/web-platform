import { GoogleGenerativeAI } from '@google/generative-ai';
import { error } from '@sveltejs/kit';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';


import { GOOGLE_GEN_AI_API_KEY } from '$env/static/private';
// import { ratelimit } from '$lib/utils/rateLimit';
import type { RequestHandler } from './$types';

const genAI = new GoogleGenerativeAI(GOOGLE_GEN_AI_API_KEY);


export const POST = (async ({ request, locals: { safeGetSession } }) => {

	const session = await safeGetSession();

	if (!session?.user?.id) {
		error(401, 'unauthorized');
	}

	// const { success } = await ratelimit.ai.limit(session.user.id);

	// if (!success) {
	// return error if user has exceeded the rate limit
	// error(429, 'Too many requests try again later');
	// }
	const data = await request.json();

	const { subject, question } = JSON.parse(data.prompt) as {
		subject: string;
		question: string;
	};

	const generationConfig = {
		temperature: 0.9,
		topK: 1,
		topP: 1,
	};

	const message = `explain what ${question} is?`;
	const parts = [
		{
			text: `You are an excellent ${subject} teacher. Who can explain and respond to the student's 
				questions in such a concise and friendly way that students can easily understand what is being discussed and 
				have intuition. Keep your answer brief and friendly, ${message}`
		}
	];
	const geminiStream = await genAI
		.getGenerativeModel({ model: 'gemini-pro', generationConfig })
		.generateContentStream(parts)


	const stream = GoogleGenerativeAIStream(geminiStream);

	return new StreamingTextResponse(stream);

}) satisfies RequestHandler;
