import Styles from '../../styles/components/base/PostNavigation.module.css'

export default function PostNavigation({ posts, changePost, activePostId }) {

  const postLinks = posts.map(post => (
    <li
      key={post.id}
      onClick={() => changePost(post.id)}
      className={`${Styles.link} ${activePostId === post.id ? Styles['link-active'] : ''}`}
    >
      <a style={{
        color: 'white',
      }}>{post.title}</a>
    </li>
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
