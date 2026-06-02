const API_BASE_URL = 'http://localhost:5000/api';

interface FetchOptions extends RequestInit {
  body?: any;
}

export async function apiFetch<T = any>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const token = localStorage.getItem('nutrichef_token');
  
  const headers: Record<string, string> = {
    ...((options.headers as any) || {}),
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  if (options.body && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (response.status === 401) {
    localStorage.removeItem('nutrichef_token');
    localStorage.removeItem('nutrichef_user');
    if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
      window.location.href = '/login?expired=true';
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Unauthorized. Please login again.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data as T;
}

export const api = {
  auth: {
    register: (username: string, email: string, password: string) => 
      apiFetch('/auth/register', {
        method: 'POST',
        body: { username, email, password }
      }),
    
    login: (usernameOrEmail: string, password: string) =>
      apiFetch('/auth/login', {
        method: 'POST',
        body: { username: usernameOrEmail, password }
      }),
      
    me: () => apiFetch('/auth/me', { method: 'GET' })
  },
  inventory: {
    getAll: () => apiFetch('/inventory', { method: 'GET' }),
    add: (name: string, quantity: number, unit: string) =>
      apiFetch('/inventory', {
        method: 'POST',
        body: { name, quantity, unit }
      }),
    delete: (id: number) => apiFetch(`/inventory/${id}`, { method: 'DELETE' })
  },
  recipes: {
    getMatching: () => apiFetch('/recipes', { method: 'GET' })
  }
};
