import "./App.css";
import React, { useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  const fetch_data = async () => {
    console.log("clicked");
    await fetch(
      `https://hn.algolia.com/api/v1/search_by_date?query=tags=story&page=0`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        console.log(posts);
      })
      
  };

  return (
    <div className="App">
      <div>App</div>
      <div>
        {Object.keys(posts).length !== 0 ? (
          <div>
           
            {posts?.hits.map((post) => {
              return (<div>
                <div>author:{post.author}</div>
                <div>date:{post.created_at}</div>
                <div>Title{post.title}</div>
              </div>);
            })}
          </div>
        ) : null}
      </div>
      <button onClick={fetch_data}>Fetch</button>
    </div>
  );
}

export default App;
