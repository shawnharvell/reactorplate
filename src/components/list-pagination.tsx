import React from "react";
import { connect } from "react-redux";

import agent, { ArticleListResult } from "../agent";
import { SET_PAGE } from "../constants/action-types";

const mapDispatchToProps = (dispatch) => ({
  onSetPage: (page, payload) => dispatch({ type: SET_PAGE, page, payload }),
});

export interface ListPaginationProps {
  articlesCount?: number;
  currentPage?: number;
  pager?: (page: number) => Promise<ArticleListResult>;
  onSetPage?: (page, payload) => void;
}

const ListPagination: React.FC<ListPaginationProps> = ({ articlesCount, pager, onSetPage, currentPage }) => {
  if (articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(articlesCount / 10); i += 1) {
    range.push(i);
  }

  const setPage = (page) => {
    if (pager) {
      onSetPage(page, pager(page));
    } else {
      onSetPage(page, agent.Articles.all(page));
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {range.map((v) => {
          const isCurrent = v === currentPage;
          const onClick = (ev) => {
            ev.preventDefault();
            setPage(v);
          };
          return (
            <li className={isCurrent ? "page-item active" : "page-item"} key={v.toString()}>
              <a className="page-link" href="" onClick={onClick} onKeyDown={onClick}>
                {v + 1}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
