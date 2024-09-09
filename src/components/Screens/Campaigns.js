import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const apiUrl = process.env.REACT_APP_API_URL;

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const userRole = localStorage.getItem("role");
  const fetchCampaign = async (e) => {
    try {
      console.log("fetch campaign");
      const res = await axios.get(`${apiUrl}/get_all_campaign`);
      if (res.status === 200) {
        console.log(res.data);
        setCampaigns(res.data.data);
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
      
    }
  };

  const navigate = useNavigate();

  const goToCampaign = async (id, stats) => {
    localStorage.setItem(
      "cstats",
      JSON.stringify({
        id,
        stats: Object.keys(stats).length > 0 ? stats : null,
      })
    );
    navigate("/CampaignsDetail", {
      state: { id, stats: Object.keys(stats).length > 0 ? stats : null },
    });
  };

  React.useEffect(() => {
    fetchCampaign();
  }, []);

  const deleteCampaign = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/delete_campaign/${id}`);
      if (res.status === 200) {
        toast.success("Campaign Deleted Successfully");
        fetchCampaign();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logedInAgentEmail = localStorage.getItem("agent_email");
  const startCalling = async (id) => {
    try {
      const res = await axios.get(
        `${apiUrl}/start_calling?agentEmail=${logedInAgentEmail}&campaignId=${id}`
      );
      if (res.status == 200 && res.data.data) {
        navigate("/ProspectDetail", { state: res.data.data });
      } else {
        toast.info("You don't have any pending lead");
      }
    } catch (err) {
      toast.info("You don't have any pending lead");
      console.log(err);
    }
  };

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
                              ACTIVE
                            </button>
                            {(userRole === "admin" ) && (
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
                              INACTIVE
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
                          {(userRole === "admin" ) && (
                          <div className="row">
                            <div className="col-12 col-lg-12">
                              <div className="btn-create-campaigns-wrap">
                                {/* <a className="btn-create-campaigns">
                                  Create Campaigns
                                                        </a> */}
                                <Link
                                  to="/CreateCampaigns"
                                  className="btn-create-campaigns"
                                >
                                  Create Campaigns
                                </Link>
                              </div>
                            </div>
                          </div>
                          )}
                          <div className="row">
                            {campaigns
                              .filter((item) => item.IsActive)
                              .map((item) => (
                                <div className="col-12 col-lg-3 col-md-3 col-xl-3 jss-pl15-pr5">
                                  <div
                                    className="jss1456 campaigns-wrap"
                                    style={{
                                      marginTop: "15px",
                                      marginBottom: "15px",
                                    }}
                                  >
                                    <div className="jss149">
                                      <div className="MuiGrid-root jss69 MuiGrid-container">
                                        <div className="MuiGrid-root jss70 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-12">
                                          <p
                                            className="campaigns-title"
                                            title="jan to feb 2024"
                                          >
                                            {item?.name}
                                          </p>
                                          <div className="border-t-2" />
                                          <span className="campaigns-sta">
                                            {/* {item?.IsActive
                                              ? "Active"
                                              : "Inactive"} */}
                                            Active
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="jss1632">
                                      <div className="campaigns-item">
                                        <span className="MuiTypography-root MuiTypography-caption MuiTypography-gutterBottom MuiTypography-displayBlock">
                                          <i
                                            className="fa fa-clock-o"
                                            aria-hidden="true"
                                          />
                                          &nbsp;
                                          {Object.keys(item?.stats).length > 0
                                            ? item.stats?.totalPendingCalls
                                            : 0}
                                          &nbsp; Pending calls
                                        </span>
                                        <span className="MuiTypography-root MuiTypography-caption MuiTypography-gutterBottom MuiTypography-displayBlock">
                                          <i
                                            className="fa fa-line-chart"
                                            aria-hidden="true"
                                          />
                                          &nbsp;
                                          {Object.keys(item?.stats).length > 0
                                            ? item.stats?.upcomingFollowups
                                            : 0}
                                          &nbsp;Upcoming followups
                                        </span>
                                        <span className="MuiTypography-root MuiTypography-caption MuiTypography-gutterBottom MuiTypography-displayBlock">
                                          <i
                                            className="fa fa-exclamation-triangle"
                                            aria-hidden="true"
                                          />
                                          &nbsp;
                                          {Object.keys(item?.stats).length > 0
                                            ? item.stats?.totalOverdue
                                            : 0}{" "}
                                          &nbsp;Overdue followups
                                        </span>
                                      </div>
                                      <div className="MuiGrid-root jss70 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-8">
                                        <div className="MuiGrid-root jss69 MuiGrid-container">
                                          <div className="MuiGrid-root jss70 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-3">
                                            <div className="campaigns-actions">
                                              <a>
                                                <i
                                                  className="fa fa-phone-square"
                                                  aria-hidden="true"
                                                  style={{
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    startCalling(item._id)
                                                  }
                                                />
                                              </a>
                                              {(userRole === "admin" ) && (
                                              <a>
                                                <i className="fa fa-user-plus" />
                                              </a>
                                              )}
                                               {(userRole === "admin" ) && (
                                              <a>
                                                <i className="fa fa-pencil-square-o" />
                                              </a>
                                              )}
                                              {(userRole === "admin" ) && (
                                              <a>
                                                <i
                                                  className="fa fa-trash"
                                                  aria-hidden="true"
                                                  style={{
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() => {
                                                    deleteCampaign(item._id);
                                                  }}
                                                />
                                              </a>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="jss538 campaigns-footer">
                                      {/* <a style={{position: 'absolute', right: 10, bottom: 10}}>
                                                                View More&nbsp;&nbsp;<i className="fa fa-angle-right" aria-hidden="true" />
                                                            </a> */}
                                      <button
                                        onClick={() =>
                                          goToCampaign(item._id, item?.stats)
                                        }
                                        style={{
                                          position: "absolute",
                                          right: 10,
                                          bottom: 10,
                                        }}
                                      >
                                        View More&nbsp;&nbsp;
                                        <i
                                          className="fa fa-angle-right"
                                          aria-hidden="true"
                                        />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="tab-1"
                          role="tabpanel"
                          aria-labelledby="nav-tab-1"
                        >
                          <div className="row">
                            {campaigns
                              .filter((item) => !item.IsActive)
                              .map((item) => (
                                <div className="col-12 col-lg-3 col-md-3 col-xl-3 jss-pl15-pr5">
                                  <div
                                    className="jss1456 campaigns-wrap"
                                    style={{
                                      marginTop: "15px",
                                      marginBottom: "15px",
                                    }}
                                  >
                                    <div className="jss149">
                                      <div className="MuiGrid-root jss69 MuiGrid-container">
                                        <div className="MuiGrid-root jss70 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-12">
                                          <p
                                            className="campaigns-title"
                                            title="jan to feb 2024"
                                          >
                                            {item?.name}
                                          </p>
                                          <div className="border-t-2" />
                                          <span
                                            className="campaigns-sta"
                                            style={{
                                              color: "red",
                                              backgroundColor: "#ff00008a",
                                            }}
                                          >
                                            Inactive
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="jss1632">
                                      <div className="campaigns-item">
                                        <span className="MuiTypography-root MuiTypography-caption MuiTypography-gutterBottom MuiTypography-displayBlock">
                                          <i
                                            className="fa fa-clock-o"
                                            aria-hidden="true"
                                          />
                                          &nbsp;
                                          {Object.keys(item?.stats).length > 0
                                            ? item.stats?.totalPendingCalls
                                            : 0}
                                          &nbsp;Pending calls
                                        </span>
                                        <span className="MuiTypography-root MuiTypography-caption MuiTypography-gutterBottom MuiTypography-displayBlock">
                                          <i
                                            className="fa fa-line-chart"
                                            aria-hidden="true"
                                          />
                                          &nbsp;
                                          {Object.keys(item?.stats).length > 0
                                            ? item.stats?.upcomingFollowups
                                            : 0}
                                          &nbsp;Upcoming followups
                                        </span>
                                        <span className="MuiTypography-root MuiTypography-caption MuiTypography-gutterBottom MuiTypography-displayBlock">
                                          <i
                                            className="fa fa-exclamation-triangle"
                                            aria-hidden="true"
                                          />
                                          &nbsp;
                                          {Object.keys(item?.stats).length > 0
                                            ? item.stats?.totalOverdue
                                            : 0}{" "}
                                          &nbsp;Overdue followups
                                        </span>
                                      </div>
                                      <div className="MuiGrid-root jss70 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-8">
                                        <div className="MuiGrid-root jss69 MuiGrid-container">
                                          <div className="MuiGrid-root jss70 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-3">
                                            <div className="campaigns-actions">
                                              <a>
                                                <i
                                                  className="fa fa-phone-square"
                                                  aria-hidden="true"
                                                />
                                              </a>
                                              <a>
                                                <i className="fa fa-user-plus" />
                                              </a>
                                              <a>
                                                <i className="fa fa-pencil-square-o" />
                                              </a>
                                              {(userRole === "admin" ) && (
                                              <a>
                                                <i
                                                  className="fa fa-trash"
                                                  aria-hidden="true"
                                                />
                                              </a>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="jss538 campaigns-footer">
                                      {/* <a style={{position: 'absolute', right: 10, bottom: 10}}>
                                                                View More&nbsp;&nbsp;<i className="fa fa-angle-right" aria-hidden="true" />
                                                            </a> */}
                                      <Link
                                        to="/CampaignsDetail"
                                        style={{
                                          position: "absolute",
                                          right: 10,
                                          bottom: 10,
                                        }}
                                      >
                                        View More&nbsp;&nbsp;
                                        <i
                                          className="fa fa-angle-right"
                                          aria-hidden="true"
                                        />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              ))}
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

export default Campaigns;
