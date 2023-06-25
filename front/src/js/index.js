import '../stylesheets/main.css';
import '../stylesheets/home.css';
import "../../node_modules/@fortawesome/fontawesome-free/js/all.js";
import {fetchQuery} from "./model/fetchQuery";

window.onload = (event) => {
    const header = {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    const addOptionOnSelect = (datas,key,selector) => {
        datas.forEach((data) => {
            const post = data[key];
            let option = document.createElement("option");
            option.value = post;
            option.textContent = post;
            document.querySelector(selector).appendChild(option);
        });
    };
    fetchQuery(`http://localhost:3000/posts`,header, datas => {
        addOptionOnSelect(datas,"?initialesPoste","#post-select")
    });
    fetchQuery(`http://localhost:3000/nationalities`,header, datas => {
        addOptionOnSelect(datas,"?nomPays","#nationality-select")
    });
    fetchQuery(`http://localhost:3000/clubs`,header, datas => {
        addOptionOnSelect(datas,"?nomClub","#club-select")
    });
};

document.querySelector(".button").addEventListener("click", (evt) => {
    const formData = new FormData(document.querySelector("form#search-player"));
    formData.forEach((value, key) => {
        const formValue = formData.get(key);
        if(formValue){
            sessionStorage.setItem(key,value);
        }
    })
    window.location = `${window.location.origin}/card`;
});

let handleClickPlus = (evt) => {
    const input = evt.target.parentElement.querySelector('.input-stat');
    const currentValue = parseInt(input.value);
    if(currentValue < input.max){
        input.value = currentValue + 1;
    }
}

let handleClickMinus = (evt) => {
    const input = evt.target.parentElement.querySelector('.input-stat');
    const currentValue = parseInt(input.value);
    if(currentValue > input.min){
        input.value = currentValue - 1;
    }
}


const buttonsAdd = document.querySelectorAll("button.add1");
const buttonsMinus = document.querySelectorAll("button.minus1");

let handleClickButtons = (buttons, callback) => {
    let intervalIds = new Map();
    buttons.forEach((button) => {
        button.addEventListener('mousedown', (evt) => {
            intervalIds.set(button, setInterval(() => {
                callback(evt);
            }, 100));
        });

        button.addEventListener('click', (evt) => {
            callback(evt);
        });

        button.addEventListener('mouseup', () => {
            clearInterval(intervalIds.get(button));
            intervalIds.delete(button);
        });
    });
}

handleClickButtons(buttonsAdd,handleClickPlus);
handleClickButtons(buttonsMinus,handleClickMinus);

let statsInput = document.querySelectorAll(".input-stat");

statsInput.forEach((statInput) => {
    statInput.addEventListener("input", (evt) => {
        let input = evt.target;
        const currentValue = parseInt(input.value);
        if(input.value != currentValue){
            input.value = 0;
        }
        else if(currentValue> input.max){
            input.value = input.max;
        }
        else if(currentValue < input.min){
            input.value = input.min;
        }
    });
});
let checkFunction = (className) => {
    window.addEventListener("load",() =>{
        document.getElementById(`${className}-check`).checked = true
        document.getElementById(`${className}-select`).disabled = !document.getElementById(`${className}-check`).checked;
    });
    document.getElementById(`${className}-check`).addEventListener("click", (evt) => {
        document.getElementById(`${className}-select`).disabled = !evt.target.checked;
        evt.target.parentElement.parentElement.querySelector("button.add1").disabled = !evt.target.checked;
        evt.target.parentElement.parentElement.querySelector("button.minus1").disabled = !evt.target.checked;
    });
}

checkFunction("physical");
checkFunction("pace");
checkFunction("shoot");
checkFunction("passing");
checkFunction("dribble");
checkFunction("defense");