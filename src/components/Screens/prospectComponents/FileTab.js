import axios from "axios";
import moment from "moment/moment";
import React from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;

function FileTab() {
  const [selectedRows, setSelectedRows] = React.useState(false);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);

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

  return (
    <div>
      <div className="row">
        <div className="col">
          <h1>Upload Prospects</h1>
        </div>
      </div>
      <div className="col">
        <input type="file" name="prospects" onChange={handleChangeFile} />
        <button onClick={handleUpload}>Upload Prospects</button>
      </div>
    </div>
  );
}

export default FileTab;
