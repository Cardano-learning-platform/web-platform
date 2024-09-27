import { z } from 'zod';

const schema = z.object({
	first_name: z
		.string()
		.max(20, { message: 'First name must be less than 20 characters long' })
		.min(2, { message: 'First name must be at least 2 characters long' }),
	last_name: z
		.string()
		.max(20, { message: 'Last name must be less than 20 characters long' })
		.nullable()
		.optional(),
	avatar_url: z.any()
});
export default schema;
