import React from "react";
import { useGlobalContext } from "./context";
import logo from "./logo.png";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <div className="logo">
            <h2>setup quiz</h2>
            <img src={logo} alt={`logo`} className="img" />
          </div>
          {/* amount */}
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={handleChange}
              className="form-input"
              min={1}
              max={50}
            />
          </div>
          {/* category */}

          <div className="form-control" style={{ textTransform: "uppercase" }}>
            <label htmlFor="category">category</label>
            <select
              name="category"
              id="category"
              className="form-input"
              value={quiz.category}
              onChange={handleChange}
              style={{ textTransform: "uppercase" }}
            >
              <option value="videogames">video Games</option>
              <option value="natureANDscience">nature & science</option>
              <option value="mythology">mythology</option>
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="animals">animals</option>
              <option value="otaku">otaku</option>
            </select>
          </div>
          {/* difficulty */}

          <div className="form-control">
            <label htmlFor="difficulty">select difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={quiz.difficulty}
              onChange={handleChange}
              style={{ textTransform: "capitalize" }}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {error && (
            <p className="error">
              can't generate questions, please try different options
            </p>
          )}
          <button type="submit" onClick={handleSubmit} className="submit-btn">
            start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
