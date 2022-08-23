const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

async function getMovies(url){
    const res = await fetch(url);
    const resData = await res.json();
    showMovies(resData.results)
}

function getClassByVote(vote){
    if(vote >= 8) return "green";
    else if(vote >= 4) return "orange";
    return "red";
}

async function showMovies(moviesData){
    moviesData.forEach((movieData)=>{
        const {poster_path, title, vote_average, overview} = movieData;
        const movie = document.createElement('div')
        movie.classList.add('movie');

        movie.innerHTML = `
            <img src=${IMGPATH+poster_path} alt="movie-image" onerror="javascript: console.log('failure')">
            <div class="movie-info">
                <h4>${title}</h4>
                <span class=${getClassByVote(vote_average)}>${vote_average}</span>

            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `
        main.appendChild(movie)
    })
    
}

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(APIURL);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    main.innerHTML = ''
    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCHAPI+searchTerm)
        search.value = '';
    }
})