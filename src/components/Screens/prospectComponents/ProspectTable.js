import axios from "axios";
import moment from "moment/moment";
import React from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;

const columns = [
  {
    name: "Prospect Name",
    selector: (row) => row.firstname,
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row) => moment(row.createdAt).format("DD/MM/YYYY"),
    sortable: true,
  },
  {
    name: "Mobile No",
    selector: (row) => row.phone,
    sortable: true,
  },
  {
    name: "Campaign Name",
    selector: (row) => row.campaignName,
    sortable: true,
  },  
  {
    name: "Assigned To",
    selector: (row) => row.assignTo,
    sortable: true,
  },
  {
    name: "Disposition",
    selector: (row) => row.disposition,
    sortable: true,
  },

  {
    name: "Call Status",
    selector: (row) =>
      row.disposition === "Lead Generation" ? "Pending" : "Connected",
    sortable: true,
  },
];

function ProspectTable() {
  const [selectedRows, setSelectedRows] = React.useState(false);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);
  const [data, setData] = React.useState({});
  const [disposition, setDisposition] = React.useState("All");
  const [campaign, setCampaign] = React.useState("All");
  const [agent, setAgent] = React.useState("All");
  const [page, setPage] = React.useState(1);
  const countPerPage = 10;
  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const userRole = localStorage.getItem("role");

// Get agentEmail and role from localStorage
const agentEmail = localStorage.getItem("agent_email");
const role = localStorage.getItem("role");
const [selectedAgent, setSelectedAgent] = React.useState(agentEmail || "All"); // State to track the selected agent

// Fetch data based on disposition, selected agent, and campaign
const fetchData = async (fDisposition = "All", agentEmail, campaignName, pageNo = 1) => {
  try {
    // Adjust API request based on role and selected agent
    const emailParam = role === "admin" ? (selectedAgent === "All" ? "All" : selectedAgent) : agentEmail;
    const res = await axios.get(
      `${apiUrl}/get_all_prospects?disposition=${fDisposition}&agentEmail=${emailParam}&campaignName=${campaignName}&page=${pageNo}&perPage=${countPerPage}`
    );
    if (res.status === 200) {
      setData(res.data.data);
    }
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

// Pagination request
const onPageRequest = (page) => {
  setPage(page);
  fetchData(disposition, agentEmail, campaign, page);
};

// Effect to fetch data when disposition, agentEmail, campaign, or selectedAgent changes
React.useEffect(() => {
  fetchData(disposition, agentEmail, campaign);
}, [disposition, agentEmail, campaign, selectedAgent]);
  const [filters, setFilters] = React.useState({});
  const fetchFilters = async () => {
    try {
      const res = await axios.get(`${apiUrl}/get_all_prospects_filters`);
      if (res.status === 200) {
        setFilters(res.data.data);
        console.log(res.data.data);
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchFilters();
  }, []);

  const downloadCsv = async () => {
    try {
      await axios.get(
        `${apiUrl}/download_prospects?agentEmail=${agentEmail}&campaignName=${campaign}&disposition=${disposition}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="pros-head">
            <h1>Prospects</h1>
            <button onClick={() => fetchData("All", agentEmail, "All")}>Refresh</button>
          </div>
        </div>
      </div>

      <div className="pros-file-cont-filter">
        <div className="row">
          <div className="col-12 col-lg-5">
            <div className="row">

            {(userRole === "admin" ) && (
              <div className="col">
              <div className="filter-colmn">
                <label>Select By Agent</label>
                <br />
                <select
                  onChange={(e) => setSelectedAgent(e.target.value)} // Update the selected agent
                  value={selectedAgent} // Ensure the dropdown reflects the selected value
                >
                  <option value="All">All</option>
                  {filters.agents?.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent._id}
                    </option>
                  ))}
                </select>
              </div>
            </div>

                  )}
              <div className="col">
                <div className="filter-colmn">
                  <label>Select By Campaign</label>
                  <br />
                  <select onChange={(e) => setCampaign(e.target.value)}>
                    <option value="All">All</option>
                    {filters.campaigns?.map((campaign) => (
                      <option key={campaign._id} value={campaign._id}>
                        {campaign._id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className="filter-colmn">
              <label>Select Disposition</label>
              <br />
              <input
                type="radio"
                name="disposition"
                value="All"
                onChange={(e) => setDisposition(e.target.value)}
              />
              <label>{"  "}All</label>&nbsp;&nbsp;
              <input
                type="radio"
                name="disposition"
                value="Callback"
                onChange={(e) => setDisposition(e.target.value)}
              />
              <label>{"  "}Callback</label>&nbsp;&nbsp;
              <input
                type="radio"
                name="disposition"
                value="Interested"
                onChange={(e) => setDisposition(e.target.value)}
              />
              <label>{"  "}Interested</label>&nbsp;&nbsp;
              <input
                type="radio"
                name="disposition"
                value="Not Interested"
                onChange={(e) => setDisposition(e.target.value)}
              />
              <label>{"  "}Not Interested</label>&nbsp;&nbsp;&nbsp;&nbsp;
              {(userRole === "admin" ) && (
              <button>
                <a
                  href={`${apiUrl}/download_prospects?agentEmail=${selectedAgent}&agentid=${selectedAgent}&campaignName=${campaign}&disposition=${disposition}`}
                >
                  Download CSV
                </a>
              </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={data.prospects}
          selectableRows
          pagination
          paginationServer
          paginationTotalRows={data.total}
          onSelectedRowsChange={handleChange}
          onChangePage={onPageRequest}
          clearSelectedRows={toggledClearRows}
        />
      </div>
    </div>
  );
}

export default ProspectTable;