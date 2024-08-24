import React, { useState, useEffect } from "react";
import './../styles/App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null); // Initialize `data` as null to avoid rendering issues.
  const api = `https://dummyjson.com/products`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(api);
      const result = await response.json(); // Parse the response as JSON
      setData(result); // Set the entire JSON response
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Data Fetched from API </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <pre>{data ? JSON.stringify(data, null, 2) : "No data"}</pre>
      )}
    </div>
  );
};

export default App;

