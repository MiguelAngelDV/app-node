window.onload = init;

function init() {
  if (localStorage.getItem("token")) {
    document.querySelector(".btn-secondary").addEventListener("click", () => {
      window.location.href = "signin.html";
    });
    document.querySelector(".btn-primary").addEventListener("click", login);
  } else {
    window.location.href = "pokedex.html";
  }
}

function login() {
  var mail = document.querySelector("#input-mail").value;
  var pass = document.querySelector("#input-password").value;

  axios({
    method: "post",
    url: "http://localhost:3000/user/login",
    data: {
      user_mail: mail,
      user_password: pass,
    },
  })
    .then((res) => {
      console.log(res.data);
      if (res.data.code === 200) {
        // alert("Datos correctos");
        localStorage.setItem("token", res.data.message);
        window.location.href = "pokedex.html";
      } else {
        alert("Usuario y / o contraseña incorrectos");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
