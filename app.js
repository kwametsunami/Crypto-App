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
    document.querySelector(".navSelect").addEventListener('change', (event) => {
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
    document.querySelector(".landingSelect").addEventListener('change', (event) => {
        app.display()
        app.landing()
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
        app.landing()
    })
}

app.display = () => {
    app.liElement = document.querySelector("tbody");
    const listOn = () => {
        liElement.style.display = "flex"
        console.log("list is on!")
    }
    const oneCoin = document.querySelector(".onecoin")
    const clear = () => {
        oneCoin.style.display = "none"
        console.log("cleared!");
    }
    clear()
    app.api.map(coin => {
        app.liElement.innerHTML +=
            `<tr><td>${coin.rank}</td>
            <td><img src="${coin.iconUrl}" alt="">
                ${coin.name}</td>
                <td>${coin.price}</td>
                <td>${coin.marketCap}</td></tr>`
    })
}

app.displayOneCoin = (api) => {
    const oneCoinEl = document.querySelector('.onecoin')
    const bothForms = document.querySelectorAll("form")
    const [form1, form2] = bothForms
    const list = document.querySelector(".list")
    const coinOn = () => {
        oneCoinEl.style.display = "flex"
        console.log("coin is displaying")
    }
    const clear = () => {
        list.style.display = "none"
        console.log("cleared the list!")
    }
    form1.addEventListener('submit', (event) => {
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
    form2.addEventListener('submit', (event) => {
        event.preventDefault()
        let inputEl = document.querySelector('.landingInput')
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
        if ('submit'){
            const landing = document.querySelector(".landing")
            const nav = document.querySelector(".desktop")
            landing.style.display = "none"
            nav.style.display = "flex"
        }
    })
}

// app.landing = () => {
//     const landing = document.querySelector(".landing")
//     if (app.display || app.displayOneCoin) {
//         landing.style.display = "none"
//         console.log("landing is off")
//     }
// }

app.modal = () => {
    const modalBox = document.querySelector('.modalContainer')
    const body = document.body
    const showModal = document.querySelector('.underlineTransition').addEventListener('click', function (){
        modalBox.style.display = "block"
        body.style.overflow = "hidden";
        console.log("modal!")
    });

    const close = document.querySelector(".close").addEventListener("click", function (){
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
