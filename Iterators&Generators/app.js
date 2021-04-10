// Profile Data
const data = [
   {
      name: 'John Doe',
      age: 32,
      gender: 'male',
      lookingfor: 'female',
      location: 'Boston MA',
      image: 'https://randomuser.me/api/portraits/men/82.jpg',
   },
   {
      name: 'Jen Smith',
      age: 26,
      gender: 'female',
      lookingfor: 'male',
      location: 'Miami FL',
      image: 'https://randomuser.me/api/portraits/women/82.jpg',
   },
   {
      name: 'William Johnson',
      age: 38,
      gender: 'male',
      lookingfor: 'female',
      location: 'Lynn MA',
      image: 'https://randomuser.me/api/portraits/men/83.jpg',
   },
   {
      name: 'Will Smith',
      age: 28,
      gender: 'male',
      lookingfor: 'female',
      location: 'New Jersy',
      image: 'https://randomuser.me/api/portraits/men/74.jpg',
   },
   {
      name: 'Jonnah Johnson',
      age: 30,
      gender: 'female',
      lookingfor: 'male',
      location: 'New York',
      image: 'https://randomuser.me/api/portraits/women/51.jpg',
   },
];

// Iterator Function
function profileIterator(profiles) {
   let nextIndex = 0;

   return {
      next: function () {
         if (nextIndex >= profiles.length) {
            nextIndex = 0;
         }
         return { value: profiles[nextIndex++], done: false };
      },
   };
}

// Iterator Created
const profileScroller = profileIterator(data);

// Function to iterate and Display on UI
function nextProfileDisplay() {
   const profile = profileScroller.next().value;

   document.getElementById(
      'profile-img'
   ).innerHTML = `<img src=${profile.image} class="img-fluid rounded-circle mb-4" alt="profile-image" />`;

   document.getElementById('profile-data').innerHTML = `   
      <ul class="list-group">
         <li class="list-group-item">${profile.name}</li>
         <li class="list-group-item">${profile.age}</li>
         <li class="list-group-item">${profile.gender}</li>
         <li class="list-group-item">${profile.location}</li>
         <li class="list-group-item">${profile.lookingfor}</li>
      </ul>
   `;
}

// Display First Profile On Loading
nextProfileDisplay();

// Event Listener For Next Profile Button
document.getElementById('next').addEventListener('click', nextProfileDisplay);

// Testing Map and Symbols
const name = Symbol('s1');
const gender = Symbol('s2');
const age = Symbol('s3');

const map = new Map([
   [name, 'aditya'],
   [gender, 'male'],
   [age, 10],
]);

// console.log(Array.from(map));

let obj = {
   [name]: 10,
   2: 'b',
   a: 'c',
   20: 'd',
   10: 'e',
};

console.log(obj);

const xe = Object.create(obj);

console.log(xe);
console.log(Object.keys(obj));
