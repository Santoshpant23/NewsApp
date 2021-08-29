import React, { Component } from "react";

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } =
            this.props;
        return (
            <div>
                <div className="card">
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "absolute",
                        right: "0"
                    }}>

                        <span className="    badge rounded-pill bg-danger">{source}</span>
                    </div>
                    <img
                        src={
                            !imageUrl
                                ? "https://www.cnet.com/a/img/FjAUu7etG9736ssg2FZqfIA5ZWE=/1200x630/left/top/2021/08/20/436c4c30-dd8d-4a6a-b7d8-734a1171698b/tesla-ai-day-00000.jpg"
                                : imageUrl
                        }
                        className="card-img-top"
                        alt="..."
                    />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">
                            <small className="text-muted">
                                {" "}
                                By {!author ? "Unknown" : author} on{" "}
                                {new Date(date).toGMTString()}
                            </small>
                        </p>
                        <a
                            href={newsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-primary"
                        >
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
export default NewsItem;
