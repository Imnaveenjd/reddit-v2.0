import React from 'react'
import Image from 'next/Image'
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
    <div className='flex  sticky top-0 z-50 bg-white px-4 py-4 shadow-sm'>
        <div className='relative h-10 w-20 flex-shrink-0 cursor-pointer'>
            <Link href='/'>
              <Image objectFit='contain' src="http://links.papareact.com/fqy"layout='fill'/>
            </Link>
        </div>
        <div className=' flex items-center mx-7 xl:min-w-[300px]'>
          <HomeIcon className='h-5 w-5'/>
          <p className=' ml-2 flex-1 hidden lg:inline'>Home</p>
          <ChevronDownIcon className='h-5 w-5'/>

        </div>
        <form className="flex flex-1 items-center space-x-2  bg-gray-100 px-3 py-1border rounded-sm border-gray-200">
          <SearchIcon className='h-6 w-6 text-gray-400'/>
          <input  className='flex-1  bg-transparent outline-none' type="text" placeholder='search here'/>
          <button type="submit" hidden/>
        </form>

        <div className='  text-gray-500 space-x-2 items-center hidden mx-5 lg:inline-flex'>
            <SparklesIcon className='icon'/>
            <GlobeIcon className='icon'/>
            <VideoCameraIcon className='icon'/>
            <hr className='h-10 border border-gray-100'></hr>
            <ChatIcon className='icon'/>
            <BellIcon className='icon'/>
            <PlusIcon className='icon'/>
            <SpeakerphoneIcon className='icon'/>
        </div>

        <div className='ml-5 flex items-center  lg:hidden'>
          <MenuIcon className='icon'/>
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