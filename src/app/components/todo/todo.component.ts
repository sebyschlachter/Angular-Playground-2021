import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  tasks = [
    {
      id: 0,
      name: 'Read a book',
      done: false,
    },
    {
      id: 1,
      name: 'Learn Angular',
      done: true,
    },
    {
      id: 2,
      name: 'Take out the trash',
      done: false,
    },
  ];

  // toggleTaskStatus() {
  // }
  toggleTaskStatus = (id: Number) => {
    const affectedTask = this.tasks.find((task) => {
      return task.id === id;
    });

    if (affectedTask) {
      affectedTask.done = !affectedTask.done;
    }
  };

  constructor() {}

  ngOnInit(): void {}
}
