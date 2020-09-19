const express = require("express"),
  server = express();

var github = require("octonode");

//setting the port.
server.set("port", process.env.PORT || 5000);

//Binding to localhost://5000
server.listen(5000, () => {
  console.log("Express server started at port 5000");
});

/**
 * @api {get} /api/repositories:name? Request User GitHub Private and Public Repositories
 * @apiName getRepositories
 *
 * @apiHeaders {String} token GitHub Personal Access tOKEN
 * @apiParam {String} name Query string for filtering the repositories by name(optional)
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
 * @param {string} name of the optional query paramater.
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
