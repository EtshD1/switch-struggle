(function () {
    var _a, _b, _c, _d, _e, _f, _g;
    var buttons = [];
    var history = document.querySelector("#history");
    var n = document.querySelector("#n");
    var setButtons = function (amount) {
        while (buttons.pop() !== undefined) { }
        for (var i = 0; i < amount; i++) {
            buttons.push(true);
        }
        history.innerHTML = "";
        n.textContent = buttons.length.toString();
    };
    (_a = document
        .querySelector("#minus10")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        if (buttons.length - 10 <= 0) {
            setButtons(1);
        }
        else {
            setButtons(buttons.length - 10);
        }
    });
    (_b = document
        .querySelector("#minus5")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        if (buttons.length - 5 <= 0) {
            setButtons(1);
        }
        else {
            setButtons(buttons.length - 5);
        }
    });
    (_c = document
        .querySelector("#minus1")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
        if (buttons.length - 1 <= 0) {
            setButtons(1);
        }
        else {
            setButtons(buttons.length - 1);
        }
    });
    (_d = document
        .querySelector("#plus1")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
        setButtons(buttons.length + 1);
    });
    (_e = document
        .querySelector("#plus5")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
        setButtons(buttons.length + 5);
    });
    (_f = document
        .querySelector("#plus10")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
        setButtons(buttons.length + 10);
    });
    var count = 0;
    var updateButtons = function (index, value) {
        if (buttons[index] !== undefined) {
            count += 1;
            buttons[index] = value;
            if (history) {
                var newLog = document.createElement("div");
                newLog.textContent = "".concat(count, ": ").concat(buttons
                    .map(function (b) { return (b ? "O" : "X"); })
                    .join(" "));
                history.append(newLog);
            }
        }
    };
    var enableButton = function (index) {
        if (!isOperable(index)) {
            turnOn(index + 1);
            for (var i = index + 2; i < buttons.length; i++) {
                turnOff(i);
            }
        }
    };
    var isOperable = function (index) {
        if (buttons[index + 1] !== undefined) {
            if (buttons[index + 1]) {
                for (var i = index + 2; i < buttons.length; i++) {
                    var element = buttons[i];
                    if (element) {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
        return true;
    };
    var turnOn = function (index) {
        if (index >= buttons.length) {
            return;
        }
        if (buttons[index])
            return;
        if (isOperable(index)) {
            updateButtons(index, true);
        }
        else {
            enableButton(index);
            turnOn(index);
        }
    };
    var turnOff = function (index) {
        if (index >= buttons.length) {
            return;
        }
        if (!buttons[index])
            return;
        if (isOperable(index)) {
            updateButtons(index, false);
        }
        else {
            enableButton(index);
            turnOff(index);
        }
    };
    var solve = function () {
        count = 0;
        history.textContent = "History:\n";
        var newLog = document.createElement("div");
        newLog.textContent = "".concat(count, ": ").concat(buttons
            .map(function (b) { return (b ? "O" : "X"); })
            .join(" "));
        history.append(newLog);
        for (var index = 0; index < buttons.length; index++) {
            turnOff(index);
        }
        document.querySelector("#stepCount").textContent = "Total steps: ".concat(count);
    };
    setButtons(1);
    (_g = document
        .querySelector("#solveBtn")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", solve);
})();
