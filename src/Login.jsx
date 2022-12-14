import React from 'react'
import "./styleLogin.css"
import { useState } from 'react'

let posible=true;

const Login = () => {
  const [name, setname] = useState('')
	const [password, setPassword] = useState('')
	async function loginUser(event) {
    event.preventDefault()
    
    if(posible){
 posible=false;

		const response = await fetch('https://mernt-budget.herokuapp.com/todo/login', {
			method: 'POST',
      credentials: "same-origin",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				password,
			}),
		})

		const data = await response.json()
    
    if( data.status !="error"){
   //   console.log(JSON.stringify(data.info))
   window.localStorage.setItem("expenses", JSON.stringify(data.info.info[1]))
    window.localStorage.setItem("budgets", JSON.stringify(data.info.info[0]))
  //  cookies.set('pass', JSON.stringify(data.pass));
  //  cookies.set('name', JSON.stringify(data.name));
      document.cookie=`name=${data.name}`
      document.cookie=`pass=${data.pass}`
      posible=true;

        alert(`Login successful`)
          window.location.href = '/#/todo'

      
    }else{
 posible=true;

      alert('Invalid login')
    }
  }
	}
  return (
    <>
  <meta charSet="utf-8" />
  <title>Animated Login Form | CodingNepal</title>
  {/* <link rel="stylesheet" href="style.css" /> */}
  <div className="center">
    <h1>Login</h1>
    <form onSubmit={loginUser} >
      <div className="txt_field">
      <input style={{color:"white" }} 
					value={name}
					onChange={(e) => setname(e.target.value)}
					type="text"
				/>
        <span />
        <label>Username</label>
      </div>
      <div className="txt_field">
      <input style={{color:"white"}}
					value={password}
					onChange={(e) => setPassword(e.target.value)} autoComplete="new-password"
					type="password"
					
				/>
        <span />
        <label>Password</label>
      </div>
      {/* <div className="pass">Forgot Password?</div> */}
      <br></br>
      <input type="submit" defaultValue="Login"  />
      <div className="signup_link">
       <a style={{fontSize:"1.3em"}} href="#/register">Signup</a><br></br>
       <a style={{fontSize:"1em"}} href="#/todo">anonymous</a>

      </div>
    </form>
  </div>
</>

  )
}

export default Login