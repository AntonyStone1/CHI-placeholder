'use strict'
const userList = document.querySelector('.user_list');
let userData;
let responseStatus;
let currenUserId;



const init = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    let response = await fetch(url);
    let data = await response.json();

    userData = data;
    responseStatus = response.status;    
    lol()
}

const createUsersList = (data) => {
    data.forEach(item => {
        let userDiv = document.createElement('div');        
        userDiv.classList.add(`user_container`);
        userDiv.id = item.id;

        let userDivContent = document.createElement('div');
        userDivContent.classList.add(`user_container-item`);
        userDivContent.innerHTML = 
            `<p>userId: ${item.userId}<br>
            id: ${item.id}<br>
            title: ${item.title}</p>`
        
        let userImg = document.createElement('img');
        userImg.classList.add(`user_container-img`);

        userDivContent.append(userImg);

        userDiv.append(userDivContent)

        userList.append(userDiv);
    })
}
const updateUserData = (button) => {
    let currentObj = {};
    let newObj = {};
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        currentObj[input.name] = input.value;
    })
    button.addEventListener('click', () => {
        inputs.forEach(input => {
            newObj[input.name] = input.value;
        })
        console.log(newObj);
        fetch(`https://jsonplaceholder.typicode.com/posts/${currentObj.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: newObj.id,
                title: `${newObj.title}`,
                userId: newObj.userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            inputs.forEach(input => {
                if (input.name === 'id') {
                    let allUsersContainer = document.querySelectorAll('.user_container');
                    allUsersContainer.forEach(item => {
                        console.log(+input.value);
                        if (item.id === input.value) {
                            item.firstChild.firstChild.innerHTML = `<p>userId: ${newObj.userId}<br> id: ${newObj.id}<br> title: ${newObj.title}</p>`
                        }
                    })
                }
            })
            
        });
        inputs.forEach(input => {
            input.setAttribute('disabled', true);
            input.classList.toggle('input_decoration');
            console.log(input);
        })
        button.remove();
    });
    
    
}

const createUserDataInputs = () => {
    let btn = document.querySelector('.edit_btn')  || undefined;
    let currentInputs = document.querySelectorAll('input')
    let saveBtn = document.createElement('button');
    saveBtn.classList.add('save_btn');
    saveBtn.innerText = 'Save';
    if (btn) {
        btn.addEventListener('click', () => {         
            document.querySelector('.user_card-wrapper').append(saveBtn);
            currentInputs.forEach(input => {
                input.classList.toggle('input_decoration');
                input.removeAttribute('disabled');
            })
            
            
        })
        
    }
    updateUserData(saveBtn)
}

const createUserTargetCard = (usersArr) => {
    usersArr.forEach(item => {
        item.addEventListener('click', (e) => {
            if (userList.firstElementChild.classList[0] !== 'user_container') {
                userList.firstElementChild.remove();                
            }
            let inputId = +e.target.id
            userList.classList.add('remove_pointer-events');

            let userCardContainer = document.createElement('div');
            userCardContainer.classList.add('user_card-container');

            let UserCardWrapper = document.createElement('div');
            UserCardWrapper.classList.add('user_card-wrapper')

            let userCard = document.createElement('div');
            userCard.classList.add(`active_card`)
            

            let userCardText = document.createElement('div');
            userCardText.classList.add('active_card-text');

            let userIdInputLabel = document.createElement('label');
            userIdInputLabel.innerText = 'userId: ';
            let userIdInput = document.createElement('input');
            userIdInput.classList.add('input_decoration')
            userIdInput.type = 'number';
            userIdInput.name = 'userId';
            userIdInput.disabled = 'true';
                
            let idInputLabel = document.createElement('label');
            idInputLabel.innerText = 'id: ';
            let idInput = document.createElement('input');
            idInput.classList.add('input_decoration')
            idInput.type = 'number';
            idInput.name = 'id';
            idInput.disabled = 'true';
                
            let userTitleInputLabel = document.createElement('label');
            userTitleInputLabel.innerText = 'title: ';
            let userTitleInput = document.createElement('input');
            userTitleInput.classList.add('input_decoration')
            userTitleInput.type = 'text';
            userTitleInput.name = 'title';
            userTitleInput.disabled = 'true';

            console.log(inputId);
            const lol = userData.find(obj => obj.id == inputId) 
                    userIdInput.value = lol.userId;
                    idInput.value = lol.id;
                    userTitleInput.value = lol.title;
               
            userIdInputLabel.append(userIdInput)
            idInputLabel.append(idInput)
            userTitleInputLabel.append(userTitleInput)

            userCardText.append(userIdInputLabel)
            userCardText.append(idInputLabel)
            userCardText.append(userTitleInputLabel)

            let userImg = document.createElement('img');
            userImg.classList.add(`user_container-img`);

            userCardText.prepend(userImg)

            let editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.classList.add('edit_btn')
            editButton.classList.add(`${e.target.id}`)
            
            let closeButton = document.createElement('span');
            closeButton.classList.add('close_btn')

            UserCardWrapper.append(userCardText)
            UserCardWrapper.append(editButton)

            userCard.append(closeButton)
            userCard.append(UserCardWrapper)

            userCardContainer.append(userCard)
            userList.prepend(userCardContainer);

            createUserDataInputs();
        })
        
    })
}

const closeUserCard = (elem) => {
    if (elem.firstElementChild.classList[0] !== 'user_container') {
        elem.firstElementChild.remove();
        elem.classList.remove('remove_pointer-events');
    }
}

init();

function lol() {
    createUsersList(userData);
    let usersContainer = document.querySelectorAll('.user_container');
    createUserTargetCard(usersContainer);
    
    document.addEventListener('click' , (e) => {
        if (e.target.classList[0] === 'wrapper' || e.target.classList[0] === 'close_btn') {
            closeUserCard(userList)
        }
    })    
    
}

