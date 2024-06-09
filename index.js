const goalForm = document.getElementById('goalForm');
const goalList = document.getElementById('goalList');

const botButton = document.getElementById('botButton');
const botContainer = document.createElement('div');
botContainer.classList.add('bot-container');
document.body.appendChild(botContainer);

botButton.addEventListener('click', () => {
  botContainer.classList.toggle('open');
});

goalForm.addEventListener('submit', addGoal);

function addGoal(event) {
    event.preventDefault();

    const goalName = document.getElementById('goalName').value;
    const goalCategory = document.getElementById('goalCategory').value;
    const goalDescription = document.getElementById('goalDescription').value;

    const goalItem = document.createElement('li');
    goalItem.innerHTML = `
        <h3>${goalName}</h3>
        <p>Category: ${goalCategory}</p>
        <p>${goalDescription}</p>
    `;

    goalList.appendChild(goalItem);

    // Clear form inputs
    goalForm.reset();
}
