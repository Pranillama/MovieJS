//API: It is like a middle man between a (user/app) and system(data/server). when the users wants something it provides it fetching from the database without user worring about how it is done.

//FUNCTIONS THAT SPECIFY LINK OF WHERE WE CAN ACCESS THE API
const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6ae7f1921f3b8cedd5051e11f812a3b2&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
//FUNCTION THAT SPECIFY HOW WE ARE GOING TO SEARCH THE API AND GET RESPONSE. WE ARE ALSO GOING TO ADD QUERY SO THAT USER CAN SERACH FOR A MOVIE AND THAT IS PUT HERE IN THIS QUERY.
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=6ae7f1921f3b8cedd5051e11f812a3b2&query=";

// getting the value/data from the user. form, query is the data that serrches. and section is the showing part(photo,name) of the search.
const main = document.getElementById("section"); // section
const form = document.getElementById("form");
const search = document.getElementById("query");

// make a function then we fetch from that function as we can use it to modify later.
returnMovies(APILINK);
function returnMovies(url) {
  fetch(url)
    // res=response that we get from the database and we take that in a.jason file as thats what JS takes.
    .then((res) => res.json())
    // then we create another function called data to manupilate later.
    .then(function (data) {
      console.log(data.results); // print the data in the consol so that we can debug later
      const div_row = document.createElement("div");
      div_row.setAttribute("class", "row");
      data.results.forEach((element) => {
        // here we do HTML in JS to manipulate it.
        // for the each data we fetch from the API we make a div for each shown. this is where we do the HTML part iN JS so that it does the thing on its own for the large set of data and we just manipulate it.
        const div_card = document.createElement("div");
        div_card.setAttribute("class", "card"); // here set attributes just like we have attributes in html but for JavaScript as we use these attributes for styling in css.
        //const div_row = document.createElement("div");
        //div_row.setAttribute("class", "row");
        const div_column = document.createElement("div");
        div_column.setAttribute("class", "column");

        //we also make all the attributes inside the div in JS
        const center = document.createElement("center");

        const image = document.createElement("img");
        image.setAttribute("class", "thumbnail"); //image we set 2 attributes. class,id
        image.setAttribute("id", "image");

        const title = document.createElement("h3");
        title.setAttribute("id", "title");

        //innerHTML basically means we replace the tilte with the movie name form the API we get for each.
        title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`; //what ever movie name we get from the API we put it in the tile and inside the element. (``) is a backtick,which inserts a variable using ${}.      //here for the image we sont change the value but the (src).
        image.src = IMG_PATH + element.poster_path; // we have the img_path + element.poster path where we plus the poster path which is the link to the image that we attach with the element. for eg, lets say the link to the image is lado50 then "https://image.tmdb.org/t/p/w1280lado50"attach it at the end.

        //now we put everything undereach other folowing the pattern.
        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        main.appendChild(div_row); // everything under the section. main=section we created above
      });
    })
    //for any error while fetching the movie.
    .catch((error) => {
      console.error("error fetching movies:", error);
    });
}
//now creat an "event listner". this is for the form. when the user adds the valu in the form it returns the desired value.
form.addEventListener("submit", (e) => {
  //element.addEventListener(even, function,useCapture). even can be any like submit,click,button
  e.preventDefault();
  main.innerHTML = " "; //this will make referesh and renews the section part each time there is new value in the form.

  const searchItem = search.value; //then this is where we give the search value from the above that we puled from the html.

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    search.value = " "; // after the search to remove the searched value form the form/searchvalue.
  }
});
