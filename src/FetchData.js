import { listBlogs } from "./graphql/queries";
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

export async function fetchBlogs(setBlogs) {
      const blogs = await API.graphql(graphqlOperation(listBlogs))
      console.log(blogs)
      
    //   const blogs = blogData.data.listBlogs.items
    //   setBlogs(blogs)
    return blogs
    
  }
