import { useSelector } from "react-redux"

export const ProtectedRoute = ({children}) => { 
const {user , isAuthenticated} =useSelector(store => store.auth)


}