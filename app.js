const app = {}

async function getApi() {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d')
    const data = await response.json()
    app.api = data
    app.displayOneCoin(app.api)
    // let ylabels1 = []
    // data.forEach(num => ylabels1.push(num.sparkline_in_7d.price))
    // for (let i = 0; i <= 19; i++) {
    //     ylabels1.push[data[i].sparkline_in_7d.price]
    //     console.log(ylabels1)
}


// let ylabels1 = []

// let day1 = []
// for (let i = 1; i <= 7; i++) {
//     day1.push("day " + i)
// }

// async function chartIt1() {
//     await getApi()
//     const data1 = {
//         labels: day1,
//         datasets: [{
//             label: `7 day coin data`,
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: ylabels1
//         }]
//     };


//     const config = {
//         type: 'line',
//         data: data1
//     };
//     if (myChart != null) {
//         myChart.destroy()
//     }

//     myChart = new Chart(
//         document.getElementById('myChart'),
//         config);
// }


app.dropDown = () => {

    document.querySelector("select").addEventListener('change', (event) => {
        app.display()
        app.liElement.innerHTML = ''
        if (event.target.value === "marketCap") {
            app.api.sort((a, b) => (a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h))

        }
        else if (event.target.value === "alpha") {
            app.api.sort((a, b) => a.name.localeCompare(b.name))
        }
        else if (event.target.value === "change") {
            app.api.sort((a, b) => (b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h))
        }
        app.display()
    })

}

app.display = () => {
    app.liElement = document.querySelector("li");
    app.api.map(coin => {
        app.liElement.innerHTML +=
            `<div class="coinList"><p> ${coin.market_cap_change_percentage_24h}</p>
                <div class="coinId">
                    <img src="${coin.image}" alt="picture of crypo currency">
                    <p>${coin.id}</p>
                </div>
                <p>Price: $${coin.current_price}</p>
                <p>Marketcap: ${coin.market_cap}</p></div>
                <p>24 hour change: $${coin.market_cap_change_percentage_24h.toFixed(1)}%</p></div>
                <i onclick="yellow()" class="fa-regular fa-star"></i>`
    })
}


function yellow() {
    const star = document.querySelector('li')
    star.classList.toggle("star")
}




async function getApi2() {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${app.userInput}/market_chart?vs_currency=usd&days=7`)
    const data = await response.json()
    ylabels = []
    data.prices.forEach(num => ylabels.push(num[1]))
}


let day = []
for (let i = 1; i <= 20; i++) {
    day.push("day " + i)
}

let myChart = null
async function chartIt() {
    await getApi2()
    const data1 = {
        labels: day,
        datasets: [{
            label: `20 day coin data`,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: ylabels
        }]
    };


    const config = {
        type: 'line',
        data: data1
    };
    if (myChart != null) {
        myChart.destroy()
    }

    myChart = new Chart(
        document.getElementById('myChart'),
        config);
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
        app.inputEl.value = ''
        chartIt()
        app.usersCoin = api.filter(coin => coin.name.toLowerCase() === app.userInput || coin.symbol.toLowerCase() === app.userInput || coin.id.toLowerCase() === app.userInput)
        app.usersCoin.map(coin => {
            oneCoinEl.innerHTML =
                `<div class="coinContainer"><p>Rank: ${coin.market_cap_change_percentage_24h}</p>
                <img src="${coin.image}" alt="" style=width:50px>
                <p>Name: ${coin.name}</p>
                <p>Price: $${coin.current_price}</p>
                <p>Marketcap: $${coin.market_cap}</p>
                <p>Max supply: ${coin.max_supply}</p>
                <p>All time high price: $${coin.ath}</p>
                </div>
                

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
