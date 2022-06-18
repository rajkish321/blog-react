import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const abortCont = new AbortController(); //can be used to associate with a fetch, and then abort the fetch

        setTimeout(() => {
            fetch(url, {signal: abortCont.signal})
            .then(res => {
                if(!res.ok) {
                    throw Error("Couldn't fetch the resource from " + res.url)
                }
                return res.json();
            })
            .then((data) => {
                setData(data)
                setError(null)
                setIsLoading(false)
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log("fetch aborted.")
                } else {
                console.log(err.message)
                setIsLoading(false)
                setError(err.message)
                }
            })

        }, 500)

        return () => abortCont.abort();
        
        
    }, [url]); //The [url], is a dependency list to trigger each time something in this list renders (including home page)

    return [
        data,
        isLoading,
        error
    ]
}
export default useFetch