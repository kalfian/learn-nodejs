console.log("Client side js file rendering")

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const m1 = document.querySelector('#message1');
const m2 = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    m1.textContent = "Loading..."
    m2.textContent = ""

    const location = search.value

    fetch("/weather?address="+location).then((response) => {
    response.json().then(data => {
        if(data.error) {
            m1.textContent = data.error
        } else {
            m1.textContent = "Location: "+data.location
            m2.textContent = "Forecast: "+data.forecast
        }
    })
})
})