# Xpenser 💰

## Xpenser Description
Xpenser is a user-friendly tool designed to help individuals easily manage and track their expenses.
With intuitive features and a clean interface, users can effortlessly record their transactions and categorize their expenses.<br>
**This is the backend repository of Xpenser, frontend is right [here](https://github.com/RonFelsenfeld/Xpenser-Frontend).**

## Showcase
<img src="https://res.cloudinary.com/df6vvhhoj/image/upload/v1715604737/xpenser-readme_lxnww1.gif" width="500">

## API Endpoints
**1. Expense endpoints:**
```
(GET) /api/expense/ - Reads all expenses.
(GET) /api/expense/:expenseId - Reads a specific expense (by ID).
(POST) /api/expense/ - Add expense.
(PUT) /api/expense/:expenseId - Updates a specific (by ID).
(DELETE) /api/expense/:expenseId - Removes a specific expense (by ID).
```

**2. Authentication endpoints:**
```
(POST) /api/auth/login - Logins a user.
(POST) /api/auth/signup - Signups a user.
(POST) /api/expense/ - Logouts the logged-in user.
```

 
## Local Installation
**1. Clone the repo:**
```
git clone https://github.com/RonFelsenfeld/Xpenser-Backend.git
```

**2. Navigate to the project directory and install dependencies:**
```
cd Xpenser-Backend
npm install
```
**3. To run server:**
```
npm start
```

**4. Install [Xpenser-Frontend](https://github.com/RonFelsenfeld/Xpenser-Frontend) locally and run the client.** <br>
*(Follow the instructions in it's README file)*

