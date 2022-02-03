// "use strict";
var display = document.querySelector(".display-screen");
var s_display = document.getElementById("sub_display");
var buttons = Array.from(document.querySelectorAll("button"));
var btnMC = document.querySelector("#mc");
var btnMR = document.querySelector("#mr");
var bfr = document.querySelectorAll(".bfr");
var afr = document.querySelectorAll(".afr");
var btn2nd = document.querySelector("#btn2nd");
var btnDeg = document.querySelector(".deg");
var btnRad = document.querySelector(".rad");
//factorial
var factorial = function (num) {
    var fact = 1;
    for (var i_1 = 1; i_1 <= num; i_1++) {
        fact = fact * i_1;
    }
    return fact;
};
//backspace
var del = function () {
    s_display.value = "";
    var dele = display.value;
    display.value = dele.substring(0, dele.length - 1);
};
//memory buttons
//MS
var arr_ms = [], i = 0, num2;
num2 = Number(display.value);
function func_ms() {
    if (arr_ms.length === 0)
        alert("Nothing is stored in the memory");
    else {
        num2 = arr_ms[i];
        i++;
        if (i === arr_ms.length) {
            i = 0;
        }
    }
}
// M+
function func_mplus() {
    arr_ms.push(+display.value);
    s_display.value = "M+(".concat(display.value, ")");
    display.value = '';
    btnMR.style.color = "var(--color-black)";
    btnMC.style.color = "var(--color-black)";
}
//M-
function func_mminus() {
    arr_ms.push(-display.value);
    s_display.value = "M-(".concat(display.value, ")");
    display.value = '';
    btnMR.style.color = "var(--color-black)";
    btnMC.style.color = "var(--color-black)";
}
// MR
var memory = 0;
var getResult = function () {
    return display.value;
};
var func_mr = function () {
    var value = getResult();
    display.value = memory.toString();
};
// MC
function func_mc() {
    arr_ms = [];
    s_display.value = "MC";
    display.value = '';
    btnMR.style.color = "var(--color-grey-deactive)";
    btnMC.style.color = "var(--color-grey-deactive)";
}
// yrootx
function func_yrootx() {
    var dvalue = display.value;
    var a = Number(dvalue.slice(0, dvalue.indexOf("y")));
    var b = Number(dvalue.slice(dvalue.indexOf("t") + 1));
    return Math.pow(a, 1 / b);
}
//x-power-y
function func_xraisey() {
    var dvalue = display.value;
    var a = Number(dvalue.slice(0, dvalue.indexOf("^"))); //Return 1st value 
    var b = Number(dvalue.slice(dvalue.indexOf("^") + 1)); //RTeturn 2nd value
    return Math.pow(a, b);
}
// log
function func_logbase() {
    var dvalue = display.value;
    var a = Number(dvalue.slice(0, dvalue.indexOf("l")));
    var b = Number(dvalue.slice(dvalue.indexOf("e") + 1));
    return Math.log(a) / Math.log(b);
}
//degree to radian
function degtorad() {
    if ($(".degrees").text() == "DEG") {
        s_display.value = "Deg (".concat(display.value, ")");
        display.value = String(Number(display.value) * (180 / Math.PI));
        $(".degrees").text("RAD");
    }
    else {
        s_display.value = "Rad (".concat(display.value, ")");
        display.value = String(Number(display.value) * (Math.PI / 180));
        $(".degrees").text("DEG");
    }
}
// 2nd calc operations
function second_calc() {
    bfr.forEach(function (el) { return el.classList.toggle('active'); });
    afr.forEach(function (el) { return el.classList.toggle('active'); });
    afr.forEach(function (el) {
        if (el.classList.contains("active"))
            btn2nd.style.backgroundColor = "var(--color-blue)";
        else
            btn2nd.style.backgroundColor = "var(--color-white-button)";
    });
}
//edge case prevented 
var check = function (val, eve) {
    var isvalid;
    var cur_Value = display.value;
    var last_char = cur_Value[cur_Value.length - 1];
    if (display.value !== "0" && display.value !== "") {
        if (last_char === "+" ||
            last_char === "-" ||
            last_char === "/" ||
            last_char === "*" ||
            last_char === "%" ||
            last_char === "!" ||
            last_char === "^" ||
            last_char === "e" ||
            last_char === "e") {
            var assign = cur_Value.substring(0, cur_Value.length - 1) + eve;
            display.value = assign;
            isvalid = false;
        }
        else {
            isvalid = true;
        }
        return isvalid;
    }
};
//operations and event handling
buttons.map(function (value) {
    value.addEventListener("click", function (e) {
        switch (e.target.dataset.sign) {
            case 'C':
                s_display.value = "";
                display.value = '';
                break;
            case '=':
                try {
                    if (display.value.charAt(display.value.length - 1) == "!") {
                        display.value = display.value.substring(0, display.value.length - 1);
                        display.value = String(factorial(Number(display.value)));
                    }
                    if (display.value.includes("^")) {
                        s_display.value = "".concat(display.value, "=");
                        display.value = String(func_xraisey());
                    }
                    else if (display.value.includes("yroot")) {
                        s_display.value = "(".concat(display.value, ")");
                        display.value = String(func_yrootx());
                    }
                    else if (display.value.includes("log base")) {
                        display.value = String(func_logbase());
                    }
                    else {
                        display.value = eval(display.value);
                    }
                }
                catch (_a) {
                    display.value = "Error";
                }
                break;
            case 'dlt':
                if (display.value) {
                    s_display.value = "";
                    display.value = display.value.slice(0, -1);
                }
                break;
            case "π":
                if (display.value) {
                    s_display.value = "".concat(display.value, "\u00D7\u03C0");
                    display.value = String(parseFloat(display.value) * Math.PI);
                }
                break;
            case "e":
                if (display.value) {
                    s_display.value = "".concat(display.value, "\u00D7e");
                    display.value = String(parseFloat(display.value) * Math.E);
                }
                break;
            case 'sin':
                if (btnDeg.classList.contains("active")) {
                    s_display.value = "sin(".concat(display.value, ")");
                    display.value = String(Number(display.value) * (Math.PI / 180));
                    display.value = String(Math.sin(Number(display.value)));
                }
                else {
                    s_display.value = "sin(".concat(display.value, ")");
                    display.value = String(Math.sin(Number(display.value)));
                }
                break;
            case 'cos':
                if (btnDeg.classList.contains("active")) {
                    s_display.value = "cos(".concat(display.value, ")");
                    display.value = String(Number(display.value) * (Math.PI / 180));
                    display.value = String(Math.cos(Number(display.value)));
                }
                else {
                    s_display.value = "cos(".concat(display.value, ")");
                    display.value = String(Math.cos(Number(display.value)));
                }
                break;
            case 'tan':
                if (btnDeg.classList.contains("active")) {
                    s_display.value = "tan(".concat(display.value, ")");
                    display.value = String(Number(display.value) * (Math.PI / 180));
                    display.value = String(Math.tan(Number(display.value)));
                }
                else {
                    s_display.value = "tan(".concat(display.value, ")");
                    display.value = String(Math.tan(Number(display.value)));
                }
                break;
            case 'sinh':
                if (btnDeg.classList.contains("active")) {
                    s_display.value = "cosec(".concat(display.value, ")");
                    display.value = String(Number(display.value) * (Math.PI / 180));
                    display.value = (1 / Math.sin(Number(display.value))).toFixed(8);
                }
                else {
                    s_display.value = "cosec(".concat(display.value, ")");
                    display.value = (1 / Math.sin(Number(display.value))).toFixed(8);
                }
                break;
            case 'cosh':
                if (btnDeg.classList.contains("active")) {
                    s_display.value = "sec(".concat(display.value, ")");
                    display.value = String(Number(display.value) * (Math.PI / 180));
                    display.value = (1 / Math.cos(Number(display.value))).toFixed(8);
                }
                else {
                    s_display.value = "sec(".concat(display.value, ")");
                    display.value = (1 / Math.cos(Number(display.value))).toFixed(8);
                }
                break;
            case 'tanh':
                if (btnDeg.classList.contains("active")) {
                    s_display.value = "cot(".concat(display.value, ")");
                    display.value = String(Number(display.value) * (Math.PI / 180));
                    display.value = (1 / Math.tan(Number(display.value))).toFixed(8);
                }
                else {
                    s_display.value = "cot(".concat(display.value, ")");
                    display.value = (1 / Math.tan(Number(display.value))).toFixed(8);
                    ;
                }
                break;
            case 'abs':
                s_display.value = "abs(".concat(display.value, ")");
                display.value = String(Number(Math.abs(parseFloat(display.value))));
                break;
            case 'floor':
                s_display.value = "floor(".concat(display.value, ")");
                display.value = String(Math.floor(parseFloat(display.value)));
                break;
            case 'ceil':
                s_display.value = "ceil(".concat(display.value, ")");
                display.value = String(Math.ceil(parseFloat(display.value)));
                break;
            case 'round':
                s_display.value = "round(".concat(display.value, ")");
                display.value = String(Math.round(parseFloat(display.value)));
                break;
            case 'random':
                s_display.value = "random(".concat(display.value, ")");
                display.value = String(Math.random());
                break;
            case 'sign':
                s_display.value = "sign(".concat(display.value, ")");
                display.value = String(Math.sign(parseFloat(display.value)));
                break;
            case 'trunc':
                s_display.value = "trunc(".concat(display.value, ")");
                display.value = String(Math.trunc(parseFloat(display.value)));
                break;
            case 'log':
                s_display.value = "log10(".concat(display.value, ")");
                display.value = String(Math.log10(parseFloat(display.value)));
                break;
            case 'ln':
                s_display.value = "ln(".concat(display.value, ")");
                display.value = (Math.log(parseFloat(display.value))).toString();
                break;
            case 'square':
                s_display.value = "square(".concat(display.value, ")");
                display.value = String(Math.pow(parseFloat(display.value), 2));
                break;
            case '1/x':
                s_display.value = "1/(".concat(display.value, ")");
                display.value = String(Math.pow(parseFloat(display.value), -1));
                break;
            case '|x|':
                s_display.value = "|(".concat(display.value, ")|");
                display.value = String(Math.abs(parseFloat(display.value)));
                break;
            case 'expression':
                s_display.value = "exp(".concat(display.value, ")");
                display.value = String(Math.exp(parseFloat(display.value)));
                break;
            case 'sqrt':
                s_display.value = "sqrt(".concat(display.value, ")");
                display.value = String(Math.sqrt(parseFloat(display.value)));
                break;
            case '10powerx':
                s_display.value = "10power(".concat(display.value, ")");
                display.value = String(Math.pow(10, parseFloat(display.value)));
                break;
            case '+/-':
                s_display.value = "+/- of (".concat(display.value, ")");
                display.value = String(parseFloat(display.value) * (-1));
                break;
            case 'mc':
                func_mc();
                break;
            case 'mr':
                func_mr();
                break;
            case 'mplus':
                func_mplus();
                break;
            case 'mminus':
                func_mminus();
                break;
            case 'ms':
                func_ms();
                break;
            case '2nd':
                second_calc();
                break;
            case 'cube':
                s_display.value = "cube of (".concat(display.value, ")");
                display.value = String(Math.pow(parseFloat(display.value), 3));
                break;
            case '2raisex':
                s_display.value = "2 power (".concat(display.value, ")");
                display.value = String(Math.pow(2, parseFloat(display.value)));
                break;
            case 'cbrt':
                s_display.value = "cube root of(".concat(display.value, ")");
                display.value = String(Math.cbrt(parseFloat(display.value)));
                break;
            case 'epowerx':
                s_display.value = "e power (".concat(display.value, ")");
                display.value = String(Math.pow(Math.E, parseFloat(display.value)));
                break;
            case 'deg':
                btnDeg.classList.remove("active");
                btnRad.classList.add("active");
                break;
            case 'rad':
                btnRad.classList.remove("active");
                btnDeg.classList.add("active");
                break;
            case 'f-e':
                var num = (+display.value);
                s_display.value = "F-E (".concat(display.value, ")");
                display.value = num.toExponential();
                break;
            case "+":
                if (check(display.value, "+")) {
                    display.value = display.value + "+";
                }
                break;
            case "fact":
                if (check(display.value, "!")) {
                    display.value += "!";
                }
                break;
            case "-":
                if (check(display.value, "-")) {
                    display.value = display.value + "-";
                }
                break;
            case "*":
                if (check(display.value, "*")) {
                    display.value = display.value + "*";
                }
                break;
            case "/":
                if (check(display.value, "/")) {
                    display.value = display.value + "/";
                }
                break;
            default:
                display.value += e.target.dataset.sign;
        }
    });
});
