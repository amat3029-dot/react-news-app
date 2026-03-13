import React from 'react'

const Newsitem = (props) => {

  const { title, description, imageUrl, newsurl, author, publishedAt, source } = props;

  return (
    <div>
      <div className="card h-100">

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
        }}>

          <span className="badge rounded-pill bg-danger">
            {source}
          </span>

        </div>

        <img
          src={imageUrl ? imageUrl : "https://via.placeholder.com/300"}
          className="card-img-top"
          alt="news"
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body">

          <h5 className="card-title">{title}</h5>

          <p className="card-text">{description}</p>

          <p className="card-text">
            <small className="text-muted">
              by {author} on {new Date(publishedAt).toGMTString()}
            </small>
          </p>

          <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
            Read More
          </a>

        </div>
      </div>
    </div>
  )
}

export default Newsitem