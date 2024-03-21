// function Task(id,name,date,description){
//     this.id=id;
//     this.name=name;
//     this.date=date;
//     this.description=description;
//     this.marked=false;

// };

// Task.prototype.toggle = function() {
//     this.marked = !this.marked;
// };



class Task{
    constructor(id,name ,date,description,marked=false){

    
    this.id=id;
    this.name=name;
    this.date=date;
    this.description=description;
    this.marked=marked;
    }
    toggle(){
        this.marked=!this.marked;

    }

}

export default Task;