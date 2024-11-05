const ele = document.getElementsByClassName('fatch-data');

async function fetchData(url) {
  const response = await fetch(url);          // Waits for the response
  if (!response.ok) {                         // Checks for a successful response
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();         // Waits to parse the JSON
  return data;                                // Returns the data
}

// Usage example:
async function htmlOutpot() {
  const data = await fetchData('https://meritapi.decort.co/v1/ifu/brochure/en/type/aspir');
  let htmlOutpot = '';
  htmlOutpot += '<select id="mySelect" class="mySelect">';                        // Initialize as an empty string
  for (const key in data) {
    const element = data[key];
    htmlOutpot += `<option value="${element.LINK_CONTEXT + element.LINK}">${element.NAME}</option>`;
  }
  htmlOutpot += '</select>';
  return htmlOutpot;
}

(async function populateElements() {
  const output = await htmlOutpot();
  for (let i = 0; i < ele.length; i++) {
    ele[i].innerHTML = output;
  }

  // Add event listener to capture selected option's value
  const clsName = document.querySelectorAll('.mySelect');
  clsName.forEach(selec=>{
    console.log(selec);
  })
  console.log(clsName);
  const selectElement = document.getElementById('mySelect');
  console.log(selectElement);
  selectElement.addEventListener('change', function () {
    const selectedValue = selectElement.value;
    window.open(selectedValue, '_self')
    // console.log("Selected option value:", selectedValue);
    // You can use selectedValue for other operations as needed
  });
})();
