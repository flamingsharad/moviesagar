"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { fetchNotice } from '../../utils/fetch';

const Navbar = () => {
  const [notice, setNotice] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const toastId = React.useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const fetchedNotices = await fetchNotice();
        setNotice(fetchedNotices);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (searchTerm !== "") {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast(<h1 className={styles.icc}>1 min ruk!!</h1>);
        }
        router.push(`/search/${searchTerm}`); // Navigate to search route
      } else {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast(<h1 className={styles.icc}>Search is Empty Bro!</h1>);
        }
      }
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (searchTerm !== "") {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast(<h1 className={styles.icc}>1 min ruk!!</h1>);
      }
      router.push(`/search/${searchTerm}`); // Navigate to search route
    } else {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast(<h1 className={styles.icc}>Search is Empty Bro!</h1>);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <div className={styles.left}>
            <Link href="/" className={styles.logo}>Movie<span className={styles.color}>Sagar</span></Link>
          </div>
          <div className={styles.right}>
            <div className={styles.leftt}>
              <ul className={styles.ul}>
                
                  <li className={styles.li}><Link className={styles.li} href="/">Home</Link></li>
                
                
                  <li className={styles.li}><Link className={styles.li} href="/">Web Series</Link></li>
                
                
                  <li className={styles.li}><Link  href="/">Dual Audio</Link></li>
                
                <li className={styles.li}>
                  <select className={styles.font} name="genre" id="genre">
                    <option className={styles.opt} value="/">Genre</option>
                    <option className={styles.opt} value="/">Action</option>
                  </select>
                </li>
              </ul>
            </div>
            <div className={styles.riight}>
              <div className={styles.consea}>
                <form>
                  <input
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Search..."
                    onKeyDown={handleKeyDown}
                    type="search"
                    className={styles.inputsearch}
                  />
                  <button type="submit" onClick={handleClick} className={styles.search}>
                    <FaSearch className={styles.icon} />
                  </button>
                  <ToastContainer />
                </form>
              </div>
            </div>
          </div>
          <pre className={`${styles.notice} ${styles.responsiveNotice}`}> {notice?.fields?.Notice}</pre>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
