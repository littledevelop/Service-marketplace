import React, { useEffect, useState } from "react";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);
  const API_URL = "http://127.0.0.1:8000/api/services"; // Laravel API URL
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setServices(response.data))
      .catch(error => console.error("Error fetching services:", error));
  }, []);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/api/services`)
  //     .then(response => response.json())
  //     .then(data => setServices(data))
  //     .catch(error => console.error("Error fetching services:", error));
  // }, []);

  return (
    <div>
      <h2>Service List</h2>
      <div className="add-service">
        
      <p>Here is the list of services</p>
      <button>Add Services</button>
      </div>
      <table align="center"> 
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td>{service.title}</td>
              <td>{service.description}</td>
              <td>{service.price}</td>
            </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
};

export default Services;
