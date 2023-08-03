const express = require('express');
const { exec } = require('child_process');

const app = express();

app.get('/get-page', (req, res) => {
  const url = req.query.url; // Assuming you pass the URL as a query parameter

  // Choose either w3m or lynx based on your preference
  const command = `w3m -dump "${url}"`; // Or `lynx -dump "${url}"`

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return res.status(500).send('Error fetching the page.');
    }
    res.send(stdout);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
