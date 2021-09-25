import React, { useState } from 'react'
import { useHistory } from 'react-router'

const Login = (props) => {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({email:"", password: ""})
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({email: credentials.email, password: credentials.password})
            });
            const json = await response.json();
            console.log(json.authtoken);
            if(json.success){
                //redirect
                localStorage.setItem('token', json.authtoken);
                props.showAlert("Logged in successfully", "success");
                history.push("/");
            }
            else{
                
                props.showAlert("Invalid credentials", "danger");
            }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <>
        <h1 className="text-center mt-5 text-dark"><strong>iNoteBook</strong></h1>
            <div className="container">
            <div class="login-container-wrapper clearfix">
                <div class="logo"><i class="fa fa-sign-in"></i></div>
                <div class="welcome"><strong>Welcome,</strong> please login</div>

                    <form className="form-horizontal login-form" onSubmit={handleSubmit}>
                        <div className="form-group relative">
                            <label htmlFor="email" className="form-label text-white">Email address</label>
                            <input type="email" className="form-control input-lg" value={credentials.email} name="email" id="email" aria-describedby="emailHelp" onChange={onChange}/>
                            <i class="fa fa-user mt-4"></i>
                        </div>
                        <div className="form-group relative">
                            <label htmlFor="password" className="form-label text-white">Password</label>
                            <input type="password" className="form-control input-lg" value={credentials.password} name="password" id="password" onChange={onChange}/>
                            <i class="fa fa-lock mt-4"></i>
                        </div>
                        <div className="form-group text-center mt-3">
                        <button type="submit" className="btn btn-success btn-lg btn-block">Login</button>
                        </div> 
                    </form>
                </div>
            </div>
    </>
    )
}

export default Login
