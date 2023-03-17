import { useState, useEffect } from "react";
import axios from "axios";
import "../css/login.css";
import Loader from "../components/Loader";

import GNavBar from "../components/GNavBar";
import {useLocation} from "react-router-dom";

function AddIncident({ api }) {
  const [incident, setIncident] = useState({});
  const [loader, setLoader] = useState(false);
  const [incident_id, setIncidentID] = useState();
  const { pathname } = useLocation()

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${api}/incident`, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
        },
      });
      const { data } = res.data;
      setIncidentID(`CRMS${(data.length + 1).toString().padStart(3, 0)}`);
      // return data.length;
    })();
  });

  const addCriminal = (e) => {
    e.preventDefault();
    setLoader(true);

    const data = incident;
    data.incident_id = incident_id;

    axios
      .post(`${api}/incident`, data)
      .then((res) => {

        setIncident({
          description: "",
          address: "",
          state: "",
          lga: "",
          reportedTime: "",
          reportedBy: "",
          securityAgent: "",
          progressNote: "",
        });
        setLoader(false);
        alert("Incident reported successfully");
      })
      .catch((err) => {
        alert("oops! error while submitting form \n please try again");
        setLoader(false);
      });
  };

  const handleChange = (e) => {
    setIncident({
      ...incident,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <>
      {loader ? <Loader /> : null}
      { !pathname.includes("dashboard") && <GNavBar/> }
        <div className="container mt-5 mb-4 mt-3">
          <form className="row g-3" onSubmit={addCriminal}>
            <div className="row align-items-center mb-5">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Incident ID
                </label>
                <input
                  disabled
                  type="text"
                  name="incident_id"
                  className="form-control my-auto my-auto"
                  value={incident_id ? incident_id : ""}
                />
              </div>
            </div>

              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  name="reportedBy"
                  id="fullname"
                  onChange={handleChange}
                  value={incident.reportedBy ? incident?.reportedBy : ""}
                />
                <label htmlFor="fullname" className="form-label text-muted">
                  Reporter Full Name
                </label>
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  onChange={handleChange}
                  value={incident.state ? incident?.state : ""}
                />
                <label htmlFor="state" className="form-label text-muted">
                  State
                </label>
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="lga"
                  id="lga"
                  onChange={handleChange}
                  value={incident.lga ? incident?.lga : ""}
                />
                <label htmlFor="date" className="form-label text-muted">
                  LGA
                </label>
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  id="address"
                  onChange={handleChange}
                  value={incident.address ? incident?.address : ""}
                />
                <label htmlFor="date" className="form-label text-muted">
                  Place of Incident
                </label>
              </div>

            <div className="col-md-4">
              <input
                type="date"
                id="date"
                className="form-control"
                name="reportedTime"
                onChange={handleChange}
                value={incident.reportedTime ? incident?.reportedTime : ""}
              />
              <label htmlFor="date" className="form-label text-muted">
                Reported Date
              </label>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="securityAgent"
                id="agent"
                onChange={handleChange}
                value={incident.securityAgent ? incident?.securityAgent : ""}
              />
              <label htmlFor="agent" className="form-label text-muted">
                 Security Agent
              </label>
            </div>
            <div className="col-md-4">
              <input
                type="range"
                className="form-control"
                id="progress"
                name="progressNote"
                onChange={handleChange}
                value={incident.progressNote ? incident?.progressNote : ""}
              />
              <label htmlFor="date" className="form-label text-muted">
                Progress Note
              </label>
            </div>


            <div className="col-md-12">
              <textarea
                  name="description"
                  id="desc"
                  className="form-control"
                  value={incident.description ? incident?.description : ""}
                  onChange={handleChange}
              />
              <label htmlFor="desc" className="form-label text-muted">
                Description
              </label>
            </div>


            <div className="col-12">
              <button type="submit" className="btn btn-lg btn-success w-100 mt-3">
                Register
              </button>
            </div>
          </form>
      </div>
    </>
  );
}

export default AddIncident;
