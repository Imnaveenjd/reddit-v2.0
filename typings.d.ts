type Comments = {
    created_at:string
    id:number
    post_id:number
    text:string
    username:string
}

type Subreddit = {
    topic:string
    id:number
    created_at:string
}

type Vote = {
    created_at:string
    post_id:number
    id:number
    upvote:boolean
    username:string
}

type Post = {
    body: string
    created_at:string
    id: number
    image: string
    subreddit_id: number
    title: string
    username: string
    votes:Vote[]
    comments:Comments[]
    subreddit: Subreddit[]
}