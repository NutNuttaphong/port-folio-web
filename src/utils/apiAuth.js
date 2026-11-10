/**
 * Helper to retrieve the JWT Bearer token from localStorage
 * and attach it to request headers for protected endpoints.
 */
export function getAuthHeaders(existingHeaders = {}) {
  try {
    const raw = localStorage.getItem("currentUser");
    if (raw) {
      const parsed = JSON.parse(raw);
      const token = parsed.access_token || parsed.token;
      if (token) {
        return {
          ...existingHeaders,
          Authorization: `Bearer ${token}`,
        };
      }
    }
  } catch {
    // If JSON parsing fails, continue with existing headers
  }
  return existingHeaders;
}
