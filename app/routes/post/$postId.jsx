import { useLoaderData, useParams } from "@remix-run/react"

import { db } from '../../services/db'

export const loader = async({params}) => {
    const post = await db.post.findUnique({ where: {id: params.postId}})
    return {post}
}

export default function SinglePost () {
    //const { postId } = useParams() // in case we want the number param on the url

    const { post } = useLoaderData()

    return <>
        <h3>This is the new Post:</h3>
        <h4>Post Title of {post.title}</h4>
        <p>{post.body}</p>
    </>
}