import Buttons from "../buttons/Buttons";
import Table from "../table/Table";
import Summary from "../summary/Summary";
import { useEffect, useState } from "react";

import "../../styles/main.css";

let ws = new WebSocket("wss://ws.blockchain.info/inv");

const Main = () => {
  const [summary, setSummary] = useState(0);
  const [data, setData] = useState([]);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    ws.onopen = function () {
      console.log("WebSocket Client Connected");
    };

    ws.onmessage = function (onmessage) {
      const response = JSON.parse(onmessage.data);
      const inputs = response.x.inputs;
      const outputs = response.x.out;
      const resultInputAddr = [];
      const resultOutAddr = [];
      let outCalAmount = 0;

      inputs.forEach((input) => resultInputAddr.push(input.prev_out.addr));
      outputs.forEach((out) => resultOutAddr.push(out.addr));

      outCalAmount = outputs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        0
      );

      const newTransaction = {
        id: data.length + 1,
        input: resultInputAddr,
        output: resultOutAddr,
        sum: outCalAmount / 100000000,
      };

      if (isStarted) {
        setData([...data, newTransaction]);
        setSummary((prevSum) => prevSum + newTransaction.sum);
      } else {
        ws.onclose = () => {
          console.log("WebSocket connection closed");
        };
      }

      return () => {
        if (ws) {
          ws.close();
        }
      };
    };
  }, [data, isStarted]);

  const onStart = () => {
    ws.send(
      JSON.stringify({
        op: "unconfirmed_sub",
      })
    );
    setIsStarted(true);
  };

  const onPause = () => {
    setIsStarted(false);
  };

  const onEnd = () => {
    setData([]);
    setSummary(0);
  };

  return (
    <div className="main">
      <Buttons onStart={onStart} onPause={onPause} onEnd={onEnd} />
      <Summary summary={summary} />
      <Table data={data} />
    </div>
  );
};
export default Main;
