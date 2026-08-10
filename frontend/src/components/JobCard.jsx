function JobCard({ job }) {
  return (
    <article className="job-card">

      <h2 className="job-title">
        {job.profile}
      </h2>

      <div className="job-experience">
        {job.exp}{" "}
        {job.exp === 1
          ? "year"
          : "years"}{" "}
        experience
      </div>

      <p className="job-description">
        {job.desc}
      </p>

      <div className="job-skills">

        {job.techs?.map(
          (skill, index) => (
            <span
              className="skill"
              key={`${skill}-${index}`}
            >
              {skill}
            </span>
          )
        )}

      </div>

    </article>
  );
}

export default JobCard;