import { z } from 'zod';
import { insertQuizResultSchema, QuizCategorySchema, quizResults } from './schema';

export type CreateQuizResultRequest = z.infer<typeof insertQuizResultSchema>;


export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  quizzes: {
    list: {
      method: 'GET' as const,
      path: '/api/quizzes',
      responses: {
        200: z.array(QuizCategorySchema),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/quizzes/:id',
      responses: {
        200: QuizCategorySchema,
        404: errorSchemas.notFound,
      },
    },
  },
  results: {
    create: {
      method: 'POST' as const,
      path: '/api/results',
      input: insertQuizResultSchema,
      responses: {
        201: z.custom<typeof quizResults.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/results',
      responses: {
        200: z.array(z.custom<typeof quizResults.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
