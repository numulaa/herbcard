import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const HerbCard = ({ herb, handleShowAnswer, isShowingAnswer }) => {
  return (
    <div className="herbcard-wrapper">
      <div className="card-image-wrapper">
        <img src={herb.imageUrl} />
      </div>
      {/* <button onClick={handleShowAnswer}>Show answer</button>
      {isShowingAnswer ? <p>{herb.english}</p> : ""} */}
    </div>
  );
};

function App() {
  const [herbs, setHerbs] = useState([]);
  const [isShowingAnswer, setisShowingAnswer] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/herbs").then((res) => setHerbs(res.data));
  }, []);

  const dontKnows = herbs.filter((herb) => herb.status === 1).length;
  const knows = herbs.filter((herb) => herb.status === 2).length;
  const handleShowAnswer = () => {
    setisShowingAnswer(true);
  };

  return (
    <div className="main-wrapper">
      <div className="title-wrapper">
        <h1>HERBCARD.</h1>
        <p>Try guessing the herb name</p>
      </div>
      <div className="content-wrapper">
        <HerbCard
          herb={herbs[0]}
          key={herbs[0].id}
          handleShowAnswer={handleShowAnswer}
          isShowingAnswer={isShowingAnswer}
        />
        <div className="btn-status-wrapper">
          <button className="btn-status dont">Don't know {dontKnows}</button>
          <button className="btn-status">Know {knows}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
