import { configureStore } from "@reduxjs/toolkit";
import rootReduser from "./rootReducer.js";
import { authApi } from "@/features/api/authApi.js";
import { courseApi } from "@/features/api/courseApi.js";
import { purchaseApi } from "@/features/api/purchaseApi.js";
import { courseProgressApi } from "@/features/api/courseProgressApi.js";

export const appStore = configureStore({
   reducer: rootReduser,
   middleware: (DefaultMiddleware) => DefaultMiddleware().concat(authApi.middleware, courseProgressApi.middleware, courseApi.middleware, purchaseApi.middleware),
});

const initializeApp = async () => {
   await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}
initializeApp()