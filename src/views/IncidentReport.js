import React from "react";
import axios from "axios";

import Report from "../components/Report";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Search from "../components/Search";

class IncidentReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = { incidents: [], loading: false, search: "" };

    this.handleDelete = this.handleDelete.bind(this);
    this.handeleSearch = this.handeleSearch.bind(this);
  }

  componentDidMount() {
    const fetchIncident = async () => {
      try {
        const data = await this.getIncident();
        this.setState({ incidents: [...this.state.incidents, ...data] });
      } catch (err) {
        this.setState({ loading: false });
      }
    };
    fetchIncident();
  }

  // fetch data
  getIncident = async () => {
    const config = {
      headers: {
        authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
      },
    };
    // "https://crms-api.herokuapp.com/api/v1/criminal",
    const { data: { data } } = await axios.get(`${this.props.api}/incident`, config);
    return data;
  };

  handleDelete(e) {
    const { id } = e.target.dataset;
    this.setState({ loading: true });
    axios
      .delete(`${this.props.api}/incident/${id}`, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        this.setState({
          incidents: this.state.incidents.filter(
            (incident) => incident._id !== res.id
          ),
          loading: false,
        });
      })
  }

  handeleSearch(e) {
    this.setState({ search: e.target.value });
  }

  filterList(search) {
    let result = this.state.incidents.filter(
      ({ state, lga }) =>
        state?.toLowerCase().includes(search.toLowerCase()) ||
        lga?.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  }

  renderReport = () => (
    <table className="table align-middle mb-0 bg-white">
      <thead className="bg-light">
        <tr>
          <th>Reporter</th>
          <th>Security Agent</th>
          <th>State</th>
          <th>LGA</th>
          <th>Progress Note</th>
          { sessionStorage.getItem("role") !== "user" && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {this.state.incidents.length !== 0 ? (
          this.filterList(this.state.search).map((criminal, i) => (
            <Report
              data={criminal}
              key={i}
              pre="incident"
              api={this.props.api}
              handleDelete={this.handleDelete}
              tableType="incident"
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
        <div className="container">
          <Search handeleSearch={this.handeleSearch} />
          {this.renderReport()}
        </div>
      </>
    );
  }
}

export default IncidentReport;
// <Report />
