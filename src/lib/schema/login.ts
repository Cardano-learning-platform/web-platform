import { z } from 'zod';

const schema = z.object({
	email: z.string().email({
		message: 'Please enter a valid email'
	}),
	password: z.string().min(8).max(100)
});
export default schema;
