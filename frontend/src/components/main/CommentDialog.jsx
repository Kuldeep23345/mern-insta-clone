import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'

const CommentDialog = ({open,setOpen}) => {
  return (
    <section>
<Dialog open={open}>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent onInteractOutside={()=>setOpen(false)} >
   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX6Mi24zLzk0iWVS7h62M_fSF92uxyHxr8dg&s" alt="" />
   <div className='w-1/2 flex flex-col justify-between'>
    <div className='flex items-center justify-between'>
<Avatar>
    <AvatarImage src=''/>
    
</Avatar>
    </div>
   </div>
  </DialogContent>
</Dialog>
    </section>
  )
}

export default CommentDialog