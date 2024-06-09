const goalForm = document.getElementById('goalForm');
const goalList = document.getElementById('goalList');

const botButton = document.getElementById('botButton');
const botContainer = document.createElement('div');
botContainer.innerHTML = "<iframe src='https://webchat.botframework.com/embed/globalspeaklang-bot?s=vFSLJeAm7_c.jk6_TPxmvQPpSdS8KwGzzBYRA6-c_UqsORHJaPM1CHU'  style='min-width: 400px; width: 100%; min-height: 500px;'></iframe>"
botContainer.classList.add('bot-container');
document.body.appendChild(botContainer);

botButton.addEventListener('click', () => {
  botContainer.classList.toggle('open');
});

goalForm.addEventListener('submit', addGoal);


function renderGoals() {
    axios.get("https://globalspeakbackend.azurewebsites.net/goals", {
        responseType: 'json'
    }).then(response => {
        console.log(response)
        goalList.innerHTML = ""
        let {goals} = response.data

            if(!goals) return;

            goals.reverse().forEach((el => {

                const goalItem = document.createElement('li');
    goalItem.innerHTML = `
        <h3>${el.g_name}</h3>
        <p>Category: ${el.category}</p>
        <p>${el.desc}</p>
    `;

    goalList.appendChild(goalItem);
            }))
    }, console.error)
}

function addGoal(event) {
    event.preventDefault();

    const g_name = document.getElementById('goalName').value;
    const category = document.getElementById('goalCategory').value;
    const desc = document.getElementById('goalDescription').value;

    //formButton.setAttribute("disabled", "disabled")

        axios({
            method: "POST",
            baseURL: "https://globalspeakbackend.azurewebsites.net/storegoal",
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                g_name,
                category,
                desc
            },
            responseType: 'json'
        }).then(response => {
            console.log(response.data.goals)
            renderGoals()
            //formButton.removeAttribute("disabled")
        })

    // Clear form inputs
    goalForm.reset();
}

renderGoals()