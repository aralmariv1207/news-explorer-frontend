import React from "react";
import "./About.css";

function About() {
  return (
    <section className="about">
      <h2 className="about__title">About the author</h2>
      <p className="about__text">
        This block describes the project author. Here you should indicate your
        name, what you do, and which development technologies you know. You can
        also talk about your experience with TripleTen, what you learned there,
        and how you can help potential customers.
      </p>
      <p className="about__text">
        We believe in the power of information and its ability to connect people
        and communities. Join us in exploring the world of news!
      </p>
    </section>
  );
}

export default About;