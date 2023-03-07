

// const myForm = document.querySelector('#my-form');
// const nameInput = document.querySelector('#name');
// const emailInput = document.querySelector('#email');
// const msg = document.querySelector('.msg');
// const userList = document.querySelector('#users');

// myForm.addEventListener('submit',onsubmit);

// function onsubmit(e){
//     e.preventDefault();
    
//     const name = e.target.name.value
//     const email = e.target.email.value

//     localStorage.setItem('name',name)
//     localStorage.setItem('email',email)

    
//     if(nameInput.value === '' || emailInput.value === ''){
//         msg.classList.add('error')
//         msg.innerHTML = 'please enter all fields';
//         setTimeout(() => msg.remove(),3000)
//     }else {
        
//         const li = document.createElement('li');
//         li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));
//         userList.appendChild(li);
        
//         nameInput.value = '';
//         emailInput.value ='';

//     }
// }


const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit',onsubmit);

function onsubmit(e){
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;

    const obj = {
        name,
        email
    }
    axios.post("https://crudcrud.com/api/32b29e7c2b5e4289b8780095e40cb955/appointmentData",obj)
    .then((respone) =>{
        showUserOnScreen(respone.data)
        console.log(respone)
    })
    .catch((err)=>{
        console.log(err)
    });


    // localStorage.setItem(obj.email, JSON.stringify(obj))
    // showUserOnScreen(obj)
}
window.addEventListener("DOMContentLoaded", () =>{
    axios.get("https://crudcrud.com/api/32b29e7c2b5e4289b8780095e40cb955/appointmentData")
        .then((respone) =>{
            console.log(respone)

            for(var i=0; i<respone.data.length;i++){
                showUserOnScreen(respone.data[i])
            }
        })
        .catch((error) =>{
            comsole.log(error)
        })
})

function showUserOnScreen(obj){
    const parentElem = document.getElementById('users')


    // parentElem.innerHTML = parentElem.innerHTML + `<li>${obj.name} - ${obj.email}<input type="button" value= "delete" onclick = "deleteValue"></li>`
    const childElem = document.createElement('li')
    childElem.textContent = obj.name + '-' + obj.email;


    const deleteButton = document.createElement('input')
    deleteButton.type = 'button'
    deleteButton.value = 'Delete'
    deleteButton.onclick = () => {
        localStorage.removeItem(obj.email)
        parentElem.removeChild(childElem)
    }


    const editButton = document.createElement('input')
    editButton.type  = 'button'
    editButton.value = 'edit'
    editButton.onclick = () =>{
        localStorage.removeItem(obj.email)
        parentElem.removeChild(childElem)

        document.getElementById("name").value = obj.name;
        document.getElementById("email").value = obj.email;
    }
    childElem.appendChild(deleteButton)
    childElem.appendChild(editButton)

    parentElem.appendChild(childElem)

    
    
    if(nameInput.value === '' || emailInput.value === ''){
        msg.classList.add('error')
        msg.innerHTML = 'please enter all fields';
        setTimeout(() => msg.remove(),3000)
    }else {
        
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));
        userList.appendChild(li);
        
        nameInput.value = '';
        emailInput.value ='';
    }

}