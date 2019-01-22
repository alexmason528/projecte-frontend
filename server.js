const express = require('express');
const app = express();
const request = require('request');
const dotenv = require('dotenv').config();
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3000;

app.get('/item/:type/:id', function(req, res) {
  const filePath = path.resolve(__dirname, './build', 'index.html');

  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    const { type, id } = req.params;

    const { API_BASE_URL } = dotenv.parsed;

    request.get(`${API_BASE_URL}/api/item/${type}/${id}`, function(error, itemRes, itemBody) {
      const { name, details, images } = JSON.parse(itemRes.body);

      // replace the special strings with server generated strings
      data = data.replace(/__OG_TITLE__/g, name);
      data = data.replace(/__OG_SITE_NAME__/g, "Estify.me");
      data = data.replace(/__OG_DESCRIPTION__/g, details);

      if (images && images.length > 0) {
        data = data.replace(/__OG_IMAGE__/g, `${API_BASE_URL}${images[0].obj}`);
      }

      res.send(data);
    })
  });
});

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(req, res) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  res.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
