"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
  steps: { title: string; desc: string; active: boolean }[];
}

interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  orders: Order[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
  addOrder: (totalAmount: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedActiveUser = localStorage.getItem("aura_active_user");
    if (storedActiveUser) {
      setUser(JSON.parse(storedActiveUser));
    } else {
      // Default initial user with sample order
      const defaultUser: User = {
        name: "Karan Kumar",
        email: "karan@example.com",
        phone: "+91 98765 43210",
        address: "Sector V, Salt Lake, Kolkata, 700091",
        orders: [
          {
            id: "AURA-98421",
            date: "August 9, 2026",
            status: "In Transit",
            total: "$1,299.00",
            steps: [
              { title: "Order Confirmed", desc: "Payment secured via protocol.", active: true },
              { title: "Kolkata Facility", desc: "Assembly & testing complete.", active: true },
              { title: "Quantum Rail Dispatch", desc: "In transit towards regional hub.", active: true },
              { title: "Out for Delivery", desc: "Tomorrow by 4:00 PM.", active: false }
            ]
          }
        ]
      };
      setUser(defaultUser);
      localStorage.setItem("aura_active_user", JSON.stringify(defaultUser));
    }
  }, []);

  const signup = (name: string, email: string, pass: string) => {
    const newUser: User = {
      name: name,
      email: email.toLowerCase().trim(),
      phone: "+91 98765 43210",
      address: "Sector V, Salt Lake, Kolkata, 700091",
      orders: [
        {
          id: "AURA-" + Math.floor(10000 + Math.random() * 90000),
          date: "Today",
          status: "Processing",
          total: "$899.00",
          steps: [
            { title: "Order Confirmed", desc: "Payment verified successfully.", active: true },
            { title: "Kolkata Facility", desc: "Preparing for device assembly.", active: false },
            { title: "Quantum Rail Dispatch", desc: "Pending dispatch.", active: false },
            { title: "Out for Delivery", desc: "Scheduled soon.", active: false }
          ]
        }
      ]
    };

    const existingUsersJSON = localStorage.getItem("aura_users_db");
    const usersDb = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];
    const filteredDb = usersDb.filter((u: any) => u.email !== newUser.email);
    filteredDb.push({ ...newUser, password: pass });
    localStorage.setItem("aura_users_db", JSON.stringify(filteredDb));

    setUser(newUser);
    localStorage.setItem("aura_active_user", JSON.stringify(newUser));
    return true;
  };

  const login = (email: string, pass: string) => {
    const formattedEmail = email.toLowerCase().trim();
    const existingUsersJSON = localStorage.getItem("aura_users_db");
    
    if (existingUsersJSON) {
      const usersDb = JSON.parse(existingUsersJSON);
      const foundUser = usersDb.find((u: any) => u.email === formattedEmail && u.password === pass);

      if (foundUser) {
        const activeUserData: User = { 
          name: foundUser.name, 
          email: foundUser.email, 
          phone: foundUser.phone || "+91 98765 43210", 
          address: foundUser.address || "Sector V, Salt Lake, Kolkata, 700091",
          orders: foundUser.orders || [
            {
              id: "AURA-98421",
              date: "August 9, 2026",
              status: "In Transit",
              total: "$1,299.00",
              steps: [
                { title: "Order Confirmed", desc: "Payment secured via protocol.", active: true },
                { title: "Kolkata Facility", desc: "Assembly & testing complete.", active: true },
                { title: "Quantum Rail Dispatch", desc: "In transit towards regional hub.", active: true },
                { title: "Out for Delivery", desc: "Tomorrow by 4:00 PM.", active: false }
              ]
            }
          ]
        };
        setUser(activeUserData);
        localStorage.setItem("aura_active_user", JSON.stringify(activeUserData));
        return true;
      }
    }

    alert("Invalid email or password! Please check or Signup first.");
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("aura_active_user");
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (!user) return;
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem("aura_active_user", JSON.stringify(newUserData));
  };

  // Function to add a brand new order dynamically when checkout/purchase happens
  const addOrder = (totalAmount: string) => {
    if (!user) return;
    const randomId = "AURA-" + Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: randomId,
      date: "Just Now",
      status: "Order Placed",
      total: totalAmount,
      steps: [
        { title: "Order Confirmed", desc: "Secured via quantum encryption.", active: true },
        { title: "Kolkata Facility", desc: "Awaiting component allocation.", active: false },
        { title: "Quantum Rail Dispatch", desc: "Scheduled for transit.", active: false },
        { title: "Out for Delivery", desc: "Pending delivery.", active: false }
      ]
    };

    const updatedOrders = [newOrder, ...(user.orders || [])];
    const newUserData = { ...user, orders: updatedOrders };
    setUser(newUserData);
    localStorage.setItem("aura_active_user", JSON.stringify(newUserData));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}