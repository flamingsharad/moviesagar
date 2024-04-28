"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const toastId = React.useRef(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      if (searchTerm !== "") {
        if(! toast.isActive(toastId.current)) {
          toastId.current = toast(<h1 className={styles.icc}>1 min ruk!!</h1>);
        }
        router.push(`/search/${searchTerm}`); // Navigate to the search route with the query
      } else {
        if(! toast.isActive(toastId.current)) {
          toastId.current = toast(<h1 className={styles.icc}>Search is Empty Bro!</h1>);
        }
      }
    }
  };
  const handleClick = (event) => {
    if (searchTerm !== "") {
      event.preventDefault(); // Prevent default form submission behavior
      router.push(`/search/${searchTerm}`); // Navigate to the search route with the query
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <div className={styles.left}>
            <h1 className={styles.logo}>MovieSagar</h1>
          </div>
          <div className={styles.right}>
            <div className={styles.leftt}>
              <ul className={styles.ul}>
                <Link href={`/`}>
                  <li className={styles.li}>Home</li>
                </Link>
                <Link href={`/`}>
                  <li className={styles.li}>Web Series</li>
                </Link>
                <Link href={`/`}>
                  <li className={styles.li}>Dual Audio</li>
                </Link>
                <li className={styles.li}>
                  <select className={styles.font} name="genre" id="genre">
                    <option className={styles.opt} value="/">
                      Genre
                    </option>
                    <option className={styles.opt} value="/">
                      Action
                    </option>
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
                  <button
                    type="submit"
                    onClick={handleClick}
                    className={styles.search}
                  >
                    <FaSearch className={styles.icon} />
                  </button>
                  <ToastContainer />
                </form>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
