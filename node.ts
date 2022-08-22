// Array of boolean simulating switches
const switches: boolean[] = [];
// Set how many switches are in a the challenge
const setSwitches = (amount: number) => {
	while (switches.pop() !== undefined) {}
	for (let i = 0; i < amount; i++) {
		switches.push(true);
	}
};
// Steps counter
let count = 0;
// Update switch and increment counter
const updateSwitch = (index: number, value: boolean) => {
	if (switches[index] !== undefined) {
		count++;
		switches[index] = value;
	}
};
// Make switch operable
const enableSwitch = (index: number) => {
	if (!isOperable(index)) {
		turnOn(index + 1);
		for (let i = index + 2; i < switches.length; i++) {
			turnOff(i);
		}
	}
};
// Check if switch is operable
const isOperable = (index: number) => {
	if (switches[index + 1] !== undefined) {
		if (switches[index + 1]) {
			for (let i = index + 2; i < switches.length; i++) {
				const element = switches[i];
				if (element) {
					return false;
				}
			}
		} else {
			return false;
		}
	}
	return true;
};
// Turn on switch if not turned on
const turnOn = (index: number) => {
	if (index >= switches.length) {
		return;
	}
	if (switches[index]) return;
	if (isOperable(index)) {
		updateSwitch(index, true);
	} else {
		enableSwitch(index);
		turnOn(index);
	}
};
// Turn off switch if not turned off
const turnOff = (index: number) => {
	if (index >= switches.length) {
		return;
	}
	if (!switches[index]) return;
	if (isOperable(index)) {
		updateSwitch(index, false);
	} else {
		enableSwitch(index);
		turnOff(index);
	}
};
// Solve Challenge
const solve = () => {
	count = 0;
	for (let index = 0; index < switches.length; index++) {
		turnOff(index);
	}
	console.log(count);
};

setSwitches(34);
solve();
