import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";

import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../components/BreadCrumbs/BreadCrumbs";
import { CREATE_PATIENT } from "../../../store/Types";
import { useDispatch, useSelector } from "react-redux";

const CreatePatient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(1);
  const [activeTabVartical, setActiveTabVartical] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [passedStepsVertical, setPassedStepsVertical] = useState([1]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const patientError = useSelector((state) => state.PatientReducer.error);
  const patientSuccess = useSelector(
    (state) => state.PatientReducer.apiSuccess
  );
  const patientLoader = useSelector((state) => state.PatientReducer.loader);

  useEffect(() => {
    if (isSubmitted) {
      if (patientSuccess && !patientError) {
        navigate("/patient");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientLoader, patientError, isSubmitted]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    workPhone: "",
    personalMobile: "",
    dateofbirth: "",
    ss: "",
    gender: "Male",
    married: "No",
    hearAboutUs: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipcode: "",
    homePhone: "",
  });

  const [preferredContactMethod, setPreferredContactMethod] = useState({
    homePhone: false,
    workPhone: false,
    personalPhone: false,
    email: false,
    textMessage: false,
  });

  const [preferredContactConfirmation, setPreferredContactConfirmation] =
    useState({
      homePhone: false,
      workPhone: false,
      personalPhone: false,
      email: false,
      textMessage: false,
    });

  const [preferredContactRecall, setPreferredContactRecall] = useState({
    homePhone: false,
    workPhone: false,
    personalPhone: false,
    email: false,
    textMessage: false,
  });

  const [studentStatus, setStudentStatus] = useState({
    nonStudent: false,
    fullTime: false,
    partTime: false,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        var modifiedSteps = [...passedSteps, tab];
        setActiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  function toggleTabVertical(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        var modifiedSteps = [...passedStepsVertical, tab];
        setActiveTabVartical(tab);
        setPassedStepsVertical(modifiedSteps);
      }
    }
  }

  const onSubmit = () => {
    dispatch({ type: "patient/resetPatientError" });
    dispatch({ type: "patient/setLoaderTrue" });
    dispatch({ type: "patient/resetApiSuccess" });
    dispatch({ type: CREATE_PATIENT, payload: formData });
    setIsSubmitted(true);
  };

  return (
    <div>
      {" "}
      <Container fluid={true}>
        <BreadCrumbs title="Forms" breadcrumbItem="Form Wizard" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <h4 className="card-title mb-4">Patient Creation Wizard</h4>
                <div className="wizard clearfix">
                  <div className="steps clearfix">
                    <ul>
                      <NavItem
                        className={classnames({
                          current: activeTab === 1,
                        })}
                      >
                        <NavLink
                          className={classnames({
                            active: activeTab === 1,
                          })}
                          onClick={() => {
                            toggleTab(1);
                          }}
                        >
                          <span className="number">1.</span> Personal Details
                        </NavLink>
                      </NavItem>
                      <NavItem
                        className={classnames({
                          current: activeTab === 2,
                        })}
                      >
                        <NavLink
                          disabled={!(passedSteps || []).includes(2)}
                          className={classnames({
                            active: activeTab === 2,
                          })}
                          onClick={() => {
                            toggleTab(2);
                          }}
                        >
                          <span className="number">2.</span>{" "}
                          <span>Preferred Contact Method</span>
                        </NavLink>
                      </NavItem>
                      <NavItem
                        className={classnames({
                          current: activeTab === 3,
                        })}
                      >
                        <NavLink
                          disabled={!(passedSteps || []).includes(3)}
                          className={
                            (classnames({
                              active: activeTab === 3,
                            }),
                            "done")
                          }
                          onClick={() => {
                            toggleTab(3);
                          }}
                        >
                          <span className="number">3.</span> Address Details
                        </NavLink>
                      </NavItem>
                      <NavItem
                        className={classnames({
                          current: activeTab === 4,
                        })}
                      >
                        <NavLink
                          disabled={!(passedSteps || []).includes(4)}
                          className={
                            (classnames({
                              active: activeTab === 4,
                            }),
                            "done")
                          }
                          onClick={() => {
                            toggleTab(4);
                          }}
                        >
                          <span className="number">4.</span> Confirm Detail
                        </NavLink>
                      </NavItem>
                    </ul>
                  </div>

                  <div className="content clearfix">
                    <TabContent activeTab={activeTab} className="body">
                      <TabPane tabId={1}>
                        <Form>
                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-firstname-input1">
                                  First name
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-firstname-input1"
                                  placeholder="Enter Your First Name"
                                  name="firstname"
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                            </Col>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-lastname-input2">
                                  Last name
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-lastname-input2"
                                  placeholder="Enter Your Last Name"
                                  name="lastname"
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                            </Col>
                            <Col lg="3">
                              <div className="mb-3">
                                <label
                                  htmlFor="example-date-input"
                                  className=""
                                >
                                  Date of birth
                                </label>
                                <div className="">
                                  <input
                                    className="form-control"
                                    type="date"
                                    defaultValue="2019-08-19"
                                    id="example-date-input"
                                    name="dateofbirth"
                                    onChange={(e) => onChange(e)}
                                  />
                                </div>
                              </div>
                            </Col>

                            <Col lg="3">
                              <div className="mb-3">
                                <Label for="basicpill-lastname-input2">
                                  SS#
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-lastname-input2"
                                  placeholder="Enter Your SS"
                                  name="ss"
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                            </Col>

                            <Col lg="3">
                              <h5 className="font-size-14 mb-2">Gender</h5>
                              <div className="d-flex">
                                <div>
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      id="customRadio1"
                                      name="gender"
                                      className="form-check-input"
                                      value={"Male"}
                                      defaultChecked
                                      onChange={(e) => {
                                        onChange(e);
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="customRadio1"
                                    >
                                      Male
                                    </label>
                                  </div>
                                </div>
                                <div>
                                  <div className="form-check ms-3">
                                    <input
                                      type="radio"
                                      id="customRadio2"
                                      name="gender"
                                      className="form-check-input"
                                      value={"Female"}
                                      onChange={(e) => {
                                        onChange(e);
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="customRadio2"
                                    >
                                      Female
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </Col>

                            <Col lg="3">
                              <h5 className="font-size-14 mb-2">Married</h5>
                              <div className="d-flex">
                                <div>
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      id="customRadio1"
                                      className="form-check-input"
                                      name="married"
                                      value={"Yes"}
                                      onChange={(e) => {
                                        onChange(e);
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="customRadio1"
                                    >
                                      Yes
                                    </label>
                                  </div>
                                </div>
                                <div>
                                  <div className="form-check ms-3">
                                    <input
                                      type="radio"
                                      id="customRadio2"
                                      name="married"
                                      className="form-check-input"
                                      defaultChecked
                                      value={"No"}
                                      onChange={(e) => {
                                        onChange(e);
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="customRadio2"
                                    >
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-phoneno-input3">
                                  Work Phone
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-phoneno-input3"
                                  placeholder="Enter Your Work Phone No."
                                  name="workPhone"
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                            </Col>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-email-input4">
                                  Personal Mobile
                                </Label>
                                <Input
                                  type="email"
                                  className="form-control"
                                  id="basicpill-email-input4"
                                  placeholder="Enter Your Personal Mobile no"
                                  name="personalMobile"
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                            </Col>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label for="basicpill-email-input4">
                                  Email
                                </Label>
                                <Input
                                  type="email"
                                  className="form-control"
                                  id="basicpill-email-input4"
                                  placeholder="Enter Your Email Address"
                                  name="email"
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </TabPane>

                      <TabPane tabId={2}>
                        <div>
                          <Form>
                            <Row>
                              <Col lg="12">
                                <div className="mb-3">
                                  <Row>
                                    <Col lg="3">
                                      <Label for="basicpill-pancard-input5">
                                        Preferred Contact Method
                                      </Label>
                                    </Col>
                                    <Col lg="8" className="d-flex">
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor1"
                                          checked={
                                            preferredContactMethod.homePhone
                                          }
                                          onChange={(e) => {
                                            setPreferredContactMethod({
                                              ...preferredContactMethod,
                                              homePhone:
                                                !preferredContactMethod.homePhone,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor1"
                                        >
                                          Hm Phone
                                        </label>
                                      </div>
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor2"
                                          checked={
                                            preferredContactMethod.workPhone
                                          }
                                          onChange={(e) => {
                                            setPreferredContactMethod({
                                              ...preferredContactMethod,
                                              workPhone:
                                                !preferredContactMethod.workPhone,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor2"
                                        >
                                          Work Phone
                                        </label>
                                      </div>
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor3"
                                          checked={
                                            preferredContactMethod.personalPhone
                                          }
                                          onChange={(e) => {
                                            setPreferredContactMethod({
                                              ...preferredContactMethod,
                                              personalPhone:
                                                !preferredContactMethod.personalPhone,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor3"
                                        >
                                          Personal Phone
                                        </label>
                                      </div>
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor4"
                                          checked={preferredContactMethod.email}
                                          onChange={(e) => {
                                            setPreferredContactMethod({
                                              ...preferredContactMethod,
                                              email:
                                                !preferredContactMethod.email,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor4"
                                        >
                                          Email
                                        </label>
                                      </div>
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor5"
                                          checked={
                                            preferredContactMethod.textMessage
                                          }
                                          onChange={(e) => {
                                            setPreferredContactMethod({
                                              ...preferredContactMethod,
                                              textMessage:
                                                !preferredContactMethod.textMessage,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor5"
                                        >
                                          Text Message
                                        </label>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </Col>
                              <Col lg="12">
                                <div className="mb-3">
                                  <Row>
                                    <Col lg="3">
                                      <Label for="basicpill-pancard-input5">
                                        Preferred Contact Method for
                                        Confirmations
                                      </Label>
                                    </Col>
                                    <Col lg="8" className="d-flex">
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor6"
                                          checked={
                                            preferredContactConfirmation.homePhone
                                          }
                                          onChange={() => {
                                            setPreferredContactConfirmation({
                                              ...preferredContactConfirmation,
                                              homePhone:
                                                !preferredContactConfirmation.homePhone,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor6"
                                        >
                                          Hm Phone
                                        </label>
                                      </div>
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor7"
                                          checked={
                                            preferredContactConfirmation.workPhone
                                          }
                                          onChange={() => {
                                            setPreferredContactConfirmation({
                                              ...preferredContactConfirmation,
                                              workPhone:
                                                !preferredContactConfirmation.workPhone,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor7"
                                        >
                                          Work Phone
                                        </label>
                                      </div>
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor8"
                                          checked={
                                            preferredContactConfirmation.personalPhone
                                          }
                                          onChange={() => {
                                            setPreferredContactConfirmation({
                                              ...preferredContactConfirmation,
                                              personalPhone:
                                                !preferredContactConfirmation.personalPhone,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor8"
                                        >
                                          Personal Phone
                                        </label>
                                      </div>
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor9"
                                          checked={
                                            preferredContactConfirmation.email
                                          }
                                          onChange={() => {
                                            setPreferredContactConfirmation({
                                              ...preferredContactConfirmation,
                                              email:
                                                !preferredContactConfirmation.email,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor9"
                                        >
                                          Email
                                        </label>
                                      </div>
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor10"
                                          checked={
                                            preferredContactConfirmation.textMessage
                                          }
                                          onChange={() => {
                                            setPreferredContactConfirmation({
                                              ...preferredContactConfirmation,
                                              textMessage:
                                                !preferredContactConfirmation.textMessage,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor10"
                                        >
                                          Text Message
                                        </label>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </Col>
                              <Col lg="12">
                                <div className="mb-3">
                                  <Row>
                                    <Col lg="3">
                                      <Label for="basicpill-pancard-input5">
                                        Preferred Contact Method for Recall
                                      </Label>
                                    </Col>
                                    <Col lg="8" className="d-flex">
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor11"
                                          checked={
                                            preferredContactRecall.homePhone
                                          }
                                          onChange={() => {
                                            setPreferredContactRecall({
                                              ...preferredContactRecall,
                                              homePhone:
                                                !preferredContactRecall.homePhone,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor11"
                                        >
                                          Hm Phone
                                        </label>
                                      </div>
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor12"
                                          checked={
                                            preferredContactRecall.workPhone
                                          }
                                          onChange={() => {
                                            setPreferredContactRecall({
                                              ...preferredContactRecall,
                                              workPhone:
                                                !preferredContactRecall.workPhone,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor12"
                                        >
                                          Work Phone
                                        </label>
                                      </div>
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor13"
                                          checked={
                                            preferredContactRecall.personalPhone
                                          }
                                          onChange={() => {
                                            setPreferredContactRecall({
                                              ...preferredContactRecall,
                                              personalPhone:
                                                !preferredContactRecall.personalPhone,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor13"
                                        >
                                          Personal Phone
                                        </label>
                                      </div>
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor14"
                                          checked={preferredContactRecall.email}
                                          onChange={() => {
                                            setPreferredContactRecall({
                                              ...preferredContactRecall,
                                              email:
                                                !preferredContactRecall.email,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor14"
                                        >
                                          Email
                                        </label>
                                      </div>
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor15"
                                          checked={
                                            preferredContactRecall.textMessage
                                          }
                                          onChange={() => {
                                            setPreferredContactRecall({
                                              ...preferredContactRecall,
                                              textMessage:
                                                !preferredContactRecall.textMessage,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor15"
                                        >
                                          Text Message
                                        </label>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </Col>
                              <Col lg="12">
                                <div className="mb-3">
                                  <Row>
                                    <Col lg="3">
                                      <Label for="basicpill-pancard-input5">
                                        Student Status if dependent over 19 (for
                                        ins)
                                      </Label>
                                    </Col>
                                    <Col lg="8" className="d-flex">
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor16"
                                          checked={studentStatus.nonStudent}
                                          onChange={() => {
                                            setStudentStatus({
                                              ...studentStatus,
                                              nonStudent:
                                                !studentStatus.nonStudent,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor16"
                                        >
                                          Non Student
                                        </label>
                                      </div>
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor17"
                                          checked={studentStatus.fullTime}
                                          onChange={() => {
                                            setStudentStatus({
                                              ...studentStatus,
                                              fullTime: !studentStatus.fullTime,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor17"
                                        >
                                          Full time
                                        </label>
                                      </div>
                                      <div className="form-check form-check-primary mb-3 ms-4">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customCheckcolor18"
                                          checked={studentStatus.partTime}
                                          onChange={() => {
                                            setStudentStatus({
                                              ...studentStatus,
                                              partTime: !studentStatus.partTime,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customCheckcolor18"
                                        >
                                          Parttime
                                        </label>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </Col>
                              <Col lg="12">
                                <div className="mb-3">
                                  <Label for="basicpill-address-input1">
                                    How did you hear about us?
                                  </Label>
                                  <textarea
                                    id="basicpill-address-input1"
                                    className="form-control"
                                    rows="2"
                                    placeholder="Please mention your reference type"
                                    name="hearAboutUs"
                                    onChange={(e) => onChange(e)}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      </TabPane>

                      <TabPane tabId={3}>
                        <div>
                          <Form>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-namecard-input11">
                                    Address Line 1
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-namecard-input11"
                                    placeholder="Enter Address Line 1"
                                    name="addressLine1"
                                    onChange={(e) => onChange(e)}
                                  />
                                </div>
                              </Col>

                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-namecard-input11">
                                    Address Line 2
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-namecard-input11"
                                    placeholder="Enter Address Line 2"
                                    name="addressLine2"
                                    onChange={(e) => onChange(e)}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="basicpill-namecard-input11">
                                    City
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-namecard-input11"
                                    placeholder="Enter City"
                                    name="city"
                                    onChange={(e) => onChange(e)}
                                  />
                                </div>
                              </Col>
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="basicpill-namecard-input11">
                                    State
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-namecard-input11"
                                    placeholder="Enter State"
                                    name="state"
                                    onChange={(e) => onChange(e)}
                                  />
                                </div>
                              </Col>
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="basicpill-namecard-input11">
                                    Zipcode
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-namecard-input11"
                                    placeholder="Enter Zipcode"
                                    name="zipcode"
                                    onChange={(e) => onChange(e)}
                                  />
                                </div>
                              </Col>
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="basicpill-namecard-input11">
                                    Home Phone
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-namecard-input11"
                                    placeholder="Enter home phone"
                                    name="homePhone"
                                    onChange={(e) => onChange(e)}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      </TabPane>
                      <TabPane tabId={4}>
                        <div className="row justify-content-center">
                          <Col lg="6">
                            <div className="text-center">
                              <div className="mb-4">
                                <i className="mdi mdi-check-circle-outline text-success display-4" />
                              </div>
                              <div>
                                <h5>Confirm Detail</h5>
                                <p className="text-muted">
                                  Please Confirm all the details before saving
                                  them
                                </p>
                              </div>
                            </div>
                          </Col>
                        </div>
                      </TabPane>
                    </TabContent>
                  </div>

                  <div className="actions clearfix">
                    <ul>
                      <li
                        className={
                          activeTab === 1 ? "previous disabled" : "previous"
                        }
                      >
                        <Link
                          to="#"
                          onClick={() => {
                            toggleTab(activeTab - 1);
                          }}
                        >
                          Previous
                        </Link>
                      </li>
                      {activeTab === 4 ? (
                        <button className=" btn btn-success" onClick={onSubmit}>
                          Save
                        </button>
                      ) : (
                        <li
                          className={activeTab === 4 ? "next disabled" : "next"}
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTab(activeTab + 1);
                            }}
                          >
                            Next
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreatePatient;
