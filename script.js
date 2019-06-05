
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
        httpRequest.open("GET", "http://gd.mlb.com/components/game/mlb/year_2019/month_06/day_05/master_scoreboard.json"
        )
        httpRequest.send()
        // console.log(` `, httpRequest);
        
    }

    function processContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let data = httpRequest.responseText
                // console.log(` `, data);
                // console.log(data);
                
                if (data) {
                    data = JSON.parse(data)
                    console.log(` `, data.data.games.game);

                    if (data.data.games.game) createCards(data.data.games.game)
                    
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
                cards += ``
            }
        }
        cardDeck.innerHTML = cards;
    }

    makeRequest();
    
}


