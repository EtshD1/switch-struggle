const buttons: boolean[] = [];

const addButtons = (amount: number) => {
	while (buttons.pop() !== undefined) {}
	for (let i = 0; i < amount; i++) {
		buttons.push(true);
	}
};

let count = 0;

const updateButtons = (index: number, value: boolean) => {
	if (buttons[index] !== undefined) {
		count++;
		buttons[index] = value;
	}
};

const enableButton = (index: number) => {
	if (!isOperable(index)) {
		turnOn(index + 1);
		for (let i = index + 2; i < buttons.length; i++) {
			turnOff(i);
		}
	}
};

const isOperable = (index: number) => {
	if (buttons[index + 1] !== undefined) {
		if (buttons[index + 1]) {
			for (let i = index + 2; i < buttons.length; i++) {
				const element = buttons[i];
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

const turnOn = (index: number) => {
	if (index >= buttons.length) {
		return;
	}
	if (buttons[index]) return;
	if (isOperable(index)) {
		updateButtons(index, true);
	} else {
		enableButton(index);
		turnOn(index);
	}
};

const turnOff = (index: number) => {
	if (index >= buttons.length) {
		return;
	}
	if (!buttons[index]) return;
	if (isOperable(index)) {
		updateButtons(index, false);
	} else {
		enableButton(index);
		turnOff(index);
	}
};

const solve = () => {
	count = 0;
	for (let index = 0; index < buttons.length; index++) {
		turnOff(index);
	}
	console.log(count);
};

addButtons(34);
solve();
