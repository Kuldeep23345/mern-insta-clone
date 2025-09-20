import useGetUserProfile from '@/hooks/useGetUserProfile'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Avatar, AvatarImage } from '../ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { AtSign, Heart, MessageCircle } from 'lucide-react'


const Profile = () => {
  const params = useParams()
  const userId = params.id
  useGetUserProfile(userId)
  const [activeTab, setActiveTab] = useState('posts')

  const { userProfile ,user} = useSelector(store => store.auth)
  console.log(userProfile)
  const isLoggedInUserProfile = user?._id === userProfile?._id
  const isFollowing = true

  const handleTabchange = (tab) => {
    console.log(activeTab)
    setActiveTab(tab)
  }

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks
  console.log(displayedPost)
  return (
    <section className='max-w-4xl flex mx-auto pl-10 justify-center'>
      <div className="flex flex-col gap-20 p-8">
        <div className='grid grid-cols-2'>
          <section className='flex items-center justify-center '>
            <Avatar className={'h-36 w-36'}>
              <AvatarImage className={'object-cover'} src={userProfile?.profilePicture} alt="profilePhoto"></AvatarImage>
              <AvatarFallback>Cn</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className='flex flex-row gap-5'>

              <span>{userProfile?.username} </span>
              {
                isLoggedInUserProfile ? (<div className='flex gap-2'>
                 <Link to={'/profile/edit'}><Button className={'hover:bg-gray-200 h-8'} variant={'secondary'}>Edit Profile</Button></Link> 
                  <Button className={'hover:bg-gray-200 h-8'} variant={'secondary'}>View archive</Button>
                  <Button className={'hover:bg-gray-200 h-8'} variant={'secondary'}>Ad tools</Button>
                </div>) : (
                  isFollowing ?
                    (<div className='flex gap-2'>
                      <Button variant={'secondary'} className={' h-8'} >UnFollow</Button>
                      <Button className={'bg-[#0095F6] hover:bg-[#0070ba] h-8'} >Message</Button>
                    </div>)
                    : (
                      <Button className={'bg-[#0095F6] hover:bg-[#0070ba]'} >Follow</Button>
                    ))
              }


            </div>
            <div className='flex  items-center gap-4 my-3'>
              <p><span className='font-semibold'></span>{userProfile?.posts?.length} posts</p>
              <p><span className='font-semibold'></span>{userProfile?.followers?.length} Followers </p>
              <p><span className='font-semibold'></span>{userProfile?.following?.length} Following</p>
            </div>
            <div className='flex flex-col '>
              <span className='font-semibold'>{userProfile?.bio || "bio here....."}</span>
              <Badge variant={'secondary'} className={'my-2'}> <AtSign />{userProfile?.username}</Badge>
            </div>
            <div className='flex flex-col'>

              <span>😎Lorem ipsum dolor sit amet consectetur.</span>
              <span>😎Lorem ipsum dolor sit amet consectetur.</span>
              <span>😎Lorem ipsum dolor sit amet consectetur.</span>
            </div>
          </section>
        </div>
        <div className='border-t border-t-gray-200'>
          <div className='flex items-center justify-center gap-10 text-sm'>
            <span onClick={() => handleTabchange('posts')} className={`py-3 cursor-pointer${activeTab == 'posts' ? "font-bold text-blue-500" : ""}`}>POSTS </span>
            <span onClick={() => handleTabchange('saved')} className={`py-3 cursor-pointer${activeTab == 'saved' ? "font-bold text-blue-500" : ""}`}>SAVED </span>
            <span onClick={() => handleTabchange('reels')} className={`py-3 cursor-pointer${activeTab == 'reels' ? "font-bold text-blue-500" : ""}`}>REELS </span>
            <span onClick={() => handleTabchange('tabs')} className={`py-3 cursor-pointer${activeTab == 'tabs' ? "font-bold text-blue-500" : ""}`}>TAGS </span>

          </div>
    <div className="grid grid-cols-3 gap-3">
  {displayedPost?.map((post) => (
    
    <div
      key={post?._id}
      className="relative group cursor-pointer overflow-hidden rounded-md shadow-sm"
    >
  
      <img
        src={post?.image}
        alt="postimage"
        className="rounded-md w-full aspect-square object-cover transform transition-transform duration-500 group-hover:scale-105"
      />
      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center text-white space-x-6">
          <Button
            className="flex items-center gap-2 bg-transparent hover:bg-transparent hover:text-gray-300 transition-colors shadow-none cursor-pointer"
          >
            <Heart className="w-5 h-5 cursor-pointer" />
            <span>{post?.likes?.length}</span>
          </Button>
          <Button
            className="flex items-center gap-2 bg-transparent hover:bg-transparent hover:text-gray-300 transition-colors shadow-none cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 cursor-pointer" />
            <span>{post?.comments?.length}</span>
          </Button>
        </div>
      </div>
    </div>
  ))}
</div>



        </div>
      </div>
    </section>
  )
}

export default Profile