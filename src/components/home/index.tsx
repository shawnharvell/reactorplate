import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Banner from "./banner";
import Tags from "./tags";
import agent, { ArticleListResult } from "../../agent";
import * as Types from "../../reducers/types";
import ArticleList from "../article-list";

const mapStateToProps = (state: { common: { appName: string; token: string } }) => ({
  appName: state.common.appName,
  token: state.common.token,
});

export interface HomeProps {
  token?: string;
  appName: string;
}

const Home: React.FC<HomeProps> = ({ token, appName }) => {
  const [articles, setArticles] = useState<Types.Article[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<string>(token ? "feed" : "all");
  const [tag, setTag] = useState<string>("");
  const [tagList, setTagList] = useState<Types.Tag[]>([]);

  useEffect(() => {
    let isArticleLoadCanceled = false;
    (async () => {
      setLoading(true);
      let results: ArticleListResult;
      switch (tab) {
        case "feed":
          results = await agent.Articles.feed(currentPage);
          break;
        case "tag":
          results = await agent.Articles.byTag(tag, currentPage);
          break;
        default:
          results = await agent.Articles.all(currentPage);
          break;
      }
      if (!isArticleLoadCanceled && results) {
        if (!results.errors) {
          setArticles(results.articles);
          setCount(results.articlesCount);
        }
      }
      setLoading(false);
    })();

    return () => {
      isArticleLoadCanceled = true;
    };
  }, [tab, token, tag, currentPage]);

  useEffect(() => {
    let isTagLoadCanceled = false;

    (async () => {
      const results = await agent.Tags.getAll();
      if (!isTagLoadCanceled) {
        if (!results.errors) {
          setTagList(results.tags);
        }
      }
    })();

    return () => {
      isTagLoadCanceled = true;
    };
  }, []);

  const onFavoriteChange = (article: Types.Article) => {
    setArticles((previous) =>
      previous.map((art) => {
        if (art.slug === article.slug) {
          return {
            ...article,
            favorited: article.favorited,
            favoritesCount: article.favoritesCount,
          };
        }
        return art;
      })
    );
  };

  return (
    <div className="home-page">
      <Banner token={token} appName={appName} />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {!!token && (
                  <li className="nav-item">
                    <a
                      href="#"
                      className={tab === "feed" ? "nav-link active" : "nav-link"}
                      onClick={() => {
                        setTab("feed");
                        setTag("");
                      }}
                    >
                      Your Feed
                    </a>
                  </li>
                )}

                <li className="nav-item">
                  <a
                    href="#"
                    className={tab === "all" ? "nav-link active" : "nav-link"}
                    onClick={() => {
                      setTab("all");
                      setTag("");
                    }}
                  >
                    Global Feed
                  </a>
                </li>

                {!!tag && tab === "tag" && (
                  <li className="nav-item">
                    <a href="" className="nav-link active">
                      <i className="ion-pound" /> {tag}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <ArticleList
              articles={articles}
              loading={loading}
              articlesCount={count}
              currentPage={currentPage}
              onSetPage={(page?: number) => setCurrentPage(page)}
              onFavorited={onFavoriteChange}
              onUnfavorited={onFavoriteChange}
            />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <Tags
                tags={tagList}
                onClickTag={(newtag: string) => {
                  setTag(newtag);
                  setTab("tag");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Home);
