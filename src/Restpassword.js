import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { API } from "./API";
import { useFormik } from "formik";
import { formvalidationSchema } from "./App";
import { Verificationlink } from "./Verificationlink";

export const Restpassword = () => {
  const param = useParams();
  const [search] = useSearchParams();
  const id = param.id;
  const token = search.get("rps");

  const [errormessage, setErrormessage] = useState("");

  const [result, setResult] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { password: "", password1: "" },
    validationSchema: formvalidationSchema,
    onSubmit: (passwordInfo) => {
      console.log("onSubmit", passwordInfo);
      resetPassword(passwordInfo);
    },
  });

  const passwordVerifyInfo = {
    id: id,
    verificationString: token,
  };

  const verify = () => {

    fetch(`${API}/verify-random-string`, {
      method: "POST",
      body: JSON.stringify(passwordVerifyInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })


      .then((res) => {
        if (res.code !== "verified") {

          setResult(false);
          setErrormessage("Verifiation Link not exit");
        }
        else {
          res.json();
          setResult(true);
        }
      });
  };


  const resetPassword = async (passwordInfo) => {
    passwordInfo.id = id;
    passwordInfo.verificationString = token;
    console.log("userInfo", passwordInfo);
    await fetch(`${API}/reset-password`, {
      method: "PUT",
      body: JSON.stringify(passwordInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })

      .then((res) => {
        if (!res.ok) {

          setErrormessage("User not avialble");
        } else {
          res.json();
          navigate("/successEmail");
        }
      });
  };


  useEffect(() => verify(), []);
  return (
    <div>
      {result === false && token !== '' ?
        <Verificationlink />
        :
        <Container>
          <Row className="mt-5 justify-content-center">
            <Col md={4} className="m-3 p-3" style={{ border: "1px solid #ddd" }}>
              <Form onSubmit={formik.handleSubmit}>
                <h2>Reset old with new Password</h2>
                <p>{errormessage}</p>

                <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    placeholder="password"
                    id="password"
                    name="password"
                  ></Form.Control>
                </Form.Group>
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""}
                <Form.Group>
                  <Form.Label>Re Enter Password</Form.Label>
                  <Form.Control
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    placeholder="confirm password"
                    id="password1"
                    name="password1"
                  ></Form.Control>
                </Form.Group>
                {formik.touched.password1 && formik.errors.password1
                  ? formik.errors.password1
                  : ""}

                <div>
                  <Button className="btn btn-warning mt-2" type="submit">
                    Reset Password
                  </Button>
                </div>
              </Form>
              <Link className="mt-3" to="/login">
                Know your password? Login
              </Link>
            </Col>
          </Row>
        </Container>}
    </div>
  );
};
