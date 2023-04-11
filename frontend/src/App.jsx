import { useEffect, useState } from 'react'
import './App.css'
import BlogPost from './components/base/BlogPost'
import PostNavigation from './components/base/PostNavigation';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

function App() {
  const [postView, setPostView] = useState(null);
  const [posts, setPosts] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BlogPost postData={postView} />
    }
  ])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_APP_API_URL);
        const data = await response.json();
        setPosts(data);
        setPostView(data[0]);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    }
    fetchPosts();
  }, []);

  function changePost(postId) {
    let post = posts.find((post) => post.id == postId);
    setPostView(post);
  }

  return (
    <div className="App">
      <div className="wrapper">
        <section className="blog">
          <h1 style={{marginTop: 0}}>Daftpy</h1>
          <RouterProvider router={router} />
        </section>
        {
          postView ? (
            <PostNavigation posts={posts} changePost={changePost} activePostId={postView.id} />
          ) : (
            <></>
          )
        }
      </div>
    </div>
  )
}

export default App
