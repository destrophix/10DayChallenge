const form = document.getElementById('form');
const inputEl = document.querySelector('input');
const todosUl = document.querySelector('.todos');
const todosInfo = JSON.parse(getTodosLS()) ;

if(todosInfo){
    todosInfo.forEach((todoInfo)=>{
        console.log(todoInfo)
        addTodo(todoInfo);
    })
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const newTodoInfo = {
        text: inputEl.value,
        completed: false
    }
    addTodo(newTodoInfo)
    inputEl.value = '';
})

function addTodo(todoInfo){
    const {text,completed} = todoInfo
    if(text){
        const todo = document.createElement('li');
        todo.innerText = text;

        if(completed) {
            todo.classList.add('completed')
        }

        todo.addEventListener('click',()=>{
            todo.classList.toggle('completed')
            updateLS();
        })

        todo.addEventListener('contextmenu',(e)=>{
            e.preventDefault();
            todo.remove();
            updateLS();
        })
        todosUl.appendChild(todo)
        updateLS();
    }
}

function getTodosLS(){
    const todosInfo = localStorage.getItem('todos');
    return todosInfo;
}

function updateLS(){
    const todosEl = document.querySelectorAll('li');

    const todos = [];

    todosEl.forEach((todoEl)=>{
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos',JSON.stringify(todos));

}