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
            My name is Aldo Almánzar Rivera, and I am a full-stack software
            engineer and a graduate of the TripleTen Software Engineering
            bootcamp program. The NewsExplorer final project is a demonstration
            of my skills in building modern, responsive web applications using
            React.
          </p>
          <p className="about__text">
            Through this project, I had the opportunity to apply my knowledge of
            React hooks, API integration, and user authentication. I believe in
            the power of well-structured, maintainable code and a great user
            experience. Moreover, this project is a testament to my commitment
            to learning and building practical, impactful applications.
          </p>
          <p className="about__text">
            As my NewsExplorer final project shows, I also believe in the power
            of information and its ability to connect people and communities.
            Join me now in exploring the vast world of news!
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
