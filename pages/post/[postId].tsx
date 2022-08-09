import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Post from '../../components/Post'
import { GET_POST_BY_POST_ID } from '../../graphql/queries'
import {SubmitHandler,useForm} from 'react-hook-form'
import { ADD_COMMEMT } from '../../graphql/mutations'
import toast from 'react-hot-toast'
import Avatar from '../../components/Avatar'
import ReactTimeago from 'react-timeago'

type FormData ={
    comment:string
}


function PostPage() {
    const router = useRouter()
    const {data:session}= useSession()
    const [addComment]= useMutation(ADD_COMMEMT,{
        refetchQueries:[GET_POST_BY_POST_ID,'getPostListByPostId']
    })

    const {data}= useQuery(GET_POST_BY_POST_ID,{
        variables:{
            post_id: router.query.postId
        },
    })
    const post :Post = data?.getPostListByPostId;

    const { handleSubmit, watch ,register,setValue, formState: { errors } } = useForm<FormData>();
    const onSubmit:SubmitHandler<FormData> = async (data) =>{
        console.log(data);
        const notification = toast.loading('posting your comment')
        await addComment({
            variables:{
                post_id: router.query.postId,
                username:session?.user?.name,
                text:data.comment,
            },
        })
        setValue('comment','')

        toast.success('comment successfully posted',{id:notification})
    };
    
  return (
    <div className='mx-auto my-7 max-w-5xl'>
        <Post post={post} />
        <div className=" border-gray-300 bg-white p-5 -mt-1 rounded-b-md border border-t-0 pl-16">
            <p className='text-sm'>Comment as <span className='text-red-500'>{session?.user?.name}</span> </p>
        
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 flex flex-col'>
                <textarea
                {...register('comment')}
                disabled={!session}
                className=" border-gray-200 h-24 outline-none disabled:bg-gray-50 p-2  rounded-md border border-t-0 pl-4" placeholder={
                    session ? 'Whats on Your Mind? ' : 'Please signin to comment'
                }></textarea>
                <button 
                disabled={!session}
                className='text-white font-semibold  p-3 rounded-full bg-red-500 disabled:bg-gray-400 '
                type='submit'>comment</button>
            </form>
        </div>

        <div className='rounded-b-md border border-t-0 -my-5 bg-white py-5 px-10  border-gray-300'>
            <hr className='py-2'/>

            {post?.comments.map((comment) =>(
                <div key={comment.id} className='space-y-5 space-x-2 items-center relative flex'>
                    <hr className='absolute top-10 h-16 border left-7 z-0'/>
                    <div className="z-50">
                        <Avatar seed={comment.username}/>
                    </div>
                    <div className="flex flex-col">
                        <p className='py-2 text-xs text-gray-400'>
                            <span className='font-semibold text-gray-600 '>{comment.username}</span>{' '}•
                            <ReactTimeago date={comment.created_at}/>
                        </p>
                        <p>{comment.text}</p>
                    </div>
                </div>
            ))}
        </div>

    </div>
  )
}

export default PostPage
