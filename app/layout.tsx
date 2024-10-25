"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import "@/styles/globals.css";
import { getConfig } from "@/config";

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: typeof window !== "undefined" ? window.location.origin : "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Auth0Provider {...providerConfig}>{children}</Auth0Provider>
      </body>
    </html>
  );
}
