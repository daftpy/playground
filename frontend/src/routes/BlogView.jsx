import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import React, { useContext } from "react";
import BlogContext from "./../contexts/BlogContext";
import Styles from "../styles/routes/BlogView.module.css";

export default function BlogView() {
  const imgStyle = {
    borderRadius: "6%",
    margin: "0 auto",
    width: "100%",
    maxWidth: "350px",
    height: "auto",
  };

  const { postId: contextPostId, setPostId } = useContext(BlogContext);

  const [postView, setPostView] = useState(null);
  const location = useLocation();
  const { postId: routePostId } = useParams();

  useEffect(() => {
    /*
      The API is only hit when either routePostId or contextPostId is 
      available. Helping prevent bad http calls.
    */
    if (contextPostId || routePostId) {
      (async () => {
        try {
          let id = routePostId ? parseInt(routePostId) : contextPostId;
          let url = import.meta.env.VITE_APP_API_URL;
          const response = await fetch(`${url}/${id}`);
          const data = await response.json();
          setPostView(data);
          setPostId(id);
        } catch (error) {
          console.error("Error fetching blog post:", error);
        }
      })();
    }
  }, [routePostId, location.pathname, contextPostId]);

  return (
    <section style={{ paddingLeft: "5rem", paddingRight: "5rem" }}>
      {postView && (
        <div className={Styles.wrapper}>
          <main className={Styles.blog}>
            <img key={postView.id} style={imgStyle} src={postView.image} />
            <h2>{postView.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: postView.content }} />
          </main>
        </div>
      )}
    </section>
  );
}
