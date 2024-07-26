
const characterCard = ({name, species, status, image}) => {
    
    /* const {name, species, status, image} = characterData */
    
    
    
    return`
<div class = "card"> 
<h2>${name}</h2>
<h3 class="${species}">${species}</h3>
<h4 class= "${status}">${status}</h4>
<img src=${image} />
</div>
`};

const charactersComponent = (charactersData) => `
<div class = "characters"> 
    ${charactersData.map(characterData => characterCard(characterData)).join("")}
</div>
`

const buttonComponent = (type) => `
    <button class=${type}>${type}</button>
`


const domFromData = (data, rootElement) => {
    rootElement.innerHTML = ""
    if (data.info.prev) rootElement.insertAdjacentHTML("beforeend", buttonComponent("prev"))
    if (data.info.next) rootElement.insertAdjacentHTML("beforeend", buttonComponent("next"))
    const buttons = document.querySelectorAll("button")
    buttons.forEach((button) => button.addEventListener("click", () => {
        fetch(data.info[button.classList[0]])
        .then(res => res.json())
        .then(newData => {
            domFromData(newData, rootElement)
        })
    }))

    rootElement.insertAdjacentHTML("beforeend", charactersComponent(data.results))

    
    /* if (data.info.prev !== null) {rootElement.insertAdjacentHTML("beforeend", buttonComponent("prev"))
        const prevButtonElement = document.querySelector("button.prev")
        prevButtonElement.addEventListener("click", () => {
            fetch(data.info.prev)
            .then(res => res.json())
            .then(newData => {
                domFromData(newData, rootElement)
            })
            
        })
    }
    
    
   if (data.info.next !== null) {rootElement.insertAdjacentHTML("beforeend", buttonComponent("next"))
        const nextButtonElement = document.querySelector("button.next")
        nextButtonElement.addEventListener("click", () => {
            fetch(data.info.next)
            .then(res => res.json())
            .then(newData => {
                domFromData(newData, rootElement)
            })
            
        })
    } */
}


fetch ("https://rickandmortyapi.com/api/character")
.then((response) => response.json())
.then((data) => {
    console.log(data)

    /* data.results.forEach(characterData => {
        document.querySelector('#root').insertAdjacentHTML("beforeend", characterCard(characterData))
    }); */
    /* document.querySelector("#root").insertAdjacentHTML("beforeend", charactersComponent(data.results)) */

    domFromData(data, document.querySelector("#root"))
    /* const nextButtonElement = document.querySelector("button")
    nextButtonElement.addEventListener("click", () => {
        fetch(data.info.next)
        .then(res => res.json())
        .then(newData => {
            
            domFromData(newData, document.querySelector("#root"))
            const newNextButtonElement = document.querySelector("button")
            newNextButtonElement.addEventListener("click", () => {
                fetch(newData.info.next)
                .then(res2 => res.json())
                .then(newerData =>)
            })
        })

        
    }) */
})