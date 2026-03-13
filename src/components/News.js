import React, { useState, useEffect } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateNews = async () => {

    props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;

    setLoading(true);

    props.setProgress(30);

    const response = await fetch(url);
    const data = await response.json();

    props.setProgress(70);

    setArticles(data.articles || []);
    setTotalResults(data.totalResults || 0);

    setLoading(false);

    props.setProgress(100);
  };

  useEffect(() => {

    document.title = `${capitalizeFirstLetter(props.category)} - News`;

    updateNews();

  }, []);



  const fetchMoreData = async () => {

    const nextPage = page + 1;

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${nextPage}`;

    const response = await fetch(url);
    const data = await response.json();

    setArticles(articles.concat(data.articles || []));
    setPage(nextPage);
  };


  return (

    <div className="container my-3">

      <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "80px" }}>
        News - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >

        <div className="row">

          {articles.map((element, index) => (

            <div className="col-md-4" key={element.url || index}>

              <Newsitem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                imageUrl={element.urlToImage}
                newsurl={element.url}
                author={element.author || "Unknown"}
                publishedAt={element.publishedAt}
                source={element.source ? element.source.name : "Unknown"}
              />

            </div>

          ))}

        </div>

      </InfiniteScroll>

    </div>
  );
};

News.defaultProps = {
  category: "general",
  pageSize: 12
};

News.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number
};

export default News;