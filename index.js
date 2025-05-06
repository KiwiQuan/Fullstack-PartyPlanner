let eventNames = [];
let selectedEvent;

async function getEvents() {
  try {
    const res = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2504-ftb-et-web-ft/events"
    );
    const json = await res.json();
    eventNames = json.data;
    console.log(eventNames);
    render();
  } catch (err) {
    console.log(err);
  }
}

async function getSelectedEvent(id) {
  try {
    const res = await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2504-ftb-et-web-ft/events/${id}`
    );
    const json = await res.json();
    selectedEvent = json.data;
    console.log(selectedEvent);
    render();
  } catch (err) {
    console.log(err);
  }
}

// upcoming Parties section
function PartyList() {
  const $parties = document.createElement("ul");
  $parties.classList.add("parties");
  const $partiesList = eventNames.map(PartyListItem);
  $parties.replaceChildren(...$partiesList);

  return $parties;
}

// selected Party section
function PartyListItem(party) {
  const $party = document.createElement("li");
  $party.classList.add("party");
  $anchor = document.createElement("a");
  $party.appendChild($anchor);
  $anchor.href = "#selected";
  $anchor.textContent = party.name;

  $party.addEventListener("click", () => {
    getSelectedEvent(party.id);
  });

  return $party;
}

function PartyDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }

  const $party = document.createElement("section");
  $party.classList.add("party");
  $party.innerHTML = `<h3>${selectedEvent.name} #${selectedEvent.id}</h3>
 <p>${selectedEvent.date}</p>
 <p>${selectedEvent.location}</p>
  <p>${selectedEvent.description}</p>
   `;
  return $party;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
        <header>
            <h1>Party Planner</h1>
            
        </header>
        <main>
        <section>
            <h2>Upcoming Parties</h2>
            <PartyList></PartyList>
        </section>
        <section>
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
        </section>
            
        </main>
    `;

  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}
async function init() {
  await getEvents();
  render();
}

init();
