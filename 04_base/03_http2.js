const http = require("http");

const visits = new Map();
const search = new Map();

const PORT = 8000;
const serverName = `http://localhost:${PORT}`;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, serverName);
  for (const name of parsedUrl.searchParams.keys()) {
    search.set(name, (search.get(name) || 0) + 1);
  }
  const key = parsedUrl.pathname;
  const count = (visits.get(key) || 0) + 1;
  visits.set(key, count);
  res.end(`This is #${count} visit to ${key}

Search params counts:
${[...search.entries()].map(([key, value]) => `${key} => ${value}`).join("\n")}
`);
});

server.listen(PORT, () => {
  console.log(`Listening to ${serverName}`);
});
