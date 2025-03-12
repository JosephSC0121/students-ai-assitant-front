import { useState } from "react";
import { mutate } from "swr";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

export function usePostDataEmail() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const postData = async (endpoint:string, data:any) => {
    const url = `${API_BASE_URL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const responseData = await response.json();
      
      setData(responseData);
      setError(null);
      
      mutate(url);
      
      return { data: responseData, error: null };
    } catch (err:any) {
      setError(err);
      setData(null);
      return { data: null, error: err };
    }
  };

  return { data, error, postData };
}
