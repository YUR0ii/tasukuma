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
        child.innerHTML = JSON.stringify(window.slots[slot]);
        slots_container.appendChild(child);
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

function save_data() {
    localStorage.slots = JSON.stringify(window.slots);
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
        type: "TEST_ITEM",
        bear_present: false,
        bear_type: "TEST_BEAR",
        bear_state: null
    });
    save_data();
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