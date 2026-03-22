

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  accNo: 24002170110105,
  type: 'standard',
  movementsDates : [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2026-02-18T17:01:17.194Z',
    '2026-03-19T23:36:17.929Z',
    '2026-03-20T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  accNo: 24002170110106,
  type: `Premium`,
  movementsDates : [
  '2021-02-14T08:22:11.456Z',
  '2021-03-19T11:45:30.123Z',
  '2021-04-25T16:12:05.789Z',
  '2021-06-30T09:55:44.210Z',
  '2021-08-12T18:33:21.654Z',
  '2021-09-05T21:17:39.876Z',
  '2021-10-22T13:48:55.432Z',
  '2021-12-01T07:29:10.999Z',
  ],
  currency: 'USD',
  locale: 'en-US',
  
};

const account3 = {
  owner: 'Kavya Panchal',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  accNo: 24002170110107,
  type: `standard`,
  movementsDates : [
  '2022-01-10T06:14:22.345Z',
  '2022-02-18T12:39:45.567Z',
  '2022-03-27T15:50:18.234Z',
  '2022-05-04T20:21:33.890Z',
  '2022-06-15T09:07:41.654Z',
  '2022-07-29T14:56:12.321Z',
  '2022-09-03T19:38:27.876Z',
  '2022-10-17T11:25:59.111Z',
  ],
  currency: 'IND',
  locale: 'en-IN',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  accNo: 24002170110108,
  type: `basic`,
  movementsDates : [
  '2023-01-05T10:10:10.100Z',
  '2023-02-14T14:20:30.200Z',
  '2023-03-22T18:30:40.300Z',
  '2023-04-30T22:40:50.400Z',
  '2023-06-08T06:50:15.500Z',
  '2023-07-16T12:00:25.600Z',
  '2023-08-24T16:10:35.700Z',
  '2023-10-02T20:20:45.800Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseAccNo = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const formatMovementDate = function (dateArg) {
  
  const calcDaysPassed = (date1, date2) => {
    return Math.round(Math.abs(date2 - date1) / (1000 * 24 * 60 * 60));
  }


  const daysPassed = Number(calcDaysPassed(new Date(), new Date(dateArg)));
 
  console.log(daysPassed);
  if (daysPassed === 0) {
      return `Today`
  }

  if (daysPassed === 1) {
    return `Yesterday`
  }

  if (daysPassed <= 7) {
    return  `${daysPassed} days ago`
  }

  const date = new Date(dateArg);
  const date1 = `${date.getDate()
}`.padStart();
    const month = `${(date.getMonth() + 1)}`.padStart(2,0);
    const year = date.getFullYear();

  return `${date1}/${month}/${year}`;


};
const displayMovements = function (acc,sort=false)
{
  containerMovements.innerHTML = '';

  const combinedMovsDates = acc.movements.map((mov, i) => ({
    mov: mov,
    movDate: acc.movementsDates.at(i),
  }))
  
  // console.log(combinedMovsDates);

  if (sort)
  {
    combinedMovsDates.sort((a,b) => a.mov - b.mov)
  }

  // console.log(combinedMovsDates)
  

  
  combinedMovsDates.forEach(function (obj, i)
  {

    const { mov, movDate } = obj;

    
    
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    
   

    const displayDate = formatMovementDate(movDate);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    

    const html = `<div class="movements__row">
                       <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
                       <div class="movements__date">${displayDate}</div>
                       <div class="movements__value">${formattedMov}</div>
                  </div>`  
      
     
    containerMovements.insertAdjacentHTML('afterbegin',html);
    
      }
    )
  
   

    
    
}

const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      
    }).format(value);
 }

// Giving UserName to Account Holders as "Kavya Panchal" to kp..

let createUserName = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner.split(' ').map(acc1 => acc1[0]).join('');

  })
}

createUserName(accounts);


let totalBalance;
let calcPrintBalance = function (accc)
{
  accc.balance = accc['movements'].reduce((acc, cur, index, arrr) => acc + cur, 0).toFixed(2);

  labelBalance.textContent = formatCur(accc.balance, accc.locale, accc.currency);
  
  totalBalance = accc['movements'].reduce((acc, cur, index, arrr) => acc + cur, 0);
}


// ----------------------------------------------
let incomes;
let outcomes;
let interest;
let calcDisplaySummary = function (acc) {
   incomes = acc['movements'].filter(mov => mov >= 0).reduce((acc, mov) => acc + mov, 0);

   outcomes = acc['movements'].filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);

  // interest ..

   interest = acc['movements'].filter(mov => mov >= 0).map(mov => mov * acc['interestRate']/100).filter(mov => mov > 1).reduce((acc,cur)=> acc+cur);



  labelSumIn.textContent = formatCur(incomes,acc.locale,acc.currency);
  labelSumOut.textContent = formatCur((Math.abs(outcomes)),acc.locale,acc.currency);
  labelSumInterest.textContent = formatCur(interest,acc.locale,acc.currency);
}
const updateUI = function (acc) {
   // Display movements
    displayMovements(acc);
    // Display balance
    calcPrintBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
 }
