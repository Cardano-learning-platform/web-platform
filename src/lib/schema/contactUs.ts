import { z } from 'zod';

const ContactUsSchema = z.object({
    name: z
        .string()
        .max(10, { message: 'Name must be less than 20 characters long' })
        .min(2, { message: 'Name must be at least 2 characters long' }),
    email: z
        .string()
        .email({ message: 'Invalid email address' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters long' })
        .max(1000, { message: 'Message must be less than 1000 characters long' })
});
export default ContactUsSchema;
