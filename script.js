const tasks = [];

//Användning av "let" här låter mig använda concat()-metoden för att
// 'slå ihop' en lista med denna
let deletedTasks = [];
const addBtn = document.querySelector("#addBtn");
const countLbl = document.querySelector("#countList");
const listHtml = document.querySelector("#todolist");
const input = document.querySelector("#userInput");
const clearAllBtn = document.querySelector("#clearAllBtn");
let completedCount = 0;

addBtn.addEventListener(
    "click",
    function(event){

        if(checkUserInput()){

            let inputValue = input.value;

            //Adds the input task to an array
            const todoObject = {
                task: inputValue,
                completed: false
            }
            tasks.push(todoObject);

            //Initializing the list element
            const item = document.createElement("li");

            //const textnode = document.createTextNode(input.value);

            const text = document.createElement("span");
            text.innerText = inputValue;
            item.appendChild(text);

            //Event listener for check-marking the list element, by assigning a class
            text.addEventListener(
                "click",
                function(event){
                    
                    if(text.className == "checkedTask"){

                        removeClass(text);
                        completedCount--;
                        updateLabel();
                        searchAndChange(item.firstChild.textContent, false);
                    }
                    else{

                        addClass(text);
                        completedCount++;
                        updateLabel();
                        searchAndChange(item.firstChild.textContent, true);
                    }

                },
                false
            );

            //Initializing the bin icon...
            const binIcon = document.createElement("span");
            binIcon.innerHTML = "&#128465";
            binIcon.setAttribute("class", "binIcon");
            item.appendChild(binIcon);

            //Listener for clicking the bin icon
            binIcon.addEventListener(
                "click",
                function(event){
                    if(item.firstChild.className == "checkedTask"){
                        completedCount--;
                    }
                    searchAndRemove(item.firstChild.textContent);
                    listHtml.removeChild(item);

                },
                false
            )

            //Adding the complete li-element to the list
            listHtml.appendChild(item);
            
            

            console.log("Added " + 
                inputValue
            );
            
            clearInputField();
        }
    },
    false
);

clearAllBtn.addEventListener(
    "click",
    function(event){

        if(listHtml.childElementCount < 1){

            alert("Try adding some tasks to the list.\nCan’t remove something if it doesn't exist!");
        }
        else{

            listHtml.innerHTML = "";
            removeAll();
            completedCount = 0;
        }
    },
    false
)

//Två metoder för att lägga till/ta bort en klass i ett list-element
function addClass(element){

    element.classList.add("checkedTask");

}

function removeClass(element){

    element.classList.remove("checkedTask");

}

//Metod som rensar input-fältet
function clearInputField(){
    input.value = null;
}

// Metod som kollar om användaren skrivit något
function checkUserInput() {
    if (input.value == null || input.value == "") {
       alert("Please type something. Can’t be blank or empty !!!");
       return false;
    }
    else{
        return true;
    }
 }

function searchAndChange(text, status){

    let changeIndex = tasks.map(t => t.task).indexOf(text);
    tasks[changeIndex].completed = status;
    console.log(tasks);
}

//   2 metoder som tar bort ett/alla element i listan och lägger
//  det i en annan lista via metoderna splice och concat

function searchAndRemove(text){
    deletedTasks = deletedTasks.concat(tasks.splice((tasks.map(t => t.task).indexOf(text)), 1));
    console.log(`Moved '${text}' to the graveyard`
    );

}

function removeAll(){
    deletedTasks = deletedTasks.concat(tasks.splice(0, tasks.length));
    console.log(`Moved all to the graveyard`
    );
}

//Metod som uppdaterar räknarens display
function updateLabel(){

    countLbl.innerText = "Completed tasks: " + completedCount;
}

function showArray(array){

    array.forEach(element => {
        console.log(element.task + element.completed);
    });
}