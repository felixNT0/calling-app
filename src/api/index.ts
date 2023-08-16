import axios from "axios";

const baseUrl = "http://localhost:5000";
// const baseUrl = process.env.REACT_APP_BASE_URL;
// const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
//
export const createMeeting = async (data: any) => {
  try {
    const response = await axios.post(`${baseUrl}/meeting`, data);
    return response.data;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

export const getAllMeeting = async () => {
  try {
    const response = await axios.get(`${baseUrl}/meeting`);
    return response.data;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

export const getMeetingByIdMeeting = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/meeting/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

export const editMeeting = async (id: string, data: any) => {
  try {
    const response = await axios.put(`${baseUrl}/meeting/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

export const deleteMeeting = async (id: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/meeting/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

export const generateAgoraToken = async (
  channelName: string,
  startDate: string | Date
) => {
  try {
    const response = await axios.post(`${baseUrl}/meeting/agora/token`, {
      channelName,
      startDate,
    });
    return response.data;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};
