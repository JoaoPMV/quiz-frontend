import { useState, useEffect, useRef } from "react";
import Hover from "/audios/hover.wav";
import Correct from "/audios/correct.wav";
import Incorrect from "/audios/incorrect.wav";
import { getQuestions } from "../../services/quizService";
import "./Quiz.css";

const Testes = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [dotResults, setDotResults] = useState([]);

  const hoverSound = useRef(new Audio(Hover));
  const correctSound = useRef(new Audio(Correct));
  const incorrectSound = useRef(new Audio(Incorrect));

  const question = questions[currentQuestion];

  const playHoverSound = () => {
    const a = hoverSound.current;
    a.currentTime = 0;
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
    const loadQuestions = async () => {
      try {
        const data = await getQuestions();

        // Filtra somente level = "b1"
        const b1Questions = data.filter((q) => q.level === "b1");

        // Embaralha perguntas
        const shuffledQuestions = [...b1Questions].sort(
          () => Math.random() - 0.5,
        );

        // Quantidade que você quer no quiz (ajuste aqui)
        const selected = shuffledQuestions.slice(0, 10);

        // Embaralha alternativas de cada pergunta
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
  }, []);

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (quizFinished) {
    return (
      <div className="quizFinished">
        <h1 className="StatementFinished">Quiz encerrado</h1>
        <p className="resultParagraph">
          Você acertou {score} de {questions.length}.
        </p>
      </div>
    );
  }

  const verifyAnswer = () => {
    if (selectedAnswer === null) return;

    // compara id selecionado com correctAnswer (string)
    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setDotResults((prev) => [...prev, correct ? "right" : "wrong"]);

    if (correct) {
      setScore((prev) => prev + 1);
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  };

  const nextQuestion = () => {
    const maxQuestions = 10;
    const lastQuestionIndex = maxQuestions - 1; // 15

    if (currentQuestion < lastQuestionIndex) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setQuizFinished(true);
    }
  };

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
                setSelectedAnswer(alternative.id); // salva id
              }}
              className={`alternatives ${
                selectedAnswer === alternative.id
                  ? isCorrect === null
                    ? "selected"
                    : isCorrect
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
            className={`verifyAnswer ${selectedAnswer === null || isCorrect !== null ? "disabled" : ""}`}
            onClick={verifyAnswer}
          >
            Verificar Resposta
          </button>

          <button
            className={`nextQuestion ${isCorrect === null ? "disabled" : ""}`}
            onClick={nextQuestion}
          >
            Próxima Pergunta
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

export default Testes;
