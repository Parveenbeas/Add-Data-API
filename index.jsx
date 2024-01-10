import React, { useEffect, useState } from "react";
import axios from "axios";

const UserData = () => {
  const [harry, setHarry] = useState([]);
  const [parveen, setParveen] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    username: "",
  });
  const [NewData, setNewData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        const multiple = response.data.users;
        console.log(multiple);
        setHarry(multiple);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "some error");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://dummyjson.com/users/${id}`)
      .then((response) => {
        console.log("Delete successful", response);
        setHarry((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user", error);
      });
  };
  const handleEdit = (id) => {
    const sahil = harry.find((house) => house.id === id);
    setNewData(sahil);
    setParveen(sahil);
  };
  const extra = (e) => {
    setParveen(e.target.value);
  };
  const handleUpdate = (id) => {
    axios
      .put(`https://dummyjson.com/users/${id}`, parveen)
      .then((bonds) => {
        console.log("Your Data is successfully updated", bonds);
      })
      .catch((keyboard) => {
        console.log("complete", keyboard);
      });
  };

  return (
    <div className="container mx-auto p-8">
      {loading?.(<p> Loading...</p>)} : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {harry?.map((zinc) => (
          <div
            key={zinc.id}
            className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            <img
              src={zinc.image}
              alt=""
              className="w-full h-48 object-cover mb-4 rounded-lg shadow-md"
            />
            <p className="text-xl font-semibold mb-2">
              {zinc.firstName} {zinc.lastName}
            </p>
            <p className="text-gray-600 mb-2">{zinc.phone}</p>
            <p className="text-gray-600 mb-2">{zinc.email}</p>
            <p className="text-gray-600 mb-2">@{zinc.username}</p>
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                onClick={() => {
                  handleEdit(zinc.id);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(zinc.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <form>
        firstName :{" "}
        <input type="text" onChange={extra} value={parveen.firstName} />
        lastName :{" "}
        <input type="text" onChange={extra} value={parveen.lastName} />
        phone : <input type="text" onChange={extra} value={parveen.phone} />
        email : <input type="text" onChange={extra} value={parveen.email} />
        username :{" "}
        <input type="text" onChange={extra} value={parveen.username} />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleUpdate(NewData.id);
          }}
        >
          Update
        </button>
      </form>
      )
    </div>
  );
};

export default UserData;
