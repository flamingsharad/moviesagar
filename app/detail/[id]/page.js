"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { useRouter, usePathname } from 'next/navigation';
import { fetchRecordById, fetchNotice } from '../../utils/fetch';
import { FaCalendarAlt } from "react-icons/fa";
import Loader from '../../components/Loader';
import Img from '../../components/Img'; // Replace with your actual image component

export default function Detail() {
  const [record, setRecord] = useState(null);
  const [notice, setNotice] = useState([]);
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
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchImp = async () => {
      try {
        const notices = await fetchNotice();
        setNotice(notices);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecord();
    fetchImp();
  }, []);

  return (
    <>
      {isLoading ? (
        <><head>
          <title>MovieSagar</title>
        </head><div className={styles.container}>
            <div className={styles.wrapper}>
              <Loader />
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
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>
        </head><main>
            <div className={styles.container}>
              <div className={styles.wrapper}>
                <h1 className={styles.titlel} >{record?.fields?.Name}</h1>
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
                  <div className={styles.ddff} >✅ Download {record?.fields?.title}. This is a {record?.fields?.country} movie and Available in
                    <span className={styles.p}> 480p,</span>
                    <span className={styles.pp}> 720p,</span> and
                    <span className={styles.ppp}> 1080p</span> in MKV Format. This is one of the best movie based on
                    {genre.map((genre, index) => (
                      <span className={styles.color} key={index}>  {/* Use index as key */}
                        {genre} {index === genre.length + 1 ? '.' : ','}
                      </span>
                    ))}.

                  </div>
                  <div className={styles.ddff} ><span className={styles.pd}>MovieSagar </span>{notice?.fields?.Name}</div>
                  <div className={styles.text}>{record?.fields?.Name}</div>
                  <span className={styles.movie}>Movie Info:</span>
                  <div className={styles.screen}>Screenshots: (Must See Before Downloading)…</div>
                  <div className={styles.imgcon}>
                    {images.map((image) => (
                      <Img key={image.id} className={styles.img} src={image?.url} />
                    ))}
                  </div>
                  <div className={styles.lines}></div>
                  <div className={styles.flexd}>
                    <h1 className={styles.fgh} >480p</h1>
                    <a className="bn5" target='_blank' href={record?.fields.low}><h4 className={styles.text} >Download Now</h4></a>
                    <h1 className={styles.fgh}>720p</h1>
                    <a className="bn5" target='_blank' href={record?.fields.mid}><h4 className={styles.text} >Download Now</h4></a>
                    <h1 className={styles.fgh}>1080p</h1>
                    <a className="bn5" target='_blank' href={record?.fields.high}><h4 className={styles.text} >Download Now</h4></a>
                  </div>
                  <div className={styles.lines}></div>
                  <div><iframe className={styles.airtableembed} src="https://airtable.com/embed/appRrsSJ1XWcyXZyi/pagHpgVCjG1MTv4uR/form" frameborder="0" onmousewheel="" width="100%" height="533"></iframe></div>
                  <div className={styles.lines}></div>
                  <div className={styles.flexd}>
                    <h1 className="coo"><Link href="/" className="cooo">MovieSagar </Link>does not host any files on it’s own . All files or contents are hosted on third party websites. <Link href="/" className="cooo">MovieSagar </Link>does not accept responsibility for contents hosted on third party websites. We just index those links which are already available in internet.</h1>
                  </div>
                </div>
              </div>
            </div></main></>
      ) : (
        <div>Record not found</div>
      )}
    </>
  );
}
