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
      row.disposition == "Lead Generation" ? "Pending" : "Connected",
    sortable: true,
  },
];

function ProspectTable() {
  const [selectedRows, setSelectedRows] = React.useState(false);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  // Toggle the state so React Data Table changes to clearSelectedRows are triggered
  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };

  const [file, setFile] = React.useState();

  function handleChangeFile(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("prospects", file);
      formData.append("fileName", file.name);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const res = await axios.post(
        `${apiUrl}/add_bulk_prospect`,
        formData,
        config
      );
      console.log(res.status, res.data);
      if (res.status === 201) {
        toast.success("Prospect Added Successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    try {
      const agent = localStorage.getItem("agent_email")
      const res = await axios.get(`${apiUrl}/get_all_prospects?agent=${agent}`);
      if (res.status === 200) {
        setData(res.data.data);
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col">
          <h1>Prospect Table</h1>
        </div>
      </div>
      <div className="col" style={{ float: "right", marginBottom: "10px" }}>
        <button onClick={fetchData}>Refresh Prospect</button>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={data}
          selectableRows
          pagination
          onSelectedRowsChange={handleChange}
          clearSelectedRows={toggledClearRows}
        />
      </div>
    </div>
  );
}

export default ProspectTable;
