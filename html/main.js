var current_max_slot_id = 0;

function populate_slots() {
    var slots_container = document.querySelector("#slots-list");
    var child = slots_container.lastElementChild;  
        while (child) { 
            slots_container.removeChild(child); 
            child = slots_container.lastElementChild; 
        } 
    for (var slot in window.slots) {
        var child = document.createElement("div");
        if (!window.slots[slot].id) window.slots[slot].id = current_max_slot_id++;
        //console.log("populate! slot should be " + window.slots[slot].id, window.slots[slot]);
        child.id = ("itemslot-" + window.slots[slot].id);
        child.innerHTML = "<img src=" + window.slots[slot].image +  " style=\"margin: 30px; width:auto; height:inherit;\"></img>" +
        "<p style=\"margin-top: -40px;\">" + window.slots[slot].fact + "</p>";
        child.setAttribute("style", "height: 150px; width: auto;");
        slots_container.appendChild(child);
    }
}

var bears = [
    "./resources/eating_bear.png",
    "./resources/normal_bear.png",
    "./resources/sleeping_bear.png"
]

var facts = [
    "2050 is too long to wait to go carbon neutral. We need to act NOW or it will be too late.",
    "100 companies create 71% of greenhouse gas emissions, so call your representatives about corporate responsibility.",
    "Climate refugees already number in the tens of millions, expected to reach over a billion by 2050 if things don't improve.",
    "CO2 levels are about 20% higher than they have been in the past 500 thousand years, and more than double what they were 100 years ago.",
    "The earth's average temperature has increased before, but never this much and never this quickly since the atmosphere settled."
]

function attract_bear() {
    var img = bears[Math.floor(Math.random() * bears.length)];
    var fact = facts[Math.floor(Math.random() * facts.length)];

    window.slots.push({
        id: current_max_slot_id++,
        image: img,
        fact: fact,
        type: "unimpl",
        bear_present: true,
        bear_type: img,
        bear_state: null
    });
    save_slots();
    populate_slots();
}

function check_score() {
    console.log(scores.supporters, (100 * current_max_slot_id));
    if(window.scores.supporters > (100 * current_max_slot_id)) {
        attract_bear();
    }
}

function load_values() {
    var money_value = document.querySelector("#money");
    var supporters_value = document.querySelector("#supporters");

    if (!window.scores.money) window.scores.money = 100;
    if (!window.scores.supporters) window.scores.supporters = 0;

    money_value.textContent = "$" + window.scores.money;
    supporters_value.textContent = window.scores.supporters + " supporters";
}

function save_slots() {
    localStorage.slots = JSON.stringify(window.slots);
}
function save_data() {
    localStorage.scores = JSON.stringify(window.scores);
}

function load_slots() {
    window.slots = localStorage.slots ? JSON.parse(localStorage.slots) : [];
    current_max_slot_id = window.slots.length > 0 ? window.slots[window.slots.length - 1].id + 1 : 0;
}

function load_data() {
    window.scores = localStorage.scores ? JSON.parse(localStorage.scores) : {};
}

function add_test_slot() {
    window.slots.push({
        id: current_max_slot_id++,
        image: "./resources/normal_bear.png",
        fact: "TEST_FACT",
        type: "TEST_ITEM",
        bear_present: false,
        bear_type: "TEST_BEAR",
        bear_state: null
    });
    save_data();
    save_slots();
    populate_slots();
}

function add_test_money(amount = 1) {
    window.scores.money += amount;
    save_data();
    load_values();
}

function add_test_supporters(amount = 1) {
    window.scores.supporters += amount;
    save_data();
    load_values();
}

function load_game() {
    load_data();
    load_slots();
    load_values();
    populate_slots();
}

function redirect(url) {
    save_data();
    window.location.href = url;
}

function game_loop() {
    if (!window.scores.money_increment) window.scores.money_increment = 0;
    if (!window.scores.supporter_increment) window.scores.supporter_increment = 1;

    if (!window.scores.money) window.scores.money = 100;
    if (!window.scores.supporters) window.scores.supporters = 0;
    window.scores.money += window.scores.money_increment;
    window.scores.supporters += window.scores.supporter_increment;
    save_data();
    load_values();
    check_score();
}

/*
slot:
- id
- item type
- bear present (bool)
- bear type
- bear state (happy, hungry, upset, etc.) ????
*/

load_data();