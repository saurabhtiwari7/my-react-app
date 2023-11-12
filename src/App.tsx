import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


type resultProps = {
  email: string;
  name: {
    title: string;
  first: string;
  last: string;
  }
};
function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<resultProps[]>([]);

  useEffect(() => {
    const loadPost = async () => {
      // Till the data is fetch using API
      // the Loading page will show.
      setLoading(true);

      // Await make wait until that
      // promise settles and return its result
      const response = await axios.get("https://randomuser.me/api");

      // After fetching data stored it in posts state.

      console.log(response.data);

      console.log(response.data.results);
      setPosts(response.data.results);

      // Closed the loading page
      setLoading(false);
    };
    // Call the function
    loadPost();
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(posts));
  }, [posts]);

  function refreshPage() {
    window.location.reload();
  }

  return (
    <>

        {loading ? (
          <h4>Loading...</h4>
        ) : (
          posts.map((item) => (
            // Presently we only fetch
            // title from the API
            <>
              <h3>
                `{item.name.title} {item.name.first} {item.name.last}`{" "}
              </h3>
              <h4>{item.email}</h4>
            </>
          ))
        )}


      <button type="button" onClick={refreshPage}>
        <span>Reload</span>
      </button>
    </>
  );
}

export default App;
