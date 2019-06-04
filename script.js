
window.onload = function () {
    init()
}

function init(){
    
    let httpRequest

    function makeRequest() {
        httpRequest = new XMLHttpRequest()

        if(!httpRequest) {
            alert("Giving up! Cannot create an XMLHTTP instance")
        }

        httpRequest.onreadystatechange = processContents
        httpRequest.open("GET", "http://gd.mlb.com/components/game/mlb/year_2019/month_06/day_04/master_scoreboard.json"
        )
        httpRequest.send()
        console.log(` `, httpRequest);
        
    }

    function processContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let data = httpRequest.responseText
                // console.log(` `, data);
                
                if (data) {
                    data = JSON.parse(data)

                    if (data.rates) createCards(data.rates)
                }
            } else {
                alert("There was a problem with request")
            }
        }
    }

    function createCards(items) {
        let cardDeck = document.querySelector(".container > .card-deck")
        console.log(items);

        let cards = ``

        for (let item in items) {
            if (items.hasOwnProperty(item)) {
                cards += `<div class="card mb-4 shadow-sm">
                <div class="card-header">
                    <h4 class="my-0 font-weight-normal">${item}</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">${items[item]}</h1>
                </div>
            </div>`
            }
        }
        cardDeck.innerHTML = cards;
    }

    makeRequest();
    
}


