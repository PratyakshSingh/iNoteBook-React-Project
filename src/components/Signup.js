import React,{useState} from 'react'
import { useHistory } from 'react-router';

const Signup = (props) => {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({name: "", email:"", password: "" , cpassword: ""})
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({name, email, password})
            });
            const json = await response.json();
            console.log(json);
            if(json.success){
                //redirect
                localStorage.setItem('token', json.authtoken);
                history.push("/");
                props.showAlert("Account created successfully", "success")
            }
            else{
                props.showAlert("Invalid details", "danger");
            }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <>
        <h1 className="text-center mt-2 text-dark">Create an account</h1>
        <div className="container">
        <div class="login-container-wrapper clearfix">
            <div class="logo"><i class="fa fa-sign-in"></i></div>
            <div class="welcome"><strong>Welcome,</strong> please signup</div>

                <form className="form-horizontal login-form" onSubmit={handleSubmit}>
                    <div className="form-group relative">
                        <label htmlFor="name" className="form-label text-white">Name</label>
                        <input type="text" className="form-control input-lg" id="name" name="name" onChange={onChange} required/>
                    </div>
                    <div className="form-group relative">
                        <label htmlFor="email" className="form-label text-white">Email address</label>
                        <input type="email" className="form-control input-lg" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="form-group relative">
                        <label htmlFor="password" className="form-label text-white">Password</label>
                        <input type="password" className="form-control input-lg" id="password" name="password" onChange={onChange} required minLength={5}/>
                    </div>
                    <div className="form-group relative">
                        <label htmlFor="cpassword" className="form-label text-white">Confirm Password</label>
                        <input type="password" className="form-control input-lg" id="cpassword" name="cpassword" onChange={onChange} required minLength={5}/>
                    </div>
                    <div className="form-group text-center mt-3">
                    <button type="submit" className="btn btn-success btn-lg btn-block">SignUp</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default Signup
