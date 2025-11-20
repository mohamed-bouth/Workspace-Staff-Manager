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

// zons element 

const zonsBtn = document.querySelectorAll(".add-to-zone-btn")
const zonesUl = document.querySelectorAll(".staff-in-zone-list")

// info pop up element

const infoContainer = document.querySelector("#infoContainer")
const exitBtn = document.querySelector("#exitBtn")
const infoProfileImg = document.querySelector("#infoProfileImg")
const infoFullname = document.querySelector("#infoFullname")
const infoRole = document.querySelector("#infoRole")
const infoEmail = document.querySelector("#infoEmail")
const infoPhone = document.querySelector("#infoPhone")
const infoZone = document.querySelector("#infoZone")
const infoExp = document.querySelector("#infoExp")

let workersInformation = []

const zoneSettings = {
    conference: ["Manager", "Receptionist", "Technicien IT", "Security Agent", "Cleaning Staff", "Other Roles"],
    reception: ["Manager", "Receptionist", "Cleaning Staff"],
    server: ["Manager", "Technicien IT", "Cleaning Staff"],
    security: ["Manager", "Security Agent", "Cleaning Staff"],
    staff: ["Manager", "Receptionist", "Technicien IT", "Security Agent", "Cleaning Staff", "Other Roles"],
    archives: ["Manager", "Receptionist", "Technicien IT", "Security Agent", "Other Roles"]
}

let infoStatus = false
function renderInfoContainer() {
    if (infoStatus === false) {
        infoContainer.className = "info-popup-out-container active"
        infoStatus = true
    } else {
        infoContainer.className = "info-popup-out-container"
        infoStatus = false
    }
}

function renderInfo(infoId) {
    console.log(infoId)
    workersInformation.forEach(worker => {
        if (worker.id === infoId) {
            console.log(infoProfileImg)
            infoProfileImg.src = worker.url
            infoFullname.textContent = worker.fullName
            infoRole.textContent = `Role: ${worker.role}`
            infoEmail.innerHTML = `<span>Gmail:</span> ${worker.email}`
            infoPhone.innerHTML = `<span>Phone Number:</span> ${worker.phone}`

            if (worker.zone === null) {
                infoZone.innerHTML = `<span>Zone:</span> waiting list`
            }else {
                infoZone.innerHTML = `<span>Zone:</span> ${worker.zone}`
            }
            infoExp.innerHTML = ''
            const expTitle = document.createElement("h3")
            expTitle.textContent = "experience"
            infoExp.appendChild(expTitle)
            worker.experience.forEach(exp => {
                const expContainer = document.createElement("div")
                expContainer.innerHTML = `<p><span>Company:</span> ${exp.company}</p>
                        <p><span>Role:</span> ${exp.companyRole}</p>
                        <p><span>From:</span> ${exp.from}</p>
                        <p><span>to:</span> ${exp.to}</p>`
                infoExp.appendChild(expContainer)
            });
        }
    })
}

