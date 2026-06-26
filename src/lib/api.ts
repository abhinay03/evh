import { delay } from "./utils";

const BASE_URL = "/api";

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `API error: ${res.status}`);
  }
  return res.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      fetchAPI("/auth", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    verify: () => fetchAPI("/auth"),
  },
  dashboard: {
    get: (customerId: string) => fetchAPI(`/dashboard?customerId=${customerId}`),
  },
  heating: {
    get: (customerId: string) => fetchAPI(`/heating?customerId=${customerId}`),
  },
  electricity: {
    get: (customerId: string) => fetchAPI(`/electricity?customerId=${customerId}`),
  },
  bills: {
    get: (customerId: string) => fetchAPI(`/bills?customerId=${customerId}`),
  },
  rewards: {
    get: (customerId: string) => fetchAPI(`/rewards?customerId=${customerId}`),
  },
  community: {
    get: () => fetchAPI("/community"),
  },
  sustainability: {
    get: () => fetchAPI("/sustainability"),
  },
  weather: {
    get: () => fetchAPI("/weather"),
  },
  customer: {
    get: (customerId: string) => fetchAPI(`/customer?customerId=${customerId}`),
  },
};
