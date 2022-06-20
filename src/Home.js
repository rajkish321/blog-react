import BlogList from "./BlogList";
import { useEffect, useState } from "react";
import { listBlogs } from "./graphql/queries";
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const Home = () => {
    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    async function fetchBlogs() {
        try {
          const blogData = await API.graphql(graphqlOperation(listBlogs))
          const blogs = blogData.data.listBlogs.items
          setBlogs(blogs)
          setIsLoading(false)
        } catch (err) { 
          console.log('error fetching blogs: ' + err.message) 
          setError(err.message)
        }
      }
    useEffect(() => {
        fetchBlogs()
      }, [])


    return ( 
        <div className="Home">
            {isLoading && <div> Loading... </div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs!"/>}
            {error && <div>{error}</div> }
        </div>
     );
}
 
export default Home;