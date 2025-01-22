import { configureStore } from "@reduxjs/toolkit";
import rootReduser from "./rootReducer.js";
import { authApi } from "@/features/api/authApi.js";

export const appStore = configureStore({
   reducer:rootReduser,
   middleware: (DefaultMiddleware) => DefaultMiddleware().concat(authApi.middleware),
   });