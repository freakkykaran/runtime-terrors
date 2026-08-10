"use client";

import React, { createContext, useContext, useState } from "react";

type Currency = "USD" | "INR";

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  formatPrice: (usdPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  const toggleCurrency = () => {
    setCurrency(prev => (prev === "USD" ? "INR" : "USD"));
  };

  const formatPrice = (usdPrice: number) => {
    if (currency === "INR") {
      const inrPrice = Math.round(usdPrice * 84); // 1 USD = 84 INR approx
      return `₹${inrPrice.toLocaleString("en-IN")}`;
    }
    return `$${usdPrice.toLocaleString("en-US")}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
}