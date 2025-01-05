// import { Ratelimit } from '@upstash/ratelimit';
// import { Redis } from '@upstash/redis';

// import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from '$env/static/private';

// const redis = new Redis({
// 	url: UPSTASH_REDIS_REST_URL,
// 	token: UPSTASH_REDIS_REST_TOKEN
// });

// export const ratelimit = {
// 	ai: new Ratelimit({
// 		redis,
// 		analytics: true,
// 		prefix: 'ratelimit:ai',
// 		limiter: Ratelimit.slidingWindow(10, '3600s') // 10 requests per hour
// 		// limiter: Ratelimit.slidingWindow(1, "15s"), // 10 requests per hour
// 	})
// };
