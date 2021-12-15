import "./App.css";
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table'
import { Card, Pagination } from "react-bootstrap";
import ReactPagination from "react-paginate";



function App() {
  const [posts, setPosts] = useState([]);
  const [pg, setPg] = useState([]);

  let s = 0;
  React.useEffect(() => {
    const interval = setInterval(() => {

      setPg((s) = s + 1)
      fetch(
        `https://hn.algolia.com/api/v1/search_by_date?query=tags=story&page=${s}`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.hits)
          setPosts((prevPosts) => {
            return [data.hits, ...prevPosts]
          });
        })
        .catch((error) => console.log(error));
    }, 10000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="App">
      <div>App</div>
      <div className="App">
        {
          // console.log(posts)
          posts.map((post) => {
            return post.map((ShowData,index) => {
              console.log(index)
              return <div>
                <Card key={index} style={{ width: '40rem', alignItems: "center", justifyContent: 'center' }}>
                    <Table striped bordered hover >
                      <thead>
                        <tr>
                          <th>Author</th>
                          <th>Date</th>
                          <th>Title</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{ShowData.author}</td>
                          <td>{ShowData.created_at}</td>
                          <td>{ShowData.title}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
              </div>
            })
          })
        } 
      </div>
    </div>
  );
}

export default App;
