import React, { useEffect, useState } from 'react'
import Dashboard from '../layouts/Dashboard'
import { fetchEmployees } from '../features/employee/employeSlice';
import { useDispatch, useSelector } from 'react-redux';


export const HomeDashboard1 = () => {
  const dispatch = useDispatch();
  const employeeList = useSelector((state) => state.employee.list);
  const employeeStatus = useSelector((state) => state.employee.status);
  const employeeError = useSelector((state) => state.employee.error);

  useEffect(() => {
    if (employeeStatus === 'idle') {
      dispatch(fetchEmployees());
    }else if(employeeStatus === 'loading'){
      // setLoading(true)
      const print = 'loading'
    }
  }, [employeeStatus, dispatch]);

  return (
    <Dashboard>
      <div>
        <h2 className="text-xl">Nombre d'employee</h2>
        <p className='text-3xl'>{employeeList.length}</p>
      </div>
    </Dashboard>
  )
}
