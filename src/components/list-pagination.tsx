import React from "react";
import { connect } from "react-redux";

import agent from "../agent";
import { SET_PAGE } from "../constants/action-types";

const mapDispatchToProps = (dispatch) => ({
  onSetPage: (page, payload) => dispatch({ type: SET_PAGE, page, payload }),
});

const ListPagination = (props) => {
  if (props.articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); i += 1) {
    range.push(i);
  }

  const setPage = (page) => {
    if (props.pager) {
      props.onSetPage(page, props.pager(page));
    } else {
      props.onSetPage(page, agent.Articles.all(page));
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {range.map((v) => {
          const isCurrent = v === props.currentPage;
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
