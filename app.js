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

        }
        else if (event.target.value === "alpha") {
            app.api.sort((a, b) => a.name.localeCompare(b.name))
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
                    <img src="${coin.iconUrl}" alt="picture of crypo currency">
                    <p>${coin.name}</p>
                </div>
                <p>Price: ${coin.price}</p>
                <p>Marketcap: ${coin.marketCap}</p></div>`
    })
}



async function getApi2() {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${app.userInput}/market_chart?vs_currency=usd&days=7`)
    const data = await response.json()
    data.prices.forEach(num => ylabels.push(num[1]))

}


let day = []
for (let i = 1; i <= 20; i++) {
    day.push("day " + i)
}
const xlabels = []
const ylabels = []

async function chartIt() {
    await getApi2()
    const data1 = {
        labels: day,
        datasets: [{
            label: `20 day crypto data`,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: ylabels
        }]
    };

    const config = {
        type: 'line',
        data: data1,
        options: {}
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config)
}

app.displayOneCoin = (api) => {
    const oneCoinEl = document.querySelector('.onecoin')
    const formEl = document.querySelector('form')
    const chartEl = document.querySelector('.none')
    formEl.addEventListener('submit', (event) => {
        event.preventDefault()
        chartEl.classList.remove('none')
        app.inputEl = document.querySelector('input')
        app.userInput = app.inputEl.value.toLowerCase()
        chartIt()
        app.inputEl.value = ''
        app.usersCoin = api.filter(coin => coin.name.toLowerCase() === app.userInput || coin.symbol.toLowerCase() === app.userInput)
        app.usersCoin.map(coin => {
            oneCoinEl.innerHTML =
                `<div class="coinContainer"><p> ${coin.rank}</p>
                <img src="${coin.iconUrl}" alt="" style=width:50px>
                <p>${coin.name}</p>
                <p>Price: ${coin.price}</p>
                <p>Marketcap: ${coin.marketCap}</p></div>
              `
        })
        return app.userInput
    })
}


app.init = () => {
    getApi()
    app.dropDown()

}


app.init()
