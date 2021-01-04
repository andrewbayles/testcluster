# Cartridge Crematorium Production Notes
# https://voxyheroku.herokuapp.com/


TO-DO

Add image uploading capability from local file to new cart page.


Steps to initialize the project working environment:

1. Link the project's Git repo to the project's Heroku server. DONE
2. Set up separate controller routes, for users, games, and sessions. DONE
3. Initialize starting file structure for models, views, and controllers. DONE
4.


DATABASE

1. Initialize and connect the project to local server. DONE
2. Connect the project to Heroku and MongoDB server. DONE
3. Determine fields to be stored for each game. (below)

  - id
  - title
  - smallimage
  - largeimage
  - genre
  - system
  - summary
  - rating
  - price
  - quantity


FRONTEND

1. Establish early, basic endpoints for database content.
2. Apply sitewide CSS theme.
  2a. Determine overall site color scheme using http://colormind.io/
  2b. Apply early overall sitewide CSS theme (basic table structure, background).
  2c. Complete CSS theme and position for site banner.
3. Apply individual page CSS themes.
  3a.

** MAKE NOTE OF CSS SOURCE HERE **

3. Collect external content (screenshots, game titles) for use with site.
  3a. Smaller NES/SNES cartridge images
  3b. Larger NES/SNES cartridge titles

  ** SITE SOURCE OF GAME CONTENT HERE **


ONGOING ISSUES

1. Dispite switching the order of the HTML for the "Log Out" and "Add a New Game" buttons, they refused to move into my intended position (Add New Game first) on the page.


OVERCOME CHALLENGES

1. I learned through some research that CSS files cannot be directly imported into an express-mounted site without first including express.static as middleware. This took some research.


NEW DISCOVERIES

1. I learned that https://stripesgenerator.com/ is a beautiful source for generating diagonal-striped backgrounds of all colors and widths.

2. ** INCLUDE INFO ABOUT DARKENING BANNER IMAGE VIA CSS **
