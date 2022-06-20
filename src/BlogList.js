import { Link } from "react-router-dom";

const BlogList = (props) => {
    const blogs = props.blogs
    const pageTitle = props.title

    return (         
    <div className="blog-list">
    <h1>{pageTitle}</h1> 
    {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>  {/* need to use backticks (``) for varibles in js (also needs curly braces to enable js - {} ) */}
                <h2>Title: {blog.title}</h2>
                <p>Author: {blog.author}</p>
            </Link>
        </div>
    ))}
</div> ); 
}
 
export default BlogList;