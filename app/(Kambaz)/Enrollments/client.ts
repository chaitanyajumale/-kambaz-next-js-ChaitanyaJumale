import axios from "axios";

const axiosWithCredentials = axios.create({ 
  withCredentials: true 
});

const REMOTE_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const getMyEnrollments = async () => {
  const response = await axiosWithCredentials.get(ENROLLMENTS_API);
  return response.data;
};

export const enrollInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(`${ENROLLMENTS_API}/${courseId}`);
  return response.data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${courseId}`);
  return response.data;
};