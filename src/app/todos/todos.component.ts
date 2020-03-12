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
  //todos = TODOS;
  //todos: Todo[];
  selectedTodo: Todo;
  todoTitle: string;
  todoID: number;
  titleCache: string;

  folded = 'closed';

  public todos = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoID = 4;
    this.todoTitle = '';
    this.todos = [
      {
        'id': 1,
        'title': 'task #1',
        'completed': false,
        'priority': '',
        'editing': false,
      },
      {
        'id': 2,
        'title': 'task #2',
        'completed': false,
        'priority': '',
        'editing': false,
      },
      {
        'id': 3,
        'title': 'task #3',
        'completed': false,
        'priority': '',
        'editing': false,
      },
    ];

    //this.todos = [];
    this.todoService.getTodos()
      .subscribe(data => this.todos = data);
    console.log(this.todos);
    console.log('------------------');
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
      .subscribe(data => {alert("Succesfully Added Product details")});
    
    this.todoTitle = '';
    this.todoID++;
  }


  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
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

  toggleFold(){
    this.folded = this.folded === 'open' ? 'closed' : 'open';
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
}
