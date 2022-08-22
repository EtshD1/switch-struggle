(() => {
	const buttons: boolean[] = [];

	const history = document.querySelector<HTMLDivElement>("#history");
	const n = document.querySelector<HTMLDivElement>("#n");

	const setButtons = (amount: number) => {
		while (buttons.pop() !== undefined) {}
		for (let i = 0; i < amount; i++) {
			buttons.push(true);
		}
		history!.innerHTML = "";
		n!.textContent = buttons.length.toString();
	};

	document
		.querySelector<HTMLButtonElement>("#minus10")
		?.addEventListener("click", () => {
			if (buttons.length - 10 <= 0) {
				setButtons(1);
			} else {
				setButtons(buttons.length - 10);
			}
		});
	document
		.querySelector<HTMLButtonElement>("#minus5")
		?.addEventListener("click", () => {
			if (buttons.length - 5 <= 0) {
				setButtons(1);
			} else {
				setButtons(buttons.length - 5);
			}
		});
	document
		.querySelector<HTMLButtonElement>("#minus1")
		?.addEventListener("click", () => {
			if (buttons.length - 1 <= 0) {
				setButtons(1);
			} else {
				setButtons(buttons.length - 1);
			}
		});
	document
		.querySelector<HTMLButtonElement>("#plus1")
		?.addEventListener("click", () => {
			setButtons(buttons.length + 1);
		});
	document
		.querySelector<HTMLButtonElement>("#plus5")
		?.addEventListener("click", () => {
			setButtons(buttons.length + 5);
		});
	document
		.querySelector<HTMLButtonElement>("#plus10")
		?.addEventListener("click", () => {
			setButtons(buttons.length + 10);
		});

	let count = 0;

	const updateButtons = (index: number, value: boolean) => {
		if (buttons[index] !== undefined) {
			count += 1;
			buttons[index] = value;
			if (history) {
				const newLog = document.createElement("div");
				newLog.textContent = `${count}: ${buttons
					.map((b) => (b ? "O" : "X"))
					.join(" ")}`;
				history.append(newLog);
			}
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
		history!.textContent = "History:\n";
		const newLog = document.createElement("div");
		newLog.textContent = `${count}: ${buttons
			.map((b) => (b ? "O" : "X"))
			.join(" ")}`;
		history!.append(newLog);
		for (let index = 0; index < buttons.length; index++) {
			turnOff(index);
		}
		document.querySelector(
			"#stepCount"
		)!.textContent = `Total steps: ${count}`;
	};

	setButtons(1);

	document
		.querySelector<HTMLButtonElement>("#solveBtn")
		?.addEventListener("click", solve);
})();
