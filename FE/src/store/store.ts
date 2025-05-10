import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { storage } from "@/utils/localStorage";
import { combineReducers, type Reducer } from "redux";
import themeSlice  from "./slices/themeSlice";
import authSlice from "./slices/authSlice";

const rootReducer = combineReducers({
    theme: themeSlice,
    auth: authSlice,
  });

const persistConfig = {
    key: "root",
    storage,
    transforms: [
        encryptTransform({
          secretKey: import.meta.env.VITE_REDUX_ENCRYPT_KEY || 'your-secret-key-here',
          onError: function(error) {
            console.log('Encryption error:', error);
          },
        }),
      ],
  };
  
const persistedReducer = persistReducer(persistConfig, rootReducer as unknown as Reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
  
export type AppDispatch = typeof store.dispatch;