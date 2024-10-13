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
            text.classList.toggle('itemtext');
            text.innerText = inputValue;
            item.appendChild(text);

            //Event listener for check-marking the list element, by assigning a class
            text.addEventListener(
                "click",
                function(event){
                    
                    if(text.className == "itemtext checkedTask"){

                        removeClass(text);
                        completedCount = setCountAndLabelTo(completedCount - 1);
                        searchAndChange(item.firstChild.textContent, false);
                    }
                    else{

                        addClass(text);
                        completedCount = setCountAndLabelTo(completedCount + 1);
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
                    if(item.firstChild.className == "itemtext checkedTask"){
                        completedCount = setCountAndLabelTo(completedCount - 1);
                    }
                    searchAndRemove(item.firstChild.textContent);
                    listHtml.removeChild(item);

                },
                false
            )

            //Adding the complete li-element to the list
            listHtml.appendChild(item);
            
            

            console.log("Added " + 
                inputValue + 
                tasks
            );
        
            
            clearInputField();
        }
    },
    false
);

clearAllBtn.addEventListener(
    "click",
    function(event){
        const error = document.querySelector("#errorClrBtn");
        
        if (listHtml.childElementCount < 1) {

            if (error.className == 'Alert') {
                console.log("Has alerted once")
            }

            else {
                error.innerHTML = "<span style='color: red;'>" +
                "Add something to the list first before removing</span>";
                error.classList.toggle('Alert');
            }
        }

            else {
                error.innerHTML = "";
                error.classList.toggle('Alert');
                listHtml.innerHTML = "";
                removeAll();
                completedCount = setCountAndLabelTo(0);
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

    const error = document.querySelector("#inputError");
    let theValue;

    if (input.value == null || input.value == "") {

        if (error.className == 'Alert') {
            theValue = false;
        }

        else {
            error.innerHTML = "<span style='color: red;'>" + 
            "Write something first add it</span>";
            error.classList.toggle('Alert');
            theValue = false;
        }
    }

    else {
        error.innerHTML = "";
        error.classList.toggle('Alert');
        theValue = true;
    }

    return theValue;
 }

function searchAndChange(text, status){

    let changeIndex = tasks.map(t => t.task).indexOf(text);
    tasks[changeIndex].completed = status;
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
function setCountAndLabelTo(number){

    countLbl.innerText = "Completed tasks: " + number;
    return number;
}

function showArray(array){

    array.forEach(element => {
        console.log(element.task + element.completed);
    });
}