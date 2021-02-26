import superagent from "superagent";

import * as Types from "./reducers/types";

const API_ROOT = "https://conduit.productionready.io/api";

const encode = encodeURIComponent;
const responseBody = (res) => res.body;

let token: string = null;
const tokenPlugin = (req) => {
  if (token) {
    req.set("authorization", `Token ${token}`);
  }
};

export interface ArticleListResult {
  articles?: Types.Article[];
  articlesCount?: number;
}

export interface ArticleResult {
  article: Types.Article;
}

export interface CommentListResult {
  comments: Types.Comment[];
}

export interface UserResult {
  user: Types.User;
}

export interface TagListResult {
  tags: Types.Tag[];
}

export interface ProfileResult {
  profile: Types.Profile;
}

export interface CommentResult {
  comment: Types.Comment;
}

const requests = {
  del: (url: string) => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url: string) => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url: string, body: string | Record<string, unknown>) =>
    superagent.put(`${API_ROOT}${url}`).send(body).use(tokenPlugin).then(responseBody),
  post: (url: string, body: string | Record<string, unknown>) =>
    superagent.post(`${API_ROOT}${url}`).send(body).use(tokenPlugin).then(responseBody),
};

const Auth = {
  current: (): Promise<UserResult> => requests.get("/user"),
  login: (email: string, password: string): Promise<UserResult> =>
    requests.post("/users/login", { user: { email, password } }),
  register: (username: string, email: string, password: string): Promise<UserResult> =>
    requests.post("/users", { user: { username, email, password } }),
  save: (user): Promise<UserResult> => requests.put("/user", { user }),
};

const Tags = {
  getAll: (): Promise<TagListResult> => requests.get("/tags"),
};

const limit = (count: number, p: number) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = (article: Types.Article) => ({ ...article, slug: undefined });
const Articles = {
  all: (page?: number): Promise<ArticleListResult> => requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page?): Promise<ArticleListResult> =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page?): Promise<ArticleListResult> => requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: (slug: Types.Slug): Promise<ArticleResult> => requests.del(`/articles/${slug}`),
  favorite: (slug: Types.Slug): Promise<ArticleResult> => requests.post(`/articles/${slug}/favorite`, {}),
  favoritedBy: (author, page?): Promise<ArticleListResult> =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: (): Promise<ArticleListResult> => requests.get("/articles/feed?limit=10&offset=0"),
  get: (slug): Promise<ArticleResult> => requests.get(`/articles/${slug}`),
  unfavorite: (slug: Types.Slug): Promise<ArticleResult> => requests.del(`/articles/${slug}/favorite`),
  update: (article: Types.Article): Promise<ArticleResult> =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: (article: Types.Article): Promise<ArticleResult> => requests.post("/articles", { article }),
};

const Comments = {
  create: (slug, comment): Promise<CommentResult> => requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId): Promise<CommentResult> => requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: (slug): Promise<CommentListResult> => requests.get(`/articles/${slug}/comments`),
};

const Profile = {
  follow: (username: string): Promise<ProfileResult> => requests.post(`/profiles/${username}/follow`, {}),
  get: (username: string): Promise<ProfileResult> => requests.get(`/profiles/${username}`),
  unfollow: (username: string): Promise<ProfileResult> => requests.del(`/profiles/${username}/follow`),
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  setToken: (_token: string): void => {
    token = _token;
  },
};
