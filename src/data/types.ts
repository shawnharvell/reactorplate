export interface Article {
  author?: Profile;
  createdAt?: number;
  updatedAt?: number;
  slug?: Slug;
  body?: string;
  title?: string;
  description?: string;
  tagList?: Tag[];
  favorited?: boolean;
  favoritesCount?: number;
}

export interface Comment {
  id?: number;
  body?: string;
  author?: Profile;
  createdAt?: number;
  updatedAt?: number;
}

export interface User {
  username?: string;
  email?: string;
  token?: string;
  image?: string;
  bio?: string;
  password?: string;
}

export interface Profile {
  username?: string;
  bio?: string;
  image?: string;
  following?: boolean;
}

export type Slug = string;
export type Tag = string;
export type Errors = Record<string, string>;
