import React from 'react'
import Image from 'next/image'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  MenuIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
  } from '@heroicons/react/outline'
import {HomeIcon, ChevronDownIcon,BeakerIcon, SearchIcon} from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'


function Header() {
  const {data:session}=useSession();
  return (
    <div className='flex  sticky top-0 z-50 bg-white justify-between px-4 mx-auto py-2 shadow-sm'>
        <div className='relative h-10 w-20 flex-shrink-0 cursor-pointer'>
            <Link href='/'>
              <Image objectFit='contain' src="https://www.redditstatic.com/reddit404a.png" layout='fill'/>
            </Link>
        </div>
     
          {session ? (
            <div 
            onClick={()=>signOut()}
            className=' flex items-center border border-gray-100 p-2  space-x-2 cursor-pointer'>

            <div className='relative h-5 w-5 flex-shrink-0'>
              <Image objectFit='contain' src='http://links.papareact.com/23l'
              layout='fill'
              
              />
            </div>
            <div className='flex-1 text-xs'>
              <p className='tranucate'>{session?.user?.name}</p>
            <p className='text-gray-400'>signOut</p>
            
            </div>
            <ChevronDownIcon className='h-5 text-gray-400 flex-shrink-0'/>

            </div>
   
          ):(
          <div onClick={()=>signIn()} className='flex items-center  border-gray-100 p-2  space-x-2 cursor-pointer'>

            <div className='relative h-5 w-5 flex-shrink-0'>
              <Image objectFit='contain' src='http://links.papareact.com/23l'
              layout='fill'
              
              />
            </div>
            <p className='text-gray-400'>Sign In</p>

         </div>
        )}
      
    </div>
  )
}

export default Header
