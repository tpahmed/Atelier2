// EX 5
const products = [
    { name: "Shirt", price: 20 },
    { name: "Shoes", price: 50 },
    { name: "Hat", price: 15 }
];


function calculateTotale(prev,curr){
    return {price:prev.price+curr.price*(125/100)};
}

console.log("prix totale = "+products.reduce(calculateTotale).price);

// Ex6
const prods = [{ name: 'Ordinateur portable', price: 999, category: 'Électronique', stock: 10 },];

let load_elems = prods;

function loadProds(){
    const table = document.getElementById("prodtable");
    table.innerHTML = "";
    load_elems.forEach((val)=>{
        const nodeTR = document.createElement("tr");
        for(let i in val){
            const nodeTD = document.createElement("td");
            nodeTD.innerText = val[i];
            nodeTR.appendChild(nodeTD);
        }
        table.appendChild(nodeTR);
    });
    document.getElementById("tprice").innerText = calculatePrice(); 
}

function loadCatFilter(){
    const catfilter = document.getElementById("catfilter");
    prods.forEach((val)=>{
        const opt     = document.createElement("option");
        opt.value     = val.category;
        opt.innerText = val.category;
        catfilter.appendChild(opt);
    });
    catfilter.onchange = (e)=>useFunction(filterCategory,e);
}

function loadOPS(){
    loadProds();
    loadCatFilter();
    document.getElementById("lowonstock").onclick = ()=>useFunction(getLowOnStock,null);
    document.getElementById("resetprod").onclick = ()=>{load_elems = prods;loadProds();};
}
window.onload = ()=>loadOPS();

function useFunction(func,e){
    load_elems = func(e);
    loadProds();
}

// q1
function filterCategory(e){
    return prods.filter((val)=>val.category==e.target.value || !e.target.value);
}

// q2
function calculatePrice(){
    return load_elems.reduce((prev,curr)=>({'price':prev.price+curr.price})).price || 0.0;
}

// q3
function getLowOnStock(){
    return prods.map((e)=>e.stock<2);
}

// q4
function sortBy(ent){
    return prods.sort((a,b)=>a[ent]-b[ent]);
}

// q5

function filterName(search){
    return prods.filter((val)=>val.name.match('*'+search+'*'));
}

//q6
function generateChart(){

}