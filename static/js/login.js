const login__id = document.querySelector("#login__id");
const login__pw = document.querySelector("#login__pw");
const login__btn = document.querySelector(".login__btn");

async function postLogin(e) {
  e.preventDefault();
  const login__id__text = login__id.value;
  const login__pw__text = login__pw.value;

  const data = {
    giving__id: login__id__text,
    giving__pw: login__pw__text,
  };
  try {
    const res = await fetch("/login/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsoned = await res.json();
    alert(jsoned["msg"]);
  } catch (err) {
    console.log(err);
  }
}

login__btn.addEventListener("click", postLogin);
