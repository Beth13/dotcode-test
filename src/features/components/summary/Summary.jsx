import "../../styles/summary.css";

const Summary = ({ summary }) => {
  return <h1 className="summary">{`Сума: ${summary} BTC`}</h1>;
};

export default Summary;
