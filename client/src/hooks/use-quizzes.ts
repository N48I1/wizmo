import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type CreateQuizResultRequest } from "@shared/routes";

// ============================================
// QUIZ HOOKS
// ============================================

export function useQuizzes() {
  return useQuery({
    queryKey: [api.quizzes.list.path],
    queryFn: async () => {
      const res = await fetch(api.quizzes.list.path);
      if (!res.ok) throw new Error("Failed to fetch quizzes");
      return api.quizzes.list.responses[200].parse(await res.json());
    },
  });
}

export function useQuiz(id: string) {
  return useQuery({
    queryKey: [api.quizzes.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.quizzes.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch quiz");
      return api.quizzes.get.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// RESULT HOOKS
// ============================================

export function useQuizResults() {
  return useQuery({
    queryKey: [api.results.list.path],
    queryFn: async () => {
      const res = await fetch(api.results.list.path);
      if (!res.ok) throw new Error("Failed to fetch results");
      return api.results.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateQuizResult() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateQuizResultRequest) => {
      // 1. Optimistic Local Storage Update (Offline-first approach)
      try {
        const stored = localStorage.getItem('wizmo_results');
        const results = stored ? JSON.parse(stored) : [];
        results.push({ ...data, id: Date.now() }); // Mock ID for local
        localStorage.setItem('wizmo_results', JSON.stringify(results));
      } catch (e) {
        console.error("Failed to save to localStorage", e);
      }

      // 2. Network Request
      const res = await fetch(api.results.create.path, {
        method: api.results.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.results.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error('Failed to create result');
      }
      return api.results.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.results.list.path] });
    },
  });
}
