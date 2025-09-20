import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SuggestedUsers = () => {
    const { suggestedUser } = useSelector(store => store.auth)

    return (
        <section className='my-10 pr-20'>
            <div className="flex items-center justify-between text-sm">
                <h1 className="font-semibold text-gray-600">Suggeted for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {
                suggestedUser?.map((user) => (
                    <div key={user._id} className='flex justify-between items-center px-0.5 my-3'>
                        <div className="flex items-center gap-3">
                            <Link to={`/profile/${user._id}`}>
                                <Avatar>
                                    <AvatarImage className={'object-cover'} src={user?.profilePicture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div className="flex items-center gap-3">
                                <h1 className="font-semibold text-sm"> <Link to={`/profile/${user._id}`}>{user?.username}</Link> </h1>
                                <span className="text-gray-600 text-sm">{user?.bio || 'bio here....'}</span>
                            </div>
                        </div>
                        <span className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#007dd1]'>Follow</span>
                    </div>
                ))
            }
        </section>
    )
}

export default SuggestedUsers