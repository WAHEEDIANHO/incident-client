import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";

function Report({ data, api, pre, handleDelete, tableType="incident" }) {
  return (
          tableType === "incident" ?
    <tr>
        <td>
            <p className="mb-0">{data.reportedBy}</p>
        </td>
        <td>
            <p className="mb-0">{data.securityAgent}</p>
        </td>
        {/*<td>{data.hasOwnProperty("role") ? data.role : data.crime}</td>*/}
        <td><p className="mb-0">{data.state}</p></td>
        <td><p className="mb-0">{data.lga}</p></td>
        <td><p className="mb-0">{data.progressNote}</p></td>
        { sessionStorage.getItem("role") !== "user" &&
            <td>
            <EditBtn pre={pre} id={data._id}/>
            {sessionStorage.getItem("isAdmin") === "true" ? (
                <DeleteBtn id={data._id} handleDelete={handleDelete}/>
            ) : null}
        </td>}
    </tr> :
              <tr>
                  <td>
                      <p className="mb-0">{data.firstName}</p>
                  </td>
                  <td>
                      <p className="mb-0">{data.lastName}</p>
                  </td>
                  {/*<td>{data.hasOwnProperty("role") ? data.role : data.crime}</td>*/}
                  <td><p className="mb-0">{data.phone}</p></td>
                  <td><p className="mb-0">{data.username}</p></td>
                  <td><p className="mb-0">{data.role}</p></td>
                  { (sessionStorage.getItem("isAdmin") === "true" || data._id === sessionStorage.getItem("cms_id")) && <td>
                      <EditBtn pre={pre} id={data._id}/>
                      {sessionStorage.getItem("isAdmin") === "true" ? (
                          <DeleteBtn id={data._id} handleDelete={handleDelete}/>
                      ) : null}
                  </td>}
                </tr>
  );
}

export default Report;
