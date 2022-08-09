import React from 'react'
import {ChevronUpIcon} from '@heroicons/react/outline'
import Avatar from './Avatar'
import Link from 'next/link'

type Props ={
    topic: string
    index: number
}

function SubredditRow({index,topic}:Props) {
  return (
    <div className='flex items-center space-x-2 last:rounded-b border-t bg-white py-2 px-4 '>
        <p>{index + 1}</p>
        <ChevronUpIcon className='text-green-400 h-4 w-4 flex-shrink-0'/>
        <Avatar seed={`/subreddit/${topic}`}/>
        <p className='flex-1 truncate'>r/{topic}</p>
        <Link href={`/subreddit/${topic}`}>
            <div className="cursor-pointer rounded-full bg-blue-500 px-3 py-1 text-white">view</div>
        </Link>

    </div>
  )
}

export default SubredditRow
