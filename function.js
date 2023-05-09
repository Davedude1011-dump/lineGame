function showToast(message, type) {
    toastr.options = {
        "positionClass": "toast-top-right",
        "closeButton": true,
        "progressBar": true,
    };
    if (type == "error") {
        toastr.error(message);
    } else if (type == "success") {
        toastr.success(message);
    } else if (type == "warning") {
        toastr.warning(message);
    }

}
function fiftyFifty() {
    if (Math.random() < 0.5) {
        return true;
    }
    else {
        return false;
    }
}

const elt = document.getElementById("example1");
const calculator = Desmos.GraphingCalculator(elt, { expressions: false, settingsMenu: false });//
const newDefaultState = calculator.getState();

var m = null
var c = null

function generateRandomLine() {
    // Generate a random slope (m) between -5 and 5 with a step of 0.5
    m = (Math.floor(Math.random() * 21) - 10) / 2;
  
    // Generate a random y-intercept (c) between -20 and 20 with a step of 0.5
    c = (Math.floor(Math.random() * 81) - 40) / 2;
  
    // Return the equation of the line
    calculator.setMathBounds({
        left: -30,
        right: 30,
        bottom: -15,
        top: 15
      });
    makeLine(m, c)
}
function generateRandomPoints() {
    // Generate a random slope (m) between -5 and 5 with a step of 0.5
    m = (Math.floor(Math.random() * 21) - 10) / 2;
  
    // Generate a random y-intercept (c) between -20 and 20 with a step of 0.5
    c = (Math.floor(Math.random() * 81) - 40) / 2;
  
    // Return the equation of the line
    var randomXforPointA = Math.floor(Math.random() * (10 - -10 + 1) + -10);
    var randomXforPointB = Math.floor(Math.random() * (randomXforPointA+10 - randomXforPointA+1 + 1) + randomXforPointA+1);

    if (fiftyFifty()) {
        calculator.setExpression({ id: 'pointA', latex: `(${randomXforPointA}, ${(randomXforPointA * m) + c})`, label: 'A', showLabel: true});
        calculator.setExpression({ id: 'pointB', latex: `(${randomXforPointB}, ${(randomXforPointB * m) + c})`, label: 'B', showLabel: true});
    }
    else {
        calculator.setExpression({ id: 'pointA', latex: `(${randomXforPointA}, ${(randomXforPointA * m) + c})`, label: '', showLabel: true});
        calculator.setExpression({ id: 'pointB', latex: `(${randomXforPointB}, ${(randomXforPointB * m) + c})`, label: '', showLabel: true});
    }
    
    calculator.setMathBounds({
        left: -100,
        right: 100,
        bottom: -50,
        top: 50
      });
    
    console.log(m, c)
    console.log("generateRandomPoints()")
}
function makeLine(m, c) {
    calculator.setExpression({ id: 'pointA', latex: 'y=mx+c' });
    calculator.setExpression({ id: 'm', latex: `m=${m}` });
    calculator.setExpression({ id: 'c', latex: `c=${c}` });
    console.log("makeLine(m, c)")
    console.log(m, c)
}

if (fiftyFifty()) { generateRandomLine() }
else { generateRandomPoints() }
function checkInputs() {
    console.log("checkInputs()")
    var valueC = document.getElementById("c").value;
    var valueM = document.getElementById("m").value;
    var correctC = false
    var correctM = false

    if (valueC === c.toString()) { var correctC = true }
    else { console.log("noM") }

    if (valueM === m.toString()) { var correctM = true }
    else { console.log("noC") }

    if (correctC && correctM) { //AND
        showToast("Correct!", "success")
        document.getElementById("c").value = ""
        document.getElementById("m").value = ""
        questionPass()
    }
    else if ((correctC && !correctM) || (!correctC && correctM)) { //XOR
        showToast("Nearly there.", "warning")
    }
    else { //NOT
        showToast("Wrong.", "error")
    }
}
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkInputs()
    }
});

function questionPass() {
    calculator.setDefaultState(newDefaultState);
    if (fiftyFifty()) { generateRandomLine() }
    else { generateRandomPoints()}
}