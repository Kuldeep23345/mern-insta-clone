import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import instance from "@/lib/axios.instance";
import { useDispatch } from "react-redux";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState('')
  const [caption, setCaption] = useState("")
  const [imagePreview, setImagePreview] = useState('')
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("File could not be read as DataURL"));
        }
      };

      reader.onerror = () => reject(reader.error);

      reader.readAsDataURL(file);
    });
  };
  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0]

    if (file) {
      setFile(file)
      const dataUrl = await readFileAsDataURL(file)
      setImagePreview(dataUrl)
    }

  }
  const createPostHandler = async (e) => {
    const formData = new FormData()
    formData.append('caption', caption);
    if (file) formData.append('image', file);
    try {
      const res = await instance.post('/post/addpost', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      if (res.data.success) {

        setLoading(true)
        toast.success(res?.data?.message)
        setCaption("")
        setImagePreview("")
        

      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className={'text-center font-semibold'}> Create new post</DialogHeader>
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-xs"></h1>
            <span className="text-gray-600">Bio Here ..</span>
          </div>
        </div>
        <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className={'border-none focus-visible:ring-transparent'} placeholder="write a caption" />
        {
          imagePreview && (
            <div className="w-full h-64 flex items-center justify-center">
              <img className="object-cover h-full w-full rounded-md" src={imagePreview} alt="previe_img" />

            </div>
          )
        }
        <input ref={imageRef} type="file" className="hidden" onChange={fileChangeHandler} />
        <Button onClick={() => imageRef.current.click()} className={'w-fit mx-auto bg-[#0095F6] hover:bg-[#006eb7] cursor-pointer'}>Select from computer</Button>
        {
          imagePreview && (
            loading ? (
              <Button>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button onClick={createPostHandler} type="submit" className={'w-full'}>Post</Button>
            )
          )
        }
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
