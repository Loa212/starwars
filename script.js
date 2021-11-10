const getStartDate = () => {
    let date = $('.start-date').val()
    return date
}

const getEndDate = () => {
    let date = $('.end-date').val()
    return date
}


const fetchPlanets = async () => {
    // https://swapi.dev/api/planets/?format=json
    const response = await fetch('https://swapi.dev/api/planets/?format=json');
    const planets = await response.json()
    return planets
}

const formatDate = (inputDate) => {

    //"2014-12-10T11:39:13.934000Z", 
    //yyyy-mm-dd

    let array = inputDate.split("T")
    let date = array[0]
    let dateArray = date.split("-")
    let year = dateArray[0]
    let month = dateArray[1]
    let day = dateArray[2]

    
    let time = array[1]
    time = time.substring(0,5)
    
    date = `${day}-${month}-${year} ${time}` 

    return date
}

const showCards = () => {
    console.log('showcards')
    var cards = document.getElementsByClassName('planet-card');
    for(i = 0; i < cards.length; i++) {
        cards[i].style.opacity = '1';
    }
}
const hideCards = () => {
    console.log('hideCards')
    
    var cards = document.getElementsByClassName('planet-card');
    for(i = 0; i < cards.length; i++) {
        cards[i].style.opacity = '0';
    }
      
}

const populateCards = (planets) => {
    //hideCards()

    let p = document.querySelectorAll('.planet-card')

    for (let i = 0; i < planets.length; i++) {
        let nameDiv = p[i].querySelectorAll('.planet-name') 
        nameDiv[0].innerHTML = planets[i].name

        let dateDiv = p[i].querySelectorAll('.planet-date') 
        dateDiv[0].innerHTML = formatDate(planets[i].created)
        if (i == planets.length - 1) {
            showCards()
        }
    }
}

const handleSearch = () => {
    console.log('search!')

    getStartDate()
}

const handleChange = () => {
    console.log('Change!')
    hideCards()
    setTimeout(() => {
        populateCards(planets.reverse())
    }, 500);
}

//lift "state" to use in change function
var planets

$(document).ready(function () {

    fetchPlanets().then(data => {

        planets = data.results 

        console.log(planets.length)

        populateCards(planets.reverse())
    })

    $('.search-button').click(() => handleSearch())
    $('.change-button').click(() => handleChange())

})
