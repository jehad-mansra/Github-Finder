let profileImage = document.querySelectorAll(".profile__image");
let headerSearch = document.querySelector(".header__search");
let searchIcon = document.querySelector(".search__icon");
let userName = document.querySelector(".user_name");
let allRepos = document.querySelector(".all-repos");
let follower = document.querySelector(".follower");
let CounterRepos = document.querySelector(".Counter")


searchIcon.addEventListener("click", () => {
  finder()
    
});

headerSearch.addEventListener("keypress" , (e)=>{
  if (e.key === 'Enter' ){
  finder();
  }
})


function finder() {
  fetch(`https://api.github.com/users/${headerSearch.value}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("User not found.");
      }
    })
    .then((data1) => {
      console.log(data1);
      userName.innerHTML = `<p>${data1.login}</p>`;
      profileImage.forEach((e) => {
        e.src = `${data1.avatar_url}`;
      });

      follower.innerHTML = `<i class="fa-solid fa-user-group"></i>
        <p class="num_follower">${data1.followers} followers</p>
        <p class = "num_following">${data1.following} following</p>`;


        CounterRepos.innerHTML = `${data1.public_repos}`
        

      fetch(data1.repos_url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch repositories.");
          }
        })
        .then((data) => {
          console.log(data);
          allRepos.innerHTML = "";
          let counter = 1;
          for (let i = 0; i < data.length; i++) {
            if (counter > 6) {
              break;
            }
            let cardRepositories = document.createElement("div");
            cardRepositories.className = "card__Repositories";
            let titleRepo = document.createElement("div");
            titleRepo.className = "title__repo";
            let nameRepo = document.createElement("p");
            nameRepo.textContent = `${data[i].name}`;
            let statusRepo = document.createElement("button");
            statusRepo.className = "repo_button";
            statusRepo.textContent = `${data[i].visibility}`;
            titleRepo.append(nameRepo, statusRepo);
            let lungRepo = document.createElement("div");
            lungRepo.className= "lung_circle"
            if(data[i].language == "HTML"){
            lungRepo.innerHTML = `<i class="fa-solid fa-circle" style = "color: #E34C26;"></i> ${data[i].language}`;
          }else if (data[i].language == "JavaScript") {
            lungRepo.innerHTML = `<i class="fa-solid fa-circle" style = "color: #F1E05A;"></i> ${data[i].language}`;
          }else{
            lungRepo.innerHTML = `<i class="fa-solid fa-circle" style = "color: #563d7c;"></i> ${data[i].language}`;
          }
            cardRepositories.append(titleRepo, lungRepo);

            allRepos.append(cardRepositories);
            counter++;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });



  
}

