import type { Metadata } from "next";
import { Bricolage_Grotesque, Lexend_Deca } from 'next/font/google';
import "./globals.css";
import WalletContextProvider from "@/components/WalletContextProvider";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const mainFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "500", "600", "700", "800"],
  variable: '--font-main'
});

const secondaryFont = Lexend_Deca({
  subsets: ["latin"],
  weight: ["100", "200", "300", "500", "600", "700", "800"],
  variable: '--font-secondary'
});

export const metadata: Metadata = {
  title: "ChronoMint",
  description: "Instant NFT Liquidation",
  openGraph: {
    type: 'website',
    title: "ChronoMint",
    description: "Instant NFT Liquidation",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/api/root-og-image`,
        alt: 'og-image-for-home-page'
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mainFont.variable} ${secondaryFont.variable} font-mainFont antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className='px-4'>
            <Navbar />
          </header>
          <WalletContextProvider>
            <main className=" max-w-7xl mx-auto px-4 min-h-[calc(100vh-21.8rem)]">
              {children}
            </main>
            <Toaster position="bottom-right" richColors />
          </WalletContextProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
