import { z } from 'zod';

const schema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8).max(100),
		passwordConfirmation: z.string().min(8).max(100),
		firstName: z.string().min(2).max(100).optional(),
		lastName: z.string().min(2).max(100).optional(),
		phoneNumber: z.string().min(2).max(100).optional()
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords didn't match",
		path: ['passwordConfirmation']
	});

export default schema;
