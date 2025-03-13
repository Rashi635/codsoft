let input = document.getElementById('display');
let buttons = document.querySelectorAll('.btn'); 

let str = "";
let lastChar = ""; 

function speak(text) {
    window.speechSynthesis.cancel(); 
    let msg = new SpeechSynthesisUtterance(text);
    msg.rate = 2.0; 
    msg.pitch = 1.2; 
    window.speechSynthesis.speak(msg);
}

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.value; 
        let operators = ['+', '-', '*', '/', '%', '='];

        // Prevent consecutive operators 
        if (operators.includes(value) && operators.includes(lastChar)) {
            return; // Do nothing if last character is also an operator
        }

        // Map special characters to speech-friendly text
        let spokenText = value;
        if (value === "-") spokenText = "minus";
        if (value === ".") spokenText = "point";
        speak(spokenText); // Speak the mapped text

        if (lastChar === '=' && !operators.includes(value)) {
            str = value;
        }
        else if (value === '=') {
            if (str.trim() === "" || operators.includes(lastChar)) return; // Prevent eval() error
            str = eval(str).toString();
            speak("The result is " + str);
        } else if (value === 'AC') {
            str = "";
            speak("All clear");
        } else if (value === 'DE') {
            str = str.slice(0, -1); 
            speak("Delete");
        } else {
            str += value;
        }

        lastChar = value; // Update last entered character
        input.value = str; // Update display
    });
});
