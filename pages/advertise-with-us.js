import {
  Container,
  Toast,
  Modal,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import React, { useState, useEffect, setState, useCallback } from "react";
import Image from "next/legacy/image";
import api from "../api.service";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export async function getStaticProps({}) {
  return {
    props: {
      seo: {
        title: "Comparos.in",
        url: "https://tv.comparos.in/survey",
        canonical: "https://tv.comparos.in/survey",
        description: "",
      },
    },
  };
}

export const Advertise = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [errorMsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("advertisement-lead");
  const homeRef = React.createRef();

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const router = useRouter();

  const handleChangeByQuestions = async (e) => {
    setIsClicked(true);
    setInput(e.target.value);

    if (currentStep === 3) {
      setShow1(true);
    } else if (currentStep === 6) {
      setShow2(true);
    } else if (currentStep === 9) {
      setShow3(true);
    }
  };
  const submit = (event) => {
    const form = event.currentTarget;
    if (name == "" || brand == "" || email == "" || mobile == "") {
      event.preventDefault();
      event.stopPropagation();
      setErrorMsg(true);
    } else {
      let postData;
      postData = {
        name: name,
        email: email,
        message: message,
        brandSlug: brand,
        mobile: mobile,
        category: props.category ? props.category : "advertisement-lead",
      };
      setErrorMsg(false);
      setSuccessMsg(true);
      let res = "";
      if (category.includes("advertisement")) {
        res = api.postLead(postData);
        const queryMail = `name=${name}&email=${email}&mobile=${mobile}&company=${brand}`;
        api.emailSendApiForAdvrt(queryMail);
      }
      setIsSubmit(true);
      setName("");
      setEmail("");
      setMobile("");
      setMessage("");
      setBrand("");
      homeRef.current.disabled = false;
      //   localStorage.setItem('isSubmit' , true)
      //   router.push(`/`);
      setValidated(true);
    }

    setValidated(false);
  };
  function updateStep(step) {
    if (isClicked) {
      setIsClicked(false);
      setErrorMsg(false);
      //   setSuccessMsg(true)
    } else {
      setErrorMsg(true);
    }
  }
  const startSurvey = () => {
    setStart(true);
  };
  return (
    <Container className="advertise-container" style={{ marginTop: "30px" }}>
      <Row>
        <Col sm={7} className="advertise-form">
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="formBasicFName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                  type="text"
                  placeholder="Name"
                />
                <Form.Control.Feedback>
                  Please Enter any value
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Control.Feedback>
                  Please Enter any value
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="formBasicMobile">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                  required
                  minLength={10}
                  maxLength={10}
                  pattern={/^[0]?[6789]\d{9}$/}
                  type="number"
                  placeholder="phone"
                />
                <Form.Control.Feedback>
                  Please Enter any value
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="formBasicBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                  required
                  type="text"
                  placeholder="Brand Name"
                />
                <Form.Control.Feedback>
                  Please Enter any value
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Form.Group className="mb-3" controlId="formBasicMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                value={message}
                as="textarea"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                required
                type="text"
                placeholder="Message"
              />
              <Form.Control.Feedback>
                Please Enter any value
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {errorMsg && <p className="ad-error">Please Fill your Details</p>}

          {successMsg && (
            <p className="ad-success">
              Thank you for showing your interest. Kindly head to Home and check
              out our products.
            </p>
          )}

          <Row>
            <Button type="submit" className="adBtn" onClick={submit}>
              Submit
            </Button>
            <Button
              className="homeBtn"
              variant="primary"
              size="lg"
              ref={homeRef}
              disabled
            >
              <a href={"/"}>Home</a>
            </Button>{" "}
          </Row>
        </Col>
        <Col sm={5}>
          <div className="col-md-12 text-white aside px-4 py-5 contact">
            <div className="mb-2">
              <h1 className="h3 contact-title">Contact Information</h1>
              <p className="opacity-50 contact-desc">
                <small>
                  Fill out the from and we will get back to you whitin 24 hours
                </small>
              </p>
            </div>
            <div className="d-flex flex-column px-0">
              <Row style={{ marginTop: "50px" }}>
                <Col sm={12}>
                  <li className="d-flex align-items-center r mb-4">
                    <span className="opacity-50 d-flex align-items-center me-3 fs-2 ad-icon-box">
                      <img
                        src="/images/email.png"
                        alt="mobile"
                        className="infoIcon"
                      />
                    </span>
                    <span>
                      <a className="ad-info" href="mailto:vijay@delente.in">
                        ankurmodi@delente.in
                      </a>
                    </span>
                  </li>
                </Col>

                <Col sm={12}>
                  <li className="d-flex justify-content-start align-items-center mb-4">
                    <span className="opacity-50 d-flex align-items-center me-3 fs-2 ad-icon-box">
                      <img
                        src="/images/call.png"
                        alt="mobile"
                        className="infoIcon"
                      />
                    </span>
                    <span>
                      <a className="ad-info" href="tel:9971928886">
                        +91 9599842282
                      </a>
                    </span>
                  </li>
                </Col>
              </Row>
              <Row>
                {/* <Col sm={6}>
=======
    <Col sm={5}>

        <div className="col-md-12 text-white aside px-4 py-5 contact">
        <div className="mb-2">
          <h1 className="h3 contact-title">Contact Information</h1>
          <p className="opacity-50 contact-desc">
            <small>
              Fill out the from and we will get back to you whitin 24 hours
            </small>
          </p>
        </div>
        <div className="d-flex flex-column px-0">
        <Row style={{marginTop:"50px"}}>
            <Col sm={6}>
            <li className="d-flex align-items-center r mb-4">
              <span className="opacity-50 d-flex align-items-center me-3 fs-2 ad-icon-box">
              <img src="/images/email.png" alt="mobile" className="infoIcon" />
              </span>
              <span><a className="ad-info" href="mailTo:vijay@delente.in">vijay@delente.in</a></span>
            </li>
            </Col>
            <Col sm={6}>
            <li className="d-flex justify-content-start align-items-center mb-4">
              <span className="opacity-50 d-flex align-items-center me-3 fs-2 ad-icon-box">
              <img src="/images/call.png" alt="mobile" className="infoIcon"/>
              </span>
              <span><a className="ad-info" href="tel:9971928886">+91 9971928886</a></span>
            </li>
            </Col>
            
            </Row>
            <Row>
            <Col sm={6}>
>>>>>>> b774946909fe84e1c1c328a7a25600c04a277a94
            <li className="d-flex align-items-center r mb-4">
              <span className="opacity-50 d-flex align-items-center me-3 fs-2 ad-icon-box">
              <img src="/images/email.png" alt="mobile" className="infoIcon"/>
              </span>
              <span><a className="ad-info" href="mailto:shivraj@delente.in">shivraj@delente.in</a></span>
            </li>
            </Col>
            <Col sm={6}>
            <li className="d-flex justify-content-start align-items-center mb-4">
              <span className="opacity-50 d-flex align-items-center me-3 fs-2 ad-icon-box">
              <img src="/images/call.png" alt="mobile" className="infoIcon"/>
              </span>
              <span><a className="ad-info" href="tel:9867518880">+91 9867518880</a> </span>
            </li>
            </Col> */}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Advertise;
