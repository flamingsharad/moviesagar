import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
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
                <Link href={`/`}><li className={styles.li}>Web Series</li></Link>
                <Link href={`/`}><li className={styles.li}>Dual Audio</li></Link>
                <li className={styles.li}>
                  <select className={styles.font} name="genre" id="genre" >
                    <option className={styles.opt} value="/">Genre</option>
                    <option className={styles.opt} value="/">Action</option>
                  </select>
                </li>
              </ul>
            </div>
            <div className={styles.riight}>
              <div className={styles.consea}>
                <input type="search" placeholder="Search..." className={styles.inputsearch}/>
                <button type="submit" className={styles.search}><FaSearch className={styles.icon} /></button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
