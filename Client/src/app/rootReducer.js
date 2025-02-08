import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice.js'
import { authApi } from '@/features/api/authApi'
import { courseApi } from '@/features/api/courseApi.js'
import { purchaseApi } from '@/features/api/purchaseApi.js'
import { courseProgressApi } from '@/features/api/courseProgressApi.js'

const rootReduser = combineReducers({
   [authApi.reducerPath]: authApi.reducer,
   [courseApi.reducerPath]: courseApi.reducer,
   [purchaseApi.reducerPath]: purchaseApi.reducer,
   [courseProgressApi.reducerPath]: courseProgressApi.reducer,
   auth: authReducer,
})

export default rootReduser  