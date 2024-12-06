
fetch('/birdStrike')
    .then((response) => response.json())
    .then((data) => console.log('Bird Sightings:', data))
    .catch((error) => console.error('Error fetching bird sightings:', error));


