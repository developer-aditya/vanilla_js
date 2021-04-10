// Event Listeners
const result = document.querySelector('.result');
const loader = document.querySelector('.loader');

document.querySelector('#form-input').addEventListener('submit', function (e) {

   result.style = 'display : none;';
   loader.style = 'display : block;';

   setTimeout(performCalculation, 3000);
   e.preventDefault();
});


// Utility Functions

function showError(errorMsg) {
   loader.style.display = 'none';
   result.style.display = 'none';

   const cardBody = document.querySelector('.card-body');
   const title = document.querySelector('.card-title');

   const errorDiv = document.createElement('div');
   errorDiv.className = 'alert alert-danger';
   errorDiv.textContent = errorMsg;

   cardBody.insertBefore(errorDiv, title);

   setTimeout(() => {
      document.querySelector('.alert').remove();
   }, 2500);
}



// Event Handling functions

function performCalculation() {

   // UI Variables
   const amount = document.getElementById('amount');
   const interest = document.getElementById('interest');
   const year = document.getElementById('year');
   const totalCost = document.getElementById('tPayment');
   const monthlyCost = document.getElementById('mPayment');
   const interestCost = document.getElementById('tInterest');

   // values form UI
   const principle = parseFloat(amount.value);
   const calInterest = parseFloat(interest.value) / 100 / 12;
   const calPayment = parseInt(year.value) * 12;

   // Calculating Monthly Payments
   const x = Math.pow(1 + calInterest, calPayment);
   const cost = (principle * x * calInterest) / (x - 1);

   if (isFinite(cost)) {
      monthlyCost.value = cost.toFixed(2);
      totalCost.value = (cost * calPayment).toFixed(2);
      interestCost.value = ((cost * calPayment) - principle).toFixed(2);

      loader.style.display = 'none';
      result.style = 'display : block;';
   }
   else {
      showError('Please Enter Correct Values...');
   }
}