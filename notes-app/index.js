function addNewNote(text = ''){
    const note = document.createElement('div')
    note.classList.add('note');

    note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <textarea class="textArea ${text ? 'hidden': ''}" ></textarea>
        <div class="main ${text ? '': 'hidden'}"></div>
    `

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete')

    const textArea = note.querySelector('.textArea');
    const main = note.querySelector('.main');

    textArea.value = text;
    main.innerHTML = marked(text);

    editBtn.addEventListener('click',()=>{
        textArea.classList.toggle('hidden');
        main.classList.toggle('hidden');
    })

    deleteBtn.addEventListener('click',()=>{
        note.remove();
        updateLS();
    })

    textArea.addEventListener('input',(e)=>{
        const {value} = e.target;
        main.innerHTML = marked(value)
        updateLS();
    })

    document.body.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    const notes = [];
    notesText.forEach((note)=>{
        notes.push(note.value);
    })

    localStorage.setItem('notes',JSON.stringify(notes));
}

const addBtn = document.getElementById('add');

addBtn.addEventListener('click',() => {
    addNewNote();
})


const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) {
    notes.forEach((note)=>{
        addNewNote(note);
    })
}


