import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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
  post: Post;
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
  phoneNo: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  password: Scalars['String']['input'];
  phoneNo: Scalars['String']['input'];
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
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  media: Array<Maybe<Media>>;
  status?: Maybe<PostStatus>;
  user: Users;
};

export enum PostStatus {
  Approved = 'approved',
  Pending = 'pending',
  Rejected = 'rejected'
}

export type Query = {
  __typename?: 'Query';
  getAllPosts?: Maybe<Array<Maybe<Post>>>;
  getAllUsers?: Maybe<Array<Maybe<Users>>>;
  getCommentsByPostId?: Maybe<Array<Maybe<Comment>>>;
  getNotifications?: Maybe<Array<Maybe<Notification>>>;
  getUserByPhoneNo?: Maybe<Users>;
  getUserPosts?: Maybe<Array<Maybe<Post>>>;
};


export type QueryGetCommentsByPostIdArgs = {
  postId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetNotificationsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserByPhoneNoArgs = {
  phoneNo: Scalars['Int']['input'];
};


export type QueryGetUserPostsArgs = {
  userId: Scalars['ID']['input'];
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
  phoneNo: Scalars['String']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreatePostMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  caption: Scalars['String']['input'];
  mediaUrls?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', id: string, caption: string, createdAt: string, status?: PostStatus | null, user: { __typename?: 'Users', id: string, username: string, phoneNo: string, role: string }, media: Array<{ __typename?: 'Media', id: string, url: string, type: string, compressed: boolean } | null> } | null };

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostsQuery = { __typename?: 'Query', getAllPosts?: Array<{ __typename?: 'Post', id: string, caption: string, createdAt: string, status?: PostStatus | null, user: { __typename?: 'Users', id: string, username: string, phoneNo: string, role: string, canUpload?: boolean | null }, media: Array<{ __typename?: 'Media', id: string, url: string, type: string, compressed: boolean } | null>, comments?: Array<{ __typename?: 'Comment', id: string, content: string, type: string, createdAt: string, expiresAt?: string | null } | null> | null } | null> | null };

export type GetUserPostsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserPostsQuery = { __typename?: 'Query', getUserPosts?: Array<{ __typename?: 'Post', id: string, caption: string, createdAt: string, status?: PostStatus | null, user: { __typename?: 'Users', id: string, username: string, phoneNo: string, role: string, canUpload?: boolean | null }, media: Array<{ __typename?: 'Media', id: string, url: string, type: string, compressed: boolean } | null>, comments?: Array<{ __typename?: 'Comment', id: string, content: string, type: string, createdAt: string, expiresAt?: string | null } | null> | null } | null> | null };

export type LoginUserMutationVariables = Exact<{
  phoneNo: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'Users', id: string, username: string, phoneNo: string, role: string } } | null };

export type RegisterUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  phoneNo: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser?: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'Users', id: string, username: string, phoneNo: string, role: string } } | null };


export const CreatePostDocument = gql`
    mutation CreatePost($userId: ID!, $caption: String!, $mediaUrls: [String]) {
  createPost(userId: $userId, caption: $caption, mediaUrls: $mediaUrls) {
    id
    caption
    createdAt
    status
    user {
      id
      username
      phoneNo
      role
    }
    media {
      id
      url
      type
      compressed
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      caption: // value for 'caption'
 *      mediaUrls: // value for 'mediaUrls'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const GetAllPostsDocument = gql`
    query GetAllPosts {
  getAllPosts {
    id
    caption
    createdAt
    status
    user {
      id
      username
      phoneNo
      role
      canUpload
    }
    media {
      id
      url
      type
      compressed
    }
    comments {
      id
      content
      type
      createdAt
      expiresAt
    }
  }
}
    `;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
      }
export function useGetAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export function useGetAllPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<typeof useGetAllPostsLazyQuery>;
export type GetAllPostsSuspenseQueryHookResult = ReturnType<typeof useGetAllPostsSuspenseQuery>;
export type GetAllPostsQueryResult = Apollo.QueryResult<GetAllPostsQuery, GetAllPostsQueryVariables>;
export const GetUserPostsDocument = gql`
    query GetUserPosts($userId: ID!) {
  getUserPosts(userId: $userId) {
    id
    caption
    createdAt
    status
    user {
      id
      username
      phoneNo
      role
      canUpload
    }
    media {
      id
      url
      type
      compressed
    }
    comments {
      id
      content
      type
      createdAt
      expiresAt
    }
  }
}
    `;

/**
 * __useGetUserPostsQuery__
 *
 * To run a query within a React component, call `useGetUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPostsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserPostsQuery(baseOptions: Apollo.QueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables> & ({ variables: GetUserPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, options);
      }
export function useGetUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, options);
        }
export function useGetUserPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, options);
        }
export type GetUserPostsQueryHookResult = ReturnType<typeof useGetUserPostsQuery>;
export type GetUserPostsLazyQueryHookResult = ReturnType<typeof useGetUserPostsLazyQuery>;
export type GetUserPostsSuspenseQueryHookResult = ReturnType<typeof useGetUserPostsSuspenseQuery>;
export type GetUserPostsQueryResult = Apollo.QueryResult<GetUserPostsQuery, GetUserPostsQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($phoneNo: String!, $password: String!) {
  login(phoneNo: $phoneNo, password: $password) {
    token
    user {
      id
      username
      phoneNo
      role
    }
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      phoneNo: // value for 'phoneNo'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($username: String!, $phoneNo: String!, $password: String!) {
  registerUser(username: $username, phoneNo: $phoneNo, password: $password) {
    token
    user {
      id
      username
      phoneNo
      role
    }
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      phoneNo: // value for 'phoneNo'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;