# Bankist Banking Application - README

## Overview
Bankist is a modern, user-friendly online banking application built with HTML, CSS, and JavaScript. It simulates a real banking experience with features like account management, money transfers, loan requests, and transaction history. The app supports multiple currencies and locales, providing a localized experience for users.

## Features
- **Secure Login**: Access your account using a username (initials of your name) and a 4-digit PIN.
- **Account Overview**: View your current balance, transaction history, and account summary (total deposits, withdrawals, and interest earned).
- **Money Transfers**: Transfer money to other Bankist users by entering their account number.
- **Loan Requests**: Request loans based on your deposit history (must have a deposit of at least 10% of the requested loan amount).
- **Account Closure**: Close your account permanently if needed.
- **Transaction Sorting**: Sort your transaction history by amount.
- **Auto Logout**: Automatic logout after 10 minutes of inactivity for security.
- **Multi-Currency Support**: Supports EUR, USD, and INR with proper formatting.
- **Responsive Design**: Works on desktop and mobile devices.

## Use Cases

### 1. User Registration and Login
- **Scenario**: New users need to access their accounts.
- **How it works**: The app comes with pre-configured demo accounts. Users log in using their username and PIN.
- **Demo Accounts**:
  - Jonas Schmedtmann: Username: js, PIN: 1111
  - Jessica Davis: Username: jd, PIN: 2222
  - Kavya Panchal: Username: kp, PIN: 3333
  - Sarah Smith: Username: ss, PIN: 4444

### 2. Viewing Account Information
- **Scenario**: Users want to check their balance and recent transactions.
- **How it works**: After login, the dashboard displays:
  - Current balance
  - List of movements (deposits and withdrawals) with dates
  - Summary showing total incoming, outgoing, and interest amounts

### 3. Transferring Money
- **Scenario**: Users need to send money to another Bankist user.
- **How it works**:
  - Enter the recipient's account number
  - Enter the transfer amount
  - The transfer is processed if the account exists, is not your own account, and you have sufficient balance
  - Both accounts are updated immediately

### 4. Requesting a Loan
- **Scenario**: Users need additional funds for expenses.
- **How it works**:
  - Enter the desired loan amount
  - The loan is approved if you have at least one deposit that is 10% or more of the requested amount
  - Approved loans are added to your account after a 2.5-second processing delay

### 5. Closing an Account
- **Scenario**: Users want to permanently close their account.
- **How it works**:
  - Enter your account number and PIN for confirmation
  - The account is removed from the system, and you are logged out

### 6. Sorting Transactions
- **Scenario**: Users want to organize their transaction history.
- **How it works**: Click the "SORT" button to toggle between chronological and amount-sorted order.

### 7. Security and Session Management
- **Scenario**: Protecting user accounts from unauthorized access.
- **How it works**: Automatic logout after 10 minutes of inactivity. Users must re-login to continue.

## How to Use the Application

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No internet connection required (runs locally)

### Installation and Setup
1. Download or clone the project files.
2. Ensure the following files are in the same directory:
   - `index.html`
   - `script.js`
   - `style.css`
   - `logo.png` (optional, for branding)
   - `icon.png` (optional, for favicon)

### Running the Application
1. Open `index.html` in your web browser.
2. You will see the login screen with the message "Log in to get started".

### Logging In
1. Enter your username (e.g., "js" for Jonas Schmedtmann).
2. Enter your 4-digit PIN (e.g., "1111").
3. Click the arrow button or press Enter.
4. If credentials are correct, you'll be logged in and see your account dashboard.

### Navigating the Dashboard
- **Balance Section**: Shows your current balance and the date.
- **Movements Section**: Lists all your transactions with dates.
- **Summary Section**: Displays total deposits (In), withdrawals (Out), and interest earned.
- **Operations**:
  - **Transfer Money**: Enter recipient's account number and amount.
  - **Request Loan**: Enter the loan amount.
  - **Close Account**: Enter your account number and PIN.

### Performing Transactions
- **Transfer**: Fill in the transfer form and submit. The transfer happens instantly if valid.
- **Loan**: Request a loan by entering the amount. Wait for approval (simulated delay).
- **Sort**: Click the "SORT" button to reorder transactions by amount.

### Logging Out
- The app automatically logs you out after 10 minutes of inactivity.
- To manually log out, simply wait for the timer or close the browser.

## Technical Details
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Storage**: In-memory (resets on page refresh)
- **Internationalization**: Uses Intl API for date and currency formatting
- **Security**: PIN-based authentication, auto-logout
- **Responsive**: CSS Grid and Flexbox for layout

## Demo Data
The app includes 4 demo accounts with sample transaction data:
- Jonas Schmedtmann (EUR, Standard): Multiple deposits and withdrawals
- Jessica Davis (USD, Premium): Large transactions
- Kavya Panchal (INR, Standard): Small transactions
- Sarah Smith (EUR, Basic): Recent activity

## Troubleshooting
- **Login Issues**: Ensure you're using the correct username (lowercase initials) and PIN.
- **Transfer Failures**: Check account number, ensure sufficient balance, and that you're not transferring to yourself.
- **Loan Denials**: Make sure you have a qualifying deposit (≥10% of loan amount).
- **Page Not Loading**: Ensure all files are in the same directory and you're opening `index.html`.

## Future Enhancements
- Persistent data storage (database integration)
- User registration
- Password recovery
- Advanced security features (2FA)
- Bill payments
- Investment tracking

## Credits
This application is based on the Bankist project from Jonas Schmedtmann's JavaScript course. Built for educational purposes to demonstrate modern JavaScript concepts.

For any questions or support, please refer to the course materials or contact the developer.