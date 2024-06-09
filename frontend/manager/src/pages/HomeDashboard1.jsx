import React, { useEffect, useState } from 'react'
import Dashboard from '../layouts/Dashboard'
import axios from 'axios';

export const HomeDashboard1 = () => {
  const [EmployeeList, setEmployeeList]=useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3500/api/employee");

        if (Array.isArray(response.data.data)) {
          setEmployeeList(response.data.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Dashboard>
      <div>
        <h2 className="text-xl">Nombre d'employee</h2>
        <p className='text-3xl'>{EmployeeList.length}</p>
      </div>
    </Dashboard>
  )
}
