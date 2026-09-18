import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Hover from "/audios/hover.wav";
import Correct from "/audios/correct.wav";
import Incorrect from "/audios/incorrect.wav";
import { getQuestions } from "../services/quizService";
import "./Quiz.css";
import "./Buttons.css";

const Quiz = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [dotResults, setDotResults] = useState([]);
  const [answersHistory, setAnswersHistory] = useState([]); // NOVO

  const hoverSound = useRef(new Audio(Hover));
  const correctSound = useRef(new Audio(Correct));
  const incorrectSound = useRef(new Audio(Incorrect));
  const questionsLoaded = useRef(false);

  const question = questions[currentQuestion];

  const playHoverSound = () => {
    const a = hoverSound.current;
    a.currentTime = 0;
    a.volume = 0.2;
    a.play().catch(() => {});
  };

  const playCorrectSound = () => {
    const a = correctSound.current;
    a.currentTime = 0;
    a.play().catch(() => {});
  };

  const playIncorrectSound = () => {
    const a = incorrectSound.current;
    a.currentTime = 0;
    a.play().catch(() => {});
  };

  useEffect(() => {
    if (questionsLoaded.current) return;
    questionsLoaded.current = true;

    const loadQuestions = async () => {
      try {
        const data = await getQuestions();

        const levelQuestions = data.filter((q) => q.level === level);
        const shuffledQuestions = [...levelQuestions].sort(
          () => Math.random() - 0.5,
        );
        const selected = shuffledQuestions.slice(0, 10);

        const withShuffledAlternatives = selected.map((q) => ({
          ...q,
          alternatives: [...q.alternatives].sort(() => Math.random() - 0.5),
        }));

        setQuestions(withShuffledAlternatives);
      } catch (err) {
        console.error("Erro ao carregar questões:", err);
      }
    };

    loadQuestions();
  }, [level]);

  if (!level) return <div>Selecione um nível primeiro.</div>;

  if (questions.length === 0) {
    return (
      <div className="quizLoading">
        <div className="loadingCard">
          <div className="loadingSpinner"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  const verifyAnswer = (answerId) => {
    const correct = answerId === question.correctAnswer;

    setSelectedAnswer(answerId);
    setIsCorrect(correct);
    setDotResults((prev) => [...prev, correct ? "right" : "wrong"]);

    // salva histórico da questão respondida
    const selectedAlternative = question.alternatives.find(
      (a) => a.id === answerId,
    );
    const correctAlternative = question.alternatives.find(
      (a) => a.id === question.correctAnswer,
    );

    setAnswersHistory((prev) => [
      ...prev,
      {
        question: question.question,
        content: question.content,
        explanation: question.explanation,
        selectedAnswerId: answerId,
        selectedAnswerText: selectedAlternative?.text ?? "",
        correctAnswerId: question.correctAnswer,
        correctAnswerText: correctAlternative?.text ?? "",
        isCorrect: correct,
      },
    ]);

    if (correct) {
      setScore((prev) => prev + 1);
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  };

  const nextQuestion = () => {
    const maxQuestions = questions.length;
    const lastQuestionIndex = maxQuestions - 1;

    if (currentQuestion < lastQuestionIndex) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return (
      <div className="quizFinished">
        <div className="StatementFinished">
          <p>Quiz finished</p>
          <p>
            <strong>
              You got {score} out of {questions.length} correct.
            </strong>
          </p>
        </div>

        <div className="reviewList">
          {answersHistory.map((item, index) => (
            <div
              key={index}
              className={`reviewCard ${item.isCorrect ? "right" : "wrong"}`}
            >
              <h3>
                Question {index + 1}: {item.question}{" "}
              </h3>
              <p>Content: {item.content}</p>

              <p>
                Your answer: ({item.selectedAnswerId}) {item.selectedAnswerText}
              </p>
              <p>
                Right answer: ({item.correctAnswerId}) {item.correctAnswerText}
              </p>
              <p>
                <strong>Explanation:</strong> {item.explanation}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="dataButton longButton"
          onClick={() => navigate("/level")}
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="quizContainer">
      <div className="scoreBoard">
        {Array.from({ length: 10 }).map((_, index) => (
          <label key={index} className="scoreDotLabel">
            <input
              type="radio"
              name="scoreProgress"
              checked={false}
              readOnly
              className="scoreDotInput"
            />
            <span
              className={`scoreDot ${
                dotResults[index] === "right"
                  ? "green"
                  : dotResults[index] === "wrong"
                    ? "red"
                    : ""
              }`}
            ></span>
          </label>
        ))}
      </div>

      <div className="quizBoard">
        <div className="teste">
          <h4 className="content">{question.content}</h4>
          <h4 className="statement">{question.question}</h4>
        </div>

        <div className="alternativesBox">
          {question.alternatives.map((alternative) => (
            <p
              key={alternative.id}
              onMouseEnter={() => {
                if (isCorrect !== null) return;
                playHoverSound();
              }}
              onClick={() => {
                if (isCorrect !== null) return;
                verifyAnswer(alternative.id);
              }}
              className={`alternatives ${
                selectedAnswer === alternative.id
                  ? isCorrect
                    ? "right"
                    : "wrong"
                  : ""
              }`}
            >
              {alternative.text}
            </p>
          ))}
        </div>

        <div className="buttons">
          <button
            type="button"
            disabled={isCorrect === null}
            className="dataButton longButton"
            onClick={nextQuestion}
          >
            Próxima
          </button>
        </div>

        <p
          className={`explanation ${isCorrect === null ? "" : isCorrect ? "right" : "wrong"}`}
        >
          {isCorrect === null ? "" : question.explanation}
        </p>
      </div>
    </div>
  );
};

export default Quiz;
