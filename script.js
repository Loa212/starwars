


const fetchPlanets = async () => {
    // https://swapi.dev/api/planets/?format=json
    const response = await fetch('https://swapi.dev/api/planets/?format=json');
    const planets = await response.json()
    return planets
}



window.onload= () => {
    console.log('document ready - go!')

   fetchPlanets().then(planets => {
       console.log(planets.results[1].name)
   })

}


