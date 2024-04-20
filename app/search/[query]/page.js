"use client"
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from '../../page.module.css'
import { CiCalendar } from "react-icons/ci";
import { TextOverflowWithEllipsis } from '../../components/wrapper';
import Img from '../../components/Img';
import fetchRecordsSearch from '../../utils/fetch'; // Adjust path as needed

const SearchPage = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentPathname = usePathname();
  const regex = /^\/search\/(.*)$/;
  const match = currentPathname.match(regex);
  const extractedID = match ? decodeURIComponent(match[1]) : ''; // Regular expression to extract ID from URL

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchRecordsSearch(`${extractedID}`); // Fetch data using extracted ID
        setRecords(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Fetch data on component mount
  }, [currentPathname]); // Re-run effect when pathname changes

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.wrapper3}>
          <h1>Search Results for "{extractedID}"</h1>
          <div className={styles.wrapper2}>
          {records.map((record) => (
            <article onClick={() => router.push(`/detail/${record.id}`)} className={styles.card} key={record.id}>
              <div className={styles.imagecard}>
                <Img className={styles.Img} src={record?.fields?.poster[0]?.url} />
              </div>
              <div className={styles.flexx}>
                <CiCalendar className={styles.icon} />
                <h3 className={styles.date}>
                  {record?.createdTime
                    ? formatDate(record.createdTime) // Call formatDate function if createdTime exists
                    : 'No date available' // Display default message if createdTime is undefined or null
                  }
                </h3></div>
              <TextOverflowWithEllipsis className={styles.title} maxCharacters={120}>
                {record?.fields?.Name}
              </TextOverflowWithEllipsis>
            </article>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
