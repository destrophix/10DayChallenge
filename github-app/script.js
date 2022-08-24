const API_URL = "https://api.github.com/users/"

async function getUser(user){
    const res = await fetch(API_URL+user);
    const resData = await res.json();
    addUser(resData);
    console.log(resData)
    getRepos(user);
}

async function getRepos(user){
    const res = await fetch(API_URL+user+"/repos");
    const resData = await res.json();
    addRepos(resData);
}

function addUser(user){
    const {login, avatar_url, bio, followers, following, public_repos} = user;
    main.innerHTML = `
    <div class="user">
        <div class="img-container">
            <img src="${avatar_url}" alt="profile-image">
        </div>
        <div class="user-info">
            <h3>${login}</h3>
            <p class="bio">${bio===null ? "":bio}</p>
            <ul >
                <li>${followers}<strong>Followers</strong></li>
                <li>${following}<strong>following</strong></li>
                <li>${public_repos}<strong>public_repos</strong></li>
            </ul>
            <div id="repos">
            <h4>Repos :</h4>
            </div>
        </div>
    </div>
    `
}

function addRepos(repos){
    const reposEl = document.getElementById("repos");

    repos.sort((a,b)=> b.stargazers_count - a.stargazers_count).slice(0,10).forEach((repo)=>{
        const repoEl =  document.createElement('a');
        repoEl.classList.add("repo")

        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    })
}

const main = document.getElementById('main')
const form = document.querySelector('form')
const inputEl = document.getElementById('search')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getUser(inputEl.value)
    inputEl.value = ''
})

getUser("amit-r-bhagat")