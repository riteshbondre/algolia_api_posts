import "./App.css";
import React, { useState } from "react";
import Table from 'react-bootstrap/Table'
import { Card,Pagination } from "react-bootstrap";

function App() {
  const [posts, setPosts] = useState([]);
  const items = [1,2,3,4,5]
  const fetch_data = async () => {
    console.log("ybl_oage1");
    await fetch(
      `https://hn.algolia.com/api/v1/search_by_date?query=tags=story&page=0`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        console.log(posts);
      });
  };

  return (
    <div className="App">
      <div>App</div>
      <div className="App">
        {Object.keys(posts).length !== 0 ? (
          <div>
            {posts?.hits.map((post,index) => {
              return (
                <div>
                <Card key={index} style={{ width: '40rem' ,alignItems:"center", justifyContent:'center'}}>
                  <Table  striped bordered hover >
                    <thead>
                      <tr>
                      <th>id</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Title</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                      <td>{index}</td>
                        <td onClick={(e) =>{console.log("event")}}>{post.author}</td>
                        <td>{post.created_at}</td>
                        <td>{post.title}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Pagination>{items}</Pagination>
                </Card>
                <Pagination>{items}</Pagination>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <button onClick={fetch_data}>Fetch</button>
    </div>
  );
}

export default App;
