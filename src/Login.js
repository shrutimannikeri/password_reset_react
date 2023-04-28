import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { API } from './API';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import * as yup from 'yup';


const formvalidationSchema=yup.object({
  email: yup.string().min(10,"please enter longer")
   .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,"pattern not matched"),
   password: yup.string()
   .min(7,"please enter at least 7 char")
   .max(10,"Too much password")
   .required('why not fill th password')
 })

export const Login = () => {
  const [errormessage, setErrormessage] = useState('');

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: formvalidationSchema,
    onSubmit: (userInfo) => {
      console.log("onSubmit", userInfo);
      loginUser(userInfo);
    }
  }
  );
  const navigate = useNavigate();


  const loginUser = (userInfo) => {

    console.log("userInfo", userInfo);

    fetch(`${API}/login`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
     
      .then(res => {
        if(res.ok){
          res.json()
          navigate("/home")
        }
       else{
        setErrormessage("User Details not correct")
       }
      
      });
  };

  return (
    <div>
      <Container>
        <Row className="mt-5 justify-content-center">
          <Col md={4} className="m-3 p-3" style={{ border: '1px solid #ddd' }}>
            <Form onSubmit={formik.handleSubmit}>
              <h2>Login</h2>
              <p className='ErrorAlert'>{errormessage}</p>

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
              {formik.touched.email && formik.errors.email ? <p classname="errormsg">{formik.errors.email}</p> : ''}
              <Form.Group>
                <Form.Label className='text-left'>Password</Form.Label>
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
              {formik.touched.password && formik.errors.password ?<p className="errormsg">{formik.errors.password}</p>  : ''}
             <div>
             <Button className="btn btn-warning mt-2" type="submit">
                Login
              </Button>
              </div> 
            </Form>
           <div>
           <Link className="mt-3" to="/signup">

No account -click to  Register

</Link></div> 
            <Link className="mt-3" to="/forget-password">

             Forget Password

            </Link>

          </Col>
        </Row>
      </Container>
    </div>
  );
};
