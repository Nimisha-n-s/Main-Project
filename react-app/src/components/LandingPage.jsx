import React from 'react';
import './LandingPage.css'; // Import your CSS file for styling
import charityImage from '../images/char.jpg'; // Import the image

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="image-overlay">
        <img src={charityImage} alt="Charity" /> {/* Use imported image */}
        <div className="quote">
          <p>"Your quote goes here"</p>
        </div>
      </div>
      <div className="get-started-button">
        <button>Get Started</button>
      </div>
    </div>
  );
}

export default LandingPage;
