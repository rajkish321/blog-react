import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
    const url = 'http://localhost:8000/blogs/'
    const [blogs, isLoading, error] = useFetch(url)
    return ( 
        <div className="Home">
            {isLoading && <div> Loading... </div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs!"/>}
            {error && <div>{error}</div> }
        </div>
     );
}
 
export default Home;