let d = new Date();
let newDay = d.getDate();
let newString = "0"+newDay;
console.log(newString)

window.onload = function () {
    init()
}

function init(){

    document.querySelector('#previous')
        .addEventListener('click', newDatePrevious);
    
    document.querySelector('#next')
        .addEventListener('click', newDateNext);
    
    let httpRequest

    function makeRequest() {
        httpRequest = new XMLHttpRequest()

        if(!httpRequest) {
            alert("Giving up! Cannot create an XMLHTTP instance")
        }

        httpRequest.onreadystatechange = processContents
        httpRequest.open("GET", `http://gd.mlb.com/components/game/mlb/year_${d.getFullYear()}/month_06/day_${newString}/master_scoreboard.json`
        )
        httpRequest.send()
        // console.log(` `, httpRequest);
        
        

    }

    document.getElementById("#primary").innerHTML = d.toDateString();
    
    function newDateNext() {
        newDay=newDay+1;
        newString = "0"+newDay;

        document.getElementById("#primary").innerHTML = newDay;
    
        makeRequest();

    }

    function newDatePrevious() {
        newDay=newDay-1;
        newString = "0"+newDay;
        
        document.getElementById("#primary").innerHTML = newDay;

        makeRequest();

    }

    function processContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let data = httpRequest.responseText
                // console.log(` `, data);
                // console.log(data);
                
                if (data) {
                    data = JSON.parse(data)
                    // console.log(` `, data.data.games.game);

                    if (data.data.games.game) createCards(data.data.games.game)
                    
                }
            } else {
                alert("There was a problem with request")
            }
        }
    }



    function createCards(items) {
        let cardDeck = document.querySelector(".container > .content")
        // console.log(items);

        let cards = ``

        for (let item in items) {
            if (items.hasOwnProperty(item)) {
                // console.log(items[item].time);
                cards += `<div class="col-md-4">
                <div class="card-header">
                <p class="my-0 font-weight-normal">${items[item].time} ${items[item].ampm} ${items[item].time_zone}</p>
                </div>
                <div class="card-body">
                    
                    <h6>${items[item].away_team_name}</br>${items[item].away_win}-${items[item].away_loss}</h6>
                    <h6>${items[item].home_team_name}</br>${items[item].home_win}-${items[item].home_loss}</h6>
                    <hr>

                    <h6>${items[item].away_name_abbrev}: ${items[item].away_probable_pitcher.last}, ${items[item].away_probable_pitcher.first}
                    
                    ${items[item].away_probable_pitcher.s_wins}-${items[item].away_probable_pitcher.s_losses}, ${items[item].away_probable_pitcher.s_era} ERA
                    </h6>

                    <h6>${items[item].home_name_abbrev}: ${items[item].home_probable_pitcher.last}${items[item].home_probable_pitcher.first}
        
                    ${items[item].home_probable_pitcher.s_wins}-${items[item].home_probable_pitcher.s_losses}, ${items[item].home_probable_pitcher.s_era} ERA
                    </h6>

                    <p>At 
                    ${items[item].venue}
                    </p>
                    
                  </div>
                </div>
              </div>`
            }
        }
        cardDeck.innerHTML = cards;
        // console.log(cards)
    }

    makeRequest();
    
}


