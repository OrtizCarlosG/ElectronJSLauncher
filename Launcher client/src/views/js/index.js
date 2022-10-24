let logIn = document.querySelector(".logIn");
let loginID = document.querySelector('.loginID');
let loginPass = document.querySelector('.loginPass');

let register = document.querySelector('.register');
let regName = document.querySelector('.regname');
let regEmail = document.querySelector('.regemail');
let regPass = document.querySelector('.regpass');

let checkbox = document.getElementById('reg-log');
let cardback = document.querySelector('.card-back');
let cardFront = document.querySelector('.card-front');

let steps = Array.from(document.querySelectorAll('.step'));
let nextBtn = document.querySelectorAll('.next-btn');
let prevBtn = document.querySelectorAll('.previous-btn');

const {ipcRenderer} = require('electron');

logIn.onclick = function() {
    ipcRenderer.send("clientSend", JSON.stringify(['logIn', loginID.value, loginPass.value]));
}

register.onclick = function () {
    ipcRenderer.send("clientSend", JSON.stringify(['register', regName.value, regEmail.value, regPass.value]));
}

checkbox.addEventListener('change', e => {
    if(e.target.checked === true) {
      cardback.className = "card-back active";
      cardFront.className = "card-front";
    }
  if(e.target.checked === false) {
    cardback.className = "card-back";
    cardFront.className = "card-front active";
    }
});

nextBtn.forEach((button) =>{
    button.addEventListener('click', () =>
    {
        changeStep("next");
    })
})

prevBtn.forEach((button) =>{
    button.addEventListener('click', () =>
    {
        changeStep("back");
    })
})

function changeStep(btn)
{
    let index = 0;
    const active = document.querySelector('.active-step');
    index = steps.indexOf(active);
    console.log(index);
    steps[index].classList.remove("active-step");
    if (btn === "next")
        index++;
    else if (btn === "back")
        index--;
    steps[index].classList.add("active-step");
}

