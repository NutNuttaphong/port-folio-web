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

/**
 * Handle 401 Unauthorized responses across all API services.
 * Clears stale credentials and redirects to login.
 */
export function handleAuthError(response) {
  if (response && response.status === 401) {
    try {
      localStorage.removeItem("currentUser");
    } catch {
      // ignore
    }
    if (
      typeof window !== "undefined" &&
      !window.location.pathname.includes("/login") &&
      !window.location.pathname.includes("/booking")
    ) {
      alert("Your session has expired or authentication is missing. Please log in again.");
      window.location.href = "/booking";
    }
  }
}
