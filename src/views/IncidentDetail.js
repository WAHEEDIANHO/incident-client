import React from "react";
import axios from "axios";

import Guide from "../components/Guide";
import Loader from "../components/Loader";
import Error from "../components/Error";

import "../css/profile.css";

class IncidentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incident: {},
      loading: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateCriminal = this.updateCriminal.bind(this);
  }

  componentDidMount() {
    const fetctCriminal = async () => {
      try {
        const res = await this.getCriminal();
        this.setState({ incident: res, loading: false });
      } catch (err) {
        this.setState({ loading: false });
      }
    };
    fetctCriminal();
  }

  // fetch data
  getCriminal = async () => {
    const config = {
      headers: {
        authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
      },
    };
    // "https://crms-api.herokuapp.com/api/v1/incident",
    const { data: { data  }    } = await axios.get(
      `${this.props.api}/incident/${this.props.id}`,
      config
    );
    return data;
  };

  handleInputChange(e) {
    this.setState({
      incident: { ...this.state.incident, [e.target.name]: e.target.value },
    });
  }

  updateCriminal(e) {
    this.setState({ loading: true });

    const { id } = e.target.dataset;
    axios
      .put(`${this.props.api}/incident/${id}`, this.state.incident, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
        },
      })
      .then((res) => {
        this.setState({loading: false});
      })
  }

  render() {
    const { incident, loading } = this.state;
    return (
      <>
        {loading && <Loader /> }
        <Guide>
          <h3 className="text-end pe-5">Single Incident View</h3>
        </Guide>
        <div className="card container rounded bg-white mt-5 mb-5">
          {incident.hasOwnProperty("_id") ? (
            <div className="row">
              <div className="col-md-12">
                <div className="p-3 py-5">
                  <h4 className="">Incident -- {incident._id}</h4>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label className="labels">Reporter</label>
                      <input
                        type="text"
                        className="form-control text-muted"
                        placeholder="first name"
                        name="reportedBy"
                        onChange={this.handleInputChange}
                        value={incident?.reportedBy ? incident.reportedBy : ""}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Reported Time</label>
                      <input
                          type="date"
                          className="form-control text-muted"
                          name="reportedTime"
                          onChange={this.handleInputChange}
                          value={incident?.reportedTime ? incident.reportedTime.slice(0, 10) : ""}
                          disabled
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="labels">Security Agent</label>
                      <input
                        type="text"
                        className="form-control"
                        name="securityAgent"
                        onChange={this.handleInputChange}
                        value={incident?.securityAgent ? incident.securityAgent : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Progress Note</label>
                      <input
                        type="range"
                        className="form-control"
                        name="progressNote"
                        onChange={this.handleInputChange}
                        value={incident?.progressNote ? incident.progressNote : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">LGA</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lga"
                        onChange={this.handleInputChange}
                        value={incident?.lga ? incident.lga : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        onChange={this.handleInputChange}
                        value={incident?.state ? incident.state : ""}
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="labels">Description</label>
                      <textarea rows={3}
                        type="text"
                        className="form-control"
                        name="description"
                        onChange={this.handleInputChange}
                        value={incident.description ? incident.description : ""}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Officer in Charge</label>
                      <input
                        type="text"
                        className="form-control"
                        name="securityAgent"
                        onChange={this.handleInputChange}
                        value={incident.securityAgent ? incident.securityAgent : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3 text-center">
                <button
                  className="btn btn-large btn-success profile-button p-3"
                  type="button"
                  onClick={this.updateCriminal}
                  data-id={incident._id}
                >
                  Save Profile
                </button>

                <button
                  className="btn btn-large btn-warning profile-button p-3 mx-3 text-white"
                  type="button"
                >
                  Reset Profile
                </button>
              </div>
            </div>
          ) : (
            <Error />
          )}
        </div>
      </>
    );
  }
}

export default IncidentDetail;
