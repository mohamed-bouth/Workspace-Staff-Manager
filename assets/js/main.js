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

let workersInformation = [
    {
        id: crypto.randomUUID(),
        fullName: "Amina El Fassi",
        role: "Project Manager",
        email: "amina.elfassi@example.com",
        phone: "+212612345678",
        url: "https://randomuser.me/api/portraits/women/12.jpg",
        experience: [
            {
                company: "TechVision",
                companyRole: "Team Leader",
                from: "2019-02-10",
                to: "2024-08-01"
            }
        ]
    },

    {
        id: crypto.randomUUID(),
        fullName: "Karim Zahidi",
        role: "Backend Developer",
        email: "karim.zahidi@example.com",
        phone: "+212677889900",
        url: "https://randomuser.me/api/portraits/men/45.jpg",
        experience: [
            {
                company: "SoftCore Labs",
                companyRole: "NodeJS Developer",
                from: "2021-04-15",
                to: "2025-01-10"
            }
        ]
    },

    {
        id: crypto.randomUUID(),
        fullName: "Hiba Saad",
        role: "UI/UX Designer",
        email: "hiba.saad@example.com",
        phone: "+212650778899",
        url: "https://randomuser.me/api/portraits/women/33.jpg",
        experience: [
            {
                company: "DesignFlow Studio",
                companyRole: "Product Designer",
                from: "2018-09-01",
                to: "2023-06-20"
            }
        ]
    },

    {
        id: crypto.randomUUID(),
        fullName: "Omar Tazi",
        role: "Network Administrator",
        email: "omar.tazi@example.com",
        phone: "+212699110022",
        url: "https://randomuser.me/api/portraits/men/71.jpg",
        experience: [
            {
                company: "NetWave",
                companyRole: "Network Engineer",
                from: "2020-01-12",
                to: "2024-11-18"
            }
        ]
    }
];


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
    // <div class="exp-input-container">
    //     <input class="exp-input" type="text" placeholder="Company">
    //     <input class="exp-input" type="text" placeholder="Role">
    //     <input class="exp-input" type="text" placeholder="From" onfocus="this.type='date'"
    //     onblur="if(!this.value)this.type='text'">
    //     <input class="exp-input" type="text" placeholder="to" onfocus="this.type='date'"
    //     onblur="if(!this.value)this.type='text'">
    // </div>
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
    if(nameInput.value === ""){
        alert("you forgot name")
        return false
    }
    if(roleInput.value === "all"){
        alert("you dont choose a role")
        return false
    }
    if(!isEmail.test(emailInput.value)){
        alert("check your email")
        return false
    }
    if(!isPhoneNumber.test((phoneInput.value).replace(/[^\d+]/g, ''))){
        alert("check your phone number")
        return false
    }
    if(urlInput.value === ""){
        alert("you forgot URl")
        return false
    }
    const allExp = document.querySelectorAll(".exp-input-container")
    console.log("allexp" , allExp)
    if(allExp.length === 0){
        alert("you forgot experience")
        return false
    }else{
        let flag = true
        for (let index = 0; index < allExp.length; index++) {
            const inputs = allExp[index].querySelectorAll(".exp-input")
            for (let index = 0; index < 4; index++) {
                if(inputs[index].value === ""){
                    flag = false
                    break
                }
            }
        }
        if(flag === false){
            alert("check your experience input")
            return false
        }
    }
    return true
}

addBtn.addEventListener("click", () => {
    renderform()
})

submitBtn.addEventListener("click", (event) => {
    event.preventDefault()
    let status = InputValidation()
    if(status === false){
        return
    }
    renderform()
})

cancelBtn.addEventListener("click", (event) => {
    event.preventDefault()
    renderform()
})

addExpBtn.addEventListener("click", (event) => {
    event.preventDefault()
    renderexp()
})


