import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Signup = () =>{
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = () =>{
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "reachme")
        data.append("cloud_name", "abhishek8721")
        fetch("https://api.cloudinary.com/v1_1/abhishek8721/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => {
                setUrl(data.url)
            }).catch(err => {
                console.log(err)
            })
    }
    const uploadFields = ()=>{
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#e53935 red darken-1"})
            }else{
                M.toast({html: data.message,classes:"#43a047 green darken-1"})
                navigate('/login')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    const Postdata = () =>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }
    return (
        <>
        <div className="mycard ">
            <div className="card lcard input-field">

                <h3>Signup</h3>
                <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value) }/>
                <input type="text" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <div className="file-field input-field ">
                    <div className="btn #42a5f5 blue darken-1">
                        <span>Upload Pic</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button class="btn waves-effect waves-light #42a5f5 blue darken-1" type="submit" name="action" onClick={Postdata}>Signup

                </button>
                <Link to="/login"><p>Already have an account? Click here</p></Link>
            </div>
        </div>
    </>
    )
}
export default Signup