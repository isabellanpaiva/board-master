const initialCoords = { lat: 40.4460495560349, lng: -3.6759638264748986 }
let eventMap



function init() {
    renderMap()
    getPlacesData()
}


function renderMap() {

    eventMap = new google.maps.Map(
        document.querySelector('#myMap'),
        { zoom: 15, center: initialCoords, }
    )
}

function getPlacesData() {
    axios
        .get('/api/events')
        .then(response => {
            printMarkers(response.data)
        })
        .catch(err => console.log(err))
}

function printMarkers(events) {

    events.forEach(elm => {

        const position = {
            lat: elm.location.coordinates[1],
            lng: elm.location.coordinates[0]
        }

        new google.maps.Marker({
            position,
            map: eventMap,
            title: elm.title
        })
    })
}