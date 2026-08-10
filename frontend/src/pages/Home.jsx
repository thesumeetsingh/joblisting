import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">

      <div className="hero-content">

        <div className="hero-label">
          Your next opportunity starts here
        </div>

        <h1>
          Find work.
          <br />

          <span>
            Build your future.
          </span>
        </h1>

        <p className="hero-description">
          JobLister helps you discover relevant
          opportunities and gives employers a
          simple way to publish their job openings.
        </p>

        <div className="hero-buttons">

          <Link
            className="button button-primary"
            to="/jobs"
          >
            Browse Jobs →
          </Link>

          <Link
            className="button button-secondary"
            to="/post-job"
          >
            Post a Job
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Home;