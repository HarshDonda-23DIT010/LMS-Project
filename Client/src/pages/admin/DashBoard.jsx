import { Card, CardHeader } from '@/components/ui/card'
import React from 'react'

const DashBoard = () => {
   return (
      <div className='grid gap-6 ml-12 mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
         <Card className='w-60 '>
            <CardHeader>
               harsh donda 
            </CardHeader>
         </Card>
      </div>
   )
}

export default DashBoard
