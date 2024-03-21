// DOM
import { taskOperations } from "./models/task-operation.js";
import Task from "./models/task.js";
window.addEventListener('load',bindevents);


function bindevents() {

    document.querySelector('#add').addEventListener('click', addTask);
    document.querySelector('#delete').addEventListener('click',deleteTask);
    document.querySelector('#save').addEventListener('click',save);
    document.querySelector('#load').addEventListener('click',load);

   

}

function addTask(){
    // read the fields

    let id= document.querySelector('#id').value;
    let name= document.querySelector('#name').value;
    let date= document.querySelector('#date').value;
    let description= document.querySelector('#description').value;
  

    // store in object and then object goes in array

    const task= taskOperations.add(id,name,date,description);
    printTask(task);
    


}

function printTaskAll(tasks){
    tasks.forEach(task=> printTask(task));

}
 
function printTask(task){
    const tbody= document.querySelector('.tbody');
    const trow= tbody.insertRow();
    let cellIndex=0;
    let id= task.id;
    for(let key in task){
        if(key=='marked' || typeof task[key]==='function') continue;
       let value= task[key];
       trow.insertCell(cellIndex).innerText=value;
       cellIndex++;
    }
       let td=  trow.insertCell(cellIndex);
       td.appendChild(createIcon("pen-to-square",togglEdit,id));
       td.appendChild(createIcon("trash",toggleDelete,id));
      
}

function createIcon(classname,fn,id){
    let icon= document.createElement("i");
    icon.className= `fa-solid fa-${classname} me-3`;
    icon.setAttribute("task-id",id);
    icon.addEventListener('click',fn);
    return icon;

}

function toggleDelete(){
    console.log("delete..",this.getAttribute("task-id"));
   let tr= this.parentNode.parentNode;
   let id= this.getAttribute("task-id");
   tr.classList.toggle('alert-danger');
   taskOperations.mark(id);
   showContents();
  
}
function togglEdit(){
    console.log("edit...",this.getAttribute("task-id"));
}

function showContents() {
   
   

    document.querySelector("#total").innerText = taskOperations.tasks.length;
    document.querySelector("#markedTotal").innerText = taskOperations.countMarked();
    document.querySelector("#unmarkedTotal").innerText = taskOperations.unMarked();
}

function deleteTask(){
    let tasks= taskOperations.deleteTask();
    document.querySelector('.tbody').innerText='';
    showContents();
    printTaskAll(tasks);
}

function save(){
   let tasks=  taskOperations.getAllTask();
   console.log("json is", JSON.stringify(tasks));
   console.log("new tasks is ", tasks);
   if(window.localStorage){
    localStorage.tasks= JSON.stringify(tasks);
   }

}

function load(){
    if(localStorage){
       let genericTasks= JSON.parse(localStorage.tasks);   // generic object
       let tasks= genericTasks.map((task)=>
        new Task(task.id,task.name,task.date,task.description)
       );
       console.log("typeof genericTasks" ,typeof genericTasks,"genericTasks instanceof Task",
       genericTasks instanceof Task, "tasks instanceof Task", tasks instanceof Task);
       printTaskAll(tasks);
       alert("loaded");

    }else{
        alert("the browser is outdated")
    }


}


