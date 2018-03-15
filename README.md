Readable project
================

This project brings up a web page and displays 'posts' with their author, categories, timestamp, votes and comments.

The user can switch to different categories to see the posts filtered by that category.  The user can also add new posts
to any of the listed categories. Comments can be added to a post by visiting the post detail page. The votes for the posts
and comments can be updated by clicking on the small triangles (for "up vote" or "down vote").

The posts and comments can be deleted also.

The posts listing can be sorted by post Vote score or by timestamp. Clicking on the sorting orders reverses the order of
the listing - ascending or descending.

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


