const axios = require("axios");

axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
  response.data.slice(0, 10).forEach((post) => {
    console.log(`# ${post.title}
---------------------
${post.body}

`);
  });
});
