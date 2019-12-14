var current_max_slot_id = 0;

function populate_slots() {
    var slots_container = document.querySelector("#slots-list");
    delete slots_container.children;
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

    money_value.textContent = "$" + window.money;
    supporters_value.textContent = window.supporters + " supporters";
}

function save_data() {
    localStorage.slots = JSON.stringify(window.slots);
    localStorage.money = window.money;
    localStorage.supporters = window.supporters;
}

function load_data() {
    window.slots = localStorage.slots ? JSON.parse(localStorage.slots) : [];
    window.money = localStorage.money ? parseInt(localStorage.money) : 0;
    window.supporters = localStorage.supporters ? parseInt(localStorage.supporters) : 0;

    current_max_slot_id = window.slots[window.slots.length - 1].id + 1;

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
}

function add_test_money(amount = 1) {
    window.money += amount;
    save_data();
    load_values();
}

function add_test_supporters(amount = 1) {
    window.supporters += amount;
    save_data();
    load_values();
}

function load_game() {
    load_data();
    load_values();
    populate_slots();
}

function redirect(url) {

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