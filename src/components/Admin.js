import { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode"; // Use named import

const Admin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      // if token not exisit move to login page
      navigate("/login");
    } else {
      const decoded = jwtDecode(token);
      if (!decoded.isAdmin) {
        navigate("/home"); // Redirect non-admin users
      }
    }
  }, [navigate, token]);






  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/adminauth/users", {
          headers: { Authorization: token },
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(data.users);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);




  return(
    // <div className="container mt-5 text-center">
    //   <h2>Welcome, Admin</h2>
    //   <button className="btn btn-info mt-2" onClick={fetchUserCount}>Get User Count</button>
    //   {totalUsers !== null && <p className="mt-3">Total Users: {totalUsers}</p>}
    // </div>


<div className="container mt-4">
      <h2>Admin Panel</h2>
      <h4>Total Users: {users.length}</h4>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.email}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>





  );
  
  
//   <h1>Welcome Admin</h1>;
};

export default Admin;
