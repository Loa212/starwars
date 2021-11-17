const getStartDate = () => {
    let date = document.getElementsByClassName('start-date')[0].value
    date = new Date(date)
    date = date.getTime()
    date && console.log(date)
    return date
}

const getEndDate = () => {
    let date = document.getElementsByClassName('end-date')[0].value
    date = new Date(date)
    date = date.getTime()
    date && console.log(date)
    return date

    date = date.split('-')
    date = `${date[1]}-${date[2]}-${date[0]}`
    date = new Date(date)
    date = date.getTime()
    console.log(date)
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
    time = time.substring(0, 5)

    date = `${day}-${month}-${year} ${time}`

    return date
}

const showCards = () => {
    var cards = document.getElementsByClassName('planet-card');
    for (i = 0; i < cards.length; i++) {
        cards[i].style.opacity = '1';
    }
}
const hideCards = () => {
    var cards = document.getElementsByClassName('planet-card');
    for (i = 0; i < cards.length; i++) {
        cards[i].style.opacity = '0';     
    }
}

const populateCards = (planets) => {
    deleteCards()
    let root = document.querySelectorAll(".planets-div")
    for (let i = 0; i < planets.length; i++) {
        root[0].innerHTML += "<div class=\"planet-card shadow\" style=\"opacity:0\"><h3 class=\"planet-name\"></h3><p class=\"planet-date\"></p> </div>"
    }

    hideCards()

    let p = document.querySelectorAll('.planet-card')

    for (let i = 0; i < planets.length; i++) {
        let nameDiv = p[i].querySelectorAll('.planet-name')
        nameDiv[0].innerHTML = planets[i].name

        let dateDiv = p[i].querySelectorAll('.planet-date')
        dateDiv[0].innerHTML = formatDate(planets[i].created)
    }
    showCards()
}

const deleteCards = () => {
    document.querySelectorAll('.planet-card').forEach(e => e.remove());
}

Array.prototype.intersection = function (arr) {
    return this.filter(function (e) {
        return arr.indexOf(e) > -1;
    });
};

const handleSearch = () => {
    console.log('search!')
    handleFilter()
}

const handleChange = () => {
    console.log('Change!')
    hideCards()
    setTimeout(() => {
        populateCards(planets.reverse())
    }, 300);
}

const handleFilter = () => {
    let start = getStartDate()
    let end = getEndDate()

    if (start && end) {
        console.log(planets)
        let newPlanets = planets.filter((el) => {
            return start <= new Date(el.created.split('T')[0]).getTime() <= end
        } )
        populateCards(newPlanets)
        planets = newPlanets
    } else if (start) {
        let newPlanets = planets.filter((el) => {
            return new Date(el.created.split('T')[0]).getTime() >= start
        } )
        populateCards(newPlanets)
        planets = newPlanets
    } else if(end){
        let newPlanets = planets.filter((el) => {
            return new Date(el.created.split('T')[0]).getTime() <= end
        } )
        populateCards(newPlanets)
        planets = newPlanets
    } else {
        alert('pick a start and/or an end date')
    }

}



//lift "state" to use in change function
var planets

$(document).ready(function () {

    fetchPlanets().then(data => {
        planets = data.results
        populateCards(planets.reverse())
    })

    $('.search-button').click(() => handleSearch())
    $('.change-button').click(() => handleChange())
    // $('.change-button').click(() => handleChange())

})
