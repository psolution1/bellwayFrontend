import axios from "axios";
import moment from "moment/moment";
import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
export const apiUrl = process.env.REACT_APP_API_URL;

const dispositions = [
  "Not Interested",
  "Interested",
  "Not Contacted",
  "Not Answered",
  "Callback",
  "Not Reachable",
  "Call Disconnected",
  "Busy",
];

function ProspectDetail() {
  const [selectDisposition, setSelectDisposition] = useState("");
  const [prospect, setProspect] = useState(null);
  const location = useLocation();
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();

  const [data, setData] = useState({
    remark: "",
    schedule: null,
    callInitiatedTime: null,
  });

  const startCall = (event, phoneNumber) => {
    event.preventDefault(); // Prevents the browser's default action

    if (
      /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.open(`tel:${phoneNumber}`); // Trigger the call manually
    } else {
      window.location.href = `tel:${phoneNumber}`; // Trigger the call manually
    }
  };

  const autoCall = (phone) => {
    document.querySelector("#info-container").click();

    // Initialize timer to 5
    setTimer(5);

    // Set the interval for counting down
    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // Clear the interval when timer reaches 0
          clearInterval(id);
          // Reset the timer to 5
          setTimer(5);
          // Trigger the autoCall action
          document.getElementById("phone").click();
          // document.querySelector("#phone").click();
          setData({
            ...data,
            callInitiatedTime: new Date(),
          });
        }
        // Decrement the timer
        return prev - 1;
      });
    }, 1000);
  };

  const handleDisposition = (e, quit = false) => {
    e.preventDefault();
    console.log(selectDisposition);

    if (selectDisposition == "") {
      toast.error("Please select disposition");
      return;
    }
    setTimer(0);
    const payload = {
      remarks: data.remark,
      lastCaller: prospect?.assignPhone,
      phone_number: prospect?.phone,
      scheduledDate: data.schedule,
      callInitiatedTime: data.callInitiatedTime,
      callEndTime: new Date(),
      duration: new Date().getTime() - data.callInitiatedTime.getTime(),
      disposition: selectDisposition,
      agentEmail: prospect.assignTo,
      quit,
    };

    axios
      .put(`${apiUrl}/update_prospect/${prospect?._id}`, payload)
      .then((res) => {
        console.log(res.data);
        toast.success("Remarks added successfully");
        setData({
          remark: "",
          schedule: null,
          callInitiatedTime: null,
        });
        setSelectDisposition("Lead Generation");
        if (!res.data.data) {
          toast.info("You don't have any pending lead");
        } else {
          setProspect(res.data.data);
          autoCall(res.data.data?.phone);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  React.useEffect(() => {
    setProspect(location.state);
    autoCall(location.state?.phone);
  }, [location.state]);
  return (
    <div>
      <div className="content-wrapper">
        <section className="content py-1">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-12 col-md-12 col-xl-12">
                <div className="dashboard-tab-wrapper">
                  <div className="d-flex justify-content-center align-items-center bg-light">
                    <div className="card shadow" style={{ width: "100%" }}>
                      <div className="tab-content">
                        <div className="tab-panel">
                          <div className="row">

                            <div className="col-12 col-lg-6 col-md-6 col-xl-6">
                              <div className="jss1455 jss148">
                                <div className="jss1490 jss1579">
                                  <div className="prospect-wrap">
                                    <div className="prospect-wrap-head">
                                      <div className="row">
                                        <div className="col-8 col-lg-8 col-md-8 col-xl-8">
                                          <h1>{prospect?.firstname}</h1>
                                        </div>
                                        <div className="col-4 col-lg-4 col-md-4 col-xl-4">
                                          <div
                                            role="group"
                                            className="MuiButtonGroup-root-icon"
                                            style={{ display: "inline" }}
                                          >
                                            <button
                                              className=""
                                              type="button"
                                              title="sms"
                                            >
                                              <span className="MuiButton-label">
                                                <i className="fa fa-edit" />
                                              </span>
                                              <span className="MuiTouchRipple-root" />
                                            </button>
                                            <button className="" type="button">
                                              <span className="MuiButton-label">
                                                <i
                                                  className="fa fa-commenting"
                                                  aria-hidden="true"
                                                ></i>
                                              </span>
                                              <span className="MuiTouchRipple-root" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="prospect-wrap-info"
                                  id="info-container"
                                >
                                  <div className="row pt-2">
                                    <div className="col-12 col-xl-12">
                                      <div
                                        className="row"
                                        style={{
                                          display: timer > 5 ? "none" : "block",
                                        }}
                                      >
                                        <div className="col-12 col-xl-12 pt-2">
                                          <h3>{`00:00:0${timer}`}</h3>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 col-xl-6 pt-2">
                                          <strong>First Name</strong>
                                        </div>
                                        <div className="col-6 col-xl-6 pt-2">
                                          {prospect?.firstname}
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 col-xl-6 pt-2">
                                          <strong>Mobile Number</strong>
                                        </div>
                                        <div className="col-6 col-xl-6 pt-2">
                                          <em
                                            className="phone"
                                            style={{ display: "inline" }}
                                          >
                                            <Link
                                              id="phone"
                                              to={`tel:${prospect?.phone}`}
                                              onClick={(e) =>
                                                startCall(e, prospect?.phone)
                                              }
                                            >
                                              {prospect?.phone}
                                            </Link>
                                            &nbsp;
                                            {/* <a href="https://wa.me/910000000000" target="_blank" className="whatsapp">
                                                                                        <i className="fa fa-whatsapp"></i>
                                                                                    </a> */}
                                          </em>
                                          <Link
                                            id="phonex"
                                            className="whatsapp"
                                            to={`https://wa.me/${prospect?.phone}`}
                                            // onClick={(e) =>
                                            //   startCall(e, prospect?.phone)
                                            // }
                                          >
                                            <i className="fab fa-whatsapp"></i>
                                          </Link>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 col-xl-6 pt-2">
                                          <strong>Source</strong>
                                        </div>
                                        <div className="col-6 col-xl-6 pt-2">
                                          Bulk Upload
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 col-xl-6 pt-2">
                                          <strong>Campaign</strong>
                                        </div>
                                        <div className="col-6 col-xl-6 pt-2">
                                          {prospect?.campaignName}
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 col-xl-6 pt-2">
                                          <strong>Lead Created Date</strong>
                                        </div>
                                        <div className="col-6 col-xl-6 pt-2">
                                          {moment(prospect?.created_at).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 col-xl-6 pt-2">
                                          <strong>Last Disposition</strong>
                                        </div>
                                        <div className="col-6 col-xl-6 pt-2">
                                          {prospect?.disposition}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row pt-2 d-none">
                                    <div className="col-12 col-xl-12">
                                      <div
                                        className="accordion accordion-flush"
                                        id="accordionFlushExample"
                                      >
                                        <div className="accordion-item rounded-3 border-0 shadow mb-2">
                                          <h2 className="accordion-header">
                                            <button
                                              className="accordion-button border-bottom collapsed fw-semibold"
                                              type="button"
                                              data-bs-toggle="collapse"
                                              data-bs-target="#flush-collapseOne"
                                              aria-expanded="false"
                                              aria-controls="flush-collapseOne"
                                            >
                                              More Detail
                                              <span
                                                className="MuiIconButton-label"
                                                style={{ float: "right" }}
                                              >
                                                <svg
                                                  className="MuiSvgIcon-root"
                                                  focusable="false"
                                                  viewBox="0 0 24 24"
                                                  aria-hidden="true"
                                                >
                                                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                                                </svg>
                                              </span>
                                            </button>
                                          </h2>
                                          <div
                                            id="flush-collapseOne"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFlushExample"
                                          >
                                            <div
                                              className="accordion-body"
                                              style={{ padding: "10px" }}
                                            >
                                              <div className="row">
                                                <div className="col-12 col-xl-12">
                                                  <div className="row">
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      <strong>Last Name</strong>
                                                    </div>
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      Tiwari
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      <strong>Country</strong>
                                                    </div>
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      IND
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      <strong>Assign To</strong>
                                                    </div>
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      {prospect?.assignTo}
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      <strong>
                                                        Total Calls
                                                      </strong>
                                                    </div>
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      19
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      <strong>
                                                        LastCalled At
                                                      </strong>
                                                    </div>
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      2024-07-20
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="jss187 jss191" />
                            </div>

                            <div className="col-12 col-lg-6 col-md-6 col-xl-6">
                              <div className="jss1455 jss148">
                                <div className="jss1490 jss1579">
                                  <div className="prospect-wrap">
                                    <div className="prospect-wrap-head">
                                      <div className="row">
                                        <div className="col-12 col-lg-12 col-md-12 col-xl-12">
                                          <h1>Dispositions</h1>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="prospect-wrap-info">
                                  <div className="row pt-2">
                                    <div className="col-12 col-xl-12">
                                      <div className="CallingCard">
                                        <div
                                          id="frmDisposition"
                                          className="scroller"
                                        >
                                          <ul className="dispositions">
                                            {dispositions.map((item, index) => (
                                              <li
                                                className="jss752"
                                                key={index}
                                              >
                                                <span>
                                                  <input
                                                    type="radio"
                                                    id={`disposition-${index}`}
                                                    // className="rdoDisposition"
                                                    name="disposition"
                                                    // checked
                                                    value={item}
                                                    onChange={(e) => {
                                                      setSelectDisposition(
                                                        e.target.value
                                                      );
                                                    }}
                                                    onClick={(e) => {
                                                      console.log(
                                                        e.target.value
                                                      );
                                                      setSelectDisposition(
                                                        e.target.value
                                                      );
                                                    }}
                                                    checked={
                                                      item === selectDisposition
                                                    }
                                                  />
                                                  <label
                                                    htmlFor={`disposition-${index}`}
                                                    className="jss755"
                                                    style={{
                                                      marginLeft: 10,
                                                      marginTop: -10,
                                                    }}
                                                  >
                                                    {item}
                                                  </label>
                                                </span>
                                              </li>
                                            ))}
                                            {selectDisposition ==
                                            "Not Interested" ? null : (
                                              <li>
                                                <input
                                                  type="datetime-local"
                                                  onChange={(e) =>
                                                    setData({
                                                      ...data,
                                                      schedule: e.target.value,
                                                    })
                                                  }
                                                  value={data.schedule}
                                                />
                                              </li>
                                            )}
                                            <li>
                                              <label>Remark</label>
                                              <textarea
                                                rows={5}
                                                onChange={(e) =>
                                                  setData({
                                                    ...data,
                                                    remark: e.target.value,
                                                  })
                                                }
                                                value={data.remark}
                                              >
                                                {data.remark}
                                              </textarea>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row text-center pt-3">
                                    <div className="col-md-12 col-xs- max-auto py-10 pt-10 ">
                                      <input
                                        type="button"
                                        className="btn-create-campaigns"
                                        value="SAVE & QUIT"
                                        onClick={(e) =>
                                          handleDisposition(e, false)
                                        }
                                        style={{
                                          marginRight: 10,
                                          border: 0,
                                          fontSize: 12,
                                        }}
                                      />
                                      <input
                                        type="button"
                                        className="btn-create-campaigns"
                                        value="CANCEL"
                                        style={{
                                          marginRight: 10,
                                          border: 0,
                                          fontSize: 12,
                                        }}
                                        onClick={() => {
                                          navigate("/CampaignsDetail", {
                                            state: null,
                                          });
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="jss187 jss191" />
                              </div>
                            </div>

                            <div className="col-12 col-lg-4 col-md-4 col-xl-4 d-none">
                              <div className="jss1455 jss148">
                                <div className="jss1490 jss1579">
                                  <div className="prospect-wrap">
                                    <div className="prospect-wrap-head">
                                      <div className="row">
                                        <div className="col-12 col-lg-12 col-md-12 col-xl-12">
                                          <h1>Contact History</h1>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="prospect-wrap-info">
                                  <div className="row pt-2">
                                    <div className="col-12 col-xl-12">
                                      <div
                                        className="accordion accordion-flush"
                                        id="accordionFlushExample"
                                      >
                                        <div className="accordion-item rounded-3 border-0 shadow mb-2">
                                          <h2
                                            className="accordion-header"
                                            style={{
                                              marginTop: 0,
                                              fontWeight: 500,
                                              fontSize: 12,
                                            }}
                                          >
                                            <button
                                              style={{
                                                paddingTop: 10,
                                                paddingBottom: 4,
                                                fontWeight: 500,
                                                fontSize: 12,
                                              }}
                                              className="accordion-button border-bottom collapsed fw-semibold"
                                              type="button"
                                              data-bs-toggle="collapse"
                                              data-bs-target="#acc1"
                                              aria-expanded="false"
                                              aria-controls="acc1"
                                            >
                                              Out-bound call made by <br />
                                              bellway.agent3@gmail.com
                                              <br />
                                              at 2 days ago
                                              <span
                                                className="MuiIconButton-label"
                                                style={{ float: "right" }}
                                              >
                                                <svg
                                                  className="MuiSvgIcon-root"
                                                  focusable="false"
                                                  viewBox="0 0 24 24"
                                                  aria-hidden="true"
                                                >
                                                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                                                </svg>
                                              </span>
                                            </button>
                                          </h2>
                                          <div
                                            id="acc1"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFlushExample"
                                          >
                                            <div
                                              className="accordion-body"
                                              style={{ padding: "10px" }}
                                            >
                                              <div className="row">
                                                <div className="col-12 col-xl-12">
                                                  <div className="row">
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      <strong>
                                                        Disposition
                                                      </strong>
                                                    </div>
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      Not interested
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      <strong>Campaign</strong>
                                                    </div>
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      jan to feb 2024
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      <strong>
                                                        Phone Used
                                                      </strong>
                                                    </div>
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      7870755950
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      <strong>Remarks</strong>
                                                    </div>
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      Call Back
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="accordion-item rounded-3 border-0 shadow mb-2">
                                          <h2
                                            className="accordion-header"
                                            style={{
                                              marginTop: 0,
                                              fontWeight: 500,
                                              fontSize: 12,
                                            }}
                                          >
                                            <button
                                              style={{
                                                paddingTop: 10,
                                                paddingBottom: 4,
                                                fontWeight: 500,
                                                fontSize: 12,
                                              }}
                                              className="accordion-button border-bottom collapsed fw-semibold"
                                              type="button"
                                              data-bs-toggle="collapse"
                                              data-bs-target="#acc2"
                                              aria-expanded="false"
                                              aria-controls="acc2"
                                            >
                                              Out-bound call made by <br />
                                              bellway.agent3@gmail.com
                                              <br />
                                              at 2 days ago
                                              <span
                                                className="MuiIconButton-label"
                                                style={{ float: "right" }}
                                              >
                                                <svg
                                                  className="MuiSvgIcon-root"
                                                  focusable="false"
                                                  viewBox="0 0 24 24"
                                                  aria-hidden="true"
                                                >
                                                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                                                </svg>
                                              </span>
                                            </button>
                                          </h2>
                                          <div
                                            id="acc2"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFlushExample"
                                          >
                                            <div
                                              className="accordion-body"
                                              style={{ padding: "10px" }}
                                            >
                                              <div className="row">
                                                <div className="col-12 col-xl-12">
                                                  <div className="row">
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      <strong>
                                                        Disposition
                                                      </strong>
                                                    </div>
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      Not interested
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      <strong>Campaign</strong>
                                                    </div>
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      jan to feb 2024
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      <strong>
                                                        Phone Used
                                                      </strong>
                                                    </div>
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      7870755950
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      <strong>Remarks</strong>
                                                    </div>
                                                    <div className="col-6 col-xl-6 pt-2">
                                                      Call Back
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="jss187 jss191" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProspectDetail;
