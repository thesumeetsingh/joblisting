import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <section className="dashboard">

      <h1>
        Employer Dashboard
      </h1>

      <p className="dashboard-description">
        Manage your job listings and
        publish new opportunities.
      </p>


      <div className="dashboard-actions">

        {/* VIEW JOBS */}

        <div className="dashboard-card">

          <h2>
            View Jobs
          </h2>

          <p>
            Browse all currently available
            job listings on JobLister.
          </p>

          <Link
            className="button button-secondary"
            to="/jobs"
          >
            View Jobs →
          </Link>

        </div>


        {/* POST JOB */}

        <div className="dashboard-card">

          <h2>
            Post a Job
          </h2>

          <p>
            Create a new job listing and
            publish it to JobLister.
          </p>

          <Link
            className="button button-primary"
            to="/post-job"
          >
            Post a Job →
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Dashboard;