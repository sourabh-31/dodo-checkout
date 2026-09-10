import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "../styles/globals.css";

const manrope = localFont({
  src: "../assets/fonts/manrope.woff2",
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = { title: "Demo Ecommerce Site" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Script
          src="https://my-sdk.pages.dev/dodo-checkout.js"
          strategy="afterInteractive"
        />{" "}
      </body>{" "}
    </html>
  );
}
