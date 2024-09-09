import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProspectTable from "./prospectComponents/ProspectTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import FileTab from "./prospectComponents/FileTab";
import { duration } from "moment";

const apiUrl = process.env.REACT_APP_API_URL;
function CampaignsDetail() {
  const userRole = localStorage.getItem("role");
  const logedInAgentEmail = localStorage.getItem("agent_email");
  const navigate = useNavigate();
  const location = useLocation();

  const [stats, setStats] = useState(location?.state?.stats);
  const [id, setId] = useState("");

  const startCalling = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/start_calling?agentEmail=${logedInAgentEmail}&campaignId=${id}`
      );
      if (res.status == 200 && res.data.data) {
        console.log("---", res.data);
        navigate("/ProspectDetail", { state: res.data.data });
      } else {
        toast.info("You don't have any pending lead");
      }
    } catch (err) {
      console.log(err);
      toast.info("You don't have any pending lead");
    }
  };

  const overDueCalling = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/overdue_call?agentEmail=${logedInAgentEmail}&campaignId=${id}`
      );
      if (res.status == 200 && res.data.data) {
        console.log("---", res.data);
        navigate("/ProspectDetail", { state: res.data.data });
      } else {
        toast.info("You don't have any pending lead");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const freshCall = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/fresh_calling?agentEmail=${logedInAgentEmail}&campaignId=${id}`
      );
      if (res.status === 200 && res.data.data) {
        console.log(res.data);
        if (res.status == 200 && res.data.data) {
          navigate("/ProspectDetail", { state: res.data.data });
        } else {
          toast.info("You don't have any pending lead");
        }
      }
    } catch (err) {
      console.log(err);
      toast.info("You don't have any pending lead");
    }
  };

  React.useEffect(() => {
    const cstate = localStorage.getItem("cstats");
    if (cstate) {
      const state = JSON.parse(cstate);
      setStats(state?.stats);
      setId(state?.id);
    } else {
      setStats(location.state?.stats);

      setId(location.state?.id);
    }
  }, [location.state]);

  return (
    <div>
      <div className="content-wrapper">
        <section className="content py-5">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-12 col-md-12 col-xl-12">
                <div className="dashboard-tab-wrapper">
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
                              HOME
                            </button>
                            
                            <button
                              className="nav-link"
                              id="nav-tab-1"
                              data-bs-toggle="tab"
                              data-bs-target="#tab-1"
                              type="button"
                              role="tab"
                              aria-controls="nav-profile"
                              aria-selected="false"
                            >
                              PROSPECTS
                            </button>
                          
                            {/* <button
                              className="nav-link"
                              id="nav-tab-2"
                              data-bs-toggle="tab"
                              data-bs-target="#tab-2"
                              type="button"
                              role="tab"
                              aria-controls="nav-profile"
                              aria-selected="false"
                            >
                              MEMBERS
                            </button> */}
                        {(userRole === "admin" ) && (
                            <button
                              className="nav-link"
                              id="nav-tab-3"
                              data-bs-toggle="tab"
                              data-bs-target="#tab-3"
                              type="button"
                              role="tab"
                              aria-controls="nav-profile"
                              aria-selected="false"
                            >
                              FILES
                            </button>
                            )}
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
                            <div className="col-12 col-lg-7">
                              <div className="row">
                                <div className="col-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-xl-12 text-center pt-3">
                                      {/* <span class="MuiButton-label">
                                        &nbsp;<b>0</b> &nbsp; overdue out of
                                        &nbsp; <b>0</b> &nbsp; pending followups
                                        today
                                      </span> */}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12 col-xl-6 text-center pt-3">
                                      <Link
                                        // to="/ProspectDetail"
                                        onClick={freshCall}
                                        className="MuiButtonBase-root MuiButton-root MuiButton-outlined jss82 jss88 jss96"
                                        style={{ display: "block" }}
                                      >
                                        <span className="MuiButton-label">
                                          <svg
                                            className="MuiSvgIcon-root"
                                            focusable="false"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                          >
                                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                                          </svg>
                                          Fresh Calling
                                        </span>
                                        <span className="MuiTouchRipple-root"></span>
                                      </Link>
                                    </div>
                                    <div className="col-12 col-xl-6 text-center pt-3">
                                      <Link
                                        className="MuiButtonBase-root MuiButton-root MuiButton-outlined jss82 jss89 jss96"
                                        style={{ display: "block" }}
                                        onClick={overDueCalling}
                                      >
                                        <span className="MuiButton-label">
                                          <svg
                                            className="MuiSvgIcon-root"
                                            focusable="false"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                          >
                                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                                          </svg>
                                          Overdue
                                        </span>
                                        <span className="MuiTouchRipple-root"></span>
                                      </Link>
                                    </div>
                                    <div className="col-12 col-xl-12 text-center pt-1">
                                      <Link
                                        // to="/ProspectDetail"
                                        className="MuiButtonBase-root MuiButton-root MuiButton-outlined jss82 jss86 jss96"
                                        style={{ display: "block" }}
                                        onClick={startCalling}
                                      >
                                        <span className="MuiButton-label">
                                          <svg
                                            className="MuiSvgIcon-root"
                                            focusable="false"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                          >
                                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                                          </svg>
                                          Start Calling
                                        </span>
                                        <span className="MuiTouchRipple-root"></span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-12 col-lg-4 col-md-4 col-xl-4 jss-pl15-pr5">
                                  <div class="jss152">
                                    <div class="jss156 jss161 jss158 jss159">
                                      <div class="jss257 jss259">
                                        <i class="fa fa-address-card fa-5x"></i>
                                      </div>
                                      <h4 class="jss255">
                                        {stats ? stats?.totalProspects : 0}
                                      </h4>
                                    </div>
                                    <div class="jss264 jss267">
                                      <div class="jss252">Total Prospects</div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-12 col-lg-4 col-md-4 col-xl-4 jss-p-5">
                                  <div class="jss152">
                                    <div class="jss156 jss161 jss158 jss159">
                                      <div class="jss257 jss262">
                                        <i class="fa fa-user-plus fa-4x"></i>
                                      </div>
                                      <h4 class="jss255">
                                        {stats ? stats?.upcomingFollowups : 0}
                                      </h4>
                                    </div>
                                    <div class="jss264 jss267">
                                      <div class="jss252">Fresh Prospects</div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-12 col-lg-4 col-md-4 col-xl-4 jss-pr15-pl5">
                                  <div class="jss152">
                                    <div class="jss156 jss161 jss158 jss159">
                                      <div class="jss257 jss259">
                                        <i class="fa fa-phone fa-4x"></i>
                                      </div>

                                      <h4 class="jss255">
                                        {stats
                                          ? stats?.totalProspects -
                                            stats?.upcomingFollowups
                                          : 0}
                                      </h4>
                                    </div>
                                    <div class="jss264 jss267">
                                      <div class="jss252">Total Follow up</div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-12 col-lg-6 col-md-6 col-xl-6 jss-pl15-pr5">
                                  <div class="jss152">
                                    <div class="jss156 jss161 jss158 jss159">
                                      <div class="jss257 jss259">
                                        <i class="fa fa-calendar fa-4x"></i>
                                      </div>
                                      <h4 class="jss255">
                                        {stats ? stats?.totalPendingCalls : 0}
                                      </h4>
                                    </div>
                                    <div class="jss264 jss267">
                                      <div class="jss252">
                                        Upcoming followups
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-12 col-lg-6 col-md-6 col-xl-6 jss-pr15-pl5">
                                  <div class="jss152">
                                    <div class="jss156 jss161 jss158 jss159">
                                      <div class="jss257 jss259">
                                        <i class="fa fa-warning fa-4x"></i>
                                      </div>
                                      <h4 class="jss255">
                                        {stats?.totalOverdue}
                                      </h4>
                                    </div>
                                    <div class="jss264 jss267">
                                      <div class="jss252">
                                        Overdue Followups
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-5">
                              <div className="row pt-3">
                                <div className="col-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-6 col-xl-6 pt-2">
                                      <strong>Workflow</strong>
                                    </div>
                                    <div className="col-6 col-xl-6 pt-2">
                                      Lead Generation
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6 col-xl-6 pt-3">
                                      <strong>Telephony</strong>
                                    </div>
                                    <div className="col-6 col-xl-6 pt-3">
                                      Default
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6 col-xl-6 pt-3">
                                      <strong>Prospect View Type </strong>
                                    </div>
                                    <div className="col-6 col-xl-6 pt-3">
                                      Cycle Based
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6 col-xl-6 pt-3">
                                      <strong>Help Script</strong>
                                    </div>
                                    <div className="col-6 col-xl-6 pt-3">
                                      None
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6 col-xl-6 pt-3">
                                      <strong>Created at</strong>
                                    </div>
                                    <div className="col-6 col-xl-6 pt-3">
                                      9:59:56 am January 10th 2024
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6 col-xl-6 pt-3">
                                      <strong>Launch time</strong>
                                    </div>
                                    <div className="col-6 col-xl-6 pt-3">
                                      NA
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane"
                          id="tab-1"
                          role="tabpanel"
                          aria-labelledby="nav-tab-1"
                        >
                          <ProspectTable />
                        </div>
                        <div
                          className="tab-pane"
                          id="tab-3"
                          role="tabpanel"
                          aria-labelledby="nav-tab-3"
                        >
                          <FileTab />
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

export default CampaignsDetail;
