import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "../DarkMode";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function Navbar() {
   const { user } = useSelector((store) => store.auth);
   const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
   const navigate = useNavigate();

   const logoutHandler = async () => {
      logoutUser();
   };

   useEffect(() => {
      if (isSuccess) {
         toast.success(data?.message || "User logged out successfully");
         navigate("/login");
      }
   }, [isSuccess]);

   return (
      <header className="h-16 dark:bg-gray-950 bg-white shadow-md fixed top-0 left-0 right-0 z-20">
         <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-full">
            {/* Logo */}
            <div className="flex items-center gap-4">
               <School size={30} className="text-blue-600 dark:text-blue-400" />
               <Link to="/" className="font-extrabold text-2xl text-gray-900 dark:text-white">
                  E-Learning
               </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-5">
               <DarkMode />
               {user ? (
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                           <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="User Avatar" />
                           <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-56 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                        <DropdownMenuLabel className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                           My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                           <Link to="/my-learning">
                              <DropdownMenuItem className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                 My Learning
                              </DropdownMenuItem>
                           </Link>
                           <Link to="/profile">
                              <DropdownMenuItem className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                 Edit Profile
                              </DropdownMenuItem>
                           </Link>
                           <DropdownMenuItem onClick={logoutHandler} className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                              Log out
                           </DropdownMenuItem>
                        </DropdownMenuGroup>
                        {user.role !== "student" && (
                           <>
                              <DropdownMenuSeparator />
                              <Link to="/admin/dashboard">
                                 <DropdownMenuItem className="px-4 py-2 text-sm font-medium text-center bg-green-200 hover:bg-green-300 dark:bg-green-700 dark:hover:bg-green-600 rounded-md">
                                    Dashboard
                                 </DropdownMenuItem>
                              </Link>
                           </>
                        )}
                     </DropdownMenuContent>
                  </DropdownMenu>
               ) : (
                  <div className="flex items-center gap-4">
                     <Button variant="outline" onClick={() => navigate("/login")}>
                        Login
                     </Button>
                     <Button onClick={() => navigate("/login")}>Signup</Button>
                  </div>
               )}
            </div>
         </div>
      </header>
   );
}

export default Navbar;
