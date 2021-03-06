import * as Types from '../types';

import { CurrentUserDataFragment } from './users.fragments.generated';
import * as Operations from './users.operations';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Types.Maybe<(
    { __typename?: 'CurrentUser' }
    & CurrentUserDataFragment
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
  discourseSSO?: Types.Maybe<Types.DiscourseSso>;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<Types.LoginResponse, 'jwt' | 'redirectUrl'>
    & { currentUser: (
      { __typename?: 'CurrentUser' }
      & CurrentUserDataFragment
    ) }
  ) }
);

export type LoginGoogleMutationVariables = Exact<{
  idToken: Types.Scalars['String'];
  discourseSSO?: Types.Maybe<Types.DiscourseSso>;
}>;


export type LoginGoogleMutation = (
  { __typename?: 'Mutation' }
  & { loginGoogle: (
    { __typename?: 'LoginResponse' }
    & Pick<Types.LoginResponse, 'jwt' | 'redirectUrl'>
    & { currentUser: (
      { __typename?: 'CurrentUser' }
      & CurrentUserDataFragment
    ) }
  ) }
);

export type RegisterMutationVariables = Exact<{
  payload: Types.RegisterPayload;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'CurrentUser' }
    & CurrentUserDataFragment
  ) }
);

export type RegisterGoogleMutationVariables = Exact<{
  payload: Types.RegisterGooglePayload;
}>;


export type RegisterGoogleMutation = (
  { __typename?: 'Mutation' }
  & { registerGoogle: (
    { __typename?: 'CurrentUser' }
    & CurrentUserDataFragment
  ) }
);



/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(Operations.getCurrentUser, baseOptions);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(Operations.getCurrentUser, baseOptions);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      discourseSSO: // value for 'discourseSSO'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(Operations.login, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export type LoginGoogleMutationFn = ApolloReactCommon.MutationFunction<LoginGoogleMutation, LoginGoogleMutationVariables>;

/**
 * __useLoginGoogleMutation__
 *
 * To run a mutation, you first call `useLoginGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginGoogleMutation, { data, loading, error }] = useLoginGoogleMutation({
 *   variables: {
 *      idToken: // value for 'idToken'
 *      discourseSSO: // value for 'discourseSSO'
 *   },
 * });
 */
export function useLoginGoogleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginGoogleMutation, LoginGoogleMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginGoogleMutation, LoginGoogleMutationVariables>(Operations.loginGoogle, baseOptions);
      }
export type LoginGoogleMutationHookResult = ReturnType<typeof useLoginGoogleMutation>;
export type LoginGoogleMutationResult = ApolloReactCommon.MutationResult<LoginGoogleMutation>;
export type LoginGoogleMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginGoogleMutation, LoginGoogleMutationVariables>;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(Operations.register, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export type RegisterGoogleMutationFn = ApolloReactCommon.MutationFunction<RegisterGoogleMutation, RegisterGoogleMutationVariables>;

/**
 * __useRegisterGoogleMutation__
 *
 * To run a mutation, you first call `useRegisterGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerGoogleMutation, { data, loading, error }] = useRegisterGoogleMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useRegisterGoogleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterGoogleMutation, RegisterGoogleMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterGoogleMutation, RegisterGoogleMutationVariables>(Operations.registerGoogle, baseOptions);
      }
export type RegisterGoogleMutationHookResult = ReturnType<typeof useRegisterGoogleMutation>;
export type RegisterGoogleMutationResult = ApolloReactCommon.MutationResult<RegisterGoogleMutation>;
export type RegisterGoogleMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterGoogleMutation, RegisterGoogleMutationVariables>;