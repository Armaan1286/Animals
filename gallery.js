const container = document.querySelector('.container');
async function getImageData(id) {
  const response = await fetch('animals_data.json');
  const data = await response.json();
  const animal = data.find(a => a.id === id);
  if (!animal) return;
  console.log(animal);
  let image = document.createElement('img');
  image.classList.add('image');
  image.src = animal.image_url;
  image.alt = animal.name;
  image.addEventListener("click", () => { toAnimalCard(animal.id) });
  let box = document.createElement('div');
  box.classList.add('box');
  box.textContent = animal.name;
  box.append(image);

  container.append(box)
}
function toAnimalCard(animalId) {
  console.log("clicked");
  window.location.href = `index.html?animalId=${encodeURIComponent(animalId)}`;

}
// getImageData(43)
function getImage() {
  for (let i = 1; i <= 70; i++) {
    getImageData(i);
  }
}
getImage();