import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import  styles from './Landing.module.css';


function Landing() {

  useEffect(() => {
    // Add the class to the body when the component mounts
    document.body.classList.add('landing-body-style');

    // Return a cleanup function that removes the class when the component unmounts
    return () => {
      document.body.classList.remove('landing-body-style');
    };
  }, [])

  return (
    <div className={styles.container}>
      <h1>Want to track your Movie?</h1>
      <Link to="/login" id={styles.getStartedBtn}>Get Started</Link>
    </div>
  );
}

export default Landing;
