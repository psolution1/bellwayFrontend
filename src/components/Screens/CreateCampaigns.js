import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl1 = process.env.REACT_APP_LIENCE_URL;
const DBuUrl = process.env.REACT_APP_DB_URL;

function CreateCampaigns() {
  const navigate = useNavigate()
  const [campaign, setCampaign] = useState({
    name: "",
    disposition: "Lead Generation",
    workflow: "",
    Telephony: "Default",
    additionalField: "0",
    agentAssign: "0",
  });
  const [active, setActive] = useState(true);

  const handleChange = (e) => {
    setCampaign({
      ...campaign,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(campaign);
    campaign.IsActive = active;
    try {
      const res = await axios.post(`${apiUrl}/add_campaign`, campaign);
      if (res.status === 201) {
        toast.success("Campaign Added Successfully");
        navigate("/campaigns");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handelCancle = () => {
    setCampaign({
      name: "",
      disposition: "",
      workflow: "",
      Telephony: "Default",
      additionalField: "0",
      agentAssign: "0",
    });

    window.location.href = "/campaigns";
  };

  return (
    <div>
      <div className="content-wrapper">
        <section className="content py-5">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-12 col-md-12 col-xl-12">
                <div className="CampaignsDetail-tab-wrapper">
                  <div className="d-flex justify-content-center align-items-center bg-light">
                    <div className="card shadow" style={{ width: "100%" }}>
                      <nav>
                        <div className="nav-tabs-head">
                          <div
                            className="nav nav-tabs"
                            id="nav-tab"
                            role="tablist"
                          >
                            <button
                              className="nav-link active"
                              id="nav-tab-0"
                              data-bs-toggle="tab"
                              data-bs-target="#tab-0"
                              type="button"
                              role="tab"
                              aria-controls="nav-home"
                              aria-selected="true"
                            >
                              Add Campaigns
                            </button>
                          </div>
                        </div>
                      </nav>
                      <div
                        className="tab-content border bg-light"
                        id="nav-tabContent"
                      >
                        <div
                          className="tab-pane fade active show"
                          id="tab-0"
                          role="tabpanel"
                          aria-labelledby="nav-tab-0"
                        >
                          <div className="row">
                            <div className="col-md-6 col-xs-12">
                              <div className="row">
                                <div className="col-md-12 col-xs-12">
                                  <h1 className="title-add">
                                    Campaign Details
                                  </h1>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 col-xs-12">
                                  <label htmlFor="full_name">
                                    Name <span className="text-danger">*</span>{" "}
                                  </label>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      name="name"
                                      placeholder="Campaign Name"
                                      classname="form-control"
                                      onChange={handleChange}
                                      style={{
                                        width: "100%",
                                        borderWidth: 1,
                                        borderColor: "#d8d8d8",
                                        borderRadius: 3,
                                        padding: "7px 10px",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12 col-xs-12">
                                  <label htmlFor="">
                                    Work Flow{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <div className="form-group">
                                    <select
                                      onChange={handleChange}
                                      name="workflow"
                                      className="form-control"
                                      style={{
                                        width: "100%",
                                        borderWidth: 1,
                                        borderColor: "#d8d8d8",
                                        borderRadius: 3,
                                        padding: "7px 10px",
                                      }}
                                    >
                                      <option value="None">None</option>
                                      <option value="Lead Generation">
                                        Lead Generation
                                      </option>
                                      <option value="Custom">Custom</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-12 col-xs-12">
                                  <label htmlFor="">
                                    Telephony{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <div className="form-group">
                                    <select
                                      onChange={handleChange}
                                      name="Telephony"
                                      className="form-control"
                                      style={{
                                        width: "100%",
                                        borderWidth: 1,
                                        borderColor: "#d8d8d8",
                                        borderRadius: 3,
                                        padding: "7px 10px",
                                      }}
                                    >
                                      <option value="Default">Default</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6 col-xs-12">
                              <div className="row">
                                <div className="col-md-12 col-xs-12">
                                  <h1 className="title-add">
                                    Campaign Settings
                                  </h1>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 col-xs-12">
                                  <label htmlFor="">
                                    Disposition{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <div className="form-group">
                                    <select
                                      name="disposition"
                                      onChange={handleChange}
                                      className="form-control"
                                      style={{
                                        width: "100%",
                                        borderWidth: 1,
                                        borderColor: "#d8d8d8",
                                        borderRadius: 3,
                                        padding: "7px 10px",
                                      }}
                                    >
                                      <option value="Interested">
                                        Interested
                                      </option>
                                      <option value="Not Interested">
                                        Not Interested
                                      </option>
                                      <option value="Callback">Callback</option>
                                      <option value="Not Answering">
                                        Not Answering
                                      </option>
                                      <option value="Not Reachable">
                                        Not Reachable
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-12 col-xs-12">
                                  <label htmlFor="">
                                    Additional Fields{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <div className="form-group">
                                    <select
                                      name="additionalField"
                                      className="form-control"
                                      onChange={handleChange}
                                      style={{
                                        width: "100%",
                                        borderWidth: 1,
                                        borderColor: "#d8d8d8",
                                        borderRadius: 3,
                                        padding: "7px 10px",
                                      }}
                                    >
                                      <option value="0">
                                        Call Prospect immediately after adding
                                        manually
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-12 col-xs-12">
                                  <label htmlFor="">
                                    Assign Agent
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <div className="form-group">
                                    <select
                                      name="agentAssign"
                                      className="form-control"
                                      onChange={handleChange}
                                      style={{
                                        width: "100%",
                                        borderWidth: 1,
                                        borderColor: "#d8d8d8",
                                        borderRadius: 3,
                                        padding: "7px 10px",
                                      }}
                                    >
                                      <option value="0">
                                        any available agent
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-12 col-xs-12">
                                  <div className="form-group">
                                    <input
                                      // className="form-check-input"
                                      type="checkbox"
                                      name="active"
                                      onClick={() => setActive(!active)}
                                      defaultChecked={active}
                                      value={active}
                                    />
                                    {"  "}Active
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12 col-xs-12 pt-3 pb-4">
                              <div className="row text-center">
                                <div className="col-md-12 col-xs- max-auto py-10 pt-10 ">
                                  <input
                                    type="button"
                                    onClick={handleSubmit}
                                    value="SAVE"
                                    style={{ marginRight: "10px" }}
                                    className="button-57 bg_buttonsd"
                                  />
                                  <input
                                    onClick={handelCancle}
                                    type="button"
                                    value="CANCEL"
                                    className="button-57 buttons_sdsre"
                                  />
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
        </section>
      </div>
    </div>
  );
}

export default CreateCampaigns;
