import { createPostRequestSchema } from 'express-ajv';

const bodySchema = {
    type: 'object',
    properties: {
        sender: {
            type: 'string',
            minLength: 1
        }
    },
    required: ['sender'],
};

export const postHelloWorld = createPostRequestSchema(bodySchema);
