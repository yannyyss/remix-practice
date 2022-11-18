import { Link } from '@remix-run/react';

export default function Index() {

  return (
    <div>
      <h4>Welcome to Remix</h4>
      
      <nav>
        <ul>
          <li>
            <Link to='/about'>About Page</Link>
          </li>
          <li>
            <Link to='/post/create'>Create new post</Link>
          </li>
          <li>
            <Link to='/post'>All Posts</Link>
          </li>
        </ul>
      </nav>

    </div>
  );
}
