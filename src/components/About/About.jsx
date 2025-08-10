import React from "react";
import "./About.css"; // Make sure you have this CSS file
import authorImage from "../../assets/images/avatar-image__evert-van-duijn-J6Z9IifdDD0-unsplash.png"; // Import the image

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <div className="about__image-container">
          {/* Using the imported author image */}
          <img
            src={authorImage} // Set the src to the imported image
            alt="Author"
            className="about__image"
          />
        </div>
        <div className="about__text-container">
          <h2 className="about__title">About the author</h2>
          <p className="about__text">
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
            You can also talk about your experience with TripleTen, what you
            learned there, and how you can help potential customers.
          </p>
          <p className="about__text">
            We believe in the power of information and its ability to connect
            people and communities. Join us in exploring the world of news!
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
