import axios from "axios";

// const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = "http://localhost:5000/.netlify/functions/api";

export const createMeeting = async (data: any) => {
  try {
    const response = await axios.post(`${baseUrl}`, data);
    return response.data;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

export const getAllMeeting = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

export const getMeetingByIdMeeting = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

export const editMeeting = async (id: string, data: any) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

export const deleteMeeting = async (id: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
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
    const response = await axios.post(`${baseUrl}/agora/token`, {
      channelName,
      startDate,
    });
    return response.data;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};
