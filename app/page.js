"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Img from './components/Img';
import { TextOverflowWithEllipsis } from './components/wrapper';
import { fetchRecords } from './utils/fetch'; // Assuming fetchData.js is in the same directory
import styles from "./page.module.css";


export default function Home() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRecords = await fetchRecords();
        setRecords(fetchedRecords);
        console.log(fetchedRecords);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className='loader'>
            <div id="c-2">
              <svg viewBox="0 0 100 100">
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#fc6767" />
                  </filter>
                </defs>
                <circle id="spinner" cx="50" cy="50" r="45" />
              </svg>
            </div>
          </div>
        </>
      ) : error ? (
        <>
          <head>
            <title>{error}</title>
          </head>
          <div className={styles.container}>
            <div className={styles.wrapper2}>
              <div className={styles.error}>
                <div className={styles.div}>
                  <h1 className={styles.errorh1}>Error : </h1>
                  <span className={styles.errormain}> {error}</span>
                </div>
                <span className={styles.errordes}>Oop, Something went Wrong</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <><head>
          <title>MovieSagar</title>
        </head>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              {records.map((record) => (
                <div onClick={() => router.push(`/detail/${record.id}`)} className={styles.card} key={record.id}>
                  <div className={styles.imagecard}>
                    <Img className={styles.Img} src={record?.fields?.poster[0]?.url} />
                  </div>
                  <div className={styles.flex}><h3 className={styles.date}>
                    {record?.createdTime
                      ? formatDate(record.createdTime) // Call formatDate function if createdTime exists
                      : 'No date available' // Display default message if createdTime is undefined or null
                    }
                  </h3></div>
                  <TextOverflowWithEllipsis className={styles.title} maxCharacters={120}>
                    {record?.fields?.Name}
                  </TextOverflowWithEllipsis>
                </div>
              ))}
            </div>
          </div></>
      )}
    </>
  );
}
