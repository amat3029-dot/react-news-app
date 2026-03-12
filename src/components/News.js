import React, { useState, useEffect } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  const fetchNews = async () => {
    props.setProgress(10);
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=1`;
    props.setProgress(30);
    const response = await fetch(url);
    const data = await response.json();
    props.setProgress(70);
    setArticles(data.articles || []);
    setTotalResults(data.totalResults || 0);
    setLoading(false);
    props.setProgress(100);
  };


  const fetchMoreNews = async () => {
    if (loading) return;
    const nextPage = page + 1;
    if (articles.length >= totalResults) return;
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${nextPage}`;
    const response = await fetch(url);
    const data = await response.json();
    setArticles(articles.concat(data.articles || []));
    setPage(nextPage);
    setLoading(false);
  };

  
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      fetchMoreNews();
    }
  };


  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - News`;
    fetchNews();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: "35px 0px",marginTop:'80px' }}>
        News - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      <div className="row">
        {articles.map((element, index) => (
          <div className="col-md-4" key={element.url || index}>
            <Newsitem
              title={element.title ? element.title.slice(0, 45) : "No Title"}
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
      {loading && <Spinner />}

    </div>
  );
};

News.defaultProps = {
  category: "sports",
  pageSize: 12
};

News.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number
};

export default News;