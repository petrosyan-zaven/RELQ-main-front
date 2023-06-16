import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { useState } from 'react';




function Login() {

    const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  });

  const [ remember, setRemember ] = useState(true);

  const navigate = useNavigate();

    const handleLogin = async (e) => {

     e.preventDefault()
      setFormData ({email: "", password: "" })
       

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data.role);
      const token = data.jwt;
      const role = data.role;
      console.log(token)

      if( role === 1 ) {
        navigate('/admin')
      } else if (data.role === 0 ) {
        navigate('/')
      } else {
        console.log('err');
      }

      
      if( remember ) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('role', role);
      }
      
      if("error" in data) { alert(data.error)}
    } catch (err) {
      console.error(err);
    
    }
  };

  const handleToggleRemember = () => {
    setRemember(!remember);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  

  return(

  <Form 
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 500,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        }, 
      ]}
    >
      <Input 
        value={formData.email}
        onChange = {(e) => {
          setFormData({...formData, email: e.target.value})
        }}
      />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password
        value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
            }
       />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox onClick={handleToggleRemember}>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" onClick={handleLogin}>
        Log in
      </Button>
      <Link to="/register" style={{padding:30}}>Register now</Link>
    </Form.Item>
  </Form>
  )
};

export default Login;

// import { useState } from 'react'
// import './login.scss'
// import React from 'react'
// import { useNavigate, Link } from 'react-router-dom'


// function Login() {
  
//   const navigate = useNavigate();
  
//   const [ formData, setFormData ] = useState({
//     email: '',
//     password: ''
//   })
  
  
//   const handleLogin = async (e) => {

//      e.preventDefault()
//       setFormData ({email: "",password: "" })
       

//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       const token = data.jwt
//       console.log(token)
//       navigate('/')

//       localStorage.setItem('token', token);
//       if("error" in data){ alert(data.error)}
//     } catch (err) {
//       console.error(err);
    
//     }
//   };


// return (

// <div className='login'>

// <h2>Login</h2>
//       <form onSubmit={handleLogin}>
     

//       <div className='box'>
//       <label>
//           Email:<br/>
//           <input
//             type="text"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//           />
//         </label>
//       </div>
//         <br />
//         <label>
//           Password:<br/>
//           <input
//             type="password"
//             value={formData.password}
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//           />
//         </label>
//             <div className='log'>
//               <button className='btn-login'>Login</button>
//               <Link className='register-btn' to={'/register'}>Register now</Link>
//             </div>
//       </form>
      


//     </div>
//   )
// }

// export default Login