"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load Initial Data Safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("vesper_cart");
      const savedWishlist = localStorage.getItem("vesper_wishlist");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          setCart([]);
        }
      }
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist));
        } catch (e) {
          setWishlist([]);
        }
      }
    }
  }, []);

  const addToCart = (product: any) => {
    setCart((prev) => {
      // Handle both product.id or product._id securely
      const productId = product.id || product._id;
      const existing = prev.find((item) => (item.id || item._id) === productId);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          (item.id || item._id) === productId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        // Safe mapping ensuring image path is extracted properly
        updated = [...prev, { ...product, quantity: 1 }];
      }
      localStorage.setItem("vesper_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id: any) => {
    setCart((prev) => {
      const updated = prev.filter((item) => (item.id || item._id) !== id);
      localStorage.setItem("vesper_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (id: any, qty: number) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        (item.id || item._id) === id ? { ...item, quantity: qty > 0 ? qty : 1 } : item
      );
      localStorage.setItem("vesper_cart", JSON.stringify(updated));
      return updated;
    });
  };

  // CRITICAL FIX: Explicit clear function for checkout success route redirection
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("vesper_cart");
  };

  const toggleWishlist = (product: any) => {
    setWishlist((prev) => {
      const productId = product.id || product._id;
      const exists = prev.find((item) => (item.id || item._id) === productId);
      let updated;
      if (exists) {
        updated = prev.filter((item) => (item.id || item._id) !== productId);
      } else {
        updated = [...prev, product];
      }
      localStorage.setItem("vesper_wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      wishlist, toggleWishlist, 
      searchQuery, setSearchQuery 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);