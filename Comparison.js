let user1image = document.querySelector(".user1__image");
let user2image = document.querySelector(".user2__image");
let user1search = document.querySelector("#user1__search");
let user2search = document.querySelector("#user2__search");
let user1repo = document.querySelector(".user1__repo");
let user1follw = document.querySelector(".user1__follw");
let user2repo = document.querySelector(".user2__repo");
let user2follw = document.querySelector(".user2__follw");
let cardUser1 = document.querySelector(".card_user1");
let cardUser2 = document.querySelector(".card_user2");
let btnCompare = document.querySelector(".btn__Compare");
let tie = document.querySelector(".tie");

let headerSearch = document.querySelectorAll(".header__search");

let searchIcon = document.querySelector(".search__icon");
let userName = document.querySelector(".user_name");
let cards = document.querySelector(".cards");
let cardWrapper = document.querySelector(".card__wrapper");
let result1 = document.querySelector(".result1");
let result2 = document.querySelector(".result2");

searchIcon.addEventListener("click", () => {
  result1.innerHTML = "";
  result2.innerHTML = "";
  tie.innerHTML = "";
  if ((user1search.value, user2search.value)) {
    Comparison();
  }
});

btnCompare.addEventListener("click", () => {
  result1.innerHTML = "";
  result2.innerHTML = "";
  tie.innerHTML = "";

  if ((user1search.value, user2search.value)) {
    Comparison();
  }
});

function Comparison() {
  fetch(`https://api.github.com/users/${user1search.value}`)
    .then((Response) => {
      return Response.json();
    })

    .then((data1) => {
      user1image.src = `${data1.avatar_url}`;
      user1repo.innerHTML = `number of repositories ${data1.public_repos}`;
      user1follw.innerHTML = `${data1.followers} followers`;

      fetch(`https://api.github.com/users/${user2search.value}`)
        .then((Response) => {
          return Response.json();
        })

        .then((data2) => {
          user2image.src = `${data2.avatar_url}`;
          user2repo.innerHTML = `number of repositories ${data2.public_repos}`;
          user2follw.innerHTML = `${data2.followers} followers`;

          // comparison part
          if (data1.public_repos > data2.public_repos) {
            let span1 = document.createElement("p");
            span1.innerHTML = ` <span class="emoji wave" role="img" aria-label="hand wave">THE WINNER</span>`;
            result1.append(span1);
          } else if (data1.public_repos == data2.public_repos) {
            if (data1.followers > data2.followers) {
              let span1 = document.createElement("p");
              span1.innerHTML = ` <span class="emoji wave" role="img" aria-label="hand wave">THE WINNER</span>`;
              result1.append(span1);
            } else if (data1.followers < data2.followers) {
              let span2 = document.createElement("p");
              span2.innerHTML = ` <span class="emoji wave" role="img" aria-label="hand wave">THE WINNER</span>`;
              result2.append(span2);
            } else if (data1.followers == data2.followers) {
              tie.innerHTML = `<span class="emoji wave" role="img" aria-label="hand wave">it's a tie!</span>`;
            }
          } else if (data1.public_repos < data2.public_repos) {
            let span2 = document.createElement("p");
            span2.innerHTML = ` <span class="emoji wave" role="img" aria-label="hand wave">THE WINNER</span>`;
            result2.append(span2);
          }
        });
    });
}

let menuIcon = document.querySelector(".menu__icon");
let subMenu = document.getElementById("subMenu");

menuIcon.addEventListener("click", () => {
  subMenu.classList.toggle("open-menu");
});

