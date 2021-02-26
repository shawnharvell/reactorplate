import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CommentInput from "./comment-input";
import CommentList from "./comment-list";
import agent from "../../agent";
import * as Types from "../../reducers/types";

export interface CommentContainerProps {
  currentUser?: Types.User;
  slug?: Types.Slug;
}

const CommentContainer: React.FC<CommentContainerProps> = ({ currentUser, slug }) => {
  const [comments, setComments] = useState<Types.Comment[]>([]);

  useEffect(() => {
    let isCanceled = false;

    if (slug) {
      setComments([]);

      (async () => {
        const results = await agent.Comments.forArticle(slug);
        if (!isCanceled) {
          if (!results.errors) {
            setComments(results.comments);
          }
        }
      })();
    }

    return () => {
      isCanceled = true;
    };
  }, [slug]);

  const onCommentSaved = (comment: Types.Comment) => {
    if (comment) {
      setComments((previous) => [comment, ...previous]);
    }
  };

  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      {!currentUser && (
        <p>
          <Link to="/login">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="/register">sign up</Link>
          &nbsp;to add comments on this article.
        </p>
      )}

      {!!currentUser && (
        <div>
          <CommentInput slug={slug} currentUser={currentUser} onCommentSaved={onCommentSaved} />
        </div>
      )}

      <CommentList comments={comments} slug={slug} currentUser={currentUser} />
    </div>
  );
};

export default CommentContainer;
