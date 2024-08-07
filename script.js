
const api_key = "3e5fc955d4c0ac34e7db56f8";


let inputNumber = document.querySelector(".inputNumber input");
let convertButton = document.querySelector("#convertBtn");
let switchButton = document.querySelector("#SwitchBTN");
let selectFromCurrency = document.querySelector("#fromC");
let selectToCurrency = document.querySelector("#toC");

let messageText = document.querySelector(".msg h2");
let HtmlSelect = document.getElementsByClassName("selectCurrency");


//add all country conde in the select option...
for(const select of HtmlSelect){
    // console.log(select);
    for(const CurrencyValue in countryList){
        // console.log(CurrencyValue);
        
        const optionCreate = document.createElement("option");
        optionCreate.value = CurrencyValue;
        optionCreate.innerText = CurrencyValue;
        
        if(select.name ==="FromCurrency" && CurrencyValue === "BDT"){
            optionCreate.selected = "selected";
        }else if(select.name === "ToCurrency" && CurrencyValue === "USD"){
            optionCreate.selected = "selected";
        }
        select.appendChild(optionCreate);
    }

}

if(inputNumber.value == ""){
    inputNumber.value = 1;
}




//add Functionality for the switch button...
switchButton.onclick =()=>{
    let temporary = selectFromCurrency.value;
    selectFromCurrency.value = selectToCurrency.value;
    selectToCurrency.value = temporary;
    // console.log("switchd")

    messageText.innerText = `1 ${selectFromCurrency.value} = 1 ${selectToCurrency.value}`

}


convertButton.addEventListener("click", ()=>{
    let resultBox = document.querySelector(".resultBox");
    let resultPara = document.querySelector(".resultBox p");
    



    if(inputNumber.value == "" || inputNumber.value <1 || isNaN(inputNumber.value)){
        resultBox.style.display = "block";
        resultPara.style.color = "red";
        resultPara.innerText = "Error!: Please check the correct value of ammount.";
    }else if(inputNumber.value != "" && inputNumber.value >= 1 ){
    
    //this is not confirm to work.
    convertButton.disabled = true;
    convertButton.style.cursor = "not-allowed";
    convertButton.innerText = "Converting...";
    }

    bringData();

})



//let's declear "bringData" function here...

const bringData = async ()=>{
    try{
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${api_key}/latest/${selectFromCurrency.value}`);
        const data = await response.json();
        // console.log(data);
        // console.log(data.conversion_rates["BDT"]);
        if(response.ok == true){
            const makeToCurrency = data.conversion_rates[`${selectToCurrency.value}`]
            const finalCalculation = (makeToCurrency*inputNumber.value).toFixed(2);

        //too much distrub
            let resultBox = document.querySelector(".resultBox");
            let resultPara = document.querySelector(".resultBox p");


            //try to show the result in disply
            resultBox.style.display = "block";
            resultPara.style.color = "green";
            resultPara.innerText = `${inputNumber.value} ${selectFromCurrency.value} = ${finalCalculation} ${selectToCurrency.value}`;


            //due one more simple task that is showing message text..
            messageText.innerText = `1 ${selectFromCurrency.value} = ${makeToCurrency.toFixed(2)} ${selectToCurrency.value}`


            //return capability of convrt button..
            convertButton.disabled = false;
            convertButton.style.cursor = "pointer";
            convertButton.innerText = "Convert";

        }
        

    }

    catch (error) {

        let resultBox = document.querySelector(".resultBox");
        let resultPara = document.querySelector(".resultBox p");

        resultBox.style.display = "block";
        resultPara.style.color = "red";
        resultPara.innerText = "Something wrong for API"+(error);
    }
    
    



}