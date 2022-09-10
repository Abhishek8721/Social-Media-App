import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";
const Createpost = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    useEffect(() => {
        if (url) {
            fetch("/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                    } else {
                        M.toast({ html: "Created Post Sucessfully", classes: "#43a047 green darken-1" })
                        navigate('/')
                    }

                })
        }
    }, [url])
    const Postdetails = () => {
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
    return (
        <>
            <div className="home">
                <div className="card input-field" style={{ width: "500px", padding: "20px" }}>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
                    <div className="file-field input-field ">
                        <div className="btn #42a5f5 blue darken-1">
                            <span>File</span>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light #42a5f5 blue darken-1" type="submit" name="action" onClick={Postdetails}>Submit Post</button>
                </div>
            </div>
        </>
    )
}
export default Createpost