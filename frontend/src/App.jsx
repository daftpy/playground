import { useEffect, useState } from 'react'
import './App.css'
import BlogPost from './components/base/BlogPost'
import PostNavigation from './components/base/PostNavigation';

function App() {
  const [postView, setPostView] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blog_posts');
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
