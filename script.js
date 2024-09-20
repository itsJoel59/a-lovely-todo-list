const list = [];
let count = 0;
const addBtn = document.querySelector("#addBtn");
const countLbl = document.querySelector("#countList");
const listHtml = document.querySelector("#todolist");
const input = document.querySelector("#userInput");

addBtn.addEventListener(
    "click",
    function(event){

        if(checkUserInput()){
            list.push(input.value);
            const node = document.createElement("li");
            const textnode = document.createTextNode(input.value);
            node.appendChild(textnode);
            listHtml.appendChild(node);
            countUp();
            console.log("Added " + input.value +
                "\nList:" + '\n' + list
            );
            clearInputField();
        }
    },
    false
);

listHtml.addEventListener(
    "click",
    function(event){
        const target = event.target;
    }
);

//Två metoder för att ändra egenskaper i ett list-element
function addClass(){

    target.classList.add("checkedTask");

}

function removeClass(){

    target.classList.remove("checkedTask");

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

// 2 metoder som uppdaterar list-räknaren
function countUp(){
    count++;
    countLbl.innerHTML = "Count: " + count;
}

function countDown(){
    count--;
    countLbl.innerHTML = "Count: " + count;
}