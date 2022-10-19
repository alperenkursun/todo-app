let taskList = [];

if(localStorage.getItem("taskList") !== null){
    taskList = JSON.parse(localStorage.getItem("taskList"));
}

let editId;
let isEditTask = false;
var selectvalue = "all";

displayTasks();

function displayTasks()
{   
    let taskcontainer = document.getElementById("task-container");
    taskcontainer.innerHTML= "";

    if(taskList.length == 0){
    taskcontainer.innerHTML = '<div class="d-flex justify-content-center"><p class="form-control d-flex justify-content-center w-50">Todo list is empty.</p></div>';
    }

    else{
        for(let task of taskList){
      
        let completed = task.state == "completed" ? "checked": "";
        
            let taskLine = `<div id="task-container">
        <div class="d-flex justify-content-center mb-1">
        <div id="${task.id}" class="btn-group w-50 ${task.state}">
            <input id="a${task.id}" onclick="updateStatus(this)"  type="checkbox" class="d-none" ${completed}>
           <div class="bg-white text-dark form-control w-100 d-inline-block overflow-auto">${task.taskName}</div>
           <label for="a${task.id}" class="d-flex align-items-center " >
            <i class="fa-solid fa-check btn btn-dark text-success rounded h-100 d-flex align-items-center"></i>
            </label>
                <button id="delete" onclick="deleteTask(${task.id})" class="btn btn-dark text-danger rounded"><i class="fa-solid fa-trash"></i></button> 
                <button id="update" onclick='editTask(${task.id},"${task.taskName}")' class="btn btn-dark text-primary rounded"><i class="fa-solid fa-pen-to-square"></i></button>
            </div>
        </div>
        </div>`;
        if(selectvalue == task.state){
        taskcontainer.insertAdjacentHTML("beforeend",taskLine);  
        }
        else if(selectvalue == "all"){
        taskcontainer.insertAdjacentHTML("beforeend",taskLine);  
        }

    }}

}
let input = document.getElementById("input");

document.querySelector("#add").addEventListener("click",addTask);

input.addEventListener("keypress",function(){
    if(event.key == "Enter"){
        document.getElementById("add").click();
    }
});


function addTask(event){
    let input = document.getElementById("input").value;

    if(input == ""){
        alert ("Please Enter Something :)");
    }
    else{
        if(isEditTask == false){
            taskList.push({"id" : taskList.length+1,"taskName" : input, "state":"pending"});
            input = "";
            displayTasks();
        }
        else{
            for(let task of taskList){
                if(task.id == editId){
                    task.taskName = input;
                }
            }
            isEditTask=false;
        }
        input.value="";
        displayTasks();
        localStorage.setItem("taskList",JSON.stringify(taskList));
        
    }
    event.preventDefault();
}

 function deleteTask(id){
    let deleteid;

    for(let i in taskList){
        if(taskList[i].id == id){
            deleteid = i;
        }
    }

    taskList.splice(deleteid,1);
    console.log(taskList);
    displayTasks();
    localStorage.setItem("taskList",JSON.stringify(taskList));
}

function editTask(id,taskName){
    editId = id;
    isEditTask = true;
    input.value = taskName;
    taskInput.focus();
    taskInput.classList.add("active");

}

document.querySelector("#clearall").addEventListener("click",function(){
    taskList.splice(0,taskList.length);
    localStorage.setItem("taskList",JSON.stringify(taskList));
    displayTasks();
})

function updateStatus(selectedTask){
    let label = selectedTask.parentElement;
    var status;

    if(selectedTask.checked){
        label.classList.add("completed");
        status="completed";
    }
    else{
        label.classList.remove("completed");
        status="pending";
    }

    for(let task of taskList){
        selectedTaskId=selectedTask.id.substring(1);

        if(task.id == selectedTaskId){
            task.state= status;
        }
    }
    localStorage.setItem("taskList",JSON.stringify(taskList));
}

function filter(){
    if(select.value == "Completed"){
        selectvalue = "completed";
    }
    else if(select.value == "Uncompleted"){
        selectvalue = "pending";
    }
    else{
        selectvalue = "all";
    }
    displayTasks();

}

let select = document.querySelector("#select");

select.addEventListener("change",filter);
