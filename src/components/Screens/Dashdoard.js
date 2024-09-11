import axios from "axios";
import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { BarChart } from "recharts";
import moment from "moment";

const apiUrl = process.env.REACT_APP_API_URL;
const colors = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"];
const transparentColors = [
  "rgba(62, 149, 205, 0.5)",
  "rgba(142, 94, 162, 0.5)",
  "rgba(62, 203, 159, 0.5)",
  "rgba(232, 195, 185, 0.5)",
];

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Black"],
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
};

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateRandomColorsArray(size) {
  let colorsArray = [];
  for (let i = 0; i < size; i++) {
    colorsArray.push(getRandomColor());
  }
  return colorsArray;
}

function Dashboard() {
  const userRole = localStorage.getItem("role");
  const [prospectWiseData, setProspectWiseData] = useState({});
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);

  const [agentWiseData, setAgentWiseData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/report_prospects_wise`);
      if (res.status === 200) {
        setProspectWiseData(res.data.data);

        const {
          totalCallDisconnected = 0,
          totalCallback = 0,
          totalInterested = 0,
          totalNotAnswered = 0,
          totalNotContacted = 0,
          totalNotInterested = 0,
          totalNotReachable = 0,
          campaignWise = [],
          agentWise = [],
        } = res.data?.data;
        setPieData({
          labels: [
            "Call Disconnected",
            "Callback",
            "Interested",
            "Not Answered",
            "Not Contacted",
            "Not Interested",
            "Not Reachable",
          ],
          datasets: [
            {
              label: "# of Response",

              data: [
                totalCallDisconnected,
                totalCallback,
                totalInterested,
                totalNotAnswered,
                totalNotContacted,
                totalNotInterested,
                totalNotReachable,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 122, 84, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 122, 84, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });

        if (campaignWise && campaignWise?.length > 0) {
          const labels = campaignWise?.map((item) => item?.campaignName);
          const data = campaignWise?.map((item) => item?.totalCount);
          const backgroundColors = campaignWise?.map(
            (item, index) => colors[index]
          );
          const hoverBackgroundColor = campaignWise?.map(
            (item, index) => transparentColors[index]
          );

          setBarData({
            labels,
            datasets: [
              {
                data,
                label: "# of Response",
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverBackgroundColor,
                borderWidth: 1,
              },
            ],
          });
        }

        if (agentWise && agentWise?.length > 0) {
          const labels = agentWise?.map((item) => item?.assignTo);
          const agentNames = agentWise?.map((item) => item?.agentName);
          console.log(labels);
          const data = agentWise?.map((item) => item?.totalCount);
          const backgroundColors = generateRandomColorsArray(labels?.length);

          // agentWise?.map(
          //   (item, index) => colors[index]
          // );
          const hoverBackgroundColor = backgroundColors?.map(
            (item, index) => item + "80"
          );

          setAgentWiseData({
            agentNames,
            labels: agentNames,
            datasets: [
              {
                data,
                label: "# of Response",
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverBackgroundColor,
                borderWidth: 1,
              },
            ],
          });
        }
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [agentWiseMoreDetailData, setAgentWiseMoreDetailData] = useState(null);
  const [isAgentGrapActive, setIsAgentGrapActive] = useState(false);

  const getDataAgentWise = (index) => {
    try {
      //agentId
      setIsAgentGrapActive(true);

      console.log("index", index, agentWiseData);

      const agent = agentWiseData?.labels[index];
      console.log("agent", agent);
      axios.get(`${apiUrl}/report_prospects_wise/${agent}`).then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          const {
            totalCallDisconnected = 0,
            totalCallback = 0,
            totalInterested = 0,
            totalNotAnswered = 0,
            totalNotContacted = 0,
            totalNotInterested = 0,
            totalNotReachable = 0,
          } = res.data?.data;
          console.log(
            "---",
            totalCallDisconnected,
            totalCallback,
            totalInterested
          );
          setAgentWiseMoreDetailData({
            labels: [
              "Call Disconnected",
              "Callback",
              "Interested",
              "Not Answered",
              "Not Contacted",
              "Not Interested",
              "Not Reachable",
            ],
            datasets: [
              {
                label: "# of Response",

                data: [
                  totalCallDisconnected,
                  totalCallback,
                  totalInterested,
                  totalNotAnswered,
                  totalNotContacted,
                  totalNotInterested,
                  totalNotReachable,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 122, 84, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 122, 84, 1)",
                ],
                borderWidth: 1,
              },
            ],
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getStats = () => {
    try {
      axios.get(`${apiUrl}/get_dashboard_stats`).then((res) => {
        console.log(res.data);
        if (res.status === 200) {
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [callLogs, setCallLogs] = useState([]);
  const [callLogsOverview, setCallLogsOverview] = useState({
    totalCalls: 0,
    duration: 0,
    notConnectedCount: 0,
    callbackCount: 0,
  });

  const getCallLogs = () => {
    try {
      axios.get(`${apiUrl}/get_all_logs`).then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          setCallLogs(res.data.data);

          let overView = {
            totalCalls: 0,
            duration: 0,
            notConnectedCount: 0,
            callbackCount: 0,
          };
          // adding all the call logs
          let callData = res.data.data;

          for (let index = 0; index < callData.length; index++) {
            const element = callData[index];
            overView.totalCalls += element.totalCalls;
            overView.duration += element.duration;
            overView.notConnectedCount += element.notConnectedCount;
            overView.callbackCount += element.callbackCount;
          }
          console.log(overView);
          setCallLogsOverview(overView);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchData();
    getCallLogs();
  }, []);
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
                              Call Detail Wise
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
                              Prospect Wise
                            </button>)}
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
                            <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-pl15-pr5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss259">
                                    <i class="fa fa-compress fa-4x"></i>
                                  </div>
                                  <h4 class="jss255">
                                    {callLogsOverview?.totalCalls}
                                  </h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">Total Calls</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss262">
                                    <i class="fa fa-arrow-down fa-4x"></i>
                                  </div>
                                  <h4 class="jss255">
                                    {callLogsOverview?.callbackCount}
                                  </h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">Total Incoming</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss259">
                                    <i class="fa fa-arrow-up fa-4x"></i>
                                  </div>
                                  <h4 class="jss255">
                                    {callLogsOverview?.totalCalls -
                                      callLogsOverview?.callbackCount}
                                  </h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">Total Outgoing</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss260">
                                    <i class="fa fa-retweet fa-4x"></i>
                                  </div>
                                  <h4 class="jss255">0</h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">Total Missed</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss259">
                                    <i class="fa fa-volume-control-phone fa-4x"></i>
                                  </div>
                                  <h4 class="jss255">
                                    {moment
                                      .utc(callLogsOverview?.duration)
                                      .format("HH:mm:ss")}
                                  </h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">Total TalkTime</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-pr15-pl5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss259">
                                    <i class="fa fa-microphone fa-4x"></i>
                                  </div>
                                  <h4 class="jss255">0</h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">Total Recordings</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-12 col-lg-12 col-md-12 col-xl-12">
                              <div className="jss145 jss148">
                                <div className="jss149 jss157">
                                  <div className="sc-dlMDgC kLgUfe">
                                    <div className="sc-fKgJPI dfhKER">
                                      <div
                                        className="sc-bdnxRM cWvbDL rdt_Table"
                                        role="table"
                                      >
                                        <div
                                          className="sc-gtsrHT juhBur rdt_TableHead"
                                          role="rowgroup"
                                        >
                                          <div
                                            className="sc-dlnjwi NLcNa rdt_TableHeadRow"
                                            role="row"
                                          >
                                            <div className="sc-hKFxyN sc-eCApnc sc-iqAclL isMUWa fqlAYs iupIzr rdt_TableCol">
                                              <div
                                                id="column-1"
                                                role="columnheader"
                                                tabIndex={0}
                                                className="sc-crzoAE huXcZJ rdt_TableCol_Sortable"
                                              >
                                                <div className="sc-dIsUp jEEywD">
                                                  Hour
                                                </div>
                                              </div>
                                            </div>
                                            <div className="sc-hKFxyN sc-eCApnc sc-iqAclL isMUWa fqlAYs iupIzr rdt_TableCol">
                                              <div
                                                id="column-2"
                                                role="columnheader"
                                                tabIndex={0}
                                                className="sc-crzoAE huXcZJ rdt_TableCol_Sortable"
                                              >
                                                <div className="sc-dIsUp jEEywD">
                                                  Total Calls
                                                </div>
                                              </div>
                                            </div>
                                            <div className="sc-hKFxyN sc-eCApnc sc-iqAclL isMUWa fqlAYs iupIzr rdt_TableCol">
                                              <div
                                                id="column-3"
                                                role="columnheader"
                                                tabIndex={0}
                                                className="sc-crzoAE huXcZJ rdt_TableCol_Sortable"
                                              >
                                                <div className="sc-dIsUp jEEywD">
                                                  Connected Calls
                                                </div>
                                              </div>
                                            </div>
                                            <div className="sc-hKFxyN sc-eCApnc sc-iqAclL isMUWa fqlAYs iupIzr rdt_TableCol">
                                              <div
                                                id="column-4"
                                                role="columnheader"
                                                tabIndex={0}
                                                className="sc-crzoAE huXcZJ rdt_TableCol_Sortable"
                                              >
                                                <div className="sc-dIsUp jEEywD">
                                                  Outgoing Calls
                                                </div>
                                              </div>
                                            </div>
                                            <div className="sc-hKFxyN sc-eCApnc sc-iqAclL isMUWa fqlAYs iupIzr rdt_TableCol">
                                              <div
                                                id="column-5"
                                                role="columnheader"
                                                tabIndex={0}
                                                className="sc-crzoAE huXcZJ rdt_TableCol_Sortable"
                                              >
                                                <div className="sc-dIsUp jEEywD">
                                                  Incoming Calls
                                                </div>
                                              </div>
                                            </div>
                                            <div className="sc-hKFxyN sc-eCApnc sc-iqAclL isMUWa fqlAYs iupIzr rdt_TableCol">
                                              <div
                                                id="column-6"
                                                role="columnheader"
                                                tabIndex={0}
                                                className="sc-crzoAE huXcZJ rdt_TableCol_Sortable"
                                              >
                                                <div className="sc-dIsUp jEEywD">
                                                  Missed Calls
                                                </div>
                                              </div>
                                            </div>
                                            <div className="sc-hKFxyN sc-eCApnc sc-iqAclL isMUWa fqlAYs iupIzr rdt_TableCol">
                                              <div
                                                id="column-7"
                                                role="columnheader"
                                                tabIndex={0}
                                                className="sc-crzoAE huXcZJ rdt_TableCol_Sortable"
                                              >
                                                <div className="sc-dIsUp jEEywD">
                                                  Talktime
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        {callLogs &&
                                          callLogs.map((item, index) => {
                                            if (!item.id) return <></>;
                                            return (
                                              <div
                                                offset="250px"
                                                className="sc-hHEiqL clIRY rdt_TableBody"
                                                role="rowgroup"
                                              >
                                                <div
                                                  id="row-1"
                                                  role="row"
                                                  className="sc-jrsJWt bQvvuz rdt_TableRow"
                                                >
                                                  <div
                                                    id="cell-1-undefined"
                                                    role="gridcell"
                                                    className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell"
                                                    data-tag="allowRowEvents"
                                                  >
                                                    <div data-tag="allowRowEvents">
                                                      {item?.interval.includes(
                                                        "0PM"
                                                      )
                                                        ? item?.interval.replace(
                                                            "0PM",
                                                            "12PM"
                                                          )
                                                        : item?.interval}
                                                    </div>
                                                  </div>
                                                  <div
                                                    id="cell-2-undefined"
                                                    role="gridcell"
                                                    className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell"
                                                    data-tag="allowRowEvents"
                                                  >
                                                    <div data-tag="allowRowEvents">
                                                      {item?.totalCalls}
                                                    </div>
                                                  </div>
                                                  <div
                                                    id="cell-3-undefined"
                                                    role="gridcell"
                                                    className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell"
                                                    data-tag="allowRowEvents"
                                                  >
                                                    <div data-tag="allowRowEvents">
                                                      {item?.totalCalls}
                                                    </div>
                                                  </div>
                                                  <div
                                                    id="cell-4-undefined"
                                                    role="gridcell"
                                                    className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell"
                                                    data-tag="allowRowEvents"
                                                  >
                                                    <div data-tag="allowRowEvents">
                                                      {item?.totalCalls -
                                                        item?.callbackCount}
                                                    </div>
                                                  </div>
                                                  <div
                                                    id="cell-5-undefined"
                                                    role="gridcell"
                                                    className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell"
                                                    data-tag="allowRowEvents"
                                                  >
                                                    <div data-tag="allowRowEvents">
                                                      {item?.callbackCount}
                                                    </div>
                                                  </div>
                                                  <div
                                                    id="cell-6-undefined"
                                                    role="gridcell"
                                                    className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell"
                                                    data-tag="allowRowEvents"
                                                  >
                                                    <div data-tag="allowRowEvents">
                                                      0
                                                    </div>
                                                  </div>
                                                  <div
                                                    id="cell-7-undefined"
                                                    role="gridcell"
                                                    className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs haFOUQ rdt_TableCell"
                                                    data-tag="allowRowEvents"
                                                  >
                                                    <span>
                                                      {/* {item?.duration / 1000}{" "}
                                                      sec */}
                                                      {moment
                                                        .utc(item?.duration)
                                                        .format("HH:mm:ss")}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="jss163">
                                  <i>Agent call tracking Hourly report</i>
                                </div>
                                <div className="jss187 jss191" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="tab-1"
                          role="tabpanel"
                          aria-labelledby="nav-tab-1"
                        >
                          <div className="row">
                            <div className="col-12 col-lg-3 col-md-3 col-xl-3 jss-pl15-pr5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss259">
                                    <i class="fa fa-bullhorn fa-5x"></i>
                                  </div>
                                  <p class="jss176">Active Campaigns</p>
                                  <h4 class="jss255">1</h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">View Details</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-3 col-md-3 col-xl-3 jss-p-5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss262">
                                    <i class="fa fa-users fa-5x"></i>
                                  </div>
                                  <p class="jss176">Assigned Members</p>
                                  <h4 class="jss255">58</h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">View Details</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-3 col-md-3 col-xl-3 jss-p-5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss259">
                                    <i class="fa fa-address-card fa-5x"></i>
                                  </div>
                                  <p class="jss176">Fresh Prospects</p>
                                  <h4 class="jss255">250</h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">View Details</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-3 col-md-3 col-xl-3 jss-pr15-pl5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss259">
                                    <i class="fa fa-phone fa-4x"></i>
                                  </div>
                                  <p class="jss176">Total Follow up</p>
                                  <h4 class="jss255">336825</h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">View Details</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-pl15-pr5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss259">
                                    <i class="fa fa-user-plus fa-4x"></i>
                                  </div>
                                  <h4 class="jss255">1128</h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">New Prospects</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss262">
                                    <i class="fa fa-phone fa-4x"></i>
                                  </div>
                                  <h4 class="jss255">20</h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">Total Calls</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss259">
                                    <i class="fa fa-check-circle fa-4x"></i>
                                  </div>
                                  <h4 class="jss255">250</h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">Total Prospects</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss260">
                                    <i class="fa fa-check-circle fa-4x"></i>
                                  </div>
                                  <h4 class="jss255">555</h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">Fresh Prospects</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss259">
                                    <i class="fa fa-calendar fa-4x"></i>
                                  </div>
                                  <h4 class="jss255">654</h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">Followup Calls</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-pr15-pl5">
                              <div class="jss152">
                                <div class="jss156 jss161 jss158 jss159">
                                  <div class="jss257 jss259">
                                    <i class="fa fa-calendar fa-4x"></i>
                                  </div>
                                  <h4 class="jss255">335307</h4>
                                </div>
                                <div class="jss264 jss267">
                                  <div class="jss252">
                                    <a href="#pablo">Overdue Followups</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-12 col-lg-6 col-md-6 col-xl-6">
                              <div className="jss145 jss148">
                                <div className="jss149 jss157">
                                  <div className="dashboard-pie-chart-wrap">
                                    <div className="pie-chart-head">
                                      {pieData && <Pie data={pieData} />}
                                      <h1>Pie chart</h1>
                                    </div>
                                  </div>
                                </div>
                                <div className="jss187 jss191" />
                              </div>
                            </div>
                            <div className="col-12 col-lg-6 col-md-6 col-xl-6">
                              <div className="jss145 jss148">
                                <div className="jss149 jss157">
                                  <div className="dashboard-pie-chart-wrap">
                                    <div className="pie-chart-head">
                                      {barData && <Bar data={barData} />}
                                      <h1>Campaign-wise Responses</h1>
                                    </div>
                                  </div>
                                </div>
                                <div className="jss187 jss191" />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-12 col-lg-12 col-md-12 col-xl-12">
                              <div className="jss145 jss148">
                                <div className="jss149 jss157">
                                  <div className="dashboard-pie-chart-wrap">
                                    <div className="pie-chart-head">
                                      {isAgentGrapActive && (
                                        <button
                                          onClick={() =>
                                            setIsAgentGrapActive(false)
                                          }
                                        >
                                          Back
                                        </button>
                                      )}
                                      {!isAgentGrapActive && agentWiseData && (
                                        <Bar
                                          data={agentWiseData}
                                          options={{
                                            onClick: (event, element) => {
                                              if (isAgentGrapActive) return;
                                              console.log(element[0]);
                                              getDataAgentWise(
                                                element[0].index
                                              );
                                            },
                                          }}
                                        />
                                      )}
                                      {agentWiseMoreDetailData &&
                                        isAgentGrapActive && (
                                          <Bar
                                            data={agentWiseMoreDetailData}
                                            options={{
                                              onClick: (event, element) => {
                                                if (isAgentGrapActive) return;
                                                console.log(element[0]);
                                                getDataAgentWise(
                                                  element[0].index
                                                );
                                              },
                                            }}
                                          />
                                        )}
                                      <h1>Agent-wise Responses</h1>
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

export default Dashboard;
