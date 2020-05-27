console.log("Hello world!");

var postTest = document.getElementById("postTest");
var getTest = document.getElementById("getTest");
var viewTest = document.getElementById("viewTest");

postTest.addEventListener("submit", function(e) {
  e.preventDefault();
  if (postTest.title.value && postTest.author.value) {
    postData(
      {
        title: postTest.title.value,
        author: postTest.author.value
      },
      () => {
        postTest.title.value = "";
        postTest.author.value = "";
      }
    );
  }
});

getTest.addEventListener("click", function() {
  getData(function(data) {
    viewTest.innerText = JSON.stringify(data);
  });
});

function postData(data, cb) {
  fetch("/api/sample", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => {
    response
      .json()
      .then(function(data) {
        alert("Success!");
        cb(data);
      })
      .catch(() => {
        alert("Failure!");
      });
  });
}

function getData(cb) {
  fetch("/api/sample").then(function(response) {
    response
      .json()
      .then(function(data) {
        alert("Success!");
        cb(data);
      })
      .catch(() => {
        alert("Failure!");
      });
  });
}
