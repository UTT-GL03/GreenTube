const API_URL = "http://localhost:3000";

async function request(method, route, { params = {}, body } = {}) {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${API_URL}/${route}?${query}` : `${API_URL}/${route}`;

  try {
    const response = await fetch(url, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    throw new Error(`Network or HTTP error: ${err.message}`);
  }
}

export const httpGet = (route, params) =>
  request('GET', route, { params });

export const httpPost = (route, body) =>
  request('POST', route, { body });