import React from 'react'

const Newsitem = () => {
  let { title, description, imageUrl, newsurl, author, publishedAt, source } = this.props;
  return (
    <div>
      <div className="card h-100">
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
        }} >
          <span className=" badge rounded-pill bg-danger">
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
        </div>
        <img src={imageUrl ? imageUrl : "https://i.blogs.es/bc8c52/truco-seleecionar-iphone/840_560.jpeg"}
          className="card-img-top" alt="news" style={{ height: "200px", objectFit: "cover" }} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">by {author ? author : "Unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
          <a href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    </div>
  )

}

export default Newsitem
