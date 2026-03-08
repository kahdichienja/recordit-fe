import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ─── Mock Interfaces ──────────────────────────────────────────────────────────

export interface Shop {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  shopId: string;
  imageUrl?: string;
  stock: number;
}

export interface Order {
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  product: Product;
  shop: Shop;
  quantity: number;
  price: number;
  delivery_address: string;
  phone_number: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface CreateOrderPayload {
  product_id: string;
  shop_id: string;
  quantity: number;
  price: number;
  delivery_address: string;
  phone_number: string;
  email: string;
  name: string;
}

// ─── RTK Query API ────────────────────────────────────────────────────────────

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  tagTypes: ['Shop', 'Product', 'Order'],
  endpoints: (builder) => ({
    // Shops
    getShops: builder.query<Shop[], void>({
      query: () => 'shops/',
      providesTags: ['Shop'],
    }),
    getShop: builder.query<Shop, string>({
      query: (id) => `shops/${id}/`,
      providesTags: (_result, _error, id) => [{ type: 'Shop', id }],
    }),

    // Products
    getProducts: builder.query<Product[], void>({
      query: () => 'products/',
      providesTags: ['Product'],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `products/${id}/`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),

    // Orders
    createOrder: builder.mutation<Order, CreateOrderPayload>({
      query: (body) => ({
        url: 'orders/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
    getOrder: builder.query<Order, string>({
      query: (orderNumber) => `orders/${orderNumber}/`,
      providesTags: (_result, _error, orderNumber) => [{ type: 'Order', id: orderNumber }],
    }),
  }),
});

export const {
  useGetShopsQuery,
  useGetShopQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
} = api;
