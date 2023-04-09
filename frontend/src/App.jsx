import { useEffect, useState } from 'react'
import './App.css'
import BlogPost from './components/base/BlogPost'
import PostNavigation from './components/base/PostNavigation';

function App() {
  const [postView, setPostView] = useState(null);
  const [posts, setPosts] = useState([]);
  
  var fetchUrl;
  if (import.meta.env.MODE == 'production') {
    fetchUrl = 'http://example.com/api/blog_posts';
  } else {
    console.log(import.meta.env.VITE_APP_API_URL);
    fetchUrl = import.meta.env.VITE_APP_API_URL;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(fetchUrl);
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
    setPostView(posts.find((post) => post.id == postId));
  }

  return (
    <div className="App">
      <div className="wrapper">
        <section className="blog">
          <h1 style={{marginTop: 0}}>Daftpy</h1>
          { postView ? (<BlogPost postData={postView} />) : <p>Loading blog posts</p>}
        </section>
        <PostNavigation posts={posts} changePost={changePost} />
      </div>
    </div>
  )
}

export default App
