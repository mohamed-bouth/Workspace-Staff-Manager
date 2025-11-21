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
const profileImg = document.querySelector("#profileImg")
const optionAll = document.querySelector("#optionAll")
const expContainer = document.querySelector(".exp-container")

// zons element 

const zonsBtn = document.querySelectorAll(".add-to-zone-btn")
const zonesUl = document.querySelectorAll(".staff-in-zone-list")
const zone = document.querySelectorAll(".zone")
const zonesNumber = document.querySelectorAll(".zone_number")

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

// side bar search element

const searchInput = document.querySelector("#searchInput")
const searchByOption = document.querySelector("#searchByOption")

let workersInformation = []

const zoneSettings = {
    conference: ["Manager", "Receptionist", "Technicien IT", "Security Agent", "Cleaning Staff", "Other Roles"],
    reception: ["Manager", "Receptionist", "Cleaning Staff"],
    server: ["Manager", "Technicien IT", "Cleaning Staff"],
    security: ["Manager", "Security Agent", "Cleaning Staff"],
    staff: ["Manager", "Receptionist", "Technicien IT", "Security Agent", "Cleaning Staff", "Other Roles"],
    archives: ["Manager", "Receptionist", "Technicien IT", "Security Agent", "Other Roles"]
}

const zoneLimitsSettings = {
    conference: 10,
    reception: 5,
    server: 8,
    security: 5,
    staff: 20,
    archives: 8
}

function showPopup() {
    const popup = document.getElementById("myPopup")

    popup.classList.add("show")

    setTimeout(() => {
        popup.classList.remove("show")
    }, 3000)
}

function NumberOfWorkerInZone() {
    conferenceZone = 0
    reciptionZone = 0
    serverZone = 0
    securityZone = 0
    staffZone = 0
    archivesZone = 0
    workersInformation.forEach(worker => {
        if (worker.zone === "conference") {
            conferenceZone += 1
        }
        if (worker.zone === "reception") {
            reciptionZone += 1
        }
        if (worker.zone === "server") {
            serverZone += 1
        }
        if (worker.zone === "security") {
            securityZone += 1
        }
        if (worker.zone === "staff") {
            staffZone += 1
        }
        if (worker.zone === "archives") {
            archivesZone += 1
        }
    });
    zonesNumber[0].textContent = `${conferenceZone}/${zoneLimitsSettings["conference"]}`
    zonesNumber[1].textContent = `${reciptionZone}/${zoneLimitsSettings["reception"]}`
    zonesNumber[2].textContent = `${serverZone}/${zoneLimitsSettings["server"]}`
    zonesNumber[3].textContent = `${securityZone}/${zoneLimitsSettings["security"]}`
    zonesNumber[4].textContent = `${staffZone}/${zoneLimitsSettings["staff"]}`
    zonesNumber[5].textContent = `${archivesZone}/${zoneLimitsSettings["archives"]}`
}

function zoneLimit(data) {
    let limits = zoneLimitsSettings[data]
    let workerInZone = 0
    workersInformation.forEach(worker => {
        if (worker.zone === data) {
            workerInZone += 1
        }
    });
    if (workerInZone >= limits) {
        return false
    }
    return true
}

function requiredZone() {
    let reciptionZone = true
    let serverZone = true
    let securityZone = true
    let archivesZone = true
    workersInformation.forEach(worker => {
        if (worker.zone === "reception") {
            reciptionZone = false
        }
        if (worker.zone === "server") {
            serverZone = false
        }
        if (worker.zone === "security") {
            securityZone = false
        }
        if (worker.zone === "archives") {
            archivesZone = false
        }
    });
    if (reciptionZone) {
        zone[1].classList.add("required-zone")
    } else {
        zone[1].classList.remove("required-zone")
    }
    if (serverZone) {
        zone[2].classList.add("required-zone")
    } else {
        zone[2].classList.remove("required-zone")
    }
    if (securityZone) {
        zone[3].classList.add("required-zone")
    } else {
        zone[3].classList.remove("required-zone")
    }
    if (archivesZone) {
        zone[5].classList.add("required-zone")
    } else {
        zone[5].classList.remove("required-zone")
    }
}
requiredZone()

