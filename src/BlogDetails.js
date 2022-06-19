import { useHistory, useParams } from "react-router-dom";
import { deleteBlogs } from "./graphql/mutations";
import { getBlogs } from "./graphql/queries";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const url = 'http://localhost:8000/blogs/' + id
    // const [blog, isLoading, error] = useFetch(url)
    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const history = useHistory();


    async function getBlogDetails() {
        try {
          const blogData = await API.graphql(graphqlOperation(getBlogs, {id: id}))
          const blog = blogData.data.listBlogs.items
          setBlogs(blog)
          setIsLoading(false)
        } catch (err) { 
          console.log('error fetching blogs: ' + err.message) 
          setError(err.message)
        }
      }

    useEffect(() => {
        getBlogDetails()
      }, [])
    
    const handleDelete = () => {
        API.graphql(graphqlOperation(deleteBlogs, {id: id}))
        history.push("/")

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