import "../../styles/table.css";

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              {item.input.map((item, index) => (
                <span className="table__span" key={index}>
                  {item}
                </span>
              ))}
            </td>
            <td>
              {item.output.map((item, index) => (
                <span className="table__span" key={index}>
                  {item}
                </span>
              ))}
            </td>
            <td key={item.id}>{`${item.sum} BTC`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
