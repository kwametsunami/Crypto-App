const app = {}

async function getApi() {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d')
    const data = await response.json()
    app.api = data
    app.displayOneCoin(app.api)
    app.scroll(app.api)
    app.converting()
}

app.landing = () => {
    if ('change') {
        const landing = document.querySelector(".landing")
        const nav = document.querySelector(".desktop")
        const scroll = document.querySelector(".scrollContainer")
        landing.style.display = "none"
        scroll.style.display = "none"
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
    }
    const clear = () => {
        oneCoin.style.display = "none"
        chart.style.display = "none"
    }
    document.querySelector(".navSelect").addEventListener('change', (event) => {
        clear();
        listOn();
        app.display();
        tableElement.innerHTML = ''
        if (event.target.value === "marketCap") {
            app.api.sort((a, b) => (b.market_cap - a.market_cap))

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
            app.api.sort((a, b) => (b.market_cap - a.market_cap))

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
    app.tableElement = document.querySelector("table");
    const oneCoin = document.querySelector(".onecoin");
    app.api.map(coin => {
        app.tableElement.innerHTML += `
        
            <tbody>
            <tr>
            <td><i class="fa-sharp fa-solid fa-star"></i></td>
            <td>${coin.market_cap_rank}</td>
            <td class="tableAlign">
                <img src="${coin.image}" alt="picture of ${coin.id}">
                    <span class="nameUp">${coin.name}</span><span class="symbolTable">${coin.symbol}</span>
            </td>
            <td> $${coin.current_price}</td>
            <td> $${coin.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td class="change">${coin.market_cap_change_percentage_24h.toFixed(1)}%</td>
           `
        if (coin.market_cap_change_percentage_24h > 0.000005) {
            const cap = document.querySelector(".change");
            cap.classList.remove("change")
            cap.classList.add("changeG")
        } else if (coin.market_cap_change_percentage_24h < 0) {
            const cap = document.querySelector(".change");
            cap.classList.remove("change")
            cap.classList.add("changeR")
        } else if (coin.market_cap_change_percentage_24h.toFixed(1) == 0.0) {
            const cap = document.querySelector(".change")
            cap.style.color = "$white"
        }
    })
    app.tableHeader()
}

app.tableHeader = () => {
    const table = document.querySelector("table");
    const thead =
        `<thead>
            <tr>
                <th> </th>
                <th>Rank</th>
                <th>Coin</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>24h Change</th>
            </tr>
        </thead>`
    table.innerHTML = thead + table.innerHTML;
}

app.yellow = () => {
    app.liElement = document.querySelector(".list")
    app.liElement.addEventListener('click', function (event) {
        if (event.target.tagName === 'I') {
            event.target.classList.toggle("star")
        }
    })
}

app.converting = () => {
    app.api.forEach(coin => {
        if (app.userInput === coin.symbol.toLowerCase() || app.userInput === coin.name.toLowerCase()) {
            app.userInput = coin.id
        }
    })
}


async function getApi2() {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${app.userInput}/market_chart?vs_currency=usd&days=7`)
    const data = await response.json()
    .catch(error=>{
         alert(error)
    })
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
        data: data1,
        options: { maintainAspectRatio: false }
    };
    if (myChart != null) {
        myChart.destroy()
    }

    myChart = new Chart(
        document.getElementById('myChart'),
        config);
}

app.scroll = (api) => {
    const scrollContainer = document.querySelector(".animationContainer")
    for (let i = 0; i < 8; i++) {
        api.map(coin => {
            scrollContainer.innerHTML +=
                `<div class="scrolling">
                <p>${coin.name}</p>
                    <div class="scrollImage"><img src="${coin.image}" alt="cryptocoins"></div>
                <p class="change">${coin.market_cap_change_percentage_24h.toFixed(1)}%</p>
            </div>`
            if (coin.market_cap_change_percentage_24h > 0) {
                const cap = document.querySelector(".change");
                cap.classList.remove("change")
                cap.classList.add("changeG")
            } else if (coin.market_cap_change_percentage_24h < 0) {
                const cap = document.querySelector(".change");
                cap.classList.remove("change")
                cap.classList.add("changeR")
            } else if (coin.market_cap_change_percentage_24h == 0) {
                const cap = document.querySelector(".change")
                cap.style.color = "$white"
            }
        })
    }
}

app.displayOneCoin = (api) => {
    const oneCoinEl = document.querySelector('.onecoin')
    const bothForms = document.querySelectorAll("form")
    const [form1, form2] = bothForms
    const list = document.querySelector("table")
    const chartEl = document.querySelector('.none')
    const chart = document.querySelector('.df')
    const scroll = document.querySelector('.scrollContainer')
    const clear = () => {
        list.style.display = "none"
        scroll.style.display = "none"
    }
    const coinOn = () => {
        oneCoinEl.style.display = "flex"
        chart.style.display = "flex"
    }
    form1.addEventListener('submit', (event) => {
        event.preventDefault()
        chartEl.classList.remove('none')
        app.inputEl = document.querySelector('.navInput')
        app.userInput = app.inputEl.value.toLowerCase()
        app.converting()
        app.inputEl.value = ''
        chartIt()
        app.usersCoin = api.filter(coin => coin.name.toLowerCase() === app.userInput || coin.symbol.toLowerCase() === app.userInput || coin.id.toLowerCase() === app.userInput)
        app.usersCoin.map(coin => {
            oneCoinEl.innerHTML =
                `<div class="coinContainer">
                <div class="left"><p class="rank">Rank: ${coin.market_cap_rank}</p>
                <div class="imageName"><img class="image" src="${coin.image}" alt="a picture of ${coin.name}">
                <p class="name">${coin.name}</p><p class="symbol"> (${coin.symbol})</p></div>
                <h4 class="price">$${coin.current_price}</h4></div>
                <div class="right"><p class="marketcap">Marketcap: $${coin.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <p class="supply">Max supply: ${coin.max_supply === null ? "N/A" : coin.max_supply}</p>
                <p class="high">All Time High: $${coin.ath}</p></div>
                </div>`
        })
        if ('submit') {
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
        app.converting()
        app.inputEl.value = ''
        chartIt()
        app.usersCoin = api.filter(coin => coin.name.toLowerCase() === app.userInput || coin.symbol.toLowerCase() === app.userInput || coin.id.toLowerCase() === app.userInput)
        app.usersCoin.map(coin => {
            oneCoinEl.innerHTML =
                `<div class="coinContainer">
                <div class="left"><p class="rank">Rank: ${coin.market_cap_rank}</p>
                <div class="imageName"><img class="image" src="${coin.image}" alt="a picture of ${coin.name}">
                <p class="name">${coin.name}</p><p class="symbol"> (${coin.symbol})</p></div>
                <h4 class="price">$${coin.current_price}</h4></div>
                <div class="right"><p class="marketcap">Marketcap: $${coin.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <p class="supply">Max supply: ${coin.max_supply === null ? "N/A" : coin.max_supply}</p>
                <p class="high">All Time High: $${coin.ath}</p></div>
                </div>`
        })
        if ('submit') {
            const landing = document.querySelector(".landing")
            const nav = document.querySelector(".desktop")
            const footer = document.querySelector("footer")
            landing.style.display = "none"
            scroll.style.display = "none"
            nav.style.display = "flex"
            coinOn();
        }
    })
}

app.modal = () => {
    const modalBox = document.querySelector('.modalContainer')
    const modalOverlay = document.querySelector('.modalOverlay')
    const body = document.body
    const showModal = document.querySelector('.underlineTransition').addEventListener('click', function () {
        modalBox.style.display = "block"
        modalOverlay.style.display = "block"
        body.style.overflow = "hidden";
    });

    const close = document.querySelector(".close").addEventListener("click", function () {
        modalBox.style.display = "none";
        modalOverlay.style.display = "none";
        body.style.overflow = "auto";
    });
}

app.init = () => {
    getApi()
    app.dropDown()
    app.modal()
    app.yellow()
}


app.init()
