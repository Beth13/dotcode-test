import Button from "./Button";

const Buttons = ({ onStart, onPause, onEnd }) => {
  return (
    <div className="buttons">
      <Button name={"Запустити"} styles={"green"} toogleEvent={onStart} />
      <Button name={"Зупинити"} styles={"red"} toogleEvent={onPause} />
      <Button name={"Скинути"} styles={"yellow"} toogleEvent={onEnd} />
    </div>
  );
};

export default Buttons;
