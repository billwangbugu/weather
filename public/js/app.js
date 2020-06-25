console.log("client side js");

fetch("http://localhost:3000/weather").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      document.getElementById(
        "weather"
      ).innerHTML = `${data.location}:  ${data.forcast}`;
    }
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = `${data.location}:`;
        messageTwo.textContent = data.forcast;
      }
    });
  });
});
