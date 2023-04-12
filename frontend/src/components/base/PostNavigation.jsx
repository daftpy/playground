import Styles from "../../styles/components/base/PostNavigation.module.css";
import { Link } from "react-router-dom";

export default function PostNavigation({ posts, activePostId }) {
  const postLinks = posts.map((post) => (
    /*
      Loop through the posts, create links with the post id's and
      make sure the link with the same post id as the active post
      id is given the style 'link-active'
    */
    <li
      key={post.id}
      className={`${Styles.linkWrapper} ${
        activePostId === post.id ? Styles["link-active"] : ""
      }`}
    >
      <Link to={`/posts/${post.id}`} className={Styles.link}>
        {post.title}
      </Link>
    </li>
  ));

  return (
    <nav className={Styles.navWrapper}>
      <h4>Blog Posts</h4>
      <ul className={Styles.navigation}>{postLinks}</ul>
    </nav>
  );
}
