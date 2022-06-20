import { useHistory, useParams } from "react-router-dom";
import { deleteBlogs } from "./graphql/mutations";
import { getBlogs } from "./graphql/queries";
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import awsExports from "./aws-exports";
import { useState, useEffect } from "react";
Amplify.configure(awsExports);

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const history = useHistory();


    async function getBlogDetails() {
      try {
        const blogData = await API.graphql(graphqlOperation(getBlogs, {id: id}))
        console.log(blogData)
        const blog = blogData.data.getBlogs
        setBlog(blog)
        setIsLoading(false)
      } catch (err) { 
        console.log('error fetching blogs: ' + err.message) 
        setError("Error: " + err.message)
      }
    }
    async function deleteBlog(id) {
      try {
        await API.graphql(graphqlOperation(deleteBlogs, {input: {id: id}}))
        history.push("/")
      } catch (err) { 
        console.log('error fetching blogs: ' + err.message) 
      }
    }

    useEffect(() => { //currently gives warning b/c of 'id' I think, ignoring for now
        getBlogDetails()
      }, [])
    
    const handleDelete = () => {
        deleteBlog(id)

    }
    return ( 

        <div className="blog-details">
            {isLoading && <div> Loading... </div>}
            {blog && 
                <article>
                    <h2> {blog.title}</h2>
                    <p>Written by: {blog.author}</p>
                    <div> {blog.body} </div>
                </article>}
            {error && <div>{error}</div> }
            <button onClick={handleDelete}>Delete Blog</button>
        </div>
     );
}
 
export default BlogDetails;