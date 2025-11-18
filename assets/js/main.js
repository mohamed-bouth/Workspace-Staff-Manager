const addBtn = document.querySelector("#addBtn")
const formOutContainer = document.querySelector("#formOutContainer")
const submitBtn = document.querySelector("#submitBtn")
const cancelBtn = document.querySelector("#cancelBtn")
const addExpBtn = document.querySelector("#addExpBtn")
const expUl = document.querySelector(".exp-ul")

let workersInformation = []

let worker = {
    fullName: "mohamedbouth",
    role: "IT",
    email: "mohamedbouth87@gmail.com",
    phone: "+212775692573",
    url: "https://imgs.search.brave.com/XnPdbqMjrvl9atnte7ZXBsZkMsIFteFhBnBamwDgqFw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjgv/NjkyLzMzMy9zbWFs/bC9pbGx1c3RyYXRp/b24tb2YtbWFuYWdl/ci12ZWN0b3IuanBn",
    experience: "hamid",
}

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

addBtn.addEventListener("click", () => {
                        renderform()
                    })

submitBtn.addEventListener("click", (event) => {
                        event.preventDefault()
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


