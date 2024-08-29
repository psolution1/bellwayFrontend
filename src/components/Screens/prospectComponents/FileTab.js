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
      if (res.status === 200) {
        toast.info("Some prospects are already exists");
        toast.info("Total duplicate prospects : " + res.data.data.duplicate);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const [files, setFiles] = React.useState([]);

  const getFileList = async () => {
    try {
      const res = await axios.get(`${apiUrl}/get_all_prospects_files`);
      if (res.status === 200) {
        console.log(res.data);
        setFiles(res.data.data);
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getFileList();
  }, []);

  return (
    <div>
      
      <div className="row">
        <div className="col-12">
          <div className="pros-head">
              <h1>Upload Prospects</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="pros-file-cont">
          <input type="file" name="prospects" onChange={handleChangeFile} />
          <button onClick={handleUpload}>Upload Prospects</button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
            <div className="pros-file-down">
              <div className="row">
                {files.map((file) => {
                  if (file.includes("xlsx"))
                    return (
                      <div className="col-12">
                          <div className="file-down-row">
                        {file + "   "}

                        <a href={`${apiUrl}/download_prospect/${file}`}>Download</a>
                        </div>
                      </div>
                    );
                  else return null;
                })}
              </div>
            </div>
          </div>
      </div>

    </div>
  );
}

export default FileTab;
