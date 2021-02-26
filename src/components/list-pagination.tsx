import React from "react";

export interface ListPaginationProps {
  articlesCount?: number;
  currentPage?: number;
  onSetPage?: (page: number) => void;
}

const ListPagination: React.FC<ListPaginationProps> = ({ articlesCount, onSetPage, currentPage }) => {
  if (articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(articlesCount / 10); i += 1) {
    range.push(i);
  }

  const setPage = (page: number) => {
    onSetPage?.(page);
  };

  return (
    <nav>
      <ul className="pagination">
        {range.map((v) => {
          const isCurrent = v === currentPage;
          const onClick = (ev: React.MouseEvent | React.KeyboardEvent) => {
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

export default ListPagination;
