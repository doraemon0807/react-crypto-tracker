import { useOutletContext, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { users } from "../../db";
import { Link } from "react-router-dom";

function User() {
  const { userId } = useParams();
  return (
    <div>
      <h1>
        User with ID {userId} is named: {users[Number(userId) - 1].name}
      </h1>
      <hr />
      <Link to="followers">See Followers</Link>
      <Outlet context={{ nameOfMyUser: users[Number(userId) - 1].name }} />
    </div>
  );
}

export default User;
