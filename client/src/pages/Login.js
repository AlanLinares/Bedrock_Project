import React, { useState } from "react"
import { useNavigate } from "react-router";
import Button from "../components/Button"
import '../css/Button.css'
import { NavLink } from "react-router-dom";

export default function Login() {

    const [form, setForm] = useState({
        email: "",
        password: "",       
    });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const checkPerson = { ...form };
    console.log(checkPerson)
   const response = await fetch("http://localhost:5000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Connection": "Keep-Alive"
      },
      withCredentials: true,
      body: JSON.stringify(checkPerson),
    })
    .catch(error => {
      console.log(error)
      return;
    });

    setForm({ email: "", password: "" });
    
    const res = await response.json()
    if (res.msg === "login success"){
        const id = res.data._id
        
        navigate(`/user/${id}`);
    }
    else {
        window.alert(res.message)
    }
  }

    return (
        <div className='main'>
            <div className='login-container'>
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    <div className='input-container'>
                        <label>Email</label>
                        <input
                            type='email'
                            placeholder='newguy@thisplace.com'
                            id="email"
                            value={form.email}
                            onChange={(e) => updateForm({ email: e.target.value })}
                        />
                    </div>
                    <div className='input-container'>
                        <label>Password</label>
                        <input 
                            type='password'
                            placeholder="newguy2000" 
                            id="password"
                            value={form.password}
                            onChange={(e) => updateForm({ password: e.target.value })}
                        />
                    </div>

                    <Button name={'Login'} />

                    <p style={{paddingTop: 30, paddingBottom: 10}}>Need an account?</p>
                </form>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
            </div>
        </div>
    )
}