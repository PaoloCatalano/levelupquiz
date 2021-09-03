import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  videogames: 15,
  natureANDscience: 17,
  mythology: 20,
  sports: 21,
  history: 23,
  animals: 27,
  otaku: 31,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";
const tempurl =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setwaiting] = useState(true);
  const [loading, setloading] = useState(false);
  const [questions, setquestions] = useState([]);
  const [index, setindex] = useState(0);
  const [correct, setcorrect] = useState(0);
  const [error, seterror] = useState(false);
  const [quiz, setquiz] = useState({
    amount: 10,
    category: "videogames",
    difficulty: "easy",
  });
  const [ismodalopen, setismodalopen] = useState(false);

  const fetchQuestions = async (url) => {
    setloading(true);
    setwaiting(false);
    const res = await axios(url).catch((err) => console.log(err));

    if (res) {
      const data = res.data.results;
      if (data.length > 0) {
        setquestions(data);
        setloading(false);
        setwaiting(false);
        seterror(false);
      } else {
        setwaiting(true);
        seterror(true);
      }
    } else {
      setwaiting(true);
    }
  };

  const nextQuestion = () => {
    setindex((old) => {
      const index = old + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setcorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setismodalopen(true);
  };
  const closeModal = () => {
    setwaiting(true);
    setcorrect(0);
    setismodalopen(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setquiz({ ...quiz, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        ismodalopen,
        nextQuestion,
        checkAnswer,
        closeModal,
        handleChange,
        handleSubmit,
        quiz,
        setquiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
