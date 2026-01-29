import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        updatedDate: z.date().optional(),
        heroImage: z.string().optional(),
        author: z.string().default('Alpha Code'),
        categories: z.array(z.string()).default(['Desenvolvimento Web']),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        ctaType: z.enum(['topo', 'meio', 'fundo']).default('fundo'),
    }),
});

export const collections = { blog };
