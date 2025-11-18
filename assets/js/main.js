// add new worker form element

const addBtn = document.querySelector("#addBtn")
const formOutContainer = document.querySelector("#formOutContainer")
const submitBtn = document.querySelector("#submitBtn")
const cancelBtn = document.querySelector("#cancelBtn")
const addExpBtn = document.querySelector("#addExpBtn")
const expUl = document.querySelector(".exp-ul")

// waiting list worker elemnet

const waitingList = document.querySelector("#waitingList")

// form input element 

const nameInput = document.querySelector("#nameInput")
const roleInput = document.querySelector("#roleInput")
const emailInput = document.querySelector("#emailInput")
const phoneInput = document.querySelector("#phoneInput")
const urlInput = document.querySelector("#urlInput")

let workersInformation = []


function renderworker() {
    waitingList.innerHTML = ""
    workersInformation.forEach(worker => {
        const workerCardContainer = document.createElement("div")
        workerCardContainer.className = "worker-card-container"
        workerCardContainer.innerHTML = `<img class="worker-img" src="${worker.url}" alt="">
                <div>
                    <p style="font-weight: bold;">${worker.fullName}</p>
                    <p>${worker.role}</p>
                </div>
                <img class="info-icon" src="./assets/icons/question.png" alt="">`
        waitingList.appendChild(workerCardContainer)
    });
}

renderworker()

let formStatus = false
function renderform() {
    if (formStatus === false) {
        formOutContainer.className = "form-out-container active"
        formStatus = true
    } else {
        formOutContainer.className = "form-out-container"
        formStatus = false
    }
}

function renderexp() {
    const expInputContainer = document.createElement("div")
    expInputContainer.className = 'exp-input-container'
    expInputContainer.innerHTML = `<input class="exp-input" type="text" placeholder="Company">
         <input class="exp-input" type="text" placeholder="Role">
         <input class="exp-input" type="text" placeholder="From" onfocus="this.type='date'"
         onblur="if(!this.value)this.type='text'">
         <input class="exp-input inp" type="text" placeholder="to" onfocus="this.type='date'"
         onblur="if(!this.value)this.type='text'">
         <img class="dltExpBtn" src="./assets/icons/delete.png" alt="dlt">`
    expUl.appendChild(expInputContainer)
}

expUl.addEventListener("click", (e) => {
    if (e.target.classList.contains("dltExpBtn")) {
        e.target.parentElement.remove()
    }
})

function InputValidation() {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isPhoneNumber = /^\+?\d{10,15}$/
    if (nameInput.value === "") {
        alert("you forgot name")
        return false
    }
    if (roleInput.value === "all") {
        alert("you dont choose a role")
        return false
    }
    if (!isEmail.test(emailInput.value)) {
        alert("check your email")
        return false
    }
    if (!isPhoneNumber.test((phoneInput.value).replace(/[^\d+]/g, ''))) {
        alert("check your phone number")
        return false
    }
    if (urlInput.value === "") {
        alert("you forgot URl")
        return false
    }
    const allExp = document.querySelectorAll(".exp-input-container")
    if (allExp.length === 0) {
        alert("you forgot experience")
        return false
    } else {
        let flag = true
        for (let index = 0; index < allExp.length; index++) {
            const inputs = allExp[index].querySelectorAll(".exp-input")
            for (let index = 0; index < 4; index++) {
                if (inputs[index].value === "") {
                    flag = false
                    break
                }
            }
        }
        if (flag === false) {
            alert("check your experience input")
            return false
        }
    }
    return true
}

function workerInformationStorage() {
    nameValue = nameInput.value
    roleValue = roleInput.value
    emailValue = emailInput.value
    phoneValue = (phoneInput.value).replace(/[^\d+]/g, '')
    urlValue = urlInput.value
    let workerInformation = {
        id: crypto.randomUUID(),
        fullName: nameValue,
        role: roleValue,
        email: emailValue,
        phone: phoneValue,
        url: urlValue,
        experience: []
    }
    const allExp = document.querySelectorAll(".exp-input-container")
    for (let index = 0; index < allExp.length; index++) {
        const inputs = allExp[index].querySelectorAll(".exp-input")
        let inputsValue = []
        for (let index = 0; index < 4; index++) {
            inputsValue[index] = inputs[index].value
        }
        let exp = {
            company: inputsValue[0],
            companyRole: inputsValue[1],
            from: inputsValue[2],
            to: inputsValue[3]
        }
        workerInformation.experience.push(exp)
    }
    workersInformation.push(workerInformation)
    console.log(workerInformation)
    console.log(workersInformation)
}

addBtn.addEventListener("click", () => {
    renderform()
})

submitBtn.addEventListener("click", (event) => {
    event.preventDefault()
    let status = InputValidation()
    if (status === false) {
        return
    }
    workerInformationStorage()
    renderform()
    renderworker()
})

cancelBtn.addEventListener("click", (event) => {
    event.preventDefault()
    renderform()
})

addExpBtn.addEventListener("click", (event) => {
    event.preventDefault()
    renderexp()
})


