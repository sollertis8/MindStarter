# MindStarter
A brainstorming app that visually maps a user's thought process as they explore word relationships through homonyms, synonyms, antonyms, related words, and words that rhyme. 

## The Mindstarter App has 8 pages.

## Landing Page / Home Page
The landing page is the first page the user sees when hitting the site.  Here the user can get brief information about the app, click  the "get started" button to go to the Sign-up page, Log or click the Log In button to go to the log in page.

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Landing%20Page%20-%20mobile.png)
Home Page - Mobile

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Landing%20Page.png)
Home Page

## Sign Up Page
The sign Up page and sign up modal allow the user to sign up for access to the app by providing ther username, email, and password.  Usernames must be at least 6 charaters and can be numeric or alphanumeric with no special characters.  Passwords must be between 8 and 20 characters long, and must be alphanumeric with no special characters.  The user will enter their password twice for confirmation.

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Sign%20Up%20Page%20-%20mobile.png)
Sign Up Page - Mobile

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Signup%20Page.png)
Sign Up Modal

## Sign In Page
The user will sign in to the app on the Sign In page or Sign In modal with their email and password as credentials.  The user must tap/click the Sign In button with valid credentials for access.  There will also a "Forgot Password" link which will take the user to the Forgot Password Page or Modal depending on whether the user is on a mobile or desktop device, respectively.

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Sign%20In%20Page%20-%20mobile.png)
Sign In Page - Mobile

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Sign%20In%20Page.png)
Sign In Modal

## Forgot Password Page
The forgot password page allows the user to request a reset password link by entering their email.  An email will be sent to the user with a link that will take the user to the Reset Password page or modal depending on whether the user is on a mobile or desktop device.  The user must click/tap the "Send" button for the app to send the email. 

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Forgot%20Password%20Page%20-%20mobile.png)
Forgot Password Page - Mobile

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Forgot%20Password%20Page.png)
Forgot Password Modal

## Reset Password Page
The reset password page allows the user to reset their password by entering a new password twice.  Passwords must be between 8 and 20 characters long, and must be alphanumeric with no special characters.  The user must click/Tap the "Reset" button for changes to take effect. 

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Reset%20Password%20Page%20-%20mobile.png)
Reset Password Page - Mobile

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Reset%20Password%20Page.png)
Rest Password Page

## Project Page
On the mobile version of the app, the Project page is where the user enters information to create a new project.

On the desktop version of the app, the Project page is essentialy a hub interface that allows the user access to all aspects of the app.  From here, the user can create a new project, load an existing project, make updates to a project, access account information, and sign out of the app.  

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20New%20Project%20Page%20-%20mobile.png)
New Project page - mobile

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Profile%20Page.png)
New Project Page - Desktop

## Usage
Mindstarter is a brainstorming app that allows the user to get and visualize relationships between words.  This can be helpful for writers, songwriters, or anyone who wants a was to visually flesh out their ideas.   

The user will be able to create a new project by entering a Project Name, a Mindstarter Word (the word the user wants to get relationships for), a relationsip (the way the returned results will relate to the Mindstarter word i.e. - Means Like, Sounds Like, Spelled Like, Synonyms, Antonyms, and Rhymes with) and a depth (how many nodes the user wants returned).  

## Creating a Project
Once the user clicks the save button, a new project is created and will be listed under the Projects bar on the right side of the screen (on the desktop version), and the number of nodes (circles) specified in the Depth dropdown will be return based on the user's word and relationship settings (both mobile and desktop).  After the initial project creation, the "Save" button becomes an "Update" button.  After clicking "Save", the results will be returned as words inside nodes (circles) on the Mindstarter canvas called the Mindsphere.

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Project%20Page%20-%20mobile.png)
Project Page - Mobile

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Profile%20Page%20Project.png)
Project Page - Desktop

## Updating a Project
To add a new word or words to the Mindsphere with a new search, the user can simply enter a new Mindstarter word into the "Word" field, pick the relationship and depth they want returned, and tap/click the "Update" button.  Each word will be returned inside its own circle.  Each circle will have a label under the returned word that shows the relationship the word has with the original mind starter word.

## Exploring existing words
If the user wants to explore an existing word in the Mindsphere, the user can click the word they want to explore (causing the mindsphere to zoom in on the selected word) which will automatically enter the word into the "Word" field.  The user can then select the relationship and depth they want returned, and tap/click the update button.  The related words will be returned as circles inside of the word explored with labels showing their relationship with the explored word.  Users can currently explore 4 levels deep (i.e. the number of circles within circles).

## Account Page
On the mobile version of the app, the Account page can be accessed by swiping from the left side of the screen to reveal the slide out menu and tapping the Account icon which depicts the sillouhette of a person.  

On the deskop version of the app, the Account page can be accessed  by clicking the Account icon located in the left navigation panel.

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Side%20Slide%20Menu%20-%20mobile.png)
Slide Out Menu - Mobile

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Account%20Page%20-%20mobile.png)
Account Page - Mobile

![alt text](https://github.com/sollertis8/MindStarter/blob/feature/mvp-client/images/MindStarter%20-%20Account%20Page.png)
Account Modal - Desktop

## Technology Used
* HTML (Hypertext Markup Language) - the standard markup language for creating web pages and web applications<br/>
* CSS (Cascading Style Sheets) - a style sheet language used for describing the presentation of a document written in a markup language<br/>
* JavaScript - a high-level, prototype-based, multi-paradigm, and interpreted programming language <br/>
* jQuery - an open-source, cross-platform JavaScript libray for client-side scripting of HTML<br/>
* Node.js - an open-source, cross-platform JavaScript run-time environment for executing server-side JavaScript code<br/>
* Mocha.js - a JavaScript test framework for Node.js<br/>
* Chai.js - a Test Driven Development (TDD) and Behavior Driven Development (BDD) assertion library for Node.js<br/>
* Travis CI - a hosted, distributed continuous integration service used for building and testing projects<br/>
* MongoDB - a database engine that uses a JSON-like document model<br/>
* Mongoose - a MongoDB object modeling JavaScript library for Node.js<br/>
* D3.js - a JavaScript data visualization library<br/> 
* Google Drawings - a web-based diagraming software
