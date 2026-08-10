import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  createJob,
} from "../services/api";

function CreateJob() {
  const navigate = useNavigate();

  const [profile, setProfile] =
    useState("");

  const [exp, setExp] =
    useState("");

  const [desc, setDesc] =
    useState("");

  const [techs, setTechs] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);


  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");


    /*
     * Basic validation
     */

    if (!profile.trim()) {
      setError(
        "Please enter a job title."
      );

      return;
    }

    if (
      exp === "" ||
      Number(exp) < 0
    ) {
      setError(
        "Please enter valid experience."
      );

      return;
    }

    if (!desc.trim()) {
      setError(
        "Please enter a job description."
      );

      return;
    }

    if (!techs.trim()) {
      setError(
        "Please enter at least one skill."
      );

      return;
    }


    /*
     * Convert comma-separated skills
     * into an array.
     */

    const skills = techs
      .split(",")
      .map((skill) =>
        skill.trim()
      )
      .filter(
        (skill) => skill.length > 0
      );


    const job = {
      profile:
        profile.trim(),

      desc:
        desc.trim(),

      exp:
        Number(exp),

      techs:
        skills,
    };


    try {
      setSubmitting(true);

      await createJob(job);

      setSuccess(
        "Job posted successfully."
      );

      setProfile("");
      setExp("");
      setDesc("");
      setTechs("");


      /*
       * After a short delay,
       * take the user to jobs.
       */

      setTimeout(() => {
        navigate("/jobs");
      }, 1000);

    } catch (error) {
      console.error(error);

      setError(
        "Unable to post the job. Please make sure the backend is running."
      );

    } finally {
      setSubmitting(false);
    }
  };


  return (
    <section className="form-page">

      <div className="form-header">

        <h1>
          Post a Job
        </h1>

        <p>
          Create a clear job listing
          and find the right candidates.
        </p>

      </div>


      {error && (
        <div className="message message-error">
          {error}
        </div>
      )}


      {success && (
        <div className="message message-success">
          {success}
        </div>
      )}


      <form
        className="job-form"
        onSubmit={handleSubmit}
      >

        {/* JOB TITLE */}

        <div className="form-group">

          <label htmlFor="profile">
            Job Title
          </label>

          <input
            id="profile"
            type="text"
            placeholder="e.g. Java Backend Developer"
            value={profile}
            onChange={(event) =>
              setProfile(
                event.target.value
              )
            }
          />

        </div>


        {/* EXPERIENCE */}

        <div className="form-group">

          <label htmlFor="experience">
            Years of Experience
          </label>

          <input
            id="experience"
            type="number"
            min="0"
            placeholder="e.g. 2"
            value={exp}
            onChange={(event) =>
              setExp(
                event.target.value
              )
            }
          />

        </div>


        {/* DESCRIPTION */}

        <div className="form-group">

          <label htmlFor="description">
            Job Description
          </label>

          <textarea
            id="description"
            placeholder="Describe the role, responsibilities and requirements..."
            value={desc}
            onChange={(event) =>
              setDesc(
                event.target.value
              )
            }
          />

        </div>


        {/* SKILLS */}

        <div className="form-group">

          <label htmlFor="skills">
            Skills
          </label>

          <input
            id="skills"
            type="text"
            placeholder="Java, Spring Boot, MongoDB"
            value={techs}
            onChange={(event) =>
              setTechs(
                event.target.value
              )
            }
          />

          <div className="form-hint">
            Separate multiple skills
            with commas.
          </div>

        </div>


        {/* SUBMIT */}

        <button
          type="submit"
          className="button button-primary form-submit"
          disabled={submitting}
        >
          {submitting
            ? "Publishing..."
            : "Publish Job"}
        </button>

      </form>

    </section>
  );
}

export default CreateJob;