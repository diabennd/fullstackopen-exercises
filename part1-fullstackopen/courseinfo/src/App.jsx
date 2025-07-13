const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <div>
        <Header courseName={course.name} />
        <Content courseContents={course.parts} />
        <Total courseTotal={course.parts} />
      </div>
    </>
  );
};

const Header = ({ courseName }) => {
  return (
    <>
      <h1>{courseName}</h1>
    </>
  );
};

const Content = (props) => {
  const { courseContents } = props;
  return (
    <>
      <div>
        {courseContents.map((value) => {
          return (
            <Part
              part={value.name}
              exercises={value.exercises}
              key={crypto.randomUUID()}
            />
          );
        })}
      </div>
    </>
  );
};

const Total = ({ courseTotal }) => {
  const sum = courseTotal.reduce((accu, curr) => {
    let s = accu + curr.exercises;
    return s;
  }, 0);

  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  );
};

export default App;
