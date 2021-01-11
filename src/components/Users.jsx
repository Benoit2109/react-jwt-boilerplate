import React, { useEffect, useState } from "react";
import Axios from "axios";

const Users = () => {
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/users`, {
      headers: {
        Authorization: `bearer ${localStorage.getItem("TOKEN")}`,
      },
    })
      .then((res) => res.data)
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        let message;
        if (err.response.status === 401) {
          message = "You're not authorized to access these datas";
        } else {
          message = err.response.data.errorMessage;
        }
        alert(message);
        console.error(err);
      });
  }, []);

  return (
    <div>
      <p>Users List</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} - email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
