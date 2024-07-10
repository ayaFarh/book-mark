/ html element /;
let nameInput = document.getElementById("name");
let siteUrl = document.getElementById("site-url");
let submiteBtn = document.getElementById("submiteBtn");
let tableTr = document.getElementById("tbody");
let alert = document.getElementById("alert-a");
let closeBtn = document.getElementById("fa-xmark");
let alertsection = document.getElementById("alert-section") ;
// app variables
let tableList = JSON.parse(localStorage.getItem("tableTr") || "[]");

let nameRegex = /[a-z]{3,}/;
let urlRegex = /(https?:\/\/)?(www\.)?[a-z]{3,}\.(com|net)/;


display();

//functions
function add() {
  if (validation(nameRegex,nameInput) && validation(urlRegex,siteUrl)) {
    let addSite = {
      name: nameInput.value,
      indexNum: tableList.length,
      url: "//" + siteUrl.value,
    };
    tableList.push(addSite);
    clear();
    display();
    localStorage.setItem("tableTr", JSON.stringify(tableList));
    console.log(tableList);
  } else {
    alert.style.display = "block";
    alertsection.classList.add("overlay");
   
  }
}

function clear() {
  nameInput.value = null;
  siteUrl.value = null;
}

function display() {
  let tr = "";
  for (let i = 0; i < tableList.length; i++) {
    tr += `<tr>
        <td>${tableList[i].indexNum}</td>
        <td>${tableList[i].name}</td>
        <td>
        <a href="${tableList[i].url}" class="visite" id="visite" target="_blank">
        <i class="fa-regular fa-eye"></i>Visite
    </a>
        </td>
        <td>
          <a class="delete" id="delete" href="" onclick="deletesite(${i})"
            ><i class="fa-solid fa-trash-can"></i>Delete</a
          >
        </td>
      </tr>`;
  }
  tableTr.innerHTML = tr;
}

closeBtn.addEventListener("click", () => {
  alert.style.display = "none";
  alertsection.classList.remove("overlay");

});
// delete
function deletesite(i) {
  tableList.splice(i, 1);
  localStorage.setItem("tableTr",JSON.stringify(tableList));
  display();
}

//validation
function validation(regex,element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
