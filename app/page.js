"use client"

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Loader from './components/Loader';
import { TextOverflowWithEllipsis } from './components/wrapper';
import { fetchRecords } from './utils/fetch'; // Assuming fetchData.js is in the same directory
import styles from "./page.module.css";
import { CiCalendar } from "react-icons/ci";


export default function Home() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <div className={styles.container}>
            <div className={styles.wrapper}>
              <Loader />
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
                
                <article className={styles.card} key={record.id}><Link href={`/detail/${record.id}`}>
                  <div className={styles.imagecard}>
                    <Image className={styles.Img} alt={record?.fields?.poster[0]?.filename} src={record?.fields?.poster[0]?.url} loading="lazy" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
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
                  </Link>
                 </article>
                
              ))}
            </div>
          </div></>
      )}
    </>
  );
}
