"use client"
import Providers from "./redux/providers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./lib/muitheme"; // Import the theme file
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "./lib/emotionCache";
import { CacheProvider } from "@emotion/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const clientSideEmotionCache = createEmotionCache();

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en"  >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Ensures consistent styling */}
            {children}
          </ThemeProvider>
        </CacheProvider>
        </Providers>
      </body>
    </html>
  );
}
