const list = [];
let count = 0;
const input = document.querySelector("#userInput");
const addBtn = document.querySelector("#addBtn");
const countLbl = document.querySelector("#countList");
const listHtml = document.querySelector("#todolist");

function countUp(){
    count++;
    countLbl.innerHTML = "Count" + count;
}