const APILINK = "http://localhost:8000/api/v1/reviews";
const url = new URL(location.href); // we make an url object to access different parts of the url
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;

//making a card to take a new review ( we could do this in HTML too)

const div_new = document.createElement("div");
div_new.innerHTML = `
        <div class = "row">
        <div class ="column">
        <div class ="card">
        New Review
        <p><strong>Review: </strong>
        <input type ="text" id="new_review" value="">
        </p>
        <p><strong>User: </strong>
        <input type ="text" id="new_user" value="">
        </p>
        <a href = "#" onclick = "saveReview('new_review', 'new_user')">💾</a>
        </p>
        </div>
        </div>
        </div>
`;
main.appendChild(div_new);

returnReviews(APILINK);
function returnReviews(url) {
  fetch(url + "movie/" + movieId)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);
      data.forEach((review) => {
        //another way to to the same HTML in JS different than the frontend method we used.
        const div_card = document.createElement("div");
        div_card.innerHTML = `
        <div class = "row">
        <div class ="column">
        <div class ="card" id="${review._id}">
        <p><strong>Review: </strong>${review.review}</p>
        <p><strong>User: </strong>${review.user}</p>
        <p><a href = "#" onclick = "editReview('${review._id}','${review.review}','${review.user}')">✏️</a>
        <a href = "#" onclick = "deleteReview('${review._id}')">🗑️</a></p>
        </div>
        </div>
        </div>
        `;

        main.appendChild(div_card);
      });
    });
}
// we are going to use this to replace the above.
function editReview(id, review, user) {
  const element = document.getElementById(id);
  const reviewInputId = "review" + id; //creating an Id that we can upadte for each.
  const userInputId = "user" + id;

  element.innerHTML = `
  <p><strong>Review: </strong>
  <input type ="text" id="${reviewInputId}" value="${review}">
  </p>

  <p><strong>User: </strong>
  <input type = "text" id ="${userInputId}" calue"${user}">
  </p> 

  <p><a href ="#" onclick="saveReview('${reviewInputId}','${userInputId}','${id}',)">💾</a>
  </p>
  `;
}

function saveReview(reviewInputId, userInputId, id = "") {
  //id="": default value. no need to set value
  const review = document.getElementById(reviewInputId).value; //this passes what value in it too
  const user = document.getElementById(userInputId).value;
  if (id) {
    fetch(APILINK + id, {
      //same like in curl
      method: "PUT",
      header: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      Body: JSON.stringify({ user: user, review: review }), //stringify converts from objects to string.
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload(); //JS comand to reload the url. reload the website with the new data thats been edited.
      });
  } else {
    fetch(APILINK + "new", {
      //same like in curl
      method: "POST",
      header: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      Body: JSON.stringify({ user: user, review: review, movieId: movieId }), //stringify converts from objects to string.
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload(); //JS comand to reload the url. reload the website with the new data thats been edited.
      });
  }
}

function deleteReview(id) {
  fetch(APILINK + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      location.reload();
    });
}
