import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
const Profile = () =>{
    const [pics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           
            setPics(result.mypost)
        })

    },[])
    return (
        <>
        <div style={{display:"flex" ,alignItems:"center", justifyContent:"space-around", marginTop:"20px"}}>
            <div>
                <img src={state?state.pic:"loading"} alt="photo" style={{height:"200px", width:"200px", borderRadius:"50%"}}/>
            </div>
            <div className="pdetails">
                <h4>{state.name}</h4>
                <p>{state.email}</p>
                <div style={{display:"flex"}}>
                <p>{pics.length} posts</p>
               
                </div>
               
            </div>
        </div>
        <hr/>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            {
                pics.map(item=>{
                    return(
                        <img src={item.image} alt={item._id} style={{width:"300px", height:"230px", margin:"25px" }}/>
                    )
                   
                })
            }
            
        </div>
        </>
    )
}
export default Profile