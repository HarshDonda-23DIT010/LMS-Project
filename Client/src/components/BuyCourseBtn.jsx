import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseApi'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'

const BuyCourseBtn = (courseId) => {

   const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] = useCreateCheckoutSessionMutation()

   const purchaseCourseHandler = async () => {
      await createCheckoutSession(courseId);
   }

   useEffect(() => {
      if (isSuccess) {
         if (data?.url) {
            window.location.href = data.url // redirect to stripe checkout url
         }
         if (error) {
            toast.error(error.data.message || 'Invalid responce fron server.')
         }
         if (isError) {
            toast.error('Faild to create chack out. ' || error?.data?.message)
         }
      }
   }, [data, isSuccess, isError, error])

   return (

      <Button disabled={isLoading} onClick={purchaseCourseHandler} className='w-full'>
         {
            isLoading ? (<><Loader className='mr-2 h-4 w-4 animate-spin' /> please wait .. </>) :
               ("Purchase Course")
         }
      </Button>

   )
}

export default BuyCourseBtn
