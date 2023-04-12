import { Outlet, Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import PostNavigation from "../components/base/PostNavigation";
import BlogContext from './../contexts/BlogContext';
import Styles from './../styles/routes/Root.module.css';

export default function Root() {
  const [posts, setPosts] = useState([]);
  const [latestPostId, setLatestPostId] = useState(null);
  const { postId: contextPostId, setPostId } = useContext(BlogContext);

  useEffect(() => {
    /*
      Load a list of blog posts from the API server and set the
      blog context post id as well as the latest blog post id
    */
    (async () => {
      try {
        const response = await fetch(import.meta.env.VITE_APP_API_URL);
        const data = await response.json();
        setPosts(data);
        setPostId(data[0].id);
        setLatestPostId(data[0].id);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    })();
  }, []);

  return (
		<>
      <div className={Styles.wrapper}>
        <div className={Styles.blogPost}>
          {/*
            Branding link takes you back to the index "/" and sets
            the BlogContext postId to the latest post id.
          */}
          <h1 style={{marginTop: 0}}>
            <Link style={{color: 'white', fontWeight: 700}} to="/" onClick={() => setPostId(latestPostId)}>
              Daftpy
            </Link>
          </h1>

          {/*
            Children for the route. The portal into our content. Consider
            as a minimal framework or structure for the rest of the site.
          */}
          <Outlet />
        </div>
        
        {/*
          Post navigation will load when posts are received from the api
          server. The 'active' post informs the component on which link
          to highlight.      
        */}
        {
          posts && (
            <PostNavigation posts={posts} activePostId={contextPostId} />
          )
        }
      </div>
		</>
	)
}
