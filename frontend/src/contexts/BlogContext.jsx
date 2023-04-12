import React, { createContext, useState } from 'react';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [postId, setPostId] = useState(null);

  return (
    <BlogContext.Provider value={{ postId, setPostId }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;