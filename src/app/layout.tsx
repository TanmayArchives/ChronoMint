import type { Metadata } from "next";
import { Bricolage_Grotesque, Lexend_Deca } from 'next/font/google';
import "./globals.css";
import WalletContextProvider from "@/components/WalletContextProvider";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";

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
            <div className="px-4">
              {children}
            </div>
          </WalletContextProvider>
        </ThemeProvider>
        
      </body>
    </html>
  );
}
