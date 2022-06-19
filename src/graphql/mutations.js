/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlogs = /* GraphQL */ `
  mutation CreateBlogs(
    $input: CreateBlogsInput!
    $condition: ModelBlogsConditionInput
  ) {
    createBlogs(input: $input, condition: $condition) {
      id
      title
      body
      author
      createdAt
      updatedAt
    }
  }
`;
export const updateBlogs = /* GraphQL */ `
  mutation UpdateBlogs(
    $input: UpdateBlogsInput!
    $condition: ModelBlogsConditionInput
  ) {
    updateBlogs(input: $input, condition: $condition) {
      id
      title
      body
      author
      createdAt
      updatedAt
    }
  }
`;
export const deleteBlogs = /* GraphQL */ `
  mutation DeleteBlogs(
    $input: DeleteBlogsInput!
    $condition: ModelBlogsConditionInput
  ) {
    deleteBlogs(input: $input, condition: $condition) {
      id
      title
      body
      author
      createdAt
      updatedAt
    }
  }
`;
