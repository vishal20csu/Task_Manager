// crud operation
import  Task  from "./task.js"; 
export const taskOperations= {
    tasks:[],
    add(id,name,date,description){                  // key value pair or we can write like add: function (){}
        const task=new Task(id,name,date,description);
        this.tasks.push(task);
        console.log("added in",this.tasks)
        return task;
    },
    mark(id) {
   
       let task=  this.tasks.find(task => task.id==id );
       if(task){
        task.toggle();

       }
      
    },
    getAllTask(){
        return this.tasks;

    },
    countMarked(){

        return this.tasks.filter(task=> task.marked).length;
       
    },
    unMarked(){
        return this.tasks.length - this.countMarked();
    },

    deleteTask(){
        console.log(taskOperations.tasks.length);
        this.tasks= this.tasks.filter(task => !task.marked);
      

        return this.tasks;        
    },
   
};