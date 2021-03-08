//localStorage.clear();


// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Evente listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// function
function addTodo(event) {
    // button 클릭시 새로고침 방지.. submit 은 작동됨
    event.preventDefault();
    
    // class이름이 todo인 div를 만듦
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // li 를 만들면서 텍스트 삽입
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);
    // 로컬 스토리지에 추가
    saveLocalTodos(todoInput.value);

    // check btn, delete btn
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-button');
    todoDiv.appendChild(completedButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-button');
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
    
    // 한 번 입력 후 text 칸 초기화
    todoInput.value ="";
    
}

function deleteCheck(e){
    const item = e.target;
    // delete
    if(item.classList[0] === 'delete-button'){
        const todo = item.parentElement;
        // animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        // transitionend. 트랜지션 이벤트가 끝난 후 동작
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });

    }

    if(item.classList[0] === 'complete-button') {
        const todo = item.parentElement;
        todo.classList.toggle('완료');
    }
}
function filterTodo(e){
    const todos = todoList.childNodes;
    console.log(todos);
    console.log(e.target.value);
    todos.forEach(function(todo){
        // all, completed, uncompleted
        switch(e.target.value){
            case "모두":
                todo.style.display = "flex";
                break;
            case "완료":
                if(todo.classList.contains('완료')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "미완료":
                if(!todo.classList.contains('완료')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

// local storage
function saveLocalTodos(todo){
    // check .. 이미 만들어진 것이 있나
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// local 에 있는 todos 불러오기

function getTodos(){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {

     // class이름이 todo인 div를 만듦
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // li 를 만들면서 텍스트 삽입
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    // check btn, delete btn
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-button');
    todoDiv.appendChild(completedButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-button');
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    // check .. 이미 만들어진 것이 있나
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.innerText;
    // . todoIndex에 해당하는 부분만 추출
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}