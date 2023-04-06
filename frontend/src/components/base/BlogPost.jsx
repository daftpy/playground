import React from 'react';

export default function BlogPost({ postData }) {
  const imgStyle = {
    borderRadius: '6%'
  }
  
  return (
    <section style={{paddingLeft: '5rem', paddingRight: '5rem'}}>
      <img key={postData.id} style={imgStyle} src={postData.image} />
      <h2>{postData.title}</h2>
      <div dangerouslySetInnerHTML={{__html: postData.content}} />
    </section>
  )
}