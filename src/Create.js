import { useState} from "react";
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault(); //stops page from refreshing

        const blog = {title, body, author}
        setIsPending(true);

        //post request to json server:
        const url = 'http://localhost:8000/blogs/'
        fetch(url, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            setIsPending(false);
            console.log("New blog added!")
            // history.go(-1)
            history.push("/")
        })

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
                <select
                    value = {author}
                    onChange={(e) => setAuthor(e.target.value)}
                    >
                    <option value="Mario">Mario</option>
                    <option value="Yoshi">Yoshi</option>
                </select>
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