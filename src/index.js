const characterBar = document.getElementById("character-bar");

fetch("http://localhost:3000/characters")
  .then(response => response.json())
  .then(characters => {
    characters.forEach(character => {
      const characterName = document.createElement("span");
      characterName.textContent = character.name;
      characterName.addEventListener("click", () => {
        showDetailedInfo(character);
      });
      characterBar.appendChild(characterName);
    });
  });

const detailedInfo = document.getElementById("detailed-info");

function showDetailedInfo(character) {
  detailedInfo.innerHTML = `
    <img src="${character.image}">
    <h2>${character.name}</h2>
    <h4>Total Votes: <span id="vote-count">${character.votes}</span></h4>
  `;

  const votesForm = document.getElementById("votes-form");
  votesForm.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(votesForm);
    const votes = parseInt(formData.get("votes"), 10);
    character.votes += votes;
    document.getElementById("vote-count").textContent = character.votes;
    votesForm.reset()
  });
}

const resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", () => {
  const voteCount = document.getElementById("vote-count");
  voteCount.textContent = 0;
});