function deleteWorkerFromZone(infoId) {
    workersInformation.forEach(worker => {
        if (worker.id === infoId) {
            if (worker.zone === null) {
                workersInformation = workersInformation.filter(worker => worker.id !== infoId);
            } else {
                worker.zone = null
            }
        }
    })
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
    workersInformation.forEach(worker => {
        if (worker.id === infoId) {
            infoProfileImg.src = worker.url
            infoFullname.textContent = worker.fullName
            infoRole.textContent = `Role: ${worker.role}`
            infoEmail.innerHTML = `<span>Gmail:</span> ${worker.email}`
            infoPhone.innerHTML = `<span>Phone Number:</span> ${worker.phone}`

            if (worker.zone === null) {
                infoZone.innerHTML = `<span>Zone:</span> waiting list`
            } else {
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
    cardo.forEach(card => {
        card.addEventListener("click", (e) => {
            if (e.target.classList.contains("info-icon")) {
                const infoId = card.dataset.idd
                renderInfoContainer()
                renderInfo(infoId)
            }
            if (e.target.classList.contains("delete-icon")) {
                const infoId = card.dataset.idd
                deleteWorkerFromZone(infoId)
                renderworker()
            }
        })
    });
    requiredZone()
    NumberOfWorkerInZone()
}

renderworker()

let formStatus = false
function renderform() {
    if (formStatus === false) {
        profileImg.src = "./assets/icons/profile.png"
        formOutContainer.className = "form-out-container active"
        nameInput.className = ""
        nameInput.value = ""
        roleInput.className = ""
        roleInput.value = "all"
        emailInput.className = ""
        emailInput.value = ""
        phoneInput.className = ""
        phoneInput.value = ""
        urlInput.className = ""
        urlInput.value = ""
        expUl.innerHTML = ""
        expContainer.className = "exp-container"
        expContainer.textContent = "Experience"
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
    let checkInput = true
    if (nameInput.value === "") {
        nameInput.className = "red-border"
        nameInput.placeholder = "Please check the Full name"
        checkInput = false
    } else {
        nameInput.className = ""
    }
    if (roleInput.value === "all") {
        roleInput.className = "red-border"
        optionAll.textContent = "Choose a role"
        checkInput = false
    } else {
        roleInput.className = "searchs-input"
    }
    if (!isEmail.test(emailInput.value)) {
        emailInput.className = "red-border"
        emailInput.placeholder = "Email is invalide"
        checkInput = false
    } else {
        emailInput.className = ""
    }
    if (!isPhoneNumber.test((phoneInput.value).replace(/[^\d+]/g, ''))) {
        phoneInput.className = "red-border"
        phoneInput.placeholder = "phone Number is invalide"
        checkInput = false
    } else {
        phoneInput.className = ""
    }
    if (urlInput.value === "") {
        urlInput.className = "red-border"
        urlInput.placeholder = "URL is invalide"
        checkInput = false
    } else {
        urlInput.className = ""
    }
    const allExp = document.querySelectorAll(".exp-input-container")
    if (allExp.length === 0) {
        expContainer.className = "exp-container red-border"
        expContainer.textContent = "you forgot a experience"
        return false
    } else {
        expContainer.className = "exp-container"
        expContainer.textContent = "Experience"
        for (let index = 0; index < allExp.length; index++) {
            const inputs = allExp[index].querySelectorAll(".exp-input")
            for (let index = 0; index < 4; index++) {
                if (inputs[index].value === "") {
                    inputs[index].className = "exp-input red-border"
                    checkInput = false

                }
            }
            if (isNaN(Date.parse(inputs[2].value)) || isNaN(Date.parse(inputs[3].value))) {
                inputs[2].className = "exp-input red-border"
                inputs[3].className = "exp-input red-border"
                checkInput = false
            }
            let firstDate = new Date(inputs[2].value)
            let secondeDate = new Date(inputs[3].value)
            if (firstDate >= secondeDate) {
                inputs[2].className = "exp-input red-border"
                inputs[3].className = "exp-input red-border"
                checkInput = false
            }
        }
    }
    if (checkInput === false) {
        return false
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
    for (let i = 0; i < allExp.length; i++) {
        const inputs = allExp[i].querySelectorAll(".exp-input")
        let inputsValue = []
        for (let j = 0; j < 4; j++) {
            inputsValue[j] = inputs[j].value
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
    if (count === 0) {
        zonesUl.forEach(zone => {
            if (zone.children.length > 0) {
                renderworker()
                option.forEach(el => el.remove())
                optionStatus = false
            }
        })
    }
    if (optionStatus === false) {
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
        option.forEach(el => el.remove())
        renderworker()
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

function renderByfilter(input, option) {
    if (input === "" || option === "all") {
        renderworker()
        return
    }
    if (input) {
        waitingList.innerHTML = ""
        workersInformation.forEach(worker => {
            if (worker.fullName.toLowerCase().includes(input)) {
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
            }
        });
    } else {
        waitingList.innerHTML = ""
        workersInformation.forEach(worker => {
            if (worker.role.includes(option)) {
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
            }
        });
    }
    const cardo = document.querySelectorAll(".cardo")
    cardo.forEach(card => {
        card.addEventListener("click", (e) => {
            if (e.target.classList.contains("info-icon")) {
                const infoId = card.dataset.idd
                renderInfoContainer()
                renderInfo(infoId)
            }
            if (e.target.classList.contains("delete-icon")) {
                const infoId = card.dataset.idd
                deleteWorkerFromZone(infoId)
                renderworker()
            }
        })
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
        let retu = zoneLimit(data)
        if (retu === false) {
            showPopup()
            return
        }
        allowed = zoneSettings[data]
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
                    renderworker()
                    e.target.remove()
                }
            })

            zonesUl[index].hasWorkerListener = true
        }

    })
})

exitBtn.addEventListener("click", () => {
    renderInfoContainer()
})


urlInput.addEventListener("input", () => {
    if (urlInput.value) {
        const image = urlInput.value
        profileImg.src = image
    } else {
        profileImg.src = "./assets/icons/profile.png"
    }

})

searchInput.addEventListener("input", () => {
    const searchOptionValue = null
    const searchInputValue = searchInput.value.toLowerCase()
    renderByfilter(searchInputValue, searchOptionValue)
})

searchByOption.addEventListener("change", () => {
    const searchInputValue = null
    const searchOptionValue = searchByOption.value
    renderByfilter(searchInputValue, searchOptionValue)
})