import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

import { api } from './api';
import cartReducer from './cartSlice';

// ─── Persist Config ───────────────────────────────────────────────────────────

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // Only persist the cart; RTK Query cache is ephemeral
  whitelist: ['cart'],
};

// ─── Root Reducer ─────────────────────────────────────────────────────────────

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ─── Store ────────────────────────────────────────────────────────────────────

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types in serializable check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

// ─── Types ────────────────────────────────────────────────────────────────────

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
