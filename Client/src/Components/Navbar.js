import React, { useContext } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from "../App";

const Navbar = () => {
    const navigate = useNavigate()
    const {state,dispatch} = useContext(UserContext)
    const render = () =>{
        if(state){
            return[
                <li><Link to="profile">Profile</Link></li>,
                <li><Link to="create">Create Post</Link></li>,
                <button class="btn #f44336 red" type="submit" name="action" onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    navigate("/login")
                }}>Logout

                </button>
            ]
        }else{
            return[
                <li><Link to="login">Login</Link></li>,
                <li><Link to="signup">Signup</Link></li>
            ]
        }
    }
    return (
        <>
            <nav>
                <div className="nav-wrapper white">
                    <Link to={state?"/":"/login"} className="brand-logo" style={{marginLeft:"10px"}}>ReachMe</Link>
                    <ul id="nav-mobile" className="right">
                       
                       {render()}
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Navbar