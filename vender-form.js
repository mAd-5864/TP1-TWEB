const modal = document.querySelector(".modal");
const btn_close = document.querySelector(".close-modal");
const marca = document.querySelector("#select-marca")
const modelo = document.querySelector("#select-modelo")
const preco = document.querySelector("#price>input")
const quilometragem = document.querySelector("#select-quilometragem")
const ano = document.querySelector("#select-ano")
const required_alert = document.querySelector(".form-required")
const submit = document.querySelector(".submit")
let card = document.querySelectorAll(".card")
const marcaDB = ["","ALFA ROMEO","AUDI","BMW","CITROEN","DACIA","FIAT","FORD","HONDA","HYUNDAI","JAGUAR","JEEP","KIA","LEXUS","MAZDA","MERCEDES-BENZ","MINI","NISSAN","OPEL","PEUGEOT","RENAULT","SEAT","SKODA","SMART","TOYOTA","VOLKSWAGEN","VOLVO"]
const modeloDB = ['',["GIULIA","GIULIETTA","MITO","MORREU","STELVIO"],
["A1","A1 SPORTBACK","A3 LIMOUSINE","A3 SPORTBACK","A4 AVANT","A6 AVANT","Q2","Q3","Q3 SPORTBACK"],
["SERIE 1","SERIE 2 ATIVE TOURER","SERIE 2 GRAN COUPE","SERIE 2 GRAN TOURER","SERIE 3","SERIE 3 GRAN TURISMO","SERIE 3 TOURING","SERIE 4 CABRIO","SERIE 4 GRAN COUPE","SERIE 5","SERIE 5 TOURING","X1","X2","X5","i8"],
["C-ELYSÉE","C3","C3 AIRCROSS","C4","C4 CACTUS","DS4","GRAN C4 SPACETOURER"],
["DUSTER","SANDERO"],
["500","500C","500L","500X","DOBLO","FIORINO","PUNTO","TIPO","TIPO CROSS","TIPO SW"],
["FOCUS","FOCUS SW","KUGA","MONDEO STATION","PUMA","S-MAX","MUSTANG"],
["ACORD","CIVIC","CR-V","JAZZ","S2000","TYPE-R"],
["I10","I30","I30 FASTBACK","KAUAI","TUSCON"],
["F-PACE","F-TYPE","XE","XF","XJ"],
["CHEROKEE","COMMANDER","GRAND CHEROKEE","GRAND COMMANDER","RENEGADE","WRANGLER"],
["CEED SW","NIRO","RIO","SPORTAGE","SORENTO"],
["RX","UX 250H","UX 300E"],
["2","3","CX-3","CX-30","CX-60","MX-5"],
["CLASSE A","CLASSE B","CLASSE C","CLASSE C STATION","CLASSE CLA","CLASSE E","CLASSE E STATION","CLASSE GLA","CLASSE GLC","CLASSE GLC COUPÉ","CLASSE VITO"],
["CABRIO","CLUBMAN","COOPER","COOPER S","COUNTRYMAN","JOHN COOPER","ROADSTER"],
["GTR","JUKE","LEAF","MICRA","NOTE","QASHQAI"],
["ADAM","ASTRA","ASTRA SPORTS TOURER","CORSA","CROSSLAND X","GRANDLAND X","INSIGNIA","KARL","VIVARO","ZAFIRA"],
["108","208","2008","308","308 SW","3008","508","5008","E-208","PARTNER"],
["ARKANA","CAPTUR","CLIO","CLIO SPORT TOURER","GRAND SCÉNIC","KADJAR","MASTER","MÉGANE","ZOE"],
["ALHAMBRA","ARONA","ATECA","IBIZA","LEON"],
["CITIGO","KODIAQ","OCTAVIA","SCALA"],
["FORFOUR","FORTWO","FORTWO COUPÉ"],
["AURIS","AYGO","CAMRY","COROLA","C-HR","YARIS","SUPRA"],
["CADDY","GOLF","PASSAT","POLO","SHARAN","TIGUAN","TOURAN","UP"],
["V40","V40 CROSS COUNTRY","V60","V90","XC40","XC60","XC90"]]

marca.innerHTML=`<option value="0">Marca</option>`
for (let i = 1; i < marcaDB.length; i++) {
    marca.innerHTML+=`<option value="${i}">${marcaDB[i]}</option>`;
}
ano.innerHTML=`<option value="0">Ano</option>`
for (let i = 2022; i > 1999; i--) {
    ano.innerHTML+=`<option value="${i}">${i}</option>`;
}
quilometragem.innerHTML=`<option value="-1">Quilometragem</option>`
for (let i = 1; i < 21; i++) {
    quilometragem.innerHTML+=`<option value="${i*5000}">${i*5000}</option>`;
}
function getModelo() {
    console.log(marca.options[marca.value].text + " = " + marca.value)
    if (marca.value>0) {
        modelo.removeAttribute("disabled")
        modelo.innerHTML=`<option value="0">Modelo</option>`
        for (let i = 0; i < modeloDB[marca.value].length; i++) {
            modelo.innerHTML+=`<option value="${i+1}">${modeloDB[marca.value][i]}</option>`;
        }
    } else {
        modelo.setAttribute("disabled", "")
    }
}
marca.addEventListener("change", getModelo);

submit.onclick =calculatePrice
function calculatePrice() {
    if (marca.value!=0 && modelo.value!=0 && preco.value>0 &&ano.value!=0 && quilometragem.value!=0) {
        console.log("Marca: "+marca.value +" Modelo: "+ modelo.value +" Preço: "+ preco.value +" Ano: "+ ano.value +" KM: "+ quilometragem.value)
        modal.style.display = "block";

        let c1, c2, c3, precoFinal;
        if (quilometragem.value<=30000) {
            c2 = 1;
        } else if (quilometragem.value<=70000) {
            c2 = 0.95;
        } else {
            c2 = 0.9;
        }

        if(2023-ano.value <= 10){
            precoFinal = preco.value*(1-(2023-ano.value)*0.05)*c2
        } else if (2023-ano.value>10) {
            precoFinal = preco.value*(1-(10*0.05+(2022-ano.value-10)*0.04))*c2
        }
        
        if (precoFinal<834) precoFinal=834;
        for (let i = 0; i < 3; i++) {
            switch (i) {
                case 0:
                    estado="Mau Estado"
                    c3=0.6
                    break;
                    case 2:
                    estado="Muito Bom Estado"
                    c3=1.1
                    break;
                    default:
                    estado="Bom Estado"
                    c3=1
                    break;
            }
            card[i].innerHTML=`<h1>${estado}</h1>
            <h2>${(precoFinal*c3).toFixed(0)} €</h2>
            <div class="hidden">Marca: ${marca.options[marca.value].text}</div>
            <div class="hidden"><b>Modelo: ${modelo.options[modelo.value].text}</div>
            <div class="hidden">Ano: ${ano.value}</div>
            <div class="hidden">${quilometragem.value}Km</div>`
        }
    } else {
        required_alert.style.display="block"
        console.log("Marca: "+marca.value +" Modelo: "+ modelo.value +" Preço: "+ preco.value +" Ano: "+ ano.value +" KM: "+ quilometragem.value)
        setTimeout(function() {
            required_alert.style.display="none"
        }, 5000)
    }
}

btn_close.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}