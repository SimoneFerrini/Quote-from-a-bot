//my API key
// 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



//variabili -------------------------------------------
let characters = document.querySelectorAll(".character");
let loader = document.querySelector(".loading");
const API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo";
const API_KEY = "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";
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
// fine variabili----------------------------------


characters.forEach(function (element) {
    element.addEventListener("click", function () {
        playCharacter(element.dataset.character);
    })
})

modalClose.addEventListener("click", function(){
    modal.classList.add("modal-hidden");
});


//funzioni-------------------------------------------
async function playCharacter(name){
    //mostare loading
    loader.classList.remove("loading-hidden");
    //chiamata API
    const action = "Saluto iconico";
    const temperature = 1;
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: `Sei ${name} e ${action} con un massimo di 100 caratteri senza uscire dal personaggio`,
                }
            ],
            temperature: temperature
        })
    })

    const data = await response.json();
    const message = data.choices[0].message.content;
    //compilo il modale
    modalContent.innerHTML = `
        <h2>${name}</h2>
        <p>${message}</p>
        <code>Character: ${name}, action: ${action}, temperature: ${temperature} </code>
        `;
    
    loader.classList.add("loading-hidden");
    modal.classList.remove("modal-hidden");
  
}