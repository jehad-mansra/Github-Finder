// Selecting elements
let profileImage = document.querySelectorAll(".profile__image");
let headerSearch = document.querySelector(".header__search");
let searchEle = document.querySelector(".search_ele");
let searchIcon = document.querySelectorAll(".search__icon");
let userName = document.querySelector(".user_name");
let allRepos = document.querySelector(".all-repos");
let follower = document.querySelector(".follower");
let CounterRepos = document.querySelector(".Counter");

// Setting up media query
let mediaQuery = window.matchMedia("(max-width: 992px)");

// Adding click event listeners to search icons
searchIcon.forEach((e) => {
  e.addEventListener("click", () => {
    finder();
  });
});

//Trigger Button Click on Enter
headerSearch.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    finder();
  }
});

// Function to fetch and display user data
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
      // Update user name and profile image
      userName.innerHTML = `<p>${data1.login}</p>`;
      profileImage.forEach((e) => {
        e.src = `${data1.avatar_url}`;
      });

      // Update follower count
      follower.innerHTML = `<i class="fa-solid fa-user-group"></i>
        <p class="num_follower">${data1.followers} followers</p>
        <p class = "num_following">${data1.following} following</p>`;

      // Update repository count
      CounterRepos.innerHTML = `${data1.public_repos}`;

      // Fetch and display user repositories
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

            // Create elements for each repository
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
            lungRepo.className = "lung_circle";

            // Set the color of the circle based on the repository language
            if (data[i].language == "HTML") {
              lungRepo.innerHTML = `<i class="fa-solid fa-circle" style = "color: #E34C26;"></i> ${data[i].language}`;
            } else if (data[i].language == "JavaScript") {
              lungRepo.innerHTML = `<i class="fa-solid fa-circle" style = "color: #F1E05A;"></i> ${data[i].language}`;
            } else {
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

// Function to handle the media query change
function handleMediaQuery(event) {
  if (event.matches) {
    // Append the element to the new position
    let searchResponsive = document.querySelector(".search__responsive");

    searchResponsive.append(searchEle);
  } else {
    // Append the element back to its original position
    let originalSearch = document.querySelector(".original_search");
    originalSearch.appendChild(searchEle);
  }
}

// Attach the listener to the media query
mediaQuery.addEventListener("change", handleMediaQuery);

// Trigger the initial check
handleMediaQuery(mediaQuery);
