# Readable API Server

This is my project for Udacity React/Redux course. 

The app comes up with a default set of posts and categories. You can add new post to a category or sort the posts by
Vote score or Timestamp.

You can edit a post by clicking on it and updating the title and body. Comments can be added to the post by clicking on
the post. New comments will display below the post.

Comments can be voted up or down; comments can be edited or deleted.

This project has 2 components - front-end and backend-server.

The backend-server is a simple nodejs server that initializes the app with some bootstrap data for the posts and comments to start with.

The data that's added to the server will be persisted as long as the backend server is running. If you restart the backend server, the
data changes you made will be lost.

To start the backend-server:

-- cd to 'api-server'
-- npm install
-- npm start

By default this will start the backend server on port 4001.


To start the front-end server:

-- cd to 'frontend'
-- npm install
-- npm start

If your port 3000 is being used, this will prompt you for a different port.


