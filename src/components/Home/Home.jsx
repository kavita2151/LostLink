import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>LostLink 🔍</h1>
        <h4>Connecting people to lost items.</h4>
        <p>Your smart way to report & find lost items.</p>
        <Link to="/report-lost" className="cta-button">Report Lost Item</Link>
      </section>

      <section className="about">
        <h2>👋 About Us</h2>
        <p>
        At <strong>LostLink</strong>, we believe that even the smallest belongings hold great value.
        Whether it's a cherished wallet, a misplaced ID, or a forgotten umbrella —
        every item has a story, and every story deserves a reunion.
      </p>
      <p>
        Our platform makes it effortless for users to <strong>report lost or found items</strong>,
        connect with others, and bring lost things back home. Built with simplicity,
        speed, and compassion in mind, LostLink is more than just a tool —
        it’s a <em>bridge between people and their lost memories</em>.
      </p>
      <p>
        <strong>Together</strong>, let’s make sure that nothing truly important stays lost.
      </p>
      </section>

      <section className="how-it-works">
        <h2>⚙️ How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Report</h3>
            <p>Enter the details of your lost or found item.</p>
          </div>
          <div className="step">
            <h3>2. List</h3>
            <p>We display your entry for others to see.</p>
          </div>
          <div className="step">
            <h3>3. Connect</h3>
            <p>Users contact each other & return items!</p>
          </div>
        </div>
      </section>

      <footer>
        <p>💡 Built with care by <b>Kavita Verma</b> | <a href="https://github.com/kavita2151/LostLink" target="_blank">GitHub</a></p>
      </footer>
    </div>
  );
};

export default Home;
