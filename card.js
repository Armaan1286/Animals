function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const searched = document.body.querySelector('#searchlink');
const textbox = document.body.querySelector('.animalname');
const searchbutton = document.body.querySelector('.searchbutton');
searched.addEventListener("click", () => {
  textbox.scrollIntoView({ behavior: 'smooth' });
  textbox.focus();
  navLinks.classList.toggle("active");

})

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
searchbutton.addEventListener("click", (event)=>{
  event.preventDefault();
  getData()
}
);
textbox.addEventListener("keydown",(event)=>{
  const key = event.key;
 if(key==="Enter"){
  getData();
textbox.blur()}
}
);


async function getRandData(id) {

  const image = document.querySelector('.image');
  const details = document.querySelector('.details');
  const name = document.querySelector('.name');
  const bg = document.querySelector('.blur_bg');

  const response = await fetch('animals_data.json');
  const data = await response.json();

  const animal = data.find(a => a.id === id);
  if (!animal) return;
  console.log(animal);
  image.src = animal.image_url;
  name.textContent = animal.name;
  bg.style.backgroundImage = `url(${animal.image_url})`;
  image.alt = animal.name;

  let detailHTML = '';
  if (animal.weight_kg?.male_min !== undefined) {
    detailHTML += `<b>Weight (Kg)</b><br>Female: ${animal.weight_kg.female_min}-${animal.weight_kg.female_max}<br>Male: ${animal.weight_kg.male_min}-${animal.weight_kg.male_max}<br>`;
  } else {
    detailHTML += `<b>Weight (Kg)</b>: ${animal.weight_kg.min}-${animal.weight_kg.max}<br>`;
  }

  detailHTML += `
    <b>Lifespan (Years):</b> ${animal.average_lifespan_years}<br>
    <b>Type:</b> ${animal.type}<br>
    <b>Habitat:</b> ${animal.habitat}<br>
    <b>Diet:</b> ${animal.diet}<br>
    <b>Facts:</b>
    <ul>
      <li>${animal.fun_facts[0]}</li>
      <li>${animal.fun_facts[1]}</li>
      <li>${animal.fun_facts[2]}</li>
      <li>${animal.interesting_fact}</li>
    </ul>
    <b>Predators:</b> ${animal.predators}
  `;

  details.innerHTML = detailHTML;
}


async function getData() {
  const searched_name = document.body.querySelector('.animalname').value
  const animalname = capitalizeWords(searched_name);
  const image = document.querySelector('.image');
  const details = document.querySelector('.details');
  const name = document.querySelector('.name');
  const bg = document.querySelector('.blur_bg');

  const response = await fetch('animals_data.json');
  const data = await response.json();

  const animal = data.find(a => a.name === animalname);
  if (!animal) return;

  image.src = animal.image_url;
  name.textContent = animal.name;
  bg.style.backgroundImage = `url(${animal.image_url})`;
  image.alt = animal.name;

  let detailHTML = '';
  if (animal.weight_kg?.male_min !== undefined) {
    detailHTML += `<b>Weight (Kg)</b><br>Female: ${animal.weight_kg.female_min}-${animal.weight_kg.female_max}<br>Male: ${animal.weight_kg.male_min}-${animal.weight_kg.male_max}<br>`;
  } else {
    detailHTML += `<b>Weight (Kg)</b>: ${animal.weight_kg.min}-${animal.weight_kg.max}<br>`;
  }

  detailHTML += `
    <b>Lifespan (Years):</b> ${animal.average_lifespan_years}<br>
    <b>Type:</b> ${animal.type}<br>
    <b>Habitat:</b> ${animal.habitat}<br>
    <b>Diet:</b> ${animal.diet}<br>
    <b>Facts:</b>
    <ul>
      <li>${animal.fun_facts[0]}</li>
      <li>${animal.fun_facts[1]}</li>
      <li>${animal.fun_facts[2]}</li>
      <li>${animal.interesting_fact}</li>
    </ul>
    <b>Predators:</b> ${animal.predators}
  `;

  details.innerHTML = detailHTML;
}
window.addEventListener("DOMContentLoaded", () => {
  const randomAnimal = Math.floor(Math.random() * 70 +1);
  getRandData(randomAnimal); 
});

