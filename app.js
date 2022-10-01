const app = {}
app.api
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '620365d56amshf652e5c75b7c837p105d6djsnde2c918cd479',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
};
async function getApi() {
    const response = await fetch('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', options)
    const data = await response.json()
    app.api = data.data.coins.filter(coin => coin.rank <= 20)
    app.displayOneCoin(app.api)

}

app.dropDown = () => {
    document.querySelector("select").addEventListener('change', (event) => {
        app.display()
        app.liElement.innerHTML = ''
        if (event.target.value === "marketCap") {
            app.api.sort((a, b) => (a.marketcap - b.marketcap))
            console.log("yo")

        }
        else if (event.target.value === "alpha") {
            app.api.sort((a, b) => a.name.localeCompare(b.name))
            console.log("hi")
        }
        app.display()
    })

}

app.display = () => {
    app.liElement = document.querySelector("li");
    app.api.map(coin => {
        app.liElement.innerHTML +=
            `<div class="coinList"><p> ${coin.rank}</p>
                <div class="coinId">
                    <img src="${coin.iconUrl}" alt="">
                    <p>${coin.name}</p>
                </div>
                <p>Price: ${coin.price}</p>
                <p>Marketcap: ${coin.marketCap}</p></div>`
    })
}

app.displayOneCoin = (api) => {
    const oneCoinEl = document.querySelector('.onecoin')
    const formEl = document.querySelector('form')
    formEl.addEventListener('submit', (event) => {
        event.preventDefault()
        let inputEl = document.querySelector('input')
        let userInput = inputEl.value.toLowerCase()
        inputEl.value = ''
        const usersCoin = api.filter(coin => coin.name.toLowerCase() === userInput || coin.symbol.toLowerCase() === userInput)
        usersCoin.map(coin => {
            oneCoinEl.innerHTML =
                `<div class="coinContainer"><p> ${coin.rank}</p>
                <img src="${coin.iconUrl}" alt="" style=width:50px>
                <p>${coin.name}</p>
                <p>Price: ${coin.price}</p>
                <p>Marketcap: ${coin.marketCap}</p></div>`
        })

    })


}



app.init = () => {
    getApi()
    app.dropDown()

}


app.init()
