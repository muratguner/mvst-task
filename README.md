# mvst-task

### Run
- Navigate to the mvst-task directory
- ```docker build -t mvts-task .```
- ```docker run -d -p 5000:5000 --name node-app mvts-task```

## Endpoints
- Rest API: http://localhost:5000
- Portainer (to manage all containers): http://localhost:9201

## Routes

### User repositories
`/localhost:5000/api/repositories?name=awesome`

Returns all the repositories of the user, where the repository name includes awesome.
If name (optional)paramater is not given, it returns all the repositories of the user.

Example:
~~~
{
	"repositories": [
		{
			"name": "my_awesome_javascript_project",
			"url": "https://github.com/rodrigopk/my_awesome_javascript_project",
			"language": "Javascript"
		},
		{
			"name": "my_awesome_ruby_project",
			"url": "https://github.com/rodrigopk/my_awesome_ruby_project",
			"language": "Ruby"
		},
		{
			"name": "my_awesome_java_project",
			"url": "https://github.com/rodrigopk/my_java_ruby_project",
			"language": "Java"
		}
	]
}
~~~
