This project was created with

https://github.com/facebook/create-react-app

With an express server, and using redis as a datastore. Modules used include nodemon to moniter changes to files, and concurrently to run both the create-react-app and node express server at the same time.


Redis:

https://github.com/NodeRedis/node_redis


Watch SCSS:

Run npm run watch-css from client directory, to watch all .scss files, and complile to css

-
###Steps to run:

-  Clone repo:

	- SSH:
 		- `git clone git@github.com:tkhan003/react-express-scraper.git`

	- HTTPS: 
		- `git clone https://github.com/tkhan003/react-express-scraper.git`


- Ensure redis installed on your machine, if not, install:

	- Using homebrew:
	
		- `brew install redis`

3. `cd` into directory and run `yarn` to install all dependencies
4. Run `redis-server` to open your redis db connection
5. Run `yarn dev` to run app!