// query Selectors
const form = document.querySelector('#form-input');
const guess = document.querySelector('#guess');
const p = document.querySelector('.info-message');
const btn = document.querySelector('.btn');
const min = document.querySelector('.min-number');
const max = document.querySelector('.max-number');

var chances = 3;
var random = getRandomInRange();


form.addEventListener('submit', function (e) {
   if (chances === 0) {
      resetGame();
   }
   else {
      // Validation
      let intGuess = parseInt(guess.value);
      if (isNaN(intGuess)) {
         alert('Please Enter A Guess');
      }
      else if (parseInt(min.textContent) > intGuess || parseInt(max.textContent) < intGuess) {
         alert('Please Enter Number Between Given Range');
      }

      else {
         if (intGuess === random) {
            p.className = 'alert alert-success info-message';
            p.textContent = 'Congratulation You Guessed Correctly !';
            guess.className = 'border border-success form-control';
            btn.className = 'btn btn-success';
            btn.value = 'Play Again';
            chances = 0;
            guess.disabled = true;
         }
         else {
            chances--;
            p.className = 'alert alert-danger info-message';
            guess.className = 'border border-danger form-control';

            if (chances === 0) {
               p.textContent = `Sorry You Lost The Game. Correct Answer : ${random}`;
               btn.className = 'btn btn-danger';
               btn.value = 'Play Again';
               guess.disabled = true;
            }
            else {
               p.textContent = `Oops ! Wrong Guess ${chances} Chances Left`;
               setTimeout(() => {
                  if (chances !== 0) {
                     p.className = 'info-message';
                     p.textContent = '';
                     guess.className = 'form-control';
                  }
               }, 2200);
            }
         }
      }
   }
   e.preventDefault();
});


function resetGame() {
   chances = 3;
   random = getRandomInRange();
   guess.disabled = false;
   guess.value = '';
   p.className = 'info-message';
   p.textContent = '';
   guess.className = 'form-control';
   btn.className = 'btn btn-info';
   btn.value = 'Submit';
}


function getRandomInRange() {
   let minVal = Math.floor(Math.random() * 91);
   let maxVal = minVal + 9;
   min.textContent = minVal.toString();
   max.textContent = maxVal.toString() + ' .';
   let rand = Math.floor(Math.random() * (+maxVal - +minVal)) + +minVal;
   console.log(rand);
   return rand;
}