import type { Metadata } from "next";
import "../styles/globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Demo Ecommerce Site",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}{" "}
        <Script
          src="https://my-sdk.pages.dev/dodo-checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
