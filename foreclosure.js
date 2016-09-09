'use strict';
var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted = 13;

function loan(){
var account = {};
  account.borrowed = 550000;
  account.balance = 286000;
  account.monthlyPayment = 1700;
  account.defaulted = 0;
  account.defaultsToForeclose = 5;
  account.foreclosed = false;

  function missPayment(){
    account.defaulted++;
    if(account.defaulted >= account.defaultsToForeclose){
      account.foreclosed =true;
    }
  }
  return {
    getBalance: function(){
      return  account.balance;
    },
    receivePayment:function(amount){
      if(amount < account.monthlyPayment){
        missPayment();
      }
        account.balance -= amount;
    },
    getMonthlyPayment:function(){
      return account.monthlyPayment;
    },
    isForeclosed: function(){
      return account.foreclosed;
    }
  };

}
  function borrower(loan){
    var account = {
    monthlyIncome : 1350,
    funds: 2800,
    loan: loan,
    };

    return {
      getFunds: function(){
        return account.funds;
      },
      makePayment: function(){
        if(account.funds > loan.getMonthlyPayment()){
          account.funds -= loan.getMonthlyPayment();
          loan.receivePayment(loan.getMonthlyPayment());
        }else{
          loan.receivePayment(account.funds);
          account.funds = 0;
        }
      },
      payDay: function(){
        account.funds += account.monthlyIncome;
      }
    };
  }
stevesLoan = loan();
steve = borrower(stevesLoan);

while(stevesLoan.isForeclosed() === false){
  steve.payDay();
  steve.makePayment();
  month++;
}

console.log(stevesLoan.getBalance());

