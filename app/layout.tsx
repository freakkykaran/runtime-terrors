import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LiveToast from "./components/LiveToast";
import { CartProvider } from "./context/CartContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { AuthProvider } from "./context/AuthContext";
import AuraAssistant from "./components/AuraAssistant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vesper Ecosystem",
  description: "Next-Gen Flagship Devices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white flex flex-col min-h-screen`}>
        <AuthProvider>
          <CurrencyProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <LiveToast />
              <AuraAssistant />
            </CartProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}