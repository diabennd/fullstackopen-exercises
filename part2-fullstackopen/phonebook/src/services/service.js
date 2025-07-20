import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

const getAllData = () => {
  const request = axios.get(BASE_URL);
  // console.log("service", request.data);
  return request.then((res) => res.data);
};

const addData = (content) => {
  const request = axios.post(BASE_URL, content);
  return request.then((res) => res.data);
};

const deleteData = (id) => {
  const request = axios.delete(`${BASE_URL}/${id}`);
  return request.then((res) => res.data);
};

const editData = (id, content) => {
  const request = axios.put(`${BASE_URL}/${id}`, content);

  console.log("updated");
  return request.then((res) => res.data);
};

export default {
  getAllData,
  addData,
  deleteData,
  editData,
};
