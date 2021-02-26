import React from "react";

import * as Types from "../../reducers/types";

export interface TagsProps {
  tags?: Types.Tag[];
  onClickTag?: (tag: string) => void;
}

const Tags: React.FC<TagsProps> = ({ tags, onClickTag }) => {
  if (tags) {
    return (
      <div className="tag-list">
        {tags.map((tag) => {
          const handleClick = (ev: React.MouseEvent) => {
            ev.preventDefault();
            onClickTag?.(tag);
          };

          return (
            <a href="#" className="tag-default tag-pill" key={tag} onClick={handleClick}>
              {tag}
            </a>
          );
        })}
      </div>
    );
  }
  return <div>Loading Tags...</div>;
};

export default Tags;
