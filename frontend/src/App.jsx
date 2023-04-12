import './App.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Root from './routes/Root';
import BlogView from './routes/BlogView';
import { BlogProvider } from './contexts/BlogContext';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <BlogView />
        }
      ]
    },
    {
      path: "posts/:postId",
      element: <Root />,
      children: [
        {
          index: true,
          element: <BlogView />
        }
      ]
    }
  ])

  return (
    <div className="App">
      <div className="wrapper">
        <section className="blog">
          <BlogProvider>
            <RouterProvider router={router} />
          </BlogProvider>
        </section>
      </div>
    </div>
  )
}

export default App
