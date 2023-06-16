import { PlusOutlined } from '@ant-design/icons';
import '../login/login.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
  Button,
  Form,
  Input,
  InputNumber,
  Upload,
} from 'antd';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: '',
    email: '',
    password: '',
    year: '',
    image: ''
  });

  async function handleRegister(e) {
    // e.preventeDefault();

    // setUser({
    //   firstName: '', email: '', password: '', year: '', image:''
    // })
    console.log(user, 'user');
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/JSON'},
        body: JSON.stringify({
          firstName: user.firstName,
          email: user.email,
          password: user.password,
          year: user.year,
          image: user.image
        })
      });
      const data = await response.json();
      
      if ( response.statusCode === 200 ) {
        console.log('User created!');
        navigate('/')
      } else {
        console.log('Error registering user:', data.status);
      } 
    } catch (err) {
      console.error('Error registering user:', err);
    }
     setUser({firstName: '', email: '', password: '', year: '', image:''});
  }

  return (
    <>

      <Form 
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="First name">
          <Input 
            value={user.firstName}
            onChange={(e) =>
              setUser({ ...user, firstName: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input 
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input 
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Year" 
            value={user.year}
            onChange={(e) =>
              setUser({ ...user, year: e.target.value })
            }
        >
          <InputNumber value={18}/>
        </Form.Item>


        <Form.Item label="Upload" valuePropName="fileList"  getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card" enctype="multipart/form-data" method='post'>
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item >
          <Button className='btn-register' type="primary" htmlType="submit" onClick={(e)=>handleRegister(e)} >Button</Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Register;


// import { PlusOutlined } from '@ant-design/icons';
// import '../login/login.scss';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// import { Button, Form, Input, InputNumber, Upload } from 'antd';

// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e && e.fileList;
// };

// function Register() {
//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     firstName: '',
//     email: '',
//     password: '',
//     year: '',
//     image: '',
//   });

//   async function handleRegister(e) {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user),
//       });

//       if (response.ok) {
//         console.log('User created!');
//         navigate('/');
//       } else {
//         const data = await response.json();
//         console.log('Error registering user:', data.error);
//       }
//     } catch (err) {
//       console.error('Error registering user:', err);
//     }

//     setUser({
//       firstName: '',
//       email: '',
//       password: '',
//       year: '',
//       image: '',
//     });
//   }

//   return (
//     <>
//       <Form
//         labelCol={{
//           span: 4,
//         }}
//         wrapperCol={{
//           span: 14,
//         }}
//         layout="horizontal"
//         style={{
//           maxWidth: 600,
//         }}
//       >
//         <Form.Item label="First name">
//           <Input
//             value={user.firstName}
//             onChange={(e) =>
//               setUser({ ...user, firstName: e.target.value })
//             }
//           />
//         </Form.Item>
//         <Form.Item label="Email">
//           <Input
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//           />
//         </Form.Item>
//         <Form.Item label="Password">
//           <Input
//             value={user.password}
//             onChange={(e) => setUser({ ...user, password: e.target.value })}
//           />
//         </Form.Item>

//         <Form.Item label="Year">
//           <InputNumber
//             value={user.year}
//             onChange={(value) => setUser({ ...user, year: value })}
//           />
//         </Form.Item>

//         <Form.Item
//           label="Upload"
//           valuePropName="fileList"
//           getValueFromEvent={normFile}
//         >
//           <Upload
//             action="/upload.do"
//             listType="picture-card"
//             beforeUpload={() => false}
//             onChange={(info) => {
//               const fileList = info.fileList.map((file) => {
//                 if (file.response) {
//                   file.url = file.response.url;
//                 }
//                 return file;
//               });
//               setUser({ ...user, image: fileList[0] });
//             }}
//           >
//             <div>
//               <PlusOutlined />
//               <div style={{ marginTop: 8 }}>Upload</div>
//             </div>
//           </Upload>
//         </Form.Item>
//         <Form.Item>
//           <Button
//             className="btn-register"
//             type="primary"
//             htmlType="submit"
//             onClick={handleRegister}
//           >
//             Register
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// }

// export default Register;




// import { PlusOutlined } from '@ant-design/icons';
// import '../login/login.scss';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { Button, Form, Input, InputNumber, Upload } from 'antd';
// import multer from 'multer';
// import path from 'path';

// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

// function Register() {
//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     firstName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     year: '',
//     image: null,
//   });

//   async function handleRegister(e) {
//     e.preventDefault();

//     if (user.password !== user.confirmPassword) {
//       console.log('Passwords do not match');
//       return;
//     }

//     setUser({ ...user, confirmPassword: '' });

//     try {
//       const formData = new FormData();
//       formData.append('firstName', user.firstName);
//       formData.append('email', user.email);
//       formData.append('password', user.password);
//       formData.append('year', user.year);
//       formData.append('image', user.image);

//       const response = await fetch('http://localhost:5000/register', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();

//       if (response.status === 200) {
//         console.log('User created!');
//         navigate('/');
//       } else {
//         console.log('Error registering user:', data.status);
//       }
//     } catch (err) {
//       console.error('Error registering user:', err);
//     }

//     setUser({
//       firstName: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       year: '',
//       image: null,
//     });
//   }

//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // Set the destination folder for uploaded files
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     },
//   });

//   const upload = multer({ storage: storage });

//   return (
//     <>
//       <Form
//         labelCol={{
//           span: 4,
//         }}
//         wrapperCol={{
//           span: 14,
//         }}
//         layout="horizontal"
//         style={{
//           maxWidth: 600,
//         }}
//       >
//         <Form.Item label="First name">
//           <Input
//             value={user.firstName}
//             onChange={(e) => setUser({ ...user, firstName: e.target.value })}
//           />
//         </Form.Item>
//         <Form.Item label="Email">
//           <Input
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//           />
//         </Form.Item>
//         <Form.Item label="Password">
//           <Input
//             type="password"
//             value={user.password}
//             onChange={(e) => setUser({ ...user, password: e.target.value })}
//           />
//         </Form.Item>
//         <Form.Item label="Confirm Password">
//           <Input
//             type="password"
//             value={user.confirmPassword}
//             onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
//           />
//         </Form.Item>
//         <Form.Item label="Year">
//           <InputNumber
//             value={user.year}
//             onChange={(value) => setUser({ ...user, year: value })}
//           />
//         </Form.Item>
//         <Form.Item
//           label="Upload"
//           valuePropName="fileList"
//           getValueFromEvent={normFile}
//         >
//           <Upload
//             action="http://localhost:5000/upload"
//             listType="picture-card"
//             enctype="multipart/form-data"
//             beforeUpload={(file) => {
//               setUser({ ...user, image: file });
//               return false;
//             }}
//             onRemove={() => setUser({ ...user, image: null })}
//             fileList={user.image ? [user.image] : []}
//           >
//             <div>
//               <PlusOutlined />
//               <div style={{ marginTop: 8 }}>Upload</div>
//             </div>
//           </Upload>
//         </Form.Item>
//         <Form.Item>
//           <Button
//             className="btn-register"
//             type="primary"
//             htmlType="submit"
//             onClick={handleRegister}
//           >
//             Register
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// }

// export default Register;


// import { PlusOutlined } from '@ant-design/icons';
// import '../login/login.scss';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// import { Button, Form, Input, InputNumber, Upload } from 'antd';

// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

// function Register() {
//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     firstName: '',
//     email: '',
//     password: '',
//     year: '',
//     image: null, // Changed from empty string to null
//   });

//   async function handleRegister(e) {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('firstName', user.firstName);
//       formData.append('email', user.email);
//       formData.append('password', user.password);
//       formData.append('year', user.year);
//       formData.append('image', user.image);

//       const response = await fetch('http://localhost:5000/register', {
//         method: 'POST',
//         body: formData,
//       });
      
//       if (response.ok) {
//         console.log('User created!');
//         navigate('/');
//       } else {
//         const data = await response.json();
//         console.log('Error registering user:', data.status);
//       }
//     } catch (err) {
//       console.error('Error registering user:', err);
//     }

//     setUser({
//       firstName: '',
//       email: '',
//       password: '',
//       year: '',
//       image: null,
//     });
//   }

//   return (
//     <>
//       <Form
//         labelCol={{
//           span: 4,
//         }}
//         wrapperCol={{
//           span: 14,
//         }}
//         layout="horizontal"
//         style={{
//           maxWidth: 600,
//         }}
//       >
//         <Form.Item label="First name">
//           <Input
//             value={user.firstName}
//             onChange={(e) => setUser({ ...user, firstName: e.target.value })}
//           />
//         </Form.Item>
//         <Form.Item label="Email">
//           <Input
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//           />
//         </Form.Item>
//         <Form.Item label="Password">
//           <Input
//             value={user.password}
//             onChange={(e) => setUser({ ...user, password: e.target.value })}
//           />
//         </Form.Item>
//         <Form.Item label="Year">
//           <InputNumber
//             value={user.year}
//             onChange={(value) => setUser({ ...user, year: value })}
//           />
//         </Form.Item>

//         <Form.Item
//           label="Upload"
//           valuePropName="fileList"
//           getValueFromEvent={normFile}
//         >
//           <Upload
//             action="http://localhost:5000/upload" // Update the server endpoint here
//             listType="picture-card"
//             enctype="multipart/form-data"
//             method="post"
//             beforeUpload={(file) => {
//               setUser({ ...user, image: file }); // Update the user state with the selected file
//               return false; // Prevent default upload behavior
//             }}
//           >
//             {user.image ? null : (
//               <div>
//                 <PlusOutlined />
//                 <div style={{ marginTop: 8 }}>Upload</div>
//               </div>
//             )}
//           </Upload>
//         </Form.Item>
//         <Form.Item>
//           <Button className="btn-register" type="primary" htmlType="submit" onClick={handleRegister}>
//             Register
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// }

// export default Register;
