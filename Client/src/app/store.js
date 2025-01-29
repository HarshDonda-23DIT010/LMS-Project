import { configureStore } from "@reduxjs/toolkit";
import rootReduser from "./rootReducer.js";
import { authApi } from "@/features/api/authApi.js";
import { courseApi } from "@/features/api/courseApi.js";

export const appStore = configureStore({
   reducer: rootReduser,
   middleware: (DefaultMiddleware) => DefaultMiddleware().concat(authApi.middleware, courseApi.middleware),
});

const initializeApp = async () => {
   await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}
initializeApp()