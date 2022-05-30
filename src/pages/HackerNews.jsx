import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Input,
  InputGroupText,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "reactstrap";
import NewsListGroupItem from "../components/NewsListGroupItem";
import { showToast } from "../helpers";
import { getAllNews } from "../http/http-calls";

let searchTimer;

const HackerNews = () => {
  const [newsDatas, setNewsDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [params, setParams] = useState({
    query: "",
    page: 0,
  });

  const _getAllNews = async (params = {}) => {
    setLoading(true);

    getAllNews(params)
      .then((res) => {
        setNewsDatas((prev) =>
          res?.data?.hits?.length
            ? params.page
              ? prev.concat(res.data.hits)
              : res.data.hits
            : []
        );
        setHasMore(res.data.nbPages - 1 > params.page);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error>>", error);
        setLoading(false);
        showToast(
          error?.reason?.length || error?.message?.length
            ? error.reason || error.message
            : "Server error. Try again after sometime.",
          "error"
        );
      });
  };

  const _searchNews = (query) => {
    clearTimeout(searchTimer);

    const newParams = { ...params };
    newParams.query = query;
    newParams.page = 0;
    setParams(newParams);

    searchTimer = setTimeout(() => _getAllNews(newParams), 1000);
  };

  const observer = useRef();
  const lastNewsElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const newParams = { ...params };
          newParams.page += 1;
          setParams(newParams);
          _getAllNews(newParams);
        }
      });
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, hasMore]
  );

  useEffect(() => {
    _getAllNews(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="content">
      <div>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search stories by title, url or author"
            value={params.query}
            onChange={(e) => _searchNews(e.target.value)}
          />
          <InputGroupText>
            {params.query ? (
              loading ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                <i
                  className="fa fa-times cursorPointer"
                  onClick={() => _searchNews("")}
                />
              )
            ) : (
              <i className="fa fa-search" />
            )}
          </InputGroupText>
        </InputGroup>
      </div>

      <div className="my-4">
        <ListGroup>
          {newsDatas.length ? (
            <>
              {newsDatas.map((news, index) =>
                newsDatas.length === index + 1 ? (
                  <div ref={lastNewsElementRef} key={news.objectID}>
                    {<NewsListGroupItem news={news} />}
                  </div>
                ) : (
                  <NewsListGroupItem key={news.objectID} news={news} />
                )
              )}

              <ListGroupItem className="text-center p-3">
                {loading ? <Spinner /> : null}
              </ListGroupItem>
            </>
          ) : (
            <ListGroupItem className="text-center p-3">
              {loading ? <Spinner /> : "There is no data to display"}
            </ListGroupItem>
          )}
        </ListGroup>
      </div>
    </div>
  );
};

export default HackerNews;
