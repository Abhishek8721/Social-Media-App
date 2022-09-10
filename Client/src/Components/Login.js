import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";
import {UserContext} from '../App'
const Login = () => {
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const Postdata = () =>{
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    M.toast({html: data.error,classes:"#e53935 red darken-1"})
                }else{
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    M.toast({html: "Login Successfull",classes:"#43a047 green darken-1"})
                    navigate('/')
                }
        })
    }
    return (
        <>
            <div className="mycard ">
                <div className="card lcard input-field">

                    <h3>Login</h3>
                    <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="text" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button class="btn waves-effect waves-light #42a5f5 blue darken-1" type="submit" name="action" onClick={Postdata}>Login

                    </button>
                    <Link to="/signup"><p>Don't have any account? Click here</p></Link>
                </div>
            </div>
        </>
    )
}
export default Login