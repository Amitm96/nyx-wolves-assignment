import React from 'react'
import { useState } from 'react';
import {Button , Form} from 'semantic-ui-react';
import { socket } from './AllRecords';
import { useNavigate , Link } from 'react-router-dom';


function AddRecord() {
    let [images, setImages] = useState([]);
    let [name , setName] = useState();
    let [address , setAddress] = useState();
    let [email , setEmail] = useState();
    let [phone , setPhone] = useState();
    let [gender , setGender] = useState();
    let [loading , setLoading] = useState(false);
    let navigate = useNavigate();

    function handleSubmit (){
        setLoading(true);
        console.log(name , address , email , gender , phone)
        if(!name || !address || !email || !phone || !gender){
            alert("Please Enter All the Fields Properly");
            setLoading(false);
            return;
        }

        let data = {name , address , email , phone , gender , images}
        socket.emit("addRecord" , JSON.stringify(data));
        socket.on("recordAdded" , (msg) => navigate('/'));
        socket.on("addrecordfailed" , (msg) => alert(msg));
        setLoading(false);

    }
    function uploadFile(files) {
      setLoading(true);
      if(files.length > 0){
        for(let file of files){
            if(file.type.slice(0 , 5) !== "image"){
                alert("Please Select Image Files only");
                setLoading(false);
                return;
            }
        }

        let data = new FormData();
        let dataArr = [];
        for(let file of files){
            // console.log(file);
            data.append("file" , file);
            data.append("upload_preset" , "chat_app");
            // data.append("cloud_name" , "dxiejzwsw");
            fetch("https://api.cloudinary.com/v1_1/dxiejzwsw/image/upload" , {method : "post" , body : data})
            .then((res) => res.json())
            .then((data) => {
                dataArr.push(data.url.toString());
                setLoading(false);
                alert("file successfully uploaded")
            })
            .catch((err) => {
                setLoading(false);
                alert(err.message);
            })
        }

        setImages(dataArr);
        
      }
    }

    // console.log(images);

    return (
      <div style={{ display : "flex"  , flexDirection : "column" ,  alignItems: "center" , margin: "10px" }} >
      <h1>Add Records</h1>
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
        <Form.Field>
          <label>Select Image</label>
          <input
            type="file"
            onChange={(e) => uploadFile(e.target.files)}
            multiple={true}
          />
        </Form.Field>
        <Button loading={loading} type="submit" onClick={handleSubmit}>Submit</Button>
      </Form>
      <Link to='/' style={{ padding : '10px 8px' , margin : '100px' , background : 'blue' , color : 'white'}}>All Records</Link>
      </div>
    );
}

export default AddRecord
