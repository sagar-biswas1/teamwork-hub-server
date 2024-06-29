const { z } = require('zod');

// Define the Zod schema for content creation
const contentCreationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required').optional(),
  createdBy: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
  collaborators: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format')).optional(),
});


module.exports = {
    contentCreationSchema
}