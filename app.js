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
    console.log(data)
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

app.landing = () => {
    if ('change') {
        const landing = document.querySelector(".landing")
        const nav = document.querySelector(".desktop")
        landing.style.display = "none"
        nav.style.display = "flex"
    }
}

app.dropDown = () => {
    const bothDropDowns = document.querySelectorAll("select")
    const [drop1, drop2] = bothDropDowns
    const tableElement = document.querySelector("table");
    const tableHeader = document.querySelector("thead")
    const oneCoin = document.querySelector(".onecoin")
    const chart = document.querySelector(".df")
    const listOn = () => {
        tableElement.style.display = "table"
        tableHeader.style.display = "block"
        console.log("list is on!")
    }
    const clear = () => {
        oneCoin.style.display = "none"
        chart.style.display = "none"
        console.log("cleared!");
    }
    document.querySelector(".navSelect").addEventListener('change', (event) => {
        clear();
        listOn();
        app.display();
        tableElement.innerHTML = ''
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
    document.querySelector(".landingSelect").addEventListener('change', (event) => {
        app.display()
        app.landing()
        listOn()
        tableElement.innerHTML = ''
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
        app.landing()
    })

}

app.display = () => {
    app.tableElement = document.querySelector("table");
    const oneCoin = document.querySelector(".onecoin");
    app.api.map(coin => {
        app.tableElement.innerHTML +=
        `<tbody>
            <tr>
            <td><i onclick="yellow()" class="fa-regular fa-star"></i></td>
            <td>${coin.market_cap_rank}</td>
            <td class="tableAlign">
                <img src="${coin.image}" alt="picture of ${coin.id}">
                    ${coin.id} ${coin.symbol}
            </td>
            <td> $${coin.current_price}</td>
            <td> ${coin.market_cap}</td>
            <td>24 hour change: $${coin.market_cap_change_percentage_24h.toFixed(1)}%</td>`
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
    const bothForms = document.querySelectorAll("form")
    const [form1, form2] = bothForms
    const list = document.querySelector("table")
    const chartEl = document.querySelector('.none')
    const chart = document.querySelector('.df')
    const clear = () => {
        list.style.display = "none"
        console.log("cleared the list!")
    }
    const coinOn = () => {
        oneCoinEl.style.display = "flex"
        chart.style.display = "flex"
        console.log("coin is displaying")
    }
    form1.addEventListener('submit', (event) => {
        event.preventDefault()
        chartEl.classList.remove('none')
        app.inputEl = document.querySelector('.navInput')
        app.userInput = app.inputEl.value.toLowerCase()
        app.inputEl.value = ''
        chartIt()
        app.usersCoin = api.filter(coin => coin.name.toLowerCase() === app.userInput || coin.symbol.toLowerCase() === app.userInput || coin.id.toLowerCase() === app.userInput)
        app.usersCoin.map(coin => {
            oneCoinEl.innerHTML =
                `<div class="coinContainer"><p>Rank: ${coin.market_cap_rank}</p>
                <img src="${coin.image}" alt="" style=width:50px>
                <p>Name: ${coin.name}</p>
                <p>Price: $${coin.current_price}</p>
                <p>Marketcap: $${coin.market_cap}</p>
                <p>Max supply: ${coin.max_supply}</p>
                <p>All time high price: $${coin.ath}</p>
                </div>`
        })
        if ('submit'){
            clear();
            coinOn();
        }
        return app.userInput
    })
    form2.addEventListener('submit', (event) => {
        event.preventDefault()
        chartEl.classList.remove('none')
        app.inputEl = document.querySelector('.landingInput')
        app.userInput = app.inputEl.value.toLowerCase()
        app.inputEl.value = ''
        chartIt()
        app.usersCoin = api.filter(coin => coin.name.toLowerCase() === app.userInput || coin.symbol.toLowerCase() === app.userInput || coin.id.toLowerCase() === app.userInput)
        app.usersCoin.map(coin => {
            oneCoinEl.innerHTML =
                `<div class="coinContainer"><p>Rank: ${coin.market_cap_rank}</p>
                <img src="${coin.image}" alt="" style=width:50px>
                <p>Name: ${coin.name}</p>
                <p>Price: $${coin.current_price}</p>
                <p>Marketcap: $${coin.market_cap}</p>
                <p>Max supply: ${coin.max_supply}</p>
                <p>All time high price: $${coin.ath}</p>
                </div>`
        })
        if ('submit') {
            const landing = document.querySelector(".landing")
            const nav = document.querySelector(".desktop")
            landing.style.display = "none"
            nav.style.display = "flex"
        }
    })
}

app.modal = () => {
    const modalBox = document.querySelector('.modalContainer')
    const body = document.body
    const showModal = document.querySelector('.underlineTransition').addEventListener('click', function () {
        modalBox.style.display = "block"
        body.style.overflow = "hidden";
        console.log("modal!")
    });

    const close = document.querySelector(".close").addEventListener("click", function () {
        modalBox.style.display = "none";
        body.style.overflow = "auto";
        console.log("closed!")
    });
}

app.init = () => {
    getApi()
    app.dropDown()
    app.modal()
}


app.init()
