import React, { useState, useEffect } from "react";
import './../styles/App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null); // To store fetched data
  const [error, setError] = useState(null); // To store error messages

  const api = `https://dummyjson.com/products`;

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await fetch(api);
      const result = await response.json(); // Parse the response as JSON

      // Handle empty data
      if (result.products && result.products.length > 0) {
        setData(result); // Set data if available
      } else {
        setData(null); // Set data to null if no products are returned
      }
    } catch (error) {
      setError("Error fetching data: " + error.message); // Set error message if something goes wrong
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Fetched Data</h1>

      {loading ? (
        <p>Loading...</p> // Show loading message
      ) : error ? (
        <p>{error}</p> // Display error message
      ) : data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre> // Display data in JSON format
      ) : (
        <p>No data found</p> // Show "No data found" message if no data is returned
      )}
    </div>
  );
};

export default App;

