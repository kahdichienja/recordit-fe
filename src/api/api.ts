import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ─── Real Backend Interfaces ──────────────────────────────────────────────────

/** Inventory item embedded inside a Shop or ShopProducts response */
export interface InventoryItem {
  id: number;
  product_name: string;
  selling_price: number;
  product_quantity: number;
  sku: string;
  created_at: string;
  updated_at: string;
}

/** Full shop object with embedded inventory (from GET /shops/ and GET /shops/{id}/) */
export interface Shop {
  id: number;
  name: string;
  email: string;
  description: string;
  location: string;
  inventory: InventoryItem[];
}

/** Minimal shop object embedded inside product/order responses */
export interface ShopSummary {
  id: number;
  name: string;
  email: string;
  location: string;
}

/** Minimal inventory reference inside a Sales record */
export interface InventorySummary {
  id: number;
  product_name: string;
  sku: string;
}

/** Sales record embedded inside an Order */
export interface Sales {
  id: number;
  product_price: number;
  product_quantity: number;
  product_discount_price: number;
  inventory: InventorySummary;
}

/** Full Order object */
export interface Order {
  id: number;
  shop: ShopSummary;
  sales: Sales;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  total_amount: number;
  name: string;
  email: string;
  phone_number: string;
  delivery_address: string;
  created_at: string;
  updated_at: string;
}

/** Response shape for GET /shops/<shop_id>/products/ */
export interface ShopProductsResponse {
  shop: ShopSummary;
  products: InventoryItem[];
}

/** Payload for POST /orders/create/ */
export interface CreateOrderPayload {
  inventory_id: number;   // the inventory/product id
  shop_id: number;
  product_quantity: number;
  delivery_address: string;
  phone_number: string;
  email: string;
  name: string;
}

// ─── RTK Query API ────────────────────────────────────────────────────────────

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL as string }),
  tagTypes: ['Shop', 'Product', 'Order'],
  endpoints: (builder) => ({
    // ── Shops ──────────────────────────────────────────────────────────────
    getShops: builder.query<Shop[], void>({
      query: () => 'shops/',
      providesTags: ['Shop'],
    }),

    getShop: builder.query<Shop, number>({
      query: (id) => `shops/${id}/`,
      providesTags: (_result, _error, id) => [{ type: 'Shop', id }],
    }),
 
    // ── Products (per-shop) ────────────────────────────────────────────────
    getShopProducts: builder.query<ShopProductsResponse, number>({
      query: (shopId) => `shops/${shopId}/products/`,
      providesTags: (_result, _error, shopId) => [{ type: 'Product', id: shopId }],
    }),

    getProduct: builder.query<InventoryItem, number>({
      query: (id) => `products/${id}/`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),

    // ── Orders ─────────────────────────────────────────────────────────────
    createOrder: builder.mutation<Order, CreateOrderPayload>({
      query: (body) => ({
        url: 'orders/create/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    getOrder: builder.query<Order, number>({
      query: (id) => `orders/${id}/`,
      providesTags: (_result, _error, id) => [{ type: 'Order', id }],
    }),
  }),
});

export const {
  useGetShopsQuery,
  useGetShopQuery,
  useGetShopProductsQuery,
  useGetProductQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
} = api;
