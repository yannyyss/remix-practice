import { useLoaderData, Link } from '@remix-run/react';
import { db } from '../../services/db';

export const loader = async () => {

  const posts = await db.post.findMany()

  return { posts }
}

export default function Index() {

  const { posts } = useLoaderData()

  return (
    <div>
      <h3>Posts:</h3>

      {posts?.map(post => <div key={post.id}>
        <Link to={`/post/${post.id}`}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </Link>
      </div>)}
      
    </div>
  );
}
