import React from "react";
import { ListGroupItem } from "reactstrap";
import { formatTimeFromNow } from "../helpers";

const NewsListGroupItem = ({ news }) => {
  return (
    <ListGroupItem
      disabled={!news.url}
      tag="a"
      className="cursorPointer"
      onClick={() => window.open(news.url, "_blank")}
    >
      <div>
        <div>
          {news.title} ~ {news.author}
          <span className="commentTime">
            {formatTimeFromNow(news.created_at)}
          </span>
        </div>
        <div className="mt-1" style={{ fontSize: "smaller" }}>
          {news.num_comments} comments | {news.points} points{" "}
        </div>
      </div>
    </ListGroupItem>
  );
};

export default NewsListGroupItem;
