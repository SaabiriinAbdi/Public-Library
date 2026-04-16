import { api } from "./index";

export const LoansAPI = {
  getAll: () => api.get("/api/loans"),
  getByPatron: (id: string) => api.get(`/api/loans/patron/${id}`),
};
