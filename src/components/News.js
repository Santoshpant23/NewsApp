import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setarticles] = useState([])
    const [page, setpage] = useState(1)
    const [loading, setloading] = useState(true)
    const [totalResults, settotalResults] = useState(0)

    const updateNews = async () => {
        props.setProgress(10);

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4c815dc0776149d1aae5e5ea50179786&page=${page}&pageSize=${props.pageSize}`;

        setloading(true)

        let data = await fetch(url);
        props.setProgress(40);

        let parsedData = await data.json();
        props.setProgress(70);

        console.log(parsedData);
        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)

        props.setProgress(100);
    }
    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4c815dc0776149d1aae5e5ea50179786&page=${page + 1}&pageSize=${props.pageSize}`;
        setpage(page + 1);

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setarticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
    };



    return (
        <>
            <h2 className="text-center my-15" style={{ marginTop: '80px', }}>
                {`NewsMonkey -Top ${props.category} Headlines `}{" "}
            </h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}

            >

                <div className="container">
                    <div className="row my-3">
                        {articles.map((element) => {
                            return (
                                <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem
                                        title={element.title ? element.title : ""}
                                        description={
                                            element.description ? element.description : ""
                                        }
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

            </InfiniteScroll>
        </>
    );

}
export default News

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};
