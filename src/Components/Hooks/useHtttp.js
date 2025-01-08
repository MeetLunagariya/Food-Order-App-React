import React, { useCallback, useEffect, useState } from "react";

async function sendhttpRequest(url, config) {
  const res = await fetch(url, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `HTTP error! status: ${res.status}`);
  }

  return data;
}

function useHtttp(url, config, initialData) {
  const [data, setData] = React.useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest() {
      setLoading(true);
      try {
        const resData = await sendhttpRequest(url, config);
        setData(resData);
      } catch (err) {
        setError(err.message || `Something went wrong...`);
      }
      setLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config && (config.method === "GET" || !config.method) || !config) sendRequest();
  }, [sendRequest, config]);

  return {
    data,
    loading,
    error,
    sendRequest,
  };
}

export default useHtttp;
