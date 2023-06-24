
import { PlusOutlined } from '@ant-design/icons';
import '../login/login.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Form, Input, InputNumber, Upload } from 'antd';

function Register() {
  const api = 'http://localhost:5000/register';

  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: '',
    email: '',
    password: '',
    year: '',
    image: null,
  });

  const onImageChange = (e) => {
    console.log(e.file);
    setUser({ ...user, image: e.file });
  };

  async function handleRegister(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('year', user.year);
    formData.append('image', user.image);

    try {
      const response = await fetch(api, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('User registered successfully:', data);

      setUser({
        firstName: '',
        email: '',
        password: '',
        year: '',
        image: null,
      });
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="First name">
          <Input
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Year">
          <InputNumber
            value={user.year}
            onChange={(value) => setUser({ ...user, year: value })}
          />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload
            action="/upload.do"
            listType="picture-card"
            accept="image/*"
            beforeUpload={() => false}
            onChange={(e) => onImageChange(e)}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            className="btn-register"
            type="primary"
            htmlType="submit"
            onClick={(e) => handleRegister(e)}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Register;
