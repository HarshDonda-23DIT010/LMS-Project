import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Menu, School, Store } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import DarkMode from '../DarkMode'
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "./ui/sheet"
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

function navbar() {
   const { user } = useSelector(Store => Store.auth)
   const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()

   const logoutHandler = async () => {
      logoutUser();
   }
   const navigate = useNavigate();

   useEffect(() => {
      if (isSuccess) {
         toast.success(data.message || "User log out ")
         navigate("/login")
      }
   }, [isSuccess])


   return (
      <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>

         <div className=' hidden md:flex max-w-7xl mx-auto justify-between items-center gap-10 h-full'>
            <div className='flex items-center gap-4'>

               <School size={'30'} />
               <h1 className='hidden md:block font-extrabold text-2xl'>E-Learning</h1>
            </div>
            <div className='flex items-center gap-5'>
               <DarkMode />

               {
                  user ? (
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Avatar>
                              <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                              <AvatarFallback>CN</AvatarFallback>
                           </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-white rounded-md shadow-md">
                           <DropdownMenuLabel className="px-4 py-2 text-sm font-semibold text-gray-800">
                              My Account
                           </DropdownMenuLabel>
                           <DropdownMenuSeparator className="my-2 border-t" />
                           <DropdownMenuGroup>
                              <Link to='my-learning'>
                                 <DropdownMenuItem className="px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100">
                                    My Learning
                                 </DropdownMenuItem></Link>
                              <Link to='profile'>
                                 <DropdownMenuItem className="px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100">
                                    Edit Profile
                                 </DropdownMenuItem></Link>
                              <DropdownMenuItem onClick={logoutHandler} className="px-4 py-2 text-sm flex justify-between hover:bg-gray-100 focus:bg-gray-100">
                                 Log out

                              </DropdownMenuItem>
                           </DropdownMenuGroup>
                           {
                              user.role === "student" ? <></> :
                                 (
                                    <>
                                       <DropdownMenuSeparator className="my-2 border-t" />
                                       <Link to={"/admin"}>
                                       <DropdownMenuItem className="px-4 py-2 text-sm font-medium text-balck text-center bg-green-200 hover:bg-green-300 rounded-md">
                                          Dashboard
                                       </DropdownMenuItem>
                                       </Link>
                                    </>
                                 )

                           }

                        </DropdownMenuContent>
                     </DropdownMenu>


                  ) : (
                     <div className='flex items-center gap-4'>
                        <Button variant='outline' onClick={() => navigate("/login")}>Login</Button>
                        <Button onClick={() => navigate("/login")}>Signup</Button>
                     </div>
                  )
               }
            </div>
         </div>

         <div className='flex md:hidden items-center justify-between px-4 h-full'>
            <div className='flex items-center gap-4'>

               <School size={'30'} />
               <h1 className=' md:block font-extrabold text-2xl'>E-Learning</h1>
            </div>
            <MobileNavbar logout={logoutHandler} />
         </div>
      </div>
   )
}

const MobileNavbar = ({ logout }) => {
   const role = 'student'

   return (
      <Sheet >
         <SheetTrigger asChild>
            <Button size='icon' className='rounded-full bg-gray-200 hover:bg-gray-400' variant="outline">
               <Menu />
            </Button>
         </SheetTrigger>
         <SheetContent className='flex flex-col'>
            <SheetHeader className='flex flex-row items-center justify-between mt-2'>
               <SheetTitle>E-Learning</SheetTitle>
               <DarkMode />
            </SheetHeader>
            <Separator className='my-2' />
            <nav className='flex flex-col gap-4'>
               <Link to='my-learning'>
                  <span>My Learning</span>
               </Link>
               <Link to='profile'>
                  <span>Edit Profile</span>
               </Link>
               <Button onClick={logout}>
                  <span>Log Out</span>
               </Button>
            </nav>
            {
               role === 'instructor' && (
                  <SheetFooter>
                     <SheetClose asChild>
                        <Button type="submit" className='w-full'>Dashboard</Button>
                     </SheetClose>
                  </SheetFooter>
               )
            }

         </SheetContent>
      </Sheet>
   )
}
export default navbar

