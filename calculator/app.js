document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");

    let expression = "";
    let lastChar = "";
    const operators = ["+", "-", "*", "/", "%"];

    function speak(text) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.rate = 2.0;
        msg.pitch = 1.2;
        window.speechSynthesis.speak(msg);
    }

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            const value = e.target.value;

            // Prevent consecutive operators
            if (operators.includes(value) && operators.includes(lastChar)) {
                return;
            }

            // Convert special characters for speech
            const speechMap = {
                "-": "minus",
                ".": "point",
                "*": "times",
                "/": "divided by",
                "%": "modulus",
                "=": "equals",
                "AC": "All clear",
                "DE": "Delete"
            };
            speak(speechMap[value] || value);

            if (value === "=") {
                if (expression.trim() === "" || operators.includes(lastChar)) return;
                try {
                    expression = eval(expression).toString();
                    speak("The result is " + expression);
                } catch {
                    speak("Error");
                    expression = "";
                }
            } else if (value === "AC") {
                expression = "";
            } else if (value === "DE") {
                expression = expression.slice(0, -1);
            } else if (lastChar === "=" && !operators.includes(value)) {
                expression = value;
            } else {
                expression += value;
            }

            lastChar = value;
            input.value = expression;
        });
    });
});
