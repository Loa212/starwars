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

const handleSearch = () => {
    console.log('search!')

    getStartDate()
}

const handleChange = () => {
    console.log('Change!')
}

$(document).ready(function () {
    console.log('ready')
    fetchPlanets().then(data => {

        let planets = data.results 

        console.log(planets.length)

        for (let i = 0; i < planets.length; i++) {
            $(`#${i+1}`).find("h3").html(planets[i].name)
            $(`#${i+1}`).find("p").html( formatDate(planets[i].created) )
            
        }
    })

    $('.search-button').click(() => handleSearch())
    $('.change-button').click(() => handleChange())

})
