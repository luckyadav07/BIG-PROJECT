import api from "./api.js";

export const sendMessage = async (messages) => {
  const response = await api.post("/chatbot", {
    messages,
  });

  return response.data.reply;
};