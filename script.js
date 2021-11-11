const getStartDate = () => {
    let date = document.getElementsByClassName('start-date')[0].value
    date = date.split('-')
    date = `${date[1]}-${date[2]}-${date[0]}`
    date = new Date(date)
    return date.getTime()
}

const getEndDate = () => {
    return document.getElementsByClassName('end-date')[0].valueAsNumber
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
    console.log('showcards')
    var cards = document.getElementsByClassName('planet-card');
    for (i = 0; i < cards.length; i++) {
        cards[i].style.opacity = '1';
    }
}
const hideCards = () => {
    console.log('hideCards')

    var cards = document.getElementsByClassName('planet-card');
    for (i = 0; i < cards.length; i++) {
        //cards[i].style.display = 'none'
        cards[i].style.opacity = '0';
        // if(i === cards.length -1) {
        //     for(i = 0; i < cards.length; i++) {
        //         cards[i].style.display = 'block'
        //     }
        // }
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

    if (getEndDate()) {
        console.log('end date -->', getEndDate())
    } else if (getStartDate) {

        console.log('start:', getStartDate())
        //const intersection = array1.filter(element => array2.includes(element));
        let createdArray = planets.map(a => a.created);

        for (let i = 0; i < createdArray.length; i++) {
            createdArray[i] = new Date(createdArray[i])
            createdArray[i] = createdArray[i].toLocaleDateString()
            createdArray[i] = new Date(createdArray[i])
            createdArray[i] = createdArray[i].getTime()

        }
        console.log(createdArray)

        let filterRes = createdArray.filter(a => a >= getStartDate())

        console.log(filterRes)

    } else {
        console.log('empty inputs')
    }


    // console.log('start date -->',getStartDate())
    // console.log('end date -->',getEndDate())
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
    // $('.change-button').click(() => handleChange())

})
