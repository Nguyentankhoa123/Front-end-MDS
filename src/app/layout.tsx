import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/sonner";
import { CookiesProvider } from "next-client-cookies/server";
import Footer from "@/components/footer/page";
import Providers from "@/components/progressbarprovider/ProgressBarProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MDS",
  description: "Generated by create next app",
};

const googleClientId = process.env.GOOGLE_CLIENT_ID || "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      <GoogleOAuthProvider clientId={googleClientId}>
        <html lang="en">
          <body className={inter.className}>
            <Header />
            <Providers>{children}</Providers>
            <Toaster expand={false} position="bottom-right" richColors />
            {/* <Footer /> */}
          </body>
        </html>
      </GoogleOAuthProvider>
    </CookiesProvider>
  );
}