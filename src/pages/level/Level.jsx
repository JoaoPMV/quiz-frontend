import "./Level.css";

const Level = () => {
  return (
    <div>
      <div className="levelContainer">
        <p>Choose your level</p>
        <div className="levelBox">
          <div id="a1" className="levels">
            a1
          </div>
          <div id="a2" className="levels">
            a2
          </div>
          <div id="b1" className="levels">
            b1
          </div>
          <div id="b2" className="levels">
            b2
          </div>
          <div id="c1" className="levels">
            c1
          </div>
          <div id="c2" className="levels">
            c2
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level;
