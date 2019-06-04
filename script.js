
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
                cards += `<div class="card mb-4 shadow-sm">
                <div class="card-header">
                  <h4 class="my-0 font-weight-normal">7:05pm</h4>
                </div>
                <div class="card-body">
                  <h1 class="card-title pricing-card-title"><small class="text-muted">29-30</small></h1>
                  <h1 class="card-title pricing-card-title">Nationals <small class="text-muted">26-33</small></h1>
                  <h1>Probable Pitchers</h1>
                  <ul class="list-unstyled mt-3 mb-4">
                    <li>R. Lopez CHW SP</li>
                    <li>3-5, 6.20 ERA, 1.64 WHIP </li>
                    <p></p>
                    <li>S. Strasburg WAS SP</li>
                    <li>5-3, 3.19 ERA, 0.99 WHIP</li>
                  </ul>
                </div>
              </div>`
            }
        }
        cardDeck.innerHTML = cards;
    }

    makeRequest();
    
}


