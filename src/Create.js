import { useState} from "react";
import { useHistory } from "react-router-dom";
import { createBlogs } from "./graphql/mutations";
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault(); //stops page from refreshing

        const blog = {title, body, author}
        setIsPending(true);

        async function createBlog(blog) {
            try {
              await API.graphql(graphqlOperation(createBlogs, {input: blog}))
              history.push("/")
            
            } catch (err) { 
              console.log('error fetching blogs: ' + err.message) 
            }
          }
        createBlog(blog)
    }

    return ( 
        <div className="create">
            <h2>Enter a new blog</h2>
            <form onSubmit={handleSubmit}>
                
                <label>Blog Title</label>
                <input 
                    type="text"
                    required 
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Blog Body</label>
                <textarea
                    required
                    value = {body}
                    onChange={(e) => setBody(e.target.value)}
                />

                <label>Blog Author</label>
                <input 
                    type="text"
                    required
                    value = {author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding blog...</button>}
                
                <p>{title}</p>
                <p>{body}</p>
                <p>{author}</p>
                
            </form>
        </div>
     );
}
 
export default Create;