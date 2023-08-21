# 💸 Financial Literacy Hackathon 2023
*General Assembly Hackathon Summer August 14th 2023*

***Result: 1st Place***


## Hackathon Prompt

Create a more complete, data-driven, real-time credit score software that considers a borrower's finanacial and credit history from the beginning of time and can be used to qualify borrowers for credit and loans. Nice to have features can include: consider bill payments, rent, utilities, subscriptions, and visualization of data.


## Description

Embark on a seamless credit journey with our innovative web application. ScoreEase introduces a user-friendly interface that seamlessly combines the power of real-time data analysis with the entirety of your financial history. Say farewell to complex credit assessments and embrace a new era of simplicity and accuracy, as ScoreEase effortlessly allows borrowers to view credit and loans by tapping into their complete financial narrative, all at your fingertips.

## Github Repository Links
- Frontend Repo: https://github.com/Jagerziel/Credit_Score_App_Frontend
- Backend Repo: https://github.com/krsnamara/Credit_Score_App_Backend
- Data Modeling Repo: https://github.com/codewithkate/Credit_Score_App_Model


## Application Screenshots
**Home Screen**

*The landing screen when the application first loads.  The user has the option of logging in or navigating to the dashboard screen to further explore the application*  

![Home](./src/images/LogoutHomeScreenshot.png)

**Dashboard Screen (Logged Out)**: 

*The user has the option of logging in or reviewing the different categories they would need to fill to obtain an estimated credit score*

![LoggedOut](./src/images/LogoutDashboardScreenshot.png)

**Dashboard Screen (Logged In)**

*Once the user logs in, they are greeted at the top of the application and the input fields appear allowing them to input the relevant information to determine their scores.*

![LoggedIn](./src/images/LoginDashboardScreenshot.png)


## How ScoreEase was Built

### Design

The initial question we had to answer is how we wanted to approach this application.  Our team is comprised of `1 UX/UI Designedr`, `3 Software Engineers`, and `2 Data Scientists`.  After a day of planning, our approach became the following:

 - Data Science Team: Plan and research the best approach to determining how the score would be calculated.  
 - Software Engineering Team:  Set up the base shell code for the Front-End and Back-End, testing all routes, setting up base react components, discussing all dependencies, and aligning on naming conventions
 - UX/UI Team: Research similar applications currently available on the market and begin wireframing

We also agreed, given the 3-day timeframe, to limit the design to an iPhone 14-max with plans to provide more responsive design in the future.  Given the limited time, the Software Engineering team determined it would be best to ensure full CRUD, user authentication, and dynamic rendering was prioritized first.

### Colloaboration

A critical piece to our team success was the team collaboration.  All teams discussed the appropriate input and output fields.  This ensured that the interface designed by UX/UI would take the necessary inputs required by the Software Engineering and Team Data Science teams.  The method of calculation was much discussed as well and ultimately determined that the Data Science Team would provide a `Scorecard` to be implemented for dynamic rendering on the web application.  

### The Scorecard

The Scorecard was developed using a point system.  The base score is `741` and each entry by a user will add or subtract points from the base score to determine a user's ultimate credit score.

The Scorecard is formatted as an object where the key contains an array.  The `even indexes` within the array are the maximum thresholds.  The `odd indexes` are the score modifiers.  

The Scorecard:
```
export const scoreCard = {
  'basepoints': [0, 741.0],
  'RevolvingUtilizationOfUnsecuredLines': [0.5, 38.0, 1.0, -38.0, 1.5, -90.0, 1000000000, -65.0],
  'age': [18.0, -69.0, 26.0, -15.0, 35.0, -15.0, 45.0, -9.0, 65.0, 2.0, 1000000000, 28.0],
  'NumberOfTime30-59DaysPastDueNotWorse': [1.0, 16.0, 2.0, -27.0, 1000000000, -57.0],
  'DebtRatio': [0.3125, 7.0, 0.625, -3.0, 2.5, -29.0, 1000000000, 10.0],
  'MonthlyIncome': [0, 2.0, 5000.0, -3.0, 10000.0, 1.0, 1000000000, 5.0],
  'NumberOfTimes90DaysLate': [1.0, 12.0, 1.5, -59.0, 5.0, -84.0, 10.0, -100.0, 1000000000, -85.0],
  'NumberRealEstateLoansOrLines': [0.5, -10.0, 3.0, 10.0, 1000000000, -11.0],
  'NumberOfTime60-89DaysPastDueNotWorse': [1.0, 9.0, 2.0, -54.0, 1000000000, -82.0],
  'NumberOfDependents': [0, 11.0, 2.0, 2.0, 20.0, -7.0, 1000000000, -66.0]
}
```

The algorithm edge cases:
 - Upper and Lower Bounds:  The maximum value in the scorecard is 1,000,000,000 therefore when the algorithm takes in a value that exceeds this maximum, it will set it to 1,000,000,000.  It will also set any NaN values to 0 (when a user deletes their input, the empty string will result in `NaN`)
 - Adjust the Score: As the score can only land between 300 and 850 a lower and upper bound were set, respectively, to ensure a result within this range.

### Full Stack Data Flow with Firebase

The below diagram illustrates the communciation flow between the Front-End, Back-End, and Firebase.

![FirebaseFlow](./src/images/FirebaseFlow.png)

### Data Science Modelling Approach

The model calculates a score that predicts the probability of a borrower repaying a loan on time.  It uses Weight of Evidence (WoE) which explains howcertain factors, such as age or spending, affects credit history.  The aim is to provide more transparent scoring metrics.

![DataModelApproach](./src/images/DataModelApproach.png)

### The Result

Our team collaborated across many fronts to construct a full stack MERN applciation with user authentication leveraging data modeling, intuitive UX design, and seemless usability.  

`***This application was awarded first place in General Assembly's Summer Hackathon!***`

## Technologies Used

### Front-End Dependencies

 - firebase
 - framer-motion
 - react
 - react-dom
 - react-router-dom
 - recharts
 - sass


### 💻 Full Stack Technologies Used

[![My Skills](https://skillicons.dev/icons?i=html,css,js,react,next,git,github,nodejs,mongodb,figma,netlify,vercel,supabase,vscode&perline=7)](https://skillicons.dev)

- HTML5
- CSS3
- JavaScript
- React
- Express
- Python
- MongoDB
- Figma
- Git/Github
- Nodejs
- Vercel

## Future Features

- Info modals for explanations on credit scores
- More efficient API call methods 
- Enhancement of Data Model
- Packaging for integration into other business products

## Team

**Alaysia Veal (Software Engineer)**
[LinkedIn](https://www.linkedin.com/in/alaysia-veal/)
[GitHub](https://github.com/AlaysiaVeal)

**Kimberly Mannette (UX/UI Designer)**
[LinkedIn](https://www.linkedin.com/in/kimberlymannette/) |
[GitHub](https://github.com/kimberlymannette)

**Kate Crawford (Data Science Engineer)**
[LinkedIn](https://www.linkedin.com/in/kaitlencrawford/) |
[GitHub](https://github.com/codewithkate)

**Mark Harris (Data Science Engineer)**
[LinkedIn](https://www.linkedin.com/in/markcharris1/) |
[GitHub](https://github.com/MarkCHarris)

**Martin Fitzpatrick (Software Engineer)**
[LinkedIn](https://www.linkedin.com/in/martinj-fitzpatrick/) |
[GitHub](https://github.com/krsnamara)

**Ryan Ehrlich (Software Engineer)** 
[LinkedIn](https://www.linkedin.com/in/ryanehrlich/) |
[GitHub](https://github.com/Jagerziel)