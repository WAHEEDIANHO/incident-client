import {useEffect, useState} from "react";
import axios from "axios";

const Dashboard = ({api}) => {

    const [userCount, setUserCount] = useState(null);
    const [incidentCount, setIncidentCount] = useState(null);

    useEffect(() => {
            (async () => {
                const config = {
                    headers: {
                        authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
                    },
                }

                const incident = await axios.get(`${api}/incident`, config);
                const users = await axios.get(`${api}/user`, config);

                setIncidentCount(incident.data.data.length);
                setUserCount(users.data.data.length);

                // setIncidentID(`CRMS${(data.length + 1).toString().padStart(3, 0)}`);
                // return data.length;
            })();
    }, [])

    return (
        <div className="container-fluid pt-4">
            <div className="row text-white ">
            <div className="col-md-6 mb-3 summary">
                <div className="rounded-2 d-flex bg-primary pt-4">
                                            <span className="col-4 p-0 ">
                                                <i className="fa fa-users fa-5x "></i>
                                            </span>
                    <div className="col-8 text-end pe-3 ">
                        <h6>{ userCount ? userCount : 0 } <br/> Reg. Users</h6>
                    </div>

                </div>
            </div>
            <div className="col-md-6 mb-3 summary">
                <div className="rounded-2 d-flex bg-danger pt-4 ">
                                            <span className="col-4 p-0 ">
                                        <i className="fa fa-file-text fa-5x "></i>
                                    </span>
                    <div className="col-8 text-end pe-3 ">
                        <h6> { incidentCount ? incidentCount : 0 } <br/> Reported Incident</h6>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Dashboard;