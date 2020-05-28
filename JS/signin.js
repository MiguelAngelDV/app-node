window.onload = init;
function init() {
  if (localStorage.getItem("token")) {
    document.querySelector(".btn-secondary").addEventListener("click", () => {
      window.location.href = "login.html";
    });
    document.querySelector(".btn-primary").addEventListener("click", signin);
  } else {
    window.location.href = "pokedex.html";
  }
}

function signin() {
  var mail = document.querySelector("#input-mail").value;
  var pass = document.querySelector("#input-password").value;
  var name = document.querySelector("#input-name").value;

  axios({
    method: "post",
    url: "http://localhost:3000/user/signin",
    data: {
      user_mail: mail,
      user_password: pass,
      user_name: name,
    },
  })
    .then((res) => {
      console.log(res);
      window.location.href = "login.html";
      alert("Registro exitoso");
    })
    .catch((err) => {
      console.log(err);
    });
}
