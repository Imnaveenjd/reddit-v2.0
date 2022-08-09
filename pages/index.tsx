import type { NextPage } from 'next'
import Head from 'next/head'
import PostBox from '../components/PostBox'
import Feed  from '../components/Feed'
import { useQuery } from '@apollo/client'
import { GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries'
import SubredditRow from '../components/SubredditRow'



const Home: NextPage = () => {
  const {data}= useQuery(GET_SUBREDDITS_WITH_LIMIT,{
    variables:{
      Limit: 10,
    },
  })
  const subreddits :Subreddit[] = data?.getSubredditListLimit;

  return (
    <div className="my-7 max-w-5xl mx-auto">
      <Head>
        <title>reditt v2.0</title>
        <link  rel="icon" href="https://c.tenor.com/4B4c3ny2BbAAAAAj/reddit.gif"/>
      </Head>
      <PostBox/>
      
      <div className='flex'>
        <Feed/>
        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white  lg:inline">
          <p className='p-4 mb-1 pb-3  text-md font-bold'>Top Communities</p>

          <div className="">
            {subreddits?.map((subreddit, i) => (
              <SubredditRow  
               key={subreddit.id}
               topic={subreddit.topic} 
               index={i}
               />
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
