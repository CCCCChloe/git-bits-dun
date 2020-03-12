import { Component, OnInit } from '@angular/core';
import { Todo } from '../todos';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations : [
    // Here we are defining what are the states our panel can be in 
    // and the style each state corresponds to.
    trigger('panelState', [
      state('closed', style({ height: '32px', overflow: 'hidden' })),
      state('open', style({ height: '*' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class TodosComponent implements OnInit {
  todoTitle: string;
  titleCache: string;
  gitBitsDunNumber: number;

  public todos = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.gitBitsDunNumber = -1;
    this.todoTitle = '';

    this.todoService.getTodos()
      .subscribe(data => this.todos = data);
  }

  addTodo(): void {
    if (this.todoTitle.trim().length == 0) {
      return;
    }
    let post = {
      'title': this.todoTitle,
      'completed': false,
      'priority': '',
      'editing': false,
    };

    this.todos.push(post);

    this.todoService.postTodo(post)
      .subscribe(data => {alert("Succesfully Added New Todo Items")});
    
    this.todoTitle = '';
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id != id);
  }

  editTodo(todo: Todo): void {
    this.titleCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length == 0) {
      todo.title = this.titleCache;
    }
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.titleCache;
    todo.editing = false;
  }

  remaining(): number {
    return this.todos.filter(todo => todo.completed == false).length;
  }

  random(): void {
    var currentIndex = this.todos.length;
    while (0 !== currentIndex) {
      var randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      var temporaryValue = this.todos[currentIndex];
      this.todos[currentIndex] = this.todos[randomIndex];
      this.todos[randomIndex] = temporaryValue;
    }
  }

  sort(): void {
    var theOrder = ['high', 'middle', 'low', ''];
    var todosCopy = [];
    var index = 0;
    for (var j=0; j<theOrder.length; j++) {
      for (var i=0; i<this.todos.length; i++) {
        if (this.todos[i].priority == theOrder[j]) {
          todosCopy[index] = this.todos[i];
          index++;
        }
      }
    }
    this.todos = todosCopy;
  }

  gitBitsDun(): number {
    return this.gitBitsDunNumber = Math.floor(Math.random() * Math.floor(this.todos.length));
  }
}
