import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { Card , Icon , Image , Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
var socket = socketIOClient('http://localhost:5000/');



function AllRecords() {
  
  let [records , setRecords] = useState([]);

  function getRecords(){
    socket.emit("allrecords");
    socket.on("records" , (data) => setRecords(data));
    socket.on("fetchingfail" , (err) => alert(err));
  }

  function itemDelete(id){
    socket.emit("delete" , id);
  }

  useEffect(() => {
    getRecords();
  }, [records])
  
  return (
    <>
    <h2 style={{margin : '5px' , textAlign : 'center'}}>Record List</h2>
    <div style={{margin : '20px' , display : 'flex' , flexWrap:'wrap' , width : '98%'  , justifyContent: 'space-evenly' , alignItems : 'flex-start' }}>
      {records.map((record) => (
          <Card key = {record._id} style={{margin : "10px"}}>
          {record.images.length > 0 ? (
          <Image.Group size='small'>
          {record.images.map((image) => (
            <Image src = {image} />
          ))}
          </Image.Group>
            ) : (<Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />)}
          
          <Card.Content>
            <Card.Header>{record.name}</Card.Header>
            <Card.Meta>
              <span className='date'>{record.phone}</span>
            </Card.Meta>
            <Card.Description>
              {record.address}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='envelope' />
              {record.email}
            </a>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/update/${record._id}`}>
            <Icon name='pencil alternate' />
              update
            </Link> 
          </Card.Content>
          <Card.Content extra>
            <a onClick={(e) => itemDelete(record._id)}>
              <Icon name='trash alternate' />
              delete
            </a>
          </Card.Content>
        </Card>
      ))}
      
    </div>
    <Link to='/addrecord' style={{ padding : '10px 8px' , margin : '100px' , background : 'blue' , color : 'white'}}>Add Record</Link>
    </>
  )
}

export {AllRecords , socket}
