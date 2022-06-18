import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const url = 'http://localhost:8000/blogs/' + id
    const [blog, isLoading, error] = useFetch(url)
    const history = useHistory();
    
    const handleDelete = () => {
        fetch(url, {
            method: "DELETE"
        }).then(() => {
            history.push("/")
        })

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