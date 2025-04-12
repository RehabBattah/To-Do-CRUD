const container = document.createElement("section") as HTMLElement
container.classList.add('container')
document.body.appendChild(container);
const divTop = document.createElement("div") as HTMLDivElement
divTop.id = 'topOfTodo'
container.appendChild(divTop);

const h1Top = document.createElement("h1") as HTMLHeadingElement
h1Top.innerHTML = 'TO DO LIST 📝'
divTop.appendChild(h1Top);

const toDoInput = document.createElement("input") as HTMLInputElement
toDoInput.id = 'toDoInput'
toDoInput.type = 'text';
toDoInput.name = 'toDoInput'
toDoInput.placeholder = 'write your todo list here...'
divTop.appendChild(toDoInput);

const addBtn = document.createElement("button") as HTMLButtonElement
addBtn.innerHTML = 'Add';
addBtn.id = 'addBtn';
addBtn.classList.add("btn");
divTop.appendChild(addBtn);

// ============  Bottom ================
const divBottom = document.createElement("div") as HTMLElement
divBottom.id = 'bodyOfTodo'
container.appendChild(divBottom);

const h3Bottom = document.createElement("h3") as HTMLHeadingElement
h3Bottom.innerHTML = 'Lists of your todo :- '
divBottom.appendChild(h3Bottom);

let arrItems: string[] = [];
addBtn.addEventListener("click", () => {
    if (toDoInput.value .trim() != "") {
    arrItems.push(toDoInput.value)
    localStorage.setItem("ToDo Items", JSON.stringify(arrItems))
    displayListItems(arrItems);
    toDoInput.value = '';
    }
    else{
        alert("Please write something first to add :)")
    }
});

const storedItems = localStorage.getItem('ToDo Items')
if (storedItems != null) {
    arrItems = JSON.parse(storedItems);
    displayListItems(arrItems)
}

function displayListItems(items: string[]) {
    divBottom.innerHTML = '';
    items.forEach((item, index) => {
        // div 
        const divItem = document.createElement("div") as HTMLDivElement
        divItem.id = `todo-item-${index}`
        divBottom.appendChild(divItem);

        // label 
        const checkID = `todo-${Date.now()}-${Math.random()}`;
        const itemLabel = document.createElement("label") as HTMLLabelElement
        itemLabel.htmlFor = checkID;
        itemLabel.id = 'itemLabelCheck'
        divItem.appendChild(itemLabel);

        // input 
        const itemLabelInput = document.createElement("input") as HTMLInputElement
        itemLabelInput.id = checkID;
        itemLabelInput.type = 'checkbox';
        itemLabel.appendChild(itemLabelInput)

        const itemLabelSpan = document.createElement("span") as HTMLElement
        itemLabelSpan.innerHTML = item;
        itemLabel.appendChild(itemLabelSpan)

        const itemActions = document.createElement("div") as HTMLDivElement
        itemActions.classList.add('item-actions');
        divItem.appendChild(itemActions)

        const updateBtn = document.createElement("button") as HTMLButtonElement
        updateBtn.classList.add('btn', 'btn-update')
        updateBtn.innerHTML = 'Update'
        const delBtn = document.createElement("button") as HTMLButtonElement
        delBtn.classList.add('btn', 'btn-delete')
        delBtn.innerHTML = 'Delete'
        itemActions.appendChild(updateBtn)
        itemActions.appendChild(delBtn)

        // check line-through 
        itemLabelInput.addEventListener("change", () => {
            itemLabelInput.checked ? itemLabelSpan.classList.add("line-through-active")
                : itemLabelSpan.classList.remove("line-through-active");
        });

        delBtn.addEventListener("click", () => {
            delateItem(index)
        })

        const saveInput = document.createElement("input") as HTMLInputElement;
        updateBtn.addEventListener("click", () => {
            if (updateBtn.innerHTML === 'Update') {
                // console.log("yes");
                updateBtn.innerHTML = 'Save';
                updateBtn.classList.toggle('btn-save')
                saveInput.type = 'text';
                saveInput.value = item;
                saveInput.classList.add('saveInput');
                // append
                itemLabel.appendChild(saveInput);
                itemLabelInput.style.display = 'none';
                itemLabelSpan.style.display = 'none';
                delBtn.style.display = 'none';

            } else {
                updateBtn.innerHTML = 'Update';
                updateBtn.classList.toggle('btn-save');
                itemLabelSpan.style.display = 'inline';
                itemLabelSpan.innerHTML = saveInput.value;
                saveInput.remove();
                itemLabelInput.style.display = 'inline';

                if (saveInput.value.trim() === "" ) {
                    arrItems.splice(index, 1);
                    localStorage.setItem("ToDo Items", JSON.stringify(arrItems))
                    displayListItems(arrItems);
                }else{
                    arrItems[index] = saveInput.value;
                    localStorage.setItem("ToDo Items", JSON.stringify(arrItems))
                    displayListItems(arrItems);
                }
            }
        });
    });
};

function delateItem(delIndex: number) {
    arrItems.splice(delIndex, 1)
    localStorage.setItem("ToDo Items", JSON.stringify(arrItems))
    // console.log(arrItems);
    displayListItems(arrItems)
}
