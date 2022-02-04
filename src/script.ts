// "use strict";


const display: HTMLInputElement =   document.querySelector(".display-screen") as HTMLInputElement;
const s_display: HTMLInputElement = document.getElementById("sub_display") as HTMLInputElement;
let buttons = Array.from(document.querySelectorAll("button")) as HTMLButtonElement[];
const btnMC : HTMLInputElement =     document.querySelector("#mc") as HTMLInputElement;
const btnMR : HTMLInputElement =     document.querySelector("#mr") as HTMLInputElement;
const bfr =  document.querySelectorAll(".bfr");
const afr =  document.querySelectorAll(".afr");
const btn2nd : HTMLInputElement =    document.querySelector("#btn2nd") as HTMLInputElement ;
const btnDeg : HTMLInputElement =    document.querySelector(".deg")    as HTMLInputElement ;
const btnRad : HTMLInputElement =    document.querySelector(".rad")    as HTMLInputElement ;


interface pow_log {
    ( dvalue: string | string[],
     a:number,
     b:number) : number | string;
 
 }
 

//factorial
const factorial = (num: Number):Number => {
    let fact :number = 1;
    for (let i = 1; i <= num; i++) {
        fact = fact * i;
        s_display.value = `factorial(${fact})`;
    }
    return fact;
};

//backspace
const del = ():void => {
    s_display.value = "";
    let dele = display.value;
    display.value = dele.substring(0, dele.length - 1);
};

//memory buttons
//MS
let arr_ms: number[] = [] , i = 0, num2 :number;
num2 = Number(display.value);
function func_ms() :void{ // Memory store
    if(arr_ms.length === 0)
    alert("Nothing is stored in the memory");
    else {
        num2 = arr_ms[i]; 
        i++;
        if(i === arr_ms.length){
            i = 0;
        }
    }
}
// M+

function func_mplus() :void{ 
    arr_ms.push(+display.value);
    s_display.value = `M+(${display.value})`;
    display.value = '';
    btnMR.style.color = "var(--color-black)";
    btnMC.style.color = "var(--color-black)";
}
//M-
function func_mminus() :void{ 
    arr_ms.push(-display.value);
    s_display.value = `M-(${display.value})`;
    display.value = '';
    btnMR.style.color = "var(--color-black)";
    btnMC.style.color = "var(--color-black)";
}
// MR
let memory: number = 0;
const getResult = (): string => {
    return display.value;
}
const func_mr = () => {
    let value: string = getResult();
    display.value = memory.toString();
    
}

// MC
function func_mc():void { 
    arr_ms = [];
    s_display.value = `MC`;
    display.value = '';
    btnMR.style.color = "var(--color-grey-deactive)";
    btnMC.style.color = "var(--color-grey-deactive)";
}

// yrootx
function func_yrootx() :pow_log | number { 
    const dvalue = display.value;
    const a = Number(dvalue.slice(0,dvalue.indexOf("y"))); 
    const b = Number(dvalue.slice(dvalue.indexOf("t") + 1));
    return Math.pow(a,1/b);
}
//x-power-y
function func_xraisey( ):pow_log | number{ 
    
    const dvalue = display.value;
    const a = Number(dvalue.slice(0,dvalue.indexOf("^"))  ); //Return 1st value 
    const b = Number(dvalue.slice(dvalue.indexOf("^") + 1)); //RTeturn 2nd value
    return Math.pow(a,b);
}
// log
function func_logbase( ) :pow_log | number{
   
    const dvalue = display.value;
    const a = Number(dvalue.slice(0,dvalue.indexOf("l"))  ); 
    const b = Number(dvalue.slice(dvalue.indexOf("e") + 1));
    return Math.log(a)/Math.log(b);
}

//degree to radian
function degtorad() :void {
    if ($(".degrees").text() == "DEG") {
        s_display.value = `Deg (${display.value})`;
        display.value = String(Number(display.value) * (180 / Math.PI));
        
        $(".degrees").text("RAD");
    } else {
        s_display.value = `Rad (${display.value})`;
        display.value = String(Number(display.value) * (Math.PI / 180));
        $(".degrees").text("DEG");
    }
}

