
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { API } from './API';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';

const formvalidationSchema=yup.object({
  username: yup.string()
   .min(3,"please enter 3 character"),
  email: yup.string().min(10,"please enter longer")
   .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,"pattern not matched"),
   password: yup.string()
   .min(7,"please enter at least 7 char")
   .max(10,"Too much password")
   .required('why not fill the password')
 })

export function Register() {

const [errormessage,setErrormessage]=useState('')


  const formik = useFormik({
    initialValues: { username: '', email: '', password: '' },
    validationSchema: formvalidationSchema,
    onSubmit: (newuser) => {
      console.log("onSubmit", newuser);
      addUser(newuser);
    }
  }
  );
  const navigate = useNavigate();


  const addUser = (newuser) => {

    console.log("createUser", newuser);
   
      fetch(`${API}/signup`, {
        method: "POST",
        body: JSON.stringify(newuser),
        headers: {
          "Content-Type": "application/json",
        },
      })
         
        
        .then(res=>{
          if(res.ok){
            res.json()
            navigate("/login")
          }
          else{
            setErrormessage("User already exist please login");
          }
       }
     
      ) 
    
   
    
  };

  return (
    <div>
      <Container>
        <Row className="mt-5 justify-content-center">
          <Col md={4} className="m-3 p-3" style={{ border: '1px solid #ddd' }}>
            <Form onSubmit={formik.handleSubmit}>
              <h2>Register</h2>
              <p className='ErrorAlert'>{errormessage}</p>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder='User Name'
                  id='username'
                  name="username"
                ></Form.Control>
              </Form.Group>
              {formik.touched.username && formik.errors.username ? <p className="errormsg">{formik.errors.username} </p>: ''}
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="email"
                  placeholder='Email'
                  id='email'
                  name="email"
                ></Form.Control>
              </Form.Group>
              {formik.touched.email && formik.errors.email ? <p className="errormsg">{formik.errors.email}</p> : ''}
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  placeholder='Password'
                  id='password'
                  name="password"
                ></Form.Control>
              </Form.Group>
              {formik.touched.password && formik.errors.password ? <p className="errormsg">{formik.errors.password}</p> : ''}
              <Button className="btn-block btn-warning mt-3" type="submit">
                Register
              </Button>
            </Form>
            <div>
            <Link className="mt-3" to="/login">
             
             Login
          
         </Link>
            </div>
            
            <Link className="mt-3" to="/forget-password">

Forget Password

</Link>

          </Col>
        </Row>
      </Container>
    </div>
  );
}
