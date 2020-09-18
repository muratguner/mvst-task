const express = require("express"),
  server = express();

var github = require("octonode");
const auth = require("octonode/lib/octonode/auth");

//setting the port.
server.set("port", process.env.PORT || 5000);

//Binding to localhost://3000
server.listen(5000, () => {
  console.log("Express server started at port 3000");
});

/**
 * @api {get} /api/repositories:name? Request User GitHub Private and Public Repositories
 * @apiName getRepositories
 *
 * @apiParam {String} name Repository name(optinal)
 *
 * @apiSuccess {Object} Json object of the User repositories.
 */
server.get("/api/repositories:name?", (req, res, next) => {
  const authHeader = req.headers["token"];
  const name = req.query.name;
  var client = github.client(authHeader);
  client.get("user/repos", function (err, status, body, headers) {
    let repos = generateRepositoriesArray(body, name);
    res.json(repos);
  });
});

/**
 * Responsible for generating a response array.
 * @param {object} body of the request.
 * @param {string} name of the optinal query paramater.
 */
function generateRepositoriesArray(body, name) {
  let childrenArray = [];
  let repositories = {};
  body.map((entry) => {
    child = {};
    child["name"] = entry.name;
    child["url"] = entry.url;
    child["language"] = entry.language;
    childrenArray.push(child);
  });
  if (name !== undefined) {
    childrenArray = childrenArray.filter((i) => i.name.includes(name));
  }
  repositories["repositories"] = childrenArray;
  return repositories;
}
