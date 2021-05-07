var express = require("express");
var request = require("request");
var cors = require("cors");

var app = express();
app.use(cors());

app.get("/", function (req, res) {
  try {
    const { tags } = req.query;
    request(
      `https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=${tags}`,
      (e, response, body) => {
        if (e) res.status(400).send({ error: 'fetch data fail' });
        res.status(200).send(JSON.parse(body).items);
      }
    );
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(4000);
