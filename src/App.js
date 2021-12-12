import "./App.css";
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table'
import { Card, Pagination } from "react-bootstrap";
import ReactPagination from "react-paginate";



function App() {
  const [posts, setPosts] = useState([]);
  const items = [1, 2, 3, 4, 5, 6]
  var a = []
  let myAll = []
  // let setData=[]
  React.useEffect(() => {
    console.log("ybl_oage1");
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?query=tags=story&page=0`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, 1)

  const AddToLocal=()=>{
    localStorage.setItem("all", JSON.stringify(posts))
    // localStorage.setItem("a", JSON.stringify(a))
  }
  
  localStorage.setItem("a", JSON.stringify(a))

  const AddPage=()=>{
    
    
    a = [JSON.parse(localStorage.getItem("all"))]
    
    a.push(posts)
    localStorage.setItem("a", JSON.stringify(a))
    console.log(a)
  }
  



  const handleChange = (data) => {
    console.log("changed page", data.selected)
  }

  return (
    <div className="App">
      <div>App</div>
      <div className="App">
        {Object.keys(posts).length !== 0 ? (
          <div>
            {posts?.hits.map((post, index) => {
              return (
                <div>
                  <Card key={index} style={{ width: '40rem', alignItems: "center", justifyContent: 'center' }}>
                    <Table striped bordered hover >
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
                          <td onClick={(e) => { console.log("event") }}>{post.author}</td>
                          <td>{post.created_at}</td>
                          <td>{post.title}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </div>

              );
            })}
            <Pagination onClick={handleChange}>
              <Pagination.Prev />
              {items.map((items, index) => {
                return (
                  <div key={index}>
                    <Pagination.Item>{items}</Pagination.Item>
                  </div>
                )
              })

              }


              <Pagination.Next />
            </Pagination>
            {/* <ReactPagination pageRangeDisplayed={5} pageCount={items} previousLabel={'Next'} previousLabel={'Previous'} /> */}

          </div>

        ) : null}
      </div>
      <button onClick={AddToLocal}>add to local </button>
      <button onClick={AddPage}>add</button>
    </div>
  );
}

export default App;
