const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const likes = 0;

  const repository  = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: likes,
  }

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id == id
  );

  if (findRepositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository does not exists.' });
  }

  const repository = {
    id: id,
    title: title,
    url: url,
    techs: techs,
    likes: repositories[findRepositoryIndex].likes,
  };

  repositories[findRepositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id == id
  );

  if (findRepositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository does not exists.' })
  }; 

  repositories.slice(findRepositoryIndex, 1);
  return response.status(204).send();
  
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id == id
  );

  if (findRepositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository does not exists.' });
  }

  repositories[findRepositoryIndex].likes += 1;

  return response.json(repositories[findRepositoryIndex]);
});

module.exports = app;
