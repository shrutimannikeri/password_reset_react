import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { API } from './API';
import { useFormik } from 'formik';
import * as yup from 'yup';

const formvalidationSchema=yup.object({
  email: yup.string().min(10,"please enter longer")
   .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,"pattern not matched")
 })
export const Forgetpassword = () => {
  const [errormessage, setErrormessage] = useState('');

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: formvalidationSchema,
    onSubmit: (emailInfo) => {
      console.log("onSubmit", emailInfo);
      forgetpassword(emailInfo);
    }
  }
  );
  const navigate = useNavigate();


  const forgetpassword = async(emailInfo) => {

    console.log("userInfo", emailInfo);

   await fetch(`${API}/forgot-password`, {
      method: "POST",
      body: JSON.stringify(emailInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
    

      .then(res => {
        if (res.status===200) { 
          res.json()
          navigate("/successEmail"); 
        }
        else {
          console.log(res.ok)
          setErrormessage("User not avialble");
        }
      });
  };

  return (
    <div>
      <Container>
        <Row className="mt-5 justify-content-center">
          <Col md={4} className="m-3 p-3" style={{ border: '1px solid #ddd' }}>
            <Form onSubmit={formik.handleSubmit}>
              <h2>Forget Password</h2>
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
              {formik.touched.email && formik.errors.email ? <p className="errormsg">{formik.errors.email}</p> : ''}

              <div>
                <Button className="btn btn-warning mt-2" type="submit">
                  Send verification link to mail
                </Button>
              </div>
            </Form>
            <Link className="mt-3" to="/login">
             
            Know your password? Login
          
         </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
