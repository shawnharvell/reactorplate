import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import agent from "../data/agent";
import ListErrors from "./list-errors";
import * as Types from "../data/types";

const Editor: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [tagList, setTagList] = useState<Types.Tag[]>([]);
  const [tagInput, setTagInput] = useState<Types.Tag>("");
  const [errors, setErrors] = useState<Types.Errors>(undefined);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    let isCanceled = false;
    setErrors(undefined);

    if (!slug) {
      setTitle("");
      setDescription("");
      setBody("");
      setTagInput("");
      setTagList([]);
    } else {
      setInProgress(true);
      (async () => {
        const results = await agent.Articles.get(slug);
        if (!isCanceled) {
          if (results.errors) {
            setErrors(results.errors);
          } else {
            setTitle(results.article.title);
            setDescription(results.article.description);
            setBody(results.article.body);
            setTagInput("");
            setTagList(results.article.tagList);
          }
          setInProgress(false);
        }
      })();
    }

    return () => {
      isCanceled = true;
    };
  }, [slug]);

  const watchForEnter = (ev: React.KeyboardEvent) => {
    if (ev.code === "Enter") {
      ev.preventDefault();
      const newtag = tagInput;
      setTagInput("");
      setTagList((previous) => [...previous, newtag]);
    }
  };

  const removeTagHandler = (tag: string) => () => {
    setTagList((previous) => previous.filter((t) => t !== tag));
  };

  const submitForm = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setInProgress(true);
    const article: Types.Article = {
      title,
      description,
      body,
      tagList,
    };

    const promise = slug ? agent.Articles.update({ ...article, slug }) : agent.Articles.create(article);
    const results = await Promise.resolve(promise);
    if (results.errors) {
      setErrors(results.errors);
      setInProgress(false);
    } else {
      history.push(`/article/${results.article.slug}`);
    }
  };

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
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setTitle(ev.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="What's this article about?"
                    value={description}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setDescription(ev.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={body}
                    onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setBody(ev.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter tags"
                    value={tagInput}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setTagInput(ev.target.value)}
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

export default Editor;
