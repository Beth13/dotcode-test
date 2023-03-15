import "../../styles/buttons.css";

const Button = ({ name, styles, toogleEvent }) => {
  return (
    <button onClick={toogleEvent} className={`buttons__item ${styles}`}>
      {name}
    </button>
  );
};

export default Button;
