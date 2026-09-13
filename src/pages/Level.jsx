import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Hover from "/audios/hover.wav";
import "./Data.css";

const Level = ({ onSelectLevel }) => {
  const hoverSound = useRef(new Audio(Hover));
  const playHoverSound = () => {
    const a = hoverSound.current;
    a.currentTime = 0;
    a.volume = 0.2;
    a.play().catch(() => {});
  };

  const navigate = useNavigate();

  const handleSelect = (lvl) => {
    onSelectLevel(lvl);
    navigate("/quiz");
  };

  return (
    <div>
      <div className="levelContainer">
        <p>Choose your level</p>
        <div className="levelBox">
          <div
            className="levels"
            onClick={() => handleSelect("a1")}
            onMouseEnter={() => {
              playHoverSound();
            }}
          >
            a1
          </div>
          <div
            className="levels"
            onClick={() => handleSelect("a2")}
            onMouseEnter={() => {
              playHoverSound();
            }}
          >
            a2
          </div>
          <div
            className="levels"
            onClick={() => handleSelect("b1")}
            onMouseEnter={() => {
              playHoverSound();
            }}
          >
            b1
          </div>
          <div
            className="levels"
            onClick={() => handleSelect("b2")}
            onMouseEnter={() => {
              playHoverSound();
            }}
          >
            b2
          </div>
          <div
            className="levels"
            onClick={() => handleSelect("c1")}
            onMouseEnter={() => {
              playHoverSound();
            }}
          >
            c1
          </div>
          <div
            className="levels"
            onClick={() => handleSelect("c2")}
            onMouseEnter={() => {
              playHoverSound();
            }}
          >
            c2
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level;
