const input = document.getElementById("input");
const answer = document.getElementById("answer");
const button = document.getElementById("button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const errortwo = document.getElementById("errortwo");
const resultlist = document.getElementById("resultlist");
const checkbox = document.getElementById("checkbox");

function calculatefib(value) {
  let resultA = 0;
  let resultB = 1;
  let resultC;
  if (value === 0) {
    return resultA;
  }
  if (value === 1) {
    return resultB;
  }
  for (i = 2; i <= value; i++) {
    resultC = resultA + resultB;
    resultA = resultB;
    resultB = resultC;
  }
  return resultC;
}

const fetchFibo = async (num) => {
  const URL = `http://localhost:5050/fibonacci/${num}`;
  try {
    const response = await fetch(URL);
    console.log(response);
    if(response.status === 400){
      const data = await response.text();
      return data;
    } else{
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (fail) {
    // errortwo.innerHTML = fail.response;
    return fail;
  }
};

async function action() {
  loading.classList.remove("d-none");
  const X = input.value;
  if (X > 50) {
    answer.innerHTML = "";
    error.classList.remove("d-none");
    input.classList.add("border-danger");
    input.classList.add("text-danger");
    loading.classList.add("d-none");
  } else {
    input.classList.remove("border-danger");
    input.classList.remove("text-danger");
    error.classList.add("d-none");
    // answer.classList.add("d-none");
    let data = {};
    if(checkbox.checked){
        data = await fetchFibo(X);
    }else{
        const result = calculatefib(X);
        data = {result};
    }
    if(data.result){
        answer.innerHTML = data.result;
        answer.classList.remove("text-danger");
    } else{
        answer.innerHTML = data;
        answer.classList.add("text-danger");
    }
    loading.classList.add("d-none");
    answer.classList.remove("d-none");
  } if(X < 1){
      answer.innerHTML = "";
  }
  const resultlist = document.getElementById("resultlist");
  resultlist.innerHTML = ""
  const numberlist = await getresults();
  showresults(numberlist);    

}
button.addEventListener("click", action);

async function getresults(){
    const URL = "http://localhost:5050/getFibonacciResults";
    const response = await fetch(URL);
    try {
      const data = await response.json();
      return data.results;
    } catch (fail) {
      // errortwo.innerHTML = fail.response;
      return fail;
    }
}

function showresults(numberlist){
  let newlist = numberlist;
    const orderlist = newlist.sort((a,b)=> b.createdDate-a.createdDate)
    for(let i = 0; i < 5 && i < newlist.length; i++){
        const day = new Date(newlist[i].createdDate)
        const li = document.createElement("li");
        li.innerHTML = `The fibonacci of <strong>${newlist[i].number}</strong> is <strong>${newlist[i].result}</strong>. Calculated at ${day}`;
        resultlist.appendChild(li);
    }
}
window.onload = async function (){
const numberlist = await getresults();
showresults(numberlist);
}