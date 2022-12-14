// Fetching courses Data
let courses;
fetch("./Courses Data/python_data.json")
  .then((response) => response.json())
  .then((data) => {
    courses = data.courses;
    getCourses(courses);
  })
  .catch((err) => {
    console.log(err);
  });

// Displaying Courses
function getCourses(courses) {
  // building courses content
  for (let i = 0; i < courses.length; i++) {
    let cards_section = document.querySelector(".courses-cards");

    // list item
    let new_list = document.createElement("li");
    new_list.classList.add("card");
    cards_section.appendChild(new_list);

    // div + image
    let new_div = document.createElement("div");
    new_div.classList.add("course-item");
    new_list.appendChild(new_div);
    let new_img = document.createElement("img");
    new_img.src = courses[i].image;
    new_img.classList.add("card-img");
    new_div.appendChild(new_img);

    // name
    let new_h4 = document.createElement("h4");
    new_h4.classList.add("course-item");
    new_h4.classList.add("course-name");
    new_list.appendChild(new_h4);
    new_h4.innerHTML = "<b>" + courses[i].title + "</b>";

    // author
    let new_p = document.createElement("p");
    new_p.classList.add("course-item");
    new_p.classList.add("course-author");
    new_list.appendChild(new_p);
    new_p.innerHTML = courses[i].instructors[0].name;
    if (courses[i].instructors.length > 1) {
      new_p.innerHTML += ", " + courses[i].instructors[1].name;
    }

    // rating + enrollment
    let new_span = document.createElement("span");
    new_span.classList.add("course-item");
    new_span.classList.add("course-rating");
    new_list.appendChild(new_span);
    let rating = document.createElement("span");
    rating.classList.add("course-rating-number");
    new_span.appendChild(rating);
    let rate = courses[i].rating.toFixed(1);
    rating.innerHTML = rate;
    for (let i = 0; i < 5; i++) {
      let stars = document.createElement("span");
      new_span.appendChild(stars);
      stars.classList.add("star");
      stars.classList.add("fa");
      if (rate >= 1) {
        rate -= 1;
        stars.classList.add("fa-star");
        stars.classList.add("checked");
      } else {
        rate -= 0.5;
        stars.classList.add("fa-star-half-full");
      }
    }
    let enrollment = document.createElement("span");
    enrollment.classList.add("course-enrollment");
    new_span.appendChild(enrollment);
    enrollment.innerHTML = " (" + courses[i].enrollment + ")";

    // price
    new_span = document.createElement("span");
    new_span.classList.add("course-item");
    new_span.classList.add("course-price");
    new_list.appendChild(new_span);
    let price = document.createElement("span");
    price.classList.add("original-price");
    new_span.appendChild(price);
    price.innerHTML = "E??" + courses[i].price + " ";
    let oldPrice = document.createElement("span");
    oldPrice.classList.add("old-price");
    new_span.appendChild(oldPrice);
    oldPrice.innerHTML = "E??" + courses[i].old_price;
  }
}

// Search bar functionality
document.querySelector(".search-input").addEventListener("input", () => {
  let text = document.querySelector(".search-input").value.toLowerCase();
  let newCourses = [];
  for (let i = 0; i < courses.length; i++) {
    let title = courses[i].title.toLowerCase();
    if (title.includes(text)) {
      newCourses.push(courses[i]);
    }
  }
  const cards = document.querySelectorAll(".card");
  cards.forEach((element) => {
    element.remove();
  });
  getCourses(newCourses);
});
