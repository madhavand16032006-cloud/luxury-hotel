"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, PRODUCTS, CategoryName } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryDetails {
  customerName: string;
  mobileNumber: string;
  deliveryAddress: string;
  deliveryInstructions: string;
}

export interface ConfirmedOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  deliveryDetails: DeliveryDetails;
  timestamp: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  total: number;

  // Cart Drawer
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // Checkout Modal
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryName | "All";
  setSelectedCategory: (cat: CategoryName | "All") => void;

  // Delivery details
  deliveryDetails: DeliveryDetails;
  setDeliveryDetails: React.Dispatch<React.SetStateAction<DeliveryDetails>>;

  // Confirmed Order
  confirmedOrder: ConfirmedOrder | null;
  setConfirmedOrder: (order: ConfirmedOrder | null) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Direct Buy Now helper
  buyNow: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Initial demo cart with 2 popular everyday items
  const [cart, setCart] = useState<CartItem[]>(() => {
    return [
      { product: PRODUCTS[0], quantity: 1 }, // Tomatoes 1kg
      { product: PRODUCTS[8], quantity: 2 }, // Cow Milk 1L x 2
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | "All">("All");

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    customerName: "",
    mobileNumber: "",
    deliveryAddress: "",
    deliveryInstructions: "",
  });

  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-clear toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart! 🛒`);
  };

  const buyNow = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev;
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (item) {
      showToast(`Removed "${item.product.name}" from cart`);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const freeDeliveryThreshold = 499;
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 30;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const total = subtotal + deliveryFee;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        buyNow,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        deliveryFee,
        freeDeliveryThreshold,
        amountNeededForFreeDelivery,
        total,
        isCartOpen,
        openCart,
        closeCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        deliveryDetails,
        setDeliveryDetails,
        confirmedOrder,
        setConfirmedOrder,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

