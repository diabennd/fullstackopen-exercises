const Header = ({ courseName }) => {
  return (
    <>
      <h2>{courseName}</h2>
    </>
  );
};

const Content = ({ courseContent }) => {
  return (
    <>
      <div>
        {courseContent.map((value) => {
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

const Part = ({ part, exercises }) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      {course.map((item) => {
        const parts = item.parts;
        const total = parts.reduce((accu, curr) => {
          let s = accu + curr.exercises;
          return s;
        }, 0);

        console.log(parts);
        console.log(item.id);
        return (
          <div key={item.id}>
            <Header courseName={item.name} />
            <Content courseContent={parts} />
            <h3>Total of {total} exercises</h3>
          </div>
        );
      })}
    </>
  );
};

export default Course;
