import React from 'react';

export default function BlogPost({ postData }) {
  const imgStyle = {
    borderRadius: '6%',
    margin: '0 auto',
    width: '100%',
    maxWidth: '350px',
    height: 'auto'
  }
  
  return (
    <section style={{paddingLeft: '5rem', paddingRight: '5rem'}}>
      {postData ? (
        <>
          <img key={postData.id} style={imgStyle} src={postData.image} />
          <h2>{postData.title}</h2>
          <div dangerouslySetInnerHTML={{__html: postData.content}} />
        </>
      ) : (
        <>
          <p>Loading blog posts...</p>
        </>
      )}
    </section>
  )
}