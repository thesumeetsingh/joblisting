import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import {
  getAllJobs,
  searchJobs,
} from "../services/api";

import JobCard from "../components/JobCard";

const JOBS_PER_PAGE = 10;

function Jobs() {
  const [searchParams] =
    useSearchParams();

  const searchQuery =
    searchParams.get("search") || "";

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [page, setPage] =
    useState(1);


  /*
   * Fetch jobs
   */

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      setError("");

      try {
        let data;

        if (searchQuery.trim()) {
          data = await searchJobs(
            searchQuery.trim()
          );
        } else {
          data = await getAllJobs();
        }

        setJobs(data);

      } catch (error) {
        console.error(error);

        setError(
          "Unable to load jobs. Please make sure the Spring Boot backend is running."
        );

        setJobs([]);

      } finally {
        setLoading(false);
      }
    };

    loadJobs();

  }, [searchQuery]);


  /*
   * When search changes,
   * go back to page 1.
   */

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);


  /*
   * Calculate total pages
   */

  const totalPages = Math.ceil(
    jobs.length / JOBS_PER_PAGE
  );


  /*
   * Get only jobs for current page
   */

  const currentJobs = useMemo(() => {
    const start =
      (page - 1) *
      JOBS_PER_PAGE;

    const end =
      start +
      JOBS_PER_PAGE;

    return jobs.slice(start, end);

  }, [jobs, page]);


  /*
   * Page navigation
   */

  const goToPreviousPage = () => {
    setPage((previous) =>
      Math.max(previous - 1, 1)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const goToNextPage = () => {
    setPage((previous) =>
      Math.min(
        previous + 1,
        totalPages
      )
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /*
   * Loading
   */

  if (loading) {
    return (
      <div className="loading">
        Loading jobs...
      </div>
    );
  }


  /*
   * Error
   */

  if (error) {
    return (
      <div className="jobs-page">

        <div className="message message-error">
          {error}
        </div>

      </div>
    );
  }


  return (
    <section className="jobs-page">

      {/* PAGE HEADER */}

      <div className="page-heading">

        <h1>
          {searchQuery
            ? `Search: ${searchQuery}`
            : "Browse Jobs"}
        </h1>

        <p>
          {jobs.length}{" "}
          {jobs.length === 1
            ? "job"
            : "jobs"}{" "}
          found
        </p>

      </div>


      {/* NO JOBS */}

      {jobs.length === 0 ? (

        <div className="empty-state">

          <h2>
            No jobs found
          </h2>

          <p>
            Try another search term.
          </p>

        </div>

      ) : (

        <>

          {/* JOBS */}

          <div className="job-grid">

            {currentJobs.map(
              (job, index) => (
                <JobCard
                  key={
                    job.id ||
                    `${job.profile}-${index}`
                  }
                  job={job}
                />
              )
            )}

          </div>


          {/* PAGINATION */}

          {totalPages > 1 && (

            <div className="pagination">

              <button
                onClick={
                  goToPreviousPage
                }
                disabled={page === 1}
              >
                ← Previous
              </button>


              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) => {
                  const pageNumber =
                    index + 1;

                  return (
                    <button
                      key={pageNumber}
                      className={
                        page === pageNumber
                          ? "active"
                          : ""
                      }
                      onClick={() => {
                        setPage(
                          pageNumber
                        );

                        window.scrollTo({
                          top: 0,
                          behavior:
                            "smooth",
                        });
                      }}
                    >
                      {pageNumber}
                    </button>
                  );
                }
              )}


              <button
                onClick={
                  goToNextPage
                }
                disabled={
                  page === totalPages
                }
              >
                Next →
              </button>

            </div>

          )}

        </>

      )}

    </section>
  );
}

export default Jobs;