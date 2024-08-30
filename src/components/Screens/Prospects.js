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
function Prospects() {
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
                            
                          </div>
                        </div>
                      </nav>
                      <div
                        className="tab-content border bg-light"
                        id="nav-tabContent"
                      >
                       
                        <div
                          className="tab-pane fade active show"
                          id="tab-1"
                          role="tabpanel"
                          aria-labelledby="nav-tab-1"
                        >
                          <ProspectTable />
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

export default Prospects;
