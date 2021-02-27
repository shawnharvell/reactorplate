import superagent from "superagent";

import * as Types from "./types";

const API_ROOT = "https://conduit.productionready.io/api";

const encode = encodeURIComponent;
const responseBody = (res: superagent.Response) => res.body;
// the api sends error validation in the body, so we treat 4xx errors as "valid"
const okStatuses = (res: superagent.Response) => res.status < 500;

let token: string = null;
const tokenPlugin = (req: superagent.SuperAgentRequest) => {
  if (token) {
    req.set("authorization", `Token ${token}`);
  }
};

export interface ArticleListResult {
  articles?: Types.Article[];
  articlesCount?: number;
  errors?: Types.Errors;
}

export interface ArticleResult {
  article?: Types.Article;
  errors?: Types.Errors;
}

export interface CommentListResult {
  comments?: Types.Comment[];
  errors?: Types.Errors;
}

export interface UserResult {
  user?: Types.User;
  errors?: Types.Errors;
}

export interface TagListResult {
  tags?: Types.Tag[];
  errors?: Types.Errors;
}

export interface ProfileResult {
  profile?: Types.Profile;
  errors?: Types.Errors;
}

export interface CommentResult {
  comment?: Types.Comment;
  errors?: Types.Errors;
}

const requests = {
  del: (url: string) => superagent.del(`${API_ROOT}${url}`).ok(okStatuses).use(tokenPlugin).then(responseBody),
  get: (url: string) => superagent.get(`${API_ROOT}${url}`).ok(okStatuses).use(tokenPlugin).then(responseBody),
  put: (url: string, body: string | Record<string, unknown>) =>
    superagent.put(`${API_ROOT}${url}`).ok(okStatuses).send(body).use(tokenPlugin).then(responseBody),
  post: (url: string, body: string | Record<string, unknown>) =>
    superagent.post(`${API_ROOT}${url}`).ok(okStatuses).send(body).use(tokenPlugin).then(responseBody),
};

const Auth = {
  current: (): Promise<UserResult> => requests.get("/user"),
  login: (email: string, password: string): Promise<UserResult> =>
    requests.post("/users/login", { user: { email, password } }),
  register: (username: string, email: string, password: string): Promise<UserResult> =>
    requests.post("/users", { user: { username, email, password } }),
  save: (user: Types.User): Promise<UserResult> => requests.put("/user", { user }),
};

const Tags = {
  getAll: (): Promise<TagListResult> => requests.get("/tags"),
};

const limit = (count: number, p: number) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = (article: Types.Article) => ({ ...article, slug: "" });
const Articles = {
  all: (page?: number): Promise<ArticleListResult> => requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author: string, page?: number): Promise<ArticleListResult> =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag: Types.Tag, page?: number): Promise<ArticleListResult> =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: (slug: Types.Slug): Promise<ArticleResult> => requests.del(`/articles/${slug}`),
  favorite: (slug: Types.Slug): Promise<ArticleResult> => requests.post(`/articles/${slug}/favorite`, {}),
  favoritedBy: (author: string, page?: number): Promise<ArticleListResult> =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: (page?: number): Promise<ArticleListResult> => requests.get(`/articles/feed?${limit(10, page)}`),
  get: (slug: Types.Slug): Promise<ArticleResult> => requests.get(`/articles/${slug}`),
  unfavorite: (slug: Types.Slug): Promise<ArticleResult> => requests.del(`/articles/${slug}/favorite`),
  update: (article: Types.Article): Promise<ArticleResult> =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: (article: Types.Article): Promise<ArticleResult> => requests.post("/articles", { article }),
};

const Comments = {
  create: (slug: Types.Slug, comment: Types.Comment): Promise<CommentResult> =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug: Types.Slug, commentId: number): Promise<CommentResult> =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: (slug: Types.Slug): Promise<CommentListResult> => requests.get(`/articles/${slug}/comments`),
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