// LogoutTimer..

  
const startLogOutTimer = function ()
{
  let timer = 600;

  const tick = function ()
  {
    // In each call, print the remaining time to UI..
    const min =String(Math.trunc(timer / 60)).padStart(2,0);
    const sec =String(timer % 60).padStart(2,0);
    labelTimer.textContent = `${min}:${sec}`;
    if (timer === 0)
   {
      clearInterval(time);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
      
    }
    timer--;
    
   
    // When 0 seconds stop Timer and log out user
  
  };
  
  
  // Call the timer every second
  tick();
  const time = setInterval(tick, 1000);

  return time;
 
}
// Login feature....

let currentAccount,time;

 btnLogin.addEventListener('click', function (e)
{
  // prevent form from submitting...
  e.preventDefault();

   currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
   
  
   if (currentAccount?.pin === Number(inputLoginPin.value)) {

   
    
     // Display UI and message
     labelWelcome.textContent = `Welcome back,
     ${currentAccount.owner.split(' ')[0]}`;
     containerApp.style.opacity = 100;

     // Create Current Date..
      
     const now = new Date();
     let option = {
       day: 'numeric',
       month: 'numeric',
       year: '2-digit',
       hour: 'numeric',
       minute: 'numeric',
       weekday: 'long',
     }

     const locale = currentAccount.locale;
     

    labelDate.textContent = `${new Intl.DateTimeFormat(locale,option).format(now)}`;
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

     if(time)
     {
       clearInterval(time)
     };
     time = startLogOutTimer();
     
     updateUI(currentAccount);

     
    
    

    

  }
 

 }
 
 )

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const accNo = Number(inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);
  let error = 404;

  let acc = accounts.find(acc => acc.accNo === accNo) ?? error;

  if (acc != error && acc != currentAccount && amount != 0 && amount <= totalBalance) {
    currentAccount.movements.push(-amount);
    acc.movements.push(amount);
    const now = new Date();
    acc.movementsDates.push(now.toISOString());
    currentAccount.movementsDates.push(now.toISOString());

    updateUI(currentAccount);
    //  Reset Timer ..
     
    clearInterval(time);
    time = startLogOutTimer();
    
  }

  


});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const accNo = Number(inputCloseAccNo.value);
  const pin = Number(inputClosePin.value);

  if (accNo === currentAccount.accNo && pin === currentAccount.pin) {
     
    let index = accounts.findIndex(acc => acc.accNo === currentAccount.accNo);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;

    setTimeout(function () {
      alert(`Your Account is Closed....`);
    }, 1000);

    
 
  }

    clearInterval(time);
    time = startLogOutTimer();


  

});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  
  const amount = Math.floor(Number(inputLoanAmount.value));
  const rate = 0.10;
  if(amount > 0 && currentAccount.movements.some(ele => ele >= rate * amount && ele > 0))
  {

    setTimeout(function () {
       const now = new Date();
       currentAccount.movements.push(amount);
       currentAccount.movementsDates.push(now.toISOString());
       updateUI(currentAccount);
       inputLoanAmount.value = '';
    },2500)
    
  }

     clearInterval(time);
    time = startLogOutTimer();

})

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
})





/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];



/////////////////////////////////////////////////

let accMove = accounts.map(acc => acc.movements);
console.log(accMove);

accMove = accounts.flatMap(acc => acc.movements).reduce((acc, cur) => acc + cur,0);

console.log(accMove);

const groupedActivity = Object.groupBy(accounts, acc => {
  const movCount = acc.movements.length;
  if (movCount >= 8) return 'very Active';
  if (movCount >= 4) return 'active';
  if (movCount >= 1) return 'moderate';
  return 'inactive';
});

console.log(groupedActivity);

// const groupedAcc = Object.groupBy(accounts, acc => acc.type);
const groupedAcc = Object.groupBy(accounts, ({type})=>type);
console.log(groupedAcc);

//  Array.from() method....

let newArrData = document.querySelector('.movements__value');

labelBalance.addEventListener('click', function () {
  
   let movementsUI = Array.from(document.querySelectorAll('.movements__value'),(ele => ele.textContent.replace('💲', '')));
  
  console.log(movementsUI);


  

})



// Array Methods Practice....
// 1.
const bankDepositSum = accounts.flatMap((elt) => elt.movements).filter(elt => elt > 0).reduce((acc, cur) => acc + cur, 0);
 
console.log(bankDepositSum); 

// 2. 
const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((count,cur) => (cur>=1000 ? count + 1 : count) , 0);

console.log(accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000));

console.log(numDeposits1000);

// 3.

const {deposits , withdrawals} = accounts.flatMap(acc => acc.movements).reduce((sums, cur) => {
  cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur); return sums;
}, { deposits: 0, withdrawals: 0 })

console.log(deposits, withdrawals);

 // 4. 

// this is a nice title => This Is a Nice Tittle

const convert = function (str)
{
  const exception = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  let arr = str.split(' ');

  let str1 = [];
  exception.forEach((elt) =>
  {
    str1.push(arr.map((elt1) => (elt1.includes(elt) ? elt1.toUpperCase() : elt1 )))
  })

  str1=str1.flat().join(' ');

  console.log(str1);

  

}

convert('this is a nice title');

// MODAL FUNCTIONALITY
const modal = document.getElementById('readme-modal');
const closeBtn = document.getElementById('close-modal');

// Show modal on page load
window.addEventListener('load', function() {
  modal.style.display = 'block';
});

// Close modal when close button is clicked
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
















