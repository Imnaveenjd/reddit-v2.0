import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Avatar from './Avatar'
import { useForm } from 'react-hook-form';
import {LinkIcon,PhotographIcon} from '@heroicons/react/solid'
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations';
import client from '../apollo-client'
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC} from '../graphql/queries';
import toast from 'react-hot-toast';

type FormData={
  postTitle:string
  postBody:string
  postImage:string
  subreddit:string
};

type Props={
  subreddit?:string
}

function PostBox({subreddit}:Props) {
    console.log(subreddit)
    const {data:session}=useSession()
    const [addPost]=useMutation(ADD_POST,{
      refetchQueries:[
        GET_ALL_POSTS,
        'getPostList'
      ]
    })
    const [addSubreddit]=useMutation(ADD_SUBREDDIT)
   
    const [imageBoxOpen,setImageBoxOpen]=useState<boolean>(false)
    const { 
        register, 
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
     } = useForm<FormData>()

    const onSubmit = handleSubmit(async (formData) =>{
      console.log(formData)
      const notification=toast.loading('creating new post..')
      try{
        const {
          data:{getSubredditListByTopic},
        }=await client.query({
           query:GET_SUBREDDIT_BY_TOPIC,
           variables:{
            topic: subreddit || formData.subreddit,},
         })

          const subredditExists = getSubredditListByTopic.length > 0;

          if (!subredditExists){

            console.log('sun is snew')

            const {
              data:{insertSubreddit: newSubreddit},
            } = await addSubreddit({
              variables:{
                topic: formData.subreddit,
              },
            })

            console.log('creating...',formData)
            const image=formData.postImage || ''

            const {
              data:{insertPost:newPost},
            } = await addPost({
              variables:{
                body: formData.postBody,
                image: image,
                subreddit_id: newSubreddit.id,
                title: formData.postTitle,
                username: session?.user?.name,
              },
            })

             console.log(' newPost is added',newPost)
          }else{
            console.log('using existing subreddit...')
            console.log(getSubredditListByTopic)

            const image=formData.postImage || ''

            const {
              data:{insertPost:newPost},
            }= await addPost({
              variables:{
                body: formData.postBody,
                image:image,
                subreddit_id: getSubredditListByTopic[0].id,
                title:formData.postTitle,
                username:session?.user?.name,
              },
            })

            console.log('newPost is added',newPost)
          }

          setValue('postBody','')
          setValue('postImage','')
          setValue('postTitle','')
          setValue('subreddit','')

          toast.success('new post is created',{id:notification})
      } catch (error){
        toast.error('something went wrong',{id:notification})
      }
    })
return (
    <form onSubmit={onSubmit} className='bg-white z-50 p-2 border-gray-300 rounded-md border sticky top-20 '>
        <div className='flex items-center space-x-3'>
        <Avatar />
            <input
            {...register('postTitle',{required:true})}
            disabled={!session}
            className=' flex-1 rounded-md  bg-gray-50 flex p-2 pl-5 outline-none'
            type="text" placeholder={session? subreddit ? `create a post in r/${subreddit}`: 'Type to create a post' :'Sign In to create post'  }
            />
            <PhotographIcon 
            onClick={() => setImageBoxOpen(!imageBoxOpen)} 
            className={`h-6 w-6 text-gray-300 cursor-pointer  ${imageBoxOpen && 'text-blue-300'}`}/>
            <LinkIcon className='h-6 text-gray-300'/>



        </div>
        {!!watch('postTitle')&&(
            <div className='flex flex-col py-2'>
                <div className='flex items-center px-2'>
                    <p className='min-w-[90px]'>Body:</p>
                    <input className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                    {...register('postBody')}
                    type='text'
                    placeholder='Text (optional)'
                    />
                </div>

                {!subreddit &&(
                  <div className='flex items-center px-2'>
                    <p className='min-w-[90px]'>Subreddit:</p>
                    <input className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                    {...register('subreddit',{required:true})}
                    type='text'
                    placeholder='ie.content'
                    />
                 </div>
                )}

                {imageBoxOpen&&(
                <div className='flex items-center px-2'>
                    <p className='min-w-[90px]'>Image URL:</p>
                    <input className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                    {...register('postImage')}
                    type='text'
                    placeholder='optional'
                    />
                </div>
                )}
                {Object.keys(errors).length > 0 && (
                    <div className='space y-2 p-2 text-red-500'>
                        {errors.postTitle?.type ==='required'&& (
                            <p>post is required.!</p>
                        )}
                        {errors.subreddit?.type === 'required' && (
                            <p>subreddit is required.!</p>
                        )}
                    </div>
                )}

                {!!watch('postTitle')&&(
                    <button
                    type='submit' 
                    className='W-FULL rounded-full bg-blue-400 p-2 text-white'>
                    CREATE POST
                    </button>
                )}
         </div>
         )}
    </form>
    )
  
}

export default PostBox