import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 3001;

let notes = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const min = notes.length;
  const max = 100;
  const id =
    notes.length > 0 ? Math.floor(Math.random() * (max - min + 1)) + 1 : 0;
  return String(id);
};

app.use(express.json());
// app.use(morgan("tiny"));
// app.use(morgan.token("type", (req, res) => {}));
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  }),
);

app.listen(PORT, () => {
  console.log("listening on port ", PORT);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const note = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  const noteExist = notes.find((n) => n.name === body.name);

  if (noteExist) {
    res.status(400).send({ error: "name must be unique" });
  } else if (!body.name || !body.number) {
    res.status(400).send({ error: "missing content" });
  } else {
    notes = notes.concat(note);
    res.send(notes);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);

  res
    .status(204)
    .send({
      message: "deleted",
    })
    .end();
});

app.get("/api/persons", (req, res) => {
  res.json(notes);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((n) => n.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).send("<h1>404 Not Found</h1>").end();
  }
});

app.get("/info", (req, res) => {
  const date = new Date().toString();
  const response = `<p>Phonebook has info for ${notes.length} people</p>
    <p>${date}</p>`;

  console.log(date);
  res.send(response);
});
