import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
const Home = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)

    useEffect(() => {
        fetch("/allpost", {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
               
                setData(result.posts)
            })
    }, [])
    const likePost = (id) => {
        fetch("/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }
    const unlikePost = (id) => {
        fetch("/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }
    const makeComment = (text, postId) => {
        fetch("/comment", {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }
    const deletePost = (postId) =>{
        fetch(`/deletepost/${postId}`,{
            method:"delete",
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
        const newData = data.filter(item=>{
            return item._id !==result._id
        })
        setData(newData)
        })
    }
    return (
        <>

            <div className="home">
                {
                    data.map(item => {
                        return (
                            <div className="card homecard">
                                <h4>{item.postedBy.name}{item.postedBy._id==state._id
                                && <i className="material-icons" style={{float:"right"}}
                                onClick={()=>deletePost(item._id)}
                                >delete</i>
                                }</h4>
                                <div className="card-image">
                                    <img src={item.image} alt="photo" />
                                </div>
                                <div className="card-content input-field">
                                    <i className="material-icons" style={{ color: "red" }}>favorite</i>
                                    {
                                        item.likes.includes(state._id)
                                            ? <i className="material-icons" onClick={() => { unlikePost(item._id) }}>thumb_down</i>
                                            : <i className="material-icons" onClick={() => { likePost(item._id) }}>thumb_up</i>
                                    }


                                    <h6>{item.likes.length} likes</h6>
                                    <h6>{item.title}</h6>
                                    <p>{item.body}</p>
                                    {
                                        item.comments.map(record => {
                                            return (
                                                <h6 key={record._id}><span style={{ fontWeight: "500" }}>{record.postedBy.name}</span> {record.text}</h6>
                                            )
                                        })
                                    }
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        makeComment(e.target[0].value, item._id)
                                    }}>

                                        <input type="text" placeholder="add a comment" />
                                    </form>
                                </div>
                            </div>
                        )

                    })
                }

            </div>
        </>
    )
}
export default Home