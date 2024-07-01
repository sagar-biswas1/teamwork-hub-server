const { z } = require('zod');

// Define the Zod schema for user registration
const UserCreateSchema = z.object({
  name: z.string().min(1, 'User name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['USER', 'ADMIN'], 'Role must be either "USER" or "ADMIN"'),
  status: z.enum(['PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED'], 'Invalid status'),
  verified: z.boolean().default(false),
});

const UserLoginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});


// Define the Zod schema for accessToken
const AccessTokenSchema = z.string().min(1).max(700); 


module.exports = {UserCreateSchema,UserLoginSchema,AccessTokenSchema}