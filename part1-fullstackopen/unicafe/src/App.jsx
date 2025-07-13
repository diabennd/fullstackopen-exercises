import { useState } from "react";

const Statistics = (props) => {
  const { goodValues, badValues, neutralValues, avg, all, positive } = props;

  return (
    <>
      <table>
        <tbody>
          <StatisticLine text={"Good"} value={goodValues} />
          <StatisticLine text={"Neutral"} value={neutralValues} />
          <StatisticLine text={"Bad"} value={badValues} />
          <StatisticLine text={"All"} value={all} />
          <StatisticLine text={"Average"} value={avg} />
          <StatisticLine text={"Postive"} value={positive} />
        </tbody>
      </table>
    </>
  );
};

const Button = (props) => {
  const { action, text } = props;

  return (
    <>
      <button onClick={action}>{text}</button>
    </>
  );
};

const StatisticLine = (props) => {
  const { text, value } = props;
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = total();
  const average = calcAverage();
  const positive = calcPercentage();

  function handleAddGood() {
    setGood(good + 1);
  }

  function handleAddNeutral() {
    setNeutral(neutral + 1);
  }

  function handleAddBad() {
    setBad(bad + 1);
  }

  function total() {
    return good + bad + neutral;
  }

  function calcAverage() {
    let goodScore = 0;
    let neutralScore = 0;
    let badScore = 0;
    let sum = 0;
    let average = 0;
    let total = good + bad + neutral;

    for (let i = 0; i <= good; i++) goodScore++;
    for (let i = 0; i <= bad; i++) badScore--;

    sum = goodScore + neutralScore + badScore;
    average = sum / total;

    console.log("good: ", good);
    console.log("bad: ", bad);
    console.log(sum);

    return average;
  }

  function calcPercentage() {
    const persentageCalc = ((good / total()) * 100) / 100;
    if (good >= 0 && bad === 0) return 100 + "%";

    return persentageCalc.toPrecision(3) + "%";
  }

  return (
    <>
      <div>
        <h2>Give feedback</h2>
        <Button action={handleAddGood} text={"good"} />
        <Button action={handleAddNeutral} text={"neutral"} />
        <Button action={handleAddBad} text={"bad"} />
        <h2>Statistics</h2>
        {(bad || good || neutral) === 0 ? (
          "No feedback given"
        ) : (
          <Statistics
            goodValues={good}
            neutralValues={neutral}
            badValues={bad}
            all={all}
            avg={average}
            positive={positive}
          />
        )}
      </div>
    </>
  );
}

export default App;
