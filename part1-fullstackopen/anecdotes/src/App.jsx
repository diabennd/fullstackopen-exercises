import { useState } from "react";

const DisplayAnecdotes = (props) => {
  const { votes, anecdote } = props;

  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  );
};

const Button = (props) => {
  const { action, children } = props;

  return (
    <>
      <button onClick={action}>{children}</button>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [mostVotedIndex, setMostVotedIndex] = useState(0);

  function handleNextAnecdote() {
    let min = Math.ceil(0);
    let max = Math.floor(anecdotes.length - 1);
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    setSelected(randomNumber);
  }

  console.log(vote);

  function handleVote() {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);

    const getMostVoted = Math.max(...copy);
    const getMostVotedIndex = copy.indexOf(getMostVoted);
    setMostVotedIndex(getMostVotedIndex);
  }

  return (
    <>
      <h1>Anecdote of The Day</h1>
      <DisplayAnecdotes anecdote={anecdotes[selected]} votes={vote[selected]} />
      <Button
        action={() => {
          handleVote();
        }}
      >
        vote
      </Button>
      <Button
        action={() => {
          handleNextAnecdote();
        }}
      >
        next anecdote
      </Button>
      <h1>Anecdote With Most Votes</h1>
      <DisplayAnecdotes
        anecdote={anecdotes[mostVotedIndex]}
        votes={vote[mostVotedIndex]}
      />
    </>
  );
};

export default App;
