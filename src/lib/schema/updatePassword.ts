import { z } from 'zod';

const schema = z.object({
	password: z.string().min(8).max(100)
});
export default schema;