function renderworker() {
    waitingList.innerHTML = ""
    zonesUl.forEach(zone => {
        zone.innerHTML = ""
    });
    workersInformation.forEach(worker => {
        if (worker.zone === null) {
            const workerCardContainer = document.createElement("div")
            workerCardContainer.className = "worker-card-container cardo"
            workerCardContainer.dataset.idd = worker.id
            workerCardContainer.innerHTML = `<img class="worker-img" src="${worker.url}" alt="">
                <div>
                    <p style="font-weight: bold;">${worker.fullName}</p>
                    <p>${worker.role}</p>
                </div>
                <div class="icon-container">
                    <img class="info-icon" src="./assets/icons/question.png" alt="">
                    <img class="delete-icon" src="./assets/icons/delete.png" alt="">
                </div>`
            waitingList.appendChild(workerCardContainer)
        } else {
            const workerCardContainer = document.createElement("div")
            workerCardContainer.dataset.idd = worker.id
            workerCardContainer.className = "worker-card-container-in-zone cardo"
            workerCardContainer.innerHTML = `<img class="worker-img" src="${worker.url}" alt="">
                        <div>
                            <p style="font-weight: bold;">${worker.fullName}</p>
                            <p>${worker.role}</p>
                        </div>
                        <div class="icon-container">
                            <img class="info-icon" src="./assets/icons/question.png" alt="">
                            <img class="delete-icon" src="./assets/icons/delete.png" alt="">
                        </div>`
            if (worker.zone === "conference") {
                zonesUl[0].appendChild(workerCardContainer)
            } else if (worker.zone === "reception") {
                zonesUl[1].appendChild(workerCardContainer)
            } else if (worker.zone === "server") {
                zonesUl[2].appendChild(workerCardContainer)
            } else if (worker.zone === "security") {
                zonesUl[3].appendChild(workerCardContainer)
            } else if (worker.zone === "staff") {
                zonesUl[4].appendChild(workerCardContainer)
            } else if (worker.zone === "archives") {
                zonesUl[5].appendChild(workerCardContainer)
            }
        }
    });
    const cardo = document.querySelectorAll(".cardo")
    console.log(cardo)
    cardo.forEach(card => {
        card.addEventListener("click", (e) => {
            if (e.target.classList.contains("info-icon")) {
                const infoId = card.dataset.idd
                renderInfoContainer()
                renderInfo(infoId)
            }
        })
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
        experience: [],
        zone: null
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

let optionStatus = false
function renderworkerINzone(data) {
    let index = null
    if (data === "conference") {
        index = 0
    } else if (data === "reception") {
        index = 1
    } else if (data === "server") {
        index = 2
    } else if (data === "security") {
        index = 3
    } else if (data === "staff") {
        index = 4
    } else if (data === "archives") {
        index = 5
    }
    const option = document.querySelectorAll(".available-workers")
    let count = zonesUl[index].querySelectorAll(".available-workers").length
    console.log(count)
    if (count === 0) {
        zonesUl.forEach(zone => {
            if (zone.children.length > 0) {
                console.log("remove top")
                renderworker()
                option.forEach(el => el.remove())
                optionStatus = false
            }
        })
    }
    if (optionStatus === false) {
        console.log("add")
        zonesUl[index].querySelectorAll(".worker-card-container-in-zone").forEach(worker => {
            worker.remove()
        });
        allowedRole = zoneSettings[data]
        workersInformation.forEach(worker => {
            allowedRole.forEach(Role => {
                if (worker.role === Role && worker.zone === null) {
                    const workerCard = document.createElement("div")
                    workerCard.dataset.idd = worker.id
                    workerCard.className = "available-workers"
                    workerCard.innerHTML = `<img src="${worker.url}" alt="">
                                    <p>${worker.fullName} (${worker.role})</p>`
                    zonesUl[index].appendChild(workerCard)
                }
            })
        })
        optionStatus = true
    } else {
        console.log("remove bottom")
        option.forEach(el => el.remove())
        optionStatus = false
    }
    return index
}

function workerChangeZone(idd, data) {
    workersInformation.forEach(worker => {
        if (worker.id === idd) {
            worker.zone = data
        }
    });
}

// add event listener element

expUl.addEventListener("click", (e) => {
    if (e.target.classList.contains("dltExpBtn")) {
        e.target.parentElement.remove()
    }
})

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

zonsBtn.forEach(zonBtn => {
    zonBtn.addEventListener("click", () => {
        const data = zonBtn.dataset.zone;

        allowed = zoneSettings[data]
        console.log(allowed)
        let isNull = false
        workersInformation.forEach(worker => {
            if (worker.zone === null) {
                isNull = true

            }
        });
        if (isNull === false) {
            return
        }
        const index = renderworkerINzone(data)

        if (!zonesUl[index].hasWorkerListener) {

            zonesUl[index].addEventListener("click", (e) => {
                if (e.target.classList.contains("available-workers")) {
                    workerChangeZone(e.target.dataset.idd, data)
                    console.log(e.target.dataset.idd)
                    console.log(workersInformation)
                    renderworker()
                    e.target.remove()
                }
            })

            zonesUl[index].hasWorkerListener = true
        }

    })
})

exitBtn.addEventListener("click", () => {
    console.log("work")
    renderInfoContainer()
})

