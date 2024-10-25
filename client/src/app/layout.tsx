import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"], // Specify the weights you need
  subsets: ["latin"], // Subsets for character support
  variable: "--font-poppins", // Custom variable name
  display: "swap", // Controls the font display behavior
});

export const metadata: Metadata = {
  title: "Infinify",
  description: "Find your music data and music enjoyers",
};

// redux
import { ReduxProvider } from "@/redux/ReduxProvider";
import Header from "../components/Header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased bg-spotify-dark-gray`}
      >
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
