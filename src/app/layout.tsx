import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "vcv",
  description: "Version Control Visualizer",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delayDuration={0}>
              <div className="grid h-screen w-full">
                <div className="flex flex-col">
                  <Header />
                  <div className="flex flex-1">{children}</div>
                </div>
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </TRPCReactProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