// 2nd calc operations
function second_calc() :void{ 
    bfr.forEach((el) => el.classList.toggle('active'));
    afr.forEach((el) => el.classList.toggle('active'));
    afr.forEach((el) => {
        if(el.classList.contains("active"))
        btn2nd.style.backgroundColor = "var(--color-blue)";
        else
        btn2nd.style.backgroundColor = "var(--color-white-button)";
    })
}

//edge case prevented 
const check = (val: String, eve: string) : boolean | undefined => {
    let isvalid: boolean;
    let cur_Value = display.value;
    let last_char: string = cur_Value[cur_Value.length - 1];
    if (display.value !== "0" && display.value !== "") {
      if (
        last_char === "+" ||
        last_char === "-" ||
        last_char === "/" ||
        last_char === "*" ||
        last_char === "%" ||
        last_char === "!" ||
        last_char === "^" ||
        last_char === "e" ||
        last_char === "e"
      ) {
        let assign = cur_Value.substring(0, cur_Value.length - 1) + eve;
        s_display.value = `Deg (${display.value})`;
        display.value = assign;
        isvalid = false;
      } else {
        isvalid = true;
      }
      return isvalid;
    }
  };


  //operations and event handling
buttons.map((value):void => {
    value.addEventListener("click", (e: MouseEvent):void => {
        switch ((<HTMLElement>e.target).dataset.sign) {
            case 'C':
                s_display.value = "";
                display.value = '';
                break;
            case '=':
                
                try{
                    if (display.value.charAt(display.value.length - 1) == "!") {
                        display.value = display.value.substring(0, display.value.length - 1);
                        display.value = String(factorial(Number(display.value)));
                        }
                    if(display.value.includes("^")){
                        s_display.value = `${display.value}=`;
                        display.value = String(func_xraisey());
                    }
                    else if(display.value.includes("yroot")){
                        s_display.value = `(${display.value})`;
                        display.value = String(func_yrootx());
                    }
                    else if(display.value.includes("log base")){
                        display.value = String(func_logbase());
                    }
                    else{
                        display.value = eval(display.value);
                    }
                } catch {
                    display.value = "Error"
                }
                break;
            case 'dlt':
                if (display.value){
                    s_display.value = "";
                   display.value = display.value.slice(0, -1);
                }
                break;
            case "π":
                if (display.value) {
                s_display.value = `${display.value}×π`;
                display.value = String(parseFloat(display.value) * Math.PI);
                }
                break;

            case "e":
                if (display.value) {
                s_display.value = `${display.value}×e`;
                display.value = String(parseFloat(display.value)  * Math.E);
                }
                break;
            case 'sin':
                if(btnDeg.classList.contains("active"))
               { s_display.value = `sin(${display.value})`;   
                display.value = String(Number(display.value) * (Math.PI /180));
                display.value = String(Math.sin(Number(display.value))); }
                else 
                    {   s_display.value = `sin(${display.value})`; 
                        display.value = String(Math.sin(Number(display.value)));}
                break;
            case 'cos':
                if(btnDeg.classList.contains("active"))
                {    s_display.value = `cos(${display.value})`; 
                    display.value = String(Number(display.value) * (Math.PI /180));
                    display.value = String(Math.cos(Number(display.value))); }
                    else 
                        {s_display.value = `cos(${display.value})`; 
                            display.value = String(Math.cos(Number(display.value)));}
                    break;
            case 'tan':
                if(btnDeg.classList.contains("active")){
                    s_display.value = `tan(${display.value})`; 
                    display.value = String(Number(display.value) * (Math.PI /180));
                    display.value = String(Math.tan(Number(display.value))); }
                    else 
                       {
                        s_display.value = `tan(${display.value})`; 
                         display.value = String(Math.tan(Number(display.value)));}
                    break;
            case 'sinh':
                if(btnDeg.classList.contains("active")){
                    s_display.value = `cosec(${display.value})`; 
                    display.value = String(Number(display.value) * (Math.PI /180));
                display.value = (1/Math.sin(Number(display.value))).toFixed(8); }
                else 
                   {    s_display.value = `cosec(${display.value})`; 
                        display.value = (1/Math.sin(Number(display.value))).toFixed(8);}
                break;
            case 'cosh':
                if(btnDeg.classList.contains("active")){
                    s_display.value = `sec(${display.value})`; 
                    display.value = String(Number(display.value) * (Math.PI /180));
                display.value = (1/Math.cos(Number(display.value))).toFixed(8);}
                else 
                   {    s_display.value = `sec(${display.value})`; 
                        display.value = (1/Math.cos(Number(display.value))).toFixed(8);}
                break;
            case 'tanh':
                if(btnDeg.classList.contains("active")){
                    s_display.value = `cot(${display.value})`; 
                    display.value = String(Number(display.value) * (Math.PI /180));
                    display.value = (1/Math.tan(Number(display.value))).toFixed(8);}
                    else 
                       {    s_display.value = `cot(${display.value})`; 
                            display.value = (1/Math.tan(Number(display.value))).toFixed(8);;}
                    break;
            case 'abs':
                    s_display.value = `abs(${display.value})`;    
                    display.value = String(Number(Math.abs(parseFloat(display.value))));
                    break;
            case 'floor':
                s_display.value = `floor(${display.value})`;    
                display.value = String(Math.floor(parseFloat(display.value) ));
                break;
            case 'ceil':
                s_display.value = `ceil(${display.value})`;
                display.value = String(Math.ceil(parseFloat(display.value) ));
                break;
            case 'round':
                s_display.value = `round(${display.value})`;
                display.value = String(Math.round(parseFloat(display.value) ));
                break;
            case 'random':
                s_display.value = `random(${display.value})`;
                display.value = String(Math.random());
                break;
            case 'sign':
                s_display.value = `sign(${display.value})`;
                display.value = String(Math.sign(parseFloat(display.value) ));
                break;
            case 'trunc':
                s_display.value = `trunc(${display.value})`;
                display.value = String(Math.trunc(parseFloat(display.value) ));
                break;
            case 'log':
                s_display.value = `log10(${display.value})`;
                display.value = String(Math.log10(parseFloat(display.value) ));
                break;
            case 'ln':
                s_display.value = `ln(${display.value})`;
                display.value = (Math.log(parseFloat(display.value))).toString(); 
                break;
            case 'square':
                s_display.value = `square(${display.value})`;
                display.value = String(Math.pow(parseFloat(display.value) ,2));
                break;   
            case '1/x':
                s_display.value = `1/(${display.value})`;
                display.value = String(Math.pow(parseFloat(display.value) ,-1));
                break; 
            case '|x|':
                s_display.value = `|(${display.value})|`;
                display.value = String(Math.abs(parseFloat(display.value) ));
                break; 
            case 'expression':
                s_display.value = `exp(${display.value})`;
                display.value = String(Math.exp(parseFloat(display.value) ));
                break;  
            case 'sqrt':
                s_display.value = `sqrt(${display.value})`;
                display.value = String(Math.sqrt(parseFloat(display.value) ));
                break; 
            case '10powerx':
                s_display.value = `10power(${display.value})`;
                display.value = String(Math.pow(10,parseFloat(display.value) ));
                break;
            case '+/-':
                s_display.value = `+/- of (${display.value})`;
                display.value = String(parseFloat(display.value) *(-1));
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
                s_display.value = `cube of (${display.value})`;
                display.value = String(Math.pow(parseFloat(display.value) ,3));
                break;
            case '2raisex':
                s_display.value = `2 power (${display.value})`;
                display.value = String(Math.pow(2,parseFloat(display.value) ));
                break;      
            case 'cbrt':
                s_display.value = `cube root of(${display.value})`;
                display.value = String(Math.cbrt(parseFloat(display.value) ));
                break;
            case 'epowerx':
                s_display.value = `e power (${display.value})`;
                display.value = String(Math.pow(Math.E,parseFloat(display.value) ));
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
                let num = (+display.value);
                s_display.value = `F-E (${display.value})`;
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

                display.value += (<HTMLElement>e.target).dataset.sign;

            }
            
        
        });
    });

    