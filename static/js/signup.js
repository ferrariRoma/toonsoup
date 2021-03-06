const signup__id = document.getElementById("signup__id");
const signup__pw = document.getElementById("signup__pw");
const signup__confirm__pw = document.getElementById("signup__confirm__pw");
const signup__name = document.getElementById("signup__name");

const sign__up__btn = document.querySelector(".sign__up__btn");

async function postSignUp(e) {
  e.preventDefault();
  const signup__id__text = signup__id.value;
  const signup__pw__text = signup__pw.value;
  const signup__confirm__pw__text = signup__confirm__pw.value;
  const signup__name__text = signup__name.value;

  const data = {
    giving__id: signup__id__text,
    giving__pw: signup__pw__text,
    giving__confirm__pw: signup__confirm__pw__text,
    giving__name: signup__name__text,
  };
  try {
    const response = await fetch("/signup/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsoned = await response.json();
    if (!jsoned["successMsg"]) {
      alert(jsoned["msg"]);
    } else {
      alert(jsoned["successMsg"]);
      window.location.href = '/login';
    }
  } catch (err) {
    console.log(err);
  }
}

sign__up__btn.addEventListener("click", postSignUp);
