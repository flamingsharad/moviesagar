"use client"
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { useRouter, usePathname } from 'next/navigation';
import { fetchRecordById } from '../../utils/fetch';
import { FaCalendarAlt } from "react-icons/fa";
import Img from '../../components/Img'; // Replace with your actual image component


export default function Detail() {
  const [record, setRecord] = useState(null);
  const [Null, setNull] = useState(1);
  const [genre, setGenre] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const currentPathname = usePathname();
  const regex = /^\/detail\/(.*)$/;
  const match = currentPathname.match(regex);
  const extractedID = match ? match[1] : ''; // Extract the first capturing grou

  function formatDate(dateString) {
    const date = new Date(dateString); // Parse the date string into a Date object

    const day = String(date.getDate()).padStart(2, '0'); // Get day with leading zero (01-31)
    const month = date.toLocaleString('en-US', { month: 'long' }); // Get month name (April)
    const year = date.getFullYear();

    // Format the date in the desired format (day-month-year)
    return `${day}-${month}-${year}`;
  }


  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const id = extractedID; // Get record ID from URL query param
        const fetchedRecord = await fetchRecordById(id);
        setRecord(fetchedRecord);
        setGenre(fetchedRecord.fields.genre)
        setImages(fetchedRecord.fields.images)
        return {
          title: fetchRecord?.fields?.name,
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecord();
  }, []);

  return (
    <>
      {isLoading ? (
        <><head>
          <title>MovieSagar</title>
        </head><div className='loader'>
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
          </div></>
      ) : error ? (
        <div className="error">
          <div className="diverror"><h1 className="errorh1">Error : </h1><span className="errormain"> {error}</span>
          </div>
          <span className="errordes">Oop, Something went Wrong</span>
        </div>
      ) : record ? (
          <><head>
              <title>{record?.fields?.Name}</title>
            </head><main>
                <div className={styles.container}>
                  <div className={styles.wrapper}>
                    <h1>{record?.fields?.Name}</h1>
                    <div className={styles.flex}>
                      <h3 className={styles.date}>
                        <FaCalendarAlt className={styles.cal} />
                        {record?.createdTime
                          ? formatDate(record.createdTime) // Call formatDate function if createdTime exists
                          : 'No date available' // Display default message if createdTime is undefined or null
                        }
                      </h3>
                      <div className={styles.line}></div>
                    </div>
                    <div className={styles.flexx}>
                      <div>✅ Download {record?.fields?.title}. This is a {record?.fields?.country} movie and Available in
                        <span className={styles.p}>480p,</span>
                        <span className={styles.pp}> 720p,</span> and
                        <span className={styles.ppp}> 1080p</span> in MKV Format. This is one of the best movie based on
                        {genre.map((genre, index) => (
                          <span className={styles.color} key={index}>  {/* Use index as key */}
                            {genre} {index === genre.length - 1 ? '.' : ','}
                          </span>
                        ))}

                      </div>
                      <div><span className={styles.pd}>MovieSagar </span>{record?.fields?.about}</div>
                      <div className={styles.text}>{record?.fields?.Name}</div>
                      <span className={styles.movie}>Movie Info:</span>
                      <div className={styles.screen}>Screenshots: (Must See Before Downloading)…</div>
                      <div className={styles.imgcon}>
                        {images.map((image) => (
                          <Img key={image.id} className={styles.img} src={image?.url} />
                        ))}
                      </div>
                      <div className={styles.lines}></div>
                    </div>
                  </div>
                </div></main></>
      ) : (
        <div>Record not found</div>
      )}
    </>
  );
}
