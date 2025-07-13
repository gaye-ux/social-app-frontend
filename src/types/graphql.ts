/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  user: Users;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
  user: Users;
};

export type Media = {
  __typename?: 'Media';
  compressed: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment?: Maybe<Comment>;
  approveUploadRequest?: Maybe<UploadRequest>;
  createPost?: Maybe<Post>;
  login?: Maybe<AuthResponse>;
  registerUser?: Maybe<AuthResponse>;
  requestUploadAccess?: Maybe<UploadRequest>;
};


export type MutationAddCommentArgs = {
  content: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
  type: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationApproveUploadRequestArgs = {
  requestId: Scalars['ID']['input'];
};


export type MutationCreatePostArgs = {
  caption: Scalars['String']['input'];
  mediaUrls?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  phoneNo: Scalars['Int']['input'];
};


export type MutationRegisterUserArgs = {
  password: Scalars['String']['input'];
  phoneNo: Scalars['Int']['input'];
  username: Scalars['String']['input'];
};


export type MutationRequestUploadAccessArgs = {
  userId: Scalars['ID']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  seen: Scalars['Boolean']['output'];
  user: Users;
};

export type Post = {
  __typename?: 'Post';
  caption: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  media: Array<Maybe<Media>>;
  user: Users;
};

export type Query = {
  __typename?: 'Query';
  getAllPosts?: Maybe<Array<Maybe<Post>>>;
  getAllUsers?: Maybe<Array<Maybe<Users>>>;
  getNotifications?: Maybe<Array<Maybe<Notification>>>;
  getUserByPhoneNo?: Maybe<Users>;
};


export type QueryGetNotificationsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserByPhoneNoArgs = {
  phoneNo: Scalars['Int']['input'];
};

export type UploadRequest = {
  __typename?: 'UploadRequest';
  id: Scalars['ID']['output'];
  requestedAt: Scalars['String']['output'];
  status: Scalars['String']['output'];
  user: Users;
};

export type Users = {
  __typename?: 'Users';
  canUpload?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  phoneNo: Scalars['Int']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostsQuery = { __typename?: 'Query', getAllPosts?: Array<{ __typename?: 'Post', id: string, caption: string, createdAt: string, media: Array<{ __typename?: 'Media', id: string, url: string, type: string, compressed: boolean } | null> } | null> | null };


export const GetAllPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"compressed"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllPostsQuery, GetAllPostsQueryVariables>;