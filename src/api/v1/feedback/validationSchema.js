const { z } = require('zod');
const feedbackSchema = z.object({
    feedbackText: z.string().nonempty('Title is required'),
    content: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid content ID format"),
    user: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),

  });


module.exports={feedbackSchema}