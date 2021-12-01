import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks = [
    {
      id : 0,
      name : "read a book",
      done : false
    },
    {
      id : 1,
      name : "read a newspaper",
      done : true
    },
    {
      id : 2,
      name : "read a sign",
      done : true
    }
  ];
  toggleTaskStatus = (id: Number) =>{
    const affectedTask = this.tasks.find((task)  =>{
      return task.id === id;
    });
    if(affectedTask){
      affectedTask.done = !affectedTask.done;
    }
    
  }
  newTask:string = '';
  addTask = () =>{
    console.log(this.newTask+" "+this.tasks.length);
    this.tasks.push({id:this.tasks[this.tasks.length-1].id+1,name:this.newTask,done:false});
    console.log(this.tasks);
  }
  deleteTask = (id:number) =>{
    this.tasks.splice(id,1);
    this.tasks.forEach((element,index)=>{
      element.id = index
    })
    console.log(this.tasks);
  }
 
  constructor() { }

  ngOnInit(): void {
  }

}
