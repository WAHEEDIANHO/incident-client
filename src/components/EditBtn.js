import { Link } from "react-router-dom";

function EditBtn({ pre, id }) {
  return (
    <Link
      to={`/dashboard/${pre}/${id}`}
      className="btn btn-xs btn-success mx-2 small"
      data-id={id}
    >
      Edit
    </Link>
  );
}

export default EditBtn;
