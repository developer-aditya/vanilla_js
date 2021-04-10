// Event Listeners
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('pincode').addEventListener('blur', validatePincode);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('number').addEventListener('blur', validateNumber);
document.getElementById('input-form').addEventListener('submit', function (e) {
   // Form Validations
   validateName();
   validatePincode();
   validateEmail();
   validateNumber();

   //Submit Handling

   //Prevent Default Form Submit Behaviour
   e.preventDefault();
});

// Event Handling Functions

function validateName() {
   const name = document.getElementById('name');
   name.className = 'form-control';
   const regex = /^[\w\s]{3,16}$/;

   if (regex.test(name.value)) {
      name.classList.add('is-valid');
   } else {
      name.classList.add('is-invalid');
   }
}

function validatePincode() {
   const pincode = document.getElementById('pincode');
   pincode.className = 'form-control';
   const regex = /^\d{6}$/;

   if (regex.test(pincode.value)) {
      pincode.classList.add('is-valid');
   } else {
      pincode.classList.add('is-invalid');
   }
}

function validateEmail() {
   const email = document.getElementById('email');
   email.className = 'form-control';
   const regex = /^([\w\-\.]+)@([\w\-\.]+)\.([a-zA-Z]{2,5})$/;

   if (regex.test(email.value)) {
      email.classList.add('is-valid');
   } else {
      email.classList.add('is-invalid');
   }
}

function validateNumber() {
   const number = document.getElementById('number');
   number.className = 'form-control';
   const regex = /^(\+91)?-?\d{10}$/;

   if (regex.test(number.value)) {
      number.classList.add('is-valid');
   } else {
      number.classList.add('is-invalid');
   }
}
