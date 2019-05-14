# Check Yourself

**Live Link:**
https://pacific-forest-78479.herokuapp.com/

**Test Creds:**
- user email: star@star.com
- password: sugarrush

## Overview
Check Yourself is a web app that allows users to log and manage their spending habits. Users will be able to set custom categories, see upcoming bills, and set warning triggers to be notified when spending approaches their limit. 

Presentation Slides - https://docs.google.com/presentation/d/1k6WAa7mlcXgiOvsaaa6LkA3QS1oS6d3zidRME61vciE/edit?usp=sharing

## New User Instructions
1. Go to Login/Sign Up to access the app
2. Go to Profile (New users are redirected here. Existing users are directed to the Dashboard first)
3. Confirm your monthly income
4. Name your custom budget categories (Each user can use 10)
5. Go to the bottom of the page and click ‘Submit Edit’
6. Go to Dashboard 
7. Go to Budgets 
8. Use the dropdown on the form or go to your desired category and click ‘Add to Form’ 
9. Enter the desired budget cap and warning amount
10. After you’re finished with Budgets, return to Dashboard
11. Click ‘Add Entries’
12. Fill out the form to create a spending/purchase entry
    * If it’s a bill, check ‘Is This Recurring?’ and select a future date
    * Note that future bill entries will also be displayed on the Bills page
13. Go back to Dashboard and see your progress

## Team
* Nick Groesch - https://github.com/NickGroesch
* Ogechi Ike - https://github.com/BlackMG27
* Chris Pete - https://github.com/neagtivefriction
* Nick Williams - https://github.com/nikorasu-san

## Technology Used
**Front End:**
* Materialize
* Chart.js
* Moment.js
* Jquery
* Handlebars

**Back End:**
* Node JS 
* Express.js
* Nodemailer
* Sequelize (ORM)

**Database:**
* MySql

**Deployment**
* Heroku

## Future Development
- Add a FAQ or documentation page to the app, consider a tour guide or UI changes to make the workflow more intuitive.
- Strengthening Login features and password security. Passport.js was strongly considered in first build.
- Cookie Encryption and advance cookie validation
- Expand user notification functionality (unsubscribe, phone texts via Twilio)
- Additional functionality like creating long-term goals for savings, automation with user bank account.
