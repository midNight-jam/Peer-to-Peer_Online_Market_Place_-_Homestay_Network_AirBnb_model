# --AirBnb-- model


------**Project Structure**-------------

*public folder:
main.js = holds all the states for UI Routing

**For every functionality there will be a separate folder under 'public' which will have the following files for that particluar funcionality:
1) *.html -- Html for that particular functionality which will be imported in ui view
2)*.js - controller for the particular functionality
3)*.css -- styling for that particular html page

For Ex:
For the functionality "yourListings" there will be a folder with the same name and that folder will include the below files(could be more)
1)yourListings.html
2)yourListingsController.js
3)yourListingsStyle.css


*views folder:
homepage.ejs = the first page that loads which contains the header andui-view. '/' will render the homepage.ejs.Every page will be loaded in 'ui-view' of homepage.ejs.

*Rest all remains the same.

------**Project Structure**-------------
