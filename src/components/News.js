import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general",
    };
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: true,
        };
        document.title = `${this.props.category}-NewsMonkey`;
    }
    async updateNews() {
        this.props.setProgress(10);

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=90f49ae609f14c54a51804a8d38eb931&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(40);

        let parsedData = await data.json();
        this.props.setProgress(70);

        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updateNews();
    }

    // handlePrevClick = async () => {

    //     await this.setState({ page: this.state.page - 1 })
    //     this.updateNews();

    // // }
    // handleNextClick = async () => {
    //     await this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=90f49ae609f14c54a51804a8d38eb931&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        });
    };
    render() {
        return (
            <>
                <h2 className="text-center my-3">
                    {`NewsMonkey -Top ${this.props.category} Headlines `}{" "}
                </h2>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row my-3">
                            {this.state.articles.map((element) => {
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
                    {/* <div className="container d-flex justify-content-between"> */}
                    {/* <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button> */}

                    {/* </div> */}
                </InfiniteScroll>
            </>
        );
    }
}
