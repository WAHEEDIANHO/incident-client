import React from "react";
import axios from "axios";

import Report from "../components/Report";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Search from "../components/Search";
import Guide from "../components/Guide";

class StaffReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = { users: [], loading: false, search: "" };

    this.handleDelete = this.handleDelete.bind(this);
    this.handeleSearch = this.handeleSearch.bind(this);
  }

  componentDidMount() {
    const fetctUser = async () => {
      try {
        const res = await this.getUser();
        this.setState({
          users: [...this.state.users, ...res],
          loading: false,
        });
      } catch (err) {
        this.setState({ loading: false });
      }
    };
    fetctUser();
  }

  // fetch data
  getUser = async () => {
    const config = {
      headers: {
        authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
      },
    }

    const { data: { data } } = await axios.get(`${this.props.api}/user`, config);
    return data;
  };

  handleDelete(e) {
    const { id } = e.target.dataset;
    this.setState({ loading: true });
    axios
      .delete(`${this.props.api}/user/${id}`, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        this.setState({
          users: this.state.users.filter((user) => user._id !== res.id),
          loading: false,
        });
      })
  }

  handeleSearch(e) {
    this.setState({ search: e.target.value });
  }

  filterList(search) {
    let result = this.state.users.filter(
      ({ lastName, firstName }) =>
        lastName?.toLowerCase().includes(search.toLowerCase()) ||
        firstName?.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  }

  renderReport = () => (
    <table className="table align-middle mb-0 bg-white">
      <thead className="bg-light">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Username</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {this.state.users.length !== 0 ? (
          this.filterList(this.state.search).map((user, i) => (
            <Report
              data={user}
              key={i}
              pre="user"
              api={this.props.api}
              handleDelete={this.handleDelete}
              tableType="user"
            />
          ))
        ) : (
          <tr>
            <td colSpan={5}>
              <Error />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  render() {
    return (
      <>
        {this.state.loading ? <Loader /> : null}
        <Guide>
          <h3 className="text-muted text-end pe-5">
            Staff Report
          </h3>
        </Guide>

        <div className="container">
          <Search handeleSearch={this.handeleSearch} />
          {this.renderReport()}
        </div>
      </>
    );
  }
}

export default StaffReport;
// <Report />
