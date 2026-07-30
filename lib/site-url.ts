import { headers } from "next/headers";

function normalizeUrl(value: string) {
  return value.replace(/\/$/, "");
}

export async function getSiteUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicitUrl) {
    return normalizeUrl(explicitUrl);
  }

  const productionUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (productionUrl) {
    const withProtocol = productionUrl.startsWith("http")
      ? productionUrl
      : `https://${productionUrl}`;
    return normalizeUrl(withProtocol);
  }

  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "https";

  if (host) {
    return normalizeUrl(`${proto}://${host}`);
  }

  return "http://localhost:3000";
}
