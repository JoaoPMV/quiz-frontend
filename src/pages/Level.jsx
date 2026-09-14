import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Hover from "/audios/hover.wav";
import "./Data.css";

const Level = () => {
  const hoverSound = useRef(new Audio(Hover));
  const playHoverSound = () => {
    const a = hoverSound.current;
    a.currentTime = 0;
    a.play().catch(() => {});
  };

  const navigate = useNavigate();

  const handleSelect = (lvl) => {
    playHoverSound();
    navigate(`/quiz/${lvl}`);
  };

  return (
    <div>
      <div className="levelContainer">
        <p>Choose your level</p>
        <div className="levelBox">
          <button className="keycap" onClick={() => handleSelect("a1")}>
            <span className="letter">a1</span>
          </button>
          <div className="keycap" onClick={() => handleSelect("a2")}>
            <span className="letter">a2</span>
          </div>
          <div className="keycap" onClick={() => handleSelect("b1")}>
            <span className="letter">b1</span>
          </div>
          <div className="keycap" onClick={() => handleSelect("b2")}>
            <span className="letter">b2</span>
          </div>
          <div className="keycap" onClick={() => handleSelect("c1")}>
            <span className="letter">c1</span>
          </div>
          <div className="keycap" onClick={() => handleSelect("c2")}>
            <span className="letter">c2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level;
