// Module Pattern Project

const StorageCtrl = (function () {
     return ({
          setItemsToLS: function (items) {
               localStorage.setItem("meals", JSON.stringify(items));
          },
          getItemsFromLS: function () {
               return JSON.parse(localStorage.getItem("meals"));
          },
          clear: function () {
               localStorage.clear();
          }
     });
})();




const ItemCtrl = (function () {
     // Item Constructor
     const item = function (id, name, calorie) {
          this.name = name;
          this.id = id;
          this.calorie = calorie;
     }

     // Data Structure / States
     const data = {
          items: [],
          currentItem: null,
          totalCalorie: 0,
     }

     // Public Functions
     return(
          {
               getItems: function () {
                    return data.items;
               },
               getTotalCal: function () {
                    return data.totalCalorie;
               },
               getCurrentItem: function () {
                    return data.currentItem;
               },
               addItem: function (id, name, calorie){
                    const itemLen = data.items.length;
                    if( itemLen > 0)
                         id = itemLen + 1;
                    const itemNew = new item(id, name, calorie);
                    data.items.push(itemNew);
                    data.totalCalorie += calorie;
               },
               setTotalCalorie: function(calorie) {
                    data.totalCalorie = calorie
               },
               setItems: function(items) {
                    data.items = items;
               },
               setCurrentItem: function(id) {
                    if(id === 0){
                         data.currentItem = null;
                    }
                    else{
                         data.items.forEach(element => {
                              if(id === element.id){
                                   data.currentItem = element;
                              }
                         });
                    }
               },
               updateItem: function (meal, calorie) {
                    data.totalCalorie = (data.totalCalorie - data.currentItem.calorie) + calorie;
                    data.currentItem.name = meal;
                    data.currentItem.calorie = calorie;
               },
               deleteItem: function () {
                    data.totalCalorie = (data.totalCalorie - data.currentItem.calorie);
                    for(let i=(data.currentItem.id-1) ; i<(data.items.length-1); i++){
                         data.items[i+1].id = i+1;
                         data.items[i] = data.items[i+1];
                    }
                    data.items.pop();
               }
          }
     );
})();





const UICtrl = (function () {
     // Selectors
     const selectors = {
          inputMeal: document.getElementById('meal'),
          inputCalorie: document.getElementById('calorie'),
          list: document.getElementById('item-list'),
          clear: document.getElementById('clear'),
          reload: document.getElementById('reload'),
          addMeal: document.getElementById('add-meal'),
          updateMeal: document.getElementById('update-meal'),
          deleteMeal: document.getElementById('delete-meal'),
          back: document.getElementById('back'),
          totalCal: document.getElementById('total-calories'),
     };

     // Public Function
     return (
          {
               getSelector: function () {
                    return selectors;
               },
               populateItemList: function (items) {
                    let html = ``;
                    items.forEach(element => {
                         html += ` <li class="collection-item" id="${element.id}">
                                        <strong>${element.name} : </strong>${element.calorie} <em>Calories</em>
                                        <a id="update" href="#" class="secondary-content"
                                        ><span class="material-icons">edit</span></a>
                                   </li>`;
                    });
                    selectors.list.innerHTML = html;
               },
               setTotalCal: function (calorie) {
                    selectors.totalCal.innerText = calorie;
               },
               clearInput(){
                    selectors.inputMeal.value = '';
                    selectors.inputCalorie.value = '';
               },
               setInput(item){
                    selectors.inputMeal.value = item.name;
                    selectors.inputCalorie.value = item.calorie;
               }
          }
     );
})();






const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
     // Getting Selectors from UICtrl
     const selectors = UICtrl.getSelector();
     
     // Event Listeners
     selectors.addMeal.addEventListener('click', addMealToList);
     selectors.updateMeal.addEventListener('click', updateMealToList);
     selectors.deleteMeal.addEventListener('click', deleteMealFromList);
     selectors.back.addEventListener('click', back);
     selectors.list.addEventListener('click', editMeal);
     selectors.clear.addEventListener('click', clearAll);
     selectors.reload.addEventListener('click', reload);

     // Event Handlers
     function addMealToList(e) {
          const meal = selectors.inputMeal.value;
          const calorie = selectors.inputCalorie.value;
          if(meal === '' || calorie === ''){
               alert("Please Enter The Details")
          }
          else {
               ItemCtrl.addItem(1, meal, parseInt(calorie));
               UICtrl.clearInput();
               UICtrl.populateItemList(ItemCtrl.getItems());
               UICtrl.setTotalCal(ItemCtrl.getTotalCal());
               StorageCtrl.setItemsToLS(ItemCtrl.getItems());
          }
          e.preventDefault();
     }
     function editMeal(e) {
          if(e.target.parentNode.id === 'update'){
               selectors.addMeal.style = 'display: none';
               selectors.updateMeal.style = 'display: inline';
               selectors.deleteMeal.style = 'display: inline';
               selectors.back.style = 'display: inline';

               const itemId = parseInt(e.target.parentNode.parentNode.id);
               ItemCtrl.setCurrentItem(itemId);
               UICtrl.setInput(ItemCtrl.getCurrentItem());
               
          }
          e.preventDefault(); 
     }
     function updateMealToList(e) {
          const meal = selectors.inputMeal.value;
          const calorie = parseInt(selectors.inputCalorie.value);

          ItemCtrl.updateItem(meal, calorie);
          UICtrl.clearInput();
          UICtrl.populateItemList(ItemCtrl.getItems());
          UICtrl.setTotalCal(ItemCtrl.getTotalCal());
          StorageCtrl.setItemsToLS(ItemCtrl.getItems());
          back(e);
          e.preventDefault(); 
     }
     function deleteMealFromList(e) {
          ItemCtrl.deleteItem();
          UICtrl.populateItemList(ItemCtrl.getItems());
          UICtrl.setTotalCal(ItemCtrl.getTotalCal());
          StorageCtrl.setItemsToLS(ItemCtrl.getItems());
          back(e);
          e.preventDefault(); 
     }
     function back(e) {
          selectors.addMeal.style = 'display: inline';
          selectors.updateMeal.style = 'display: none';
          selectors.deleteMeal.style = 'display: none';
          selectors.back.style = 'display: none';
          UICtrl.clearInput();
          ItemCtrl.setCurrentItem(0);
          e.preventDefault();
     }
     function clearAll(e) {
          ItemCtrl.setItems([]);
          ItemCtrl.setTotalCalorie(0);
          back(e);
          UICtrl.populateItemList([]);
          UICtrl.setTotalCal(0);
          StorageCtrl.clear();
          e.preventDefault();
     }
     function reload(e) {
          location.reload();
          e.preventDefault();
     }

     // Public Functions
     return (
          {
               init: function () {
                    console.log("Intialising Application.... ");
                    const items = StorageCtrl.getItemsFromLS();
                    if(items != null){
                         let sum = 0;
                         items.forEach(element => {
                              sum += element.calorie;
                         });
                         ItemCtrl.setItems(items);
                         ItemCtrl.setTotalCalorie(sum);
                         UICtrl.populateItemList(items);
                         UICtrl.setTotalCal(sum);
                    }
               }
          }
     );
})(ItemCtrl, UICtrl, StorageCtrl);




// Application Intialization
App.init();