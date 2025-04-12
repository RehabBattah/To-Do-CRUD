var container = document.createElement("section");
container.classList.add('container');
document.body.appendChild(container);
var divTop = document.createElement("div");
divTop.id = 'topOfTodo';
container.appendChild(divTop);
var h1Top = document.createElement("h1");
h1Top.innerHTML = 'TO DO LIST 📝';
divTop.appendChild(h1Top);
var toDoInput = document.createElement("input");
toDoInput.id = 'toDoInput';
toDoInput.type = 'text';
toDoInput.name = 'toDoInput';
toDoInput.placeholder = 'write your todo list here...';
divTop.appendChild(toDoInput);
var addBtn = document.createElement("button");
addBtn.innerHTML = 'Add';
addBtn.id = 'addBtn';
addBtn.classList.add("btn");
divTop.appendChild(addBtn);
// ============  Bottom ================
var divBottom = document.createElement("div");
divBottom.id = 'bodyOfTodo';
container.appendChild(divBottom);
var h3Bottom = document.createElement("h3");
h3Bottom.innerHTML = 'Lists of your todo :- ';
divBottom.appendChild(h3Bottom);
var arrItems = [];
addBtn.addEventListener("click", function () {
    if (toDoInput.value.trim() != "") {
        arrItems.push(toDoInput.value);
        localStorage.setItem("ToDo Items", JSON.stringify(arrItems));
        displayListItems(arrItems);
        toDoInput.value = '';
    }
    else {
        alert("Please write something first to add :)");
    }
});
var storedItems = localStorage.getItem('ToDo Items');
if (storedItems != null) {
    arrItems = JSON.parse(storedItems);
    displayListItems(arrItems);
}
function displayListItems(items) {
    // console.log("items", items);
    divBottom.innerHTML = '';
    items.forEach(function (item, index) {
        // console.log("item",item ,'indexxxx' , index);
        // div 
        var divItem = document.createElement("div");
        divItem.id = 'todo-item';
        divBottom.appendChild(divItem);
        // label 
        var checkID = "todo-".concat(Date.now(), "-").concat(Math.random());
        var itemLabel = document.createElement("label");
        itemLabel.htmlFor = checkID;
        itemLabel.id = 'itemLabelCheck';
        divItem.appendChild(itemLabel);
        // input 
        var itemLabelInput = document.createElement("input");
        itemLabelInput.id = checkID;
        itemLabelInput.type = 'checkbox';
        itemLabel.appendChild(itemLabelInput);
        var itemLabelSpan = document.createElement("span");
        itemLabelSpan.innerHTML = item;
        itemLabel.appendChild(itemLabelSpan);
        var itemActions = document.createElement("div");
        itemActions.classList.add('item-actions');
        divItem.appendChild(itemActions);
        var updateBtn = document.createElement("button");
        updateBtn.classList.add('btn', 'btn-update');
        updateBtn.innerHTML = 'Update';
        var delBtn = document.createElement("button");
        delBtn.classList.add('btn', 'btn-delete');
        delBtn.innerHTML = 'Delete';
        itemActions.appendChild(updateBtn);
        itemActions.appendChild(delBtn);
        // check line-through 
        itemLabelInput.addEventListener("change", function () {
            itemLabelInput.checked ? itemLabelSpan.classList.add("line-through-active")
                : itemLabelSpan.classList.remove("line-through-active");
        });
        delBtn.addEventListener("click", function () {
            delateItem(index);
        });
        var saveInput = document.createElement("input");
        updateBtn.addEventListener("click", function () {
            if (updateBtn.innerHTML === 'Update') {
                // console.log("yes");
                updateBtn.innerHTML = 'Save';
                updateBtn.classList.toggle('btn-save');
                saveInput.type = 'text';
                saveInput.value = item;
                saveInput.classList.add('saveInput');
                // append
                itemLabel.appendChild(saveInput);
                itemLabelInput.style.display = 'none';
                itemLabelSpan.style.display = 'none';
                delBtn.style.display = 'none';
            }
            else {
                // console.log("noo");
                updateBtn.innerHTML = 'Update';
                updateBtn.classList.toggle('btn-save');
                itemLabelSpan.style.display = 'inline';
                itemLabelSpan.innerHTML = saveInput.value;
                saveInput.remove();
                itemLabelInput.style.display = 'inline';
                if (saveInput.value.trim() === "") {
                    arrItems.splice(index, 1);
                    localStorage.setItem("ToDo Items", JSON.stringify(arrItems));
                    displayListItems(arrItems);
                }
                else {
                    arrItems[index] = saveInput.value;
                    localStorage.setItem("ToDo Items", JSON.stringify(arrItems));
                    displayListItems(arrItems);
                }
            }
        });
    });
}
;
function delateItem(delIndex) {
    arrItems.splice(delIndex, 1);
    localStorage.setItem("ToDo Items", JSON.stringify(arrItems));
    // console.log(arrItems);
    displayListItems(arrItems);
}
// localStorage.removeItem('ToDo Items');
// <section class="container">
// <div id="topOfTodo">
//     <h1>TODO LIST</h1>
//     <input type="text" name="" id="toDoInput" placeholder="write your todo list here...">
//     <button id="addBtn" class="btn">Add</button>
// </div>
// <div id="bodyOfTodo">
//     <h3>Lists of your todo:</h3>
//     <div id="todo-item">
//         <label for="todo-text">
//             <input type="checkbox" id="todo-text">
//             <span>Shopping</span>
//         </label>
//         <div class="item-actions">
//             <button class="btn btn-update">Update</button>
//             <button class="btn btn-delete">Delete</button>
//         </div>
//     </div>
// </div>
//  
// </section>
