import { create } from "zustand";

type CartItem = {
  productId: number;
  name: string;
  pictureUrls: string[];
  price: number;
  quantity: number;
  drugstoreId: string;
  drugstoreName: string;
};

type CartStore = {
  cartItems: CartItem[];
  fetchCart: (userIdCookie: string) => Promise<void>;
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  fetchCart: async (userIdCookie: string) => {
    try {
      const res = await fetch(
        `https://localhost:7151/api/Cart?userId=${userIdCookie}`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        if (res.status === 404) {
          set({ cartItems: [] });
          return;
        }
        throw new Error("Failed to fetch cart");
      }
      const data = await res.json();
      set({ cartItems: data.data.cartItems });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },
}));
