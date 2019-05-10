####PREVIOUS CONSIDERATIONS####

1. The API connects to a local MongoDB database running at "localhost:27017". This can be changed in "hackernews_feed/src/index.ts" at line 12.

2. The API runs at port 3000 by default, which can be changed in "hackernews_feed/src/index.ts" at line 10. If this value is changed, then the value at "hackernews-feed-client/src/app/article.service.ts" at line 11 must be updated too.

####RUNNING THE WEB APP####

1. Open the terminal at the "hackernews_feed" directory and run the API with the following command:
	npm run start
A database with name "hn_feed-navila_2019" will be created.

2. Open the terminal at the "hackernews-feed-client" directory and run the command:
	ng serve
The client runs at port 4200.

3. Open the web browser and go to localhost:4200 to use the web application.