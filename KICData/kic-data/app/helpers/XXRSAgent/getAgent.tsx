export function detectBrowser(): string {
  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.includes("chrome")) {
    return "Chrome";
  } else if (userAgent.includes("firefox")) {
    return "Firefox";
  } else if (userAgent.includes("edg")) {
    return "Edge";
  } else {
    return "Unknown";
  }
}
