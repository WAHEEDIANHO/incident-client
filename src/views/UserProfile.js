import React from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Guide from "../components/Guide";
import Error from "../components/Error";

import "../css/profile.css";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      loading: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    const fetctCriminal = async () => {
      try {
        const res = await this.getCriminal();
        this.setState({ user: res.data, loading: false });
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
    // "https://crms-api.herokuapp.com/api/v1/user",
    const res = await axios.get(
      `${this.props.api}/user/${this.props.id}`,
      config
    );
    return res.data;
  };

  handleInputChange(e) {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value },
    });
  }

  updateUser(e) {
    this.setState({ loading: true });

    const { id } = e.target.dataset;
    axios
      .put(`${this.props.api}/user/${id}`, this.state.user, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
        },
      })
      .then((res) => {
        this.setState({loading: false})
      })
  }

  render() {
    const { user, loading } = this.state;
    return (
      <>
        {loading ? <Loader /> : null}
        <Guide>
          <h3 className="text-end pe-5" >User Profile</h3>
        </Guide>
        <div className="card container rounded bg-white mt-5 mb-5">
          {user.hasOwnProperty("_id") ? (
            <div className="row">
              <div className="col-md-12">
                <div className="p-3 py-5">
                  <h4 className="">Profile Settings</h4>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label className="labels">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        onChange={this.handleInputChange}
                        value={user.lastName ? user.lastName : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        onChange={this.handleInputChange}
                        value={user.firstName ? user.firstName : ""}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="labels">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        onChange={this.handleInputChange}
                        value={user.phone ? user.phone : ""}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="labels">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={this.handleInputChange}
                        value={user.username ? user.username : ""}
                        disabled
                      />
                    </div>
                    { sessionStorage.getItem("isAdmin") === true &&
                        <div className="col-md-6">
                          <label className="labels">Role</label>
                          <input
                              type="text"
                              className="form-control"
                              name="role"
                              onChange={this.handleInputChange}
                              value={user.role ? user.role : ""}
                          />
                        </div>
                    }
                    <div className="col-md-6">
                      <label className="labels">Gender</label>
                      <select
                        name="gender"
                        className="form-select"
                        onChange={this.handleInputChange}
                        value={user.gender ? user.gender : ""}
                      >
                        <option value="">select gender</option>
                        <option value="male">M</option>
                        <option value="female">F</option>
                      </select>
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        onChange={this.handleInputChange}
                        value={user.address ? user.address : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3 text-center">
                <button
                  className="btn btn-large btn-success profile-button p-3"
                  type="button"
                  data-id={user._id}
                  onClick={this.updateUser}
                >
                  Update Profile
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

export default UserProfile;
