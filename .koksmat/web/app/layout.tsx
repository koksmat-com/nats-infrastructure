"use client";
import type { Metadata } from "next";
import "./globals.css";
import "./embla.css";
import { ThemeProvider } from "../components/theme-provider";
import { MagicboxProvider } from "@/koksmat/magicbox-providers";
import { MSALWrapper } from "@/koksmat/msal/auth";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";

export default function RootLayout2({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {" "}
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        > */}
        <MagicboxProvider>
          <Script id="clarity">
            {`
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "lobxmt3a4x");            
            `}
          </Script>
          <MSALWrapper>
            <div>
              <div className="min-h-screen">{children}</div>
            </div>
          </MSALWrapper>
        </MagicboxProvider>
        {/* </ThemeProvider> */}
        <Toaster />
      </body>
    </html>
  );
}
