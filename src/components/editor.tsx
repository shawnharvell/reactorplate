import React, { useEffect } from "react";
import { connect } from "react-redux";

import agent from "../agent";
import ListErrors from "./list-errors";
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR,
} from "../constants/action-types";

const mapStateToProps = (state) => ({
  ...state.editor,
});

const mapDispatchToProps = (dispatch) => ({
  onAddTag: () => dispatch({ type: ADD_TAG }),
  onLoad: (payload) => dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: (tag) => dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: (payload) => dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: () => dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) => dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
});

const Editor = ({
  title,
  description,
  body,
  tagList,
  tagInput,
  match,
  errors,
  inProgress,
  onLoad,
  onUnload,
  onUpdateField,
  onAddTag,
  onRemoveTag,
  onSubmit,
  articleSlug: slug,
}) => {
  const updateFieldEvent = (key) => (ev) => onUpdateField(key, ev.target.value);
  const changeTitle = updateFieldEvent("title");
  const changeDescription = updateFieldEvent("description");
  const changeBody = updateFieldEvent("body");
  const changeTagInput = updateFieldEvent("tagInput");

  const watchForEnter = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      onAddTag();
    }
  };

  const removeTagHandler = (tag) => () => {
    onRemoveTag(tag);
  };

  const submitForm = (ev) => {
    ev.preventDefault();
    const article = {
      title,
      description,
      body,
      tagList,
    };

    // todo unclear intent here so preserving original code for ref incase I guess wrong
    // const slug = { slug: this.props.articleSlug };
    // const promise = this.props.articleSlug
    //   ? agent.Articles.update(Object.assign(article, slug))
    //   : agent.Articles.create(article);

    const promise = slug ? agent.Articles.update(Object.assign(article, slug)) : agent.Articles.create(article);

    onSubmit(promise);
  };

  useEffect(() => {
    if (match.params.slug) {
      onUnload();
      onLoad(agent.Articles.get(match.params.slug));
    } else {
      onLoad(null);
    }
  }, [match.params.slug]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ListErrors errors={errors} />
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Article Title"
                    value={title}
                    onChange={changeTitle}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="What's this article about?"
                    value={description}
                    onChange={changeDescription}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={body}
                    onChange={changeBody}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter tags"
                    value={tagInput}
                    onChange={changeTagInput}
                    onKeyUp={watchForEnter}
                  />

                  <div className="tag-list">
                    {(tagList || []).map((tag) => (
                      <span className="tag-default tag-pill" key={tag}>
                        <i
                          className="ion-close-round"
                          role="button"
                          aria-label={tag}
                          tabIndex={0}
                          onClick={() => removeTagHandler(tag)}
                          onKeyDown={() => removeTagHandler(tag)}
                        />
                        {tag}
                      </span>
                    ))}
                  </div>
                </fieldset>

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={inProgress}
                  onClick={submitForm}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
