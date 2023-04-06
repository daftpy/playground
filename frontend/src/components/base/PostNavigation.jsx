import Styles from '../../styles/components/base/PostNavigation.module.css'

export default function PostNavigation({ posts, changePost }) {

  const postLinks = posts.map(post => (
    <a key={post.id} onClick={() => changePost(post.id)}><li>{post.title}</li></a>
  ))

  return (
    <nav className={Styles.navWrapper}>
      <h4>Blog Posts</h4>
      <ul className={Styles.navigation}>
        {postLinks}
      </ul>
    </nav>
  )
}
