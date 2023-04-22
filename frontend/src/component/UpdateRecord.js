import React, { useEffect } from 'react'
import { useState  } from 'react';
import { useParams , Link , useNavigate } from 'react-router-dom';
import { Form , Button } from 'semantic-ui-react';
import { socket } from './AllRecords';

function UpdateRecord() {
    let [record , setRecord] = useState();
    let [name , setName] = useState();
    let [address , setAddress] = useState();
    let [email , setEmail] = useState();
    let [phone , setPhone] = useState();
    let [gender , setGender] = useState();
    let {id} = useParams();
    console.log(id);
    let navigate = useNavigate();
    function getRecord(){
        socket.emit("getrecord:id" , id);
        let getData;
        socket.on("recordfetched" , (data) => {
            setName(data.name);
            setEmail(data.email);
            setPhone(data.phone);
            setAddress(data.address);
            setGender(data.gender);

        });
        console.log(getData);
    }
    function handleUpdate(){
        if(!name || !address || !email || !phone || !gender){
            alert("Please Enter All the Fields Properly");
            return;
        }
        let updateData = {name , address , email , phone , gender};
        socket.emit('update' , {id , updateData});
        socket.on("updatesuccess" , (msg) => navigate("/"));
        socket.on("updatefailed" , (errmsg) => alert(errmsg))
    }

    useEffect(() => {
        getRecord();
    } , [])

  return (
    <div style={{ display : "flex"  , flexDirection : "column" ,  alignItems: "center" , margin: "10px" }} >
      <h1>Update Records</h1>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Address</label>
          <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Field>
        <Form.Select
          label="Gender"
          fluid
          value = {gender}
          onChange={(e , data) => setGender(data.value)}
          options={[
            { key: "m", text: "Male", value: "Male" },
            { key: "f", text: "Female", value: "Female" },
            { key: "o", text: "Others", value: "Others" }
          ]}
        />
        <Form.Field>
          <label>Phone</label>
          <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Field>
        <Button type="submit" onClick={handleUpdate}>Update</Button>
      </Form>
      <Link to='/' style={{ padding : '10px 8px' , margin : '100px' , background : 'blue' , color : 'white'}}>All Records</Link>
      </div>
  )
}

export default UpdateRecord
