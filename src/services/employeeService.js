import Axios from "@/router/axios"
const getEmployees = (data) =>{
    return Axios.get('/employee/get-all',{params: data});
}
const newEmployee = (data) =>{
    return Axios.post('/employee/new',data);
}

const updateEmployee = (data) =>{
    return Axios.post('/employee/update',data);
}

export {getEmployees,newEmployee,updateEmployee}