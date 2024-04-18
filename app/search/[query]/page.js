"use client"
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { fetchRecordsSearch } from '../../utils/fetch'; // Adjust path as needed

const SearchPage = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentPathname = usePathname();
  const regex = /^\/search\/(.*)$/;
  const match = currentPathname.match(regex);
  const extractedID = match ? match[1] : ''; // Regular expression to extract ID from URL

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const match = currentPathname.match(regex); // Extract ID from URL
      const extractedID = match ? match[1] : ''; // Assign extracted ID or empty string

      try {
        const data = await fetchRecordsSearch(extractedID); // Fetch data using extracted ID
        setRecords(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Fetch data on component mount
  }, [currentPathname]); // Re-run effect when pathname changes

  return (
    <div>
      <h1>Search Results for "{extractedID}"</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {records.length > 0 ? (
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              {/* Access and display data from your Airtable fields here */}
              {record.fields.Name} - {record.fields.OtherField} (replace with your field names)
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for this ID.</p>
      )}
    </div>
  );
};

export default SearchPage;
