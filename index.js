
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
    const usedCat = [];
    prods.forEach((val)=>{
        if(usedCat.includes(val.category)) return;
        const opt     = document.createElement("option");
        opt.value     = val.category;
        opt.innerText = val.category;
        catfilter.appendChild(opt);
        usedCat.push(val.category);
    });
    catfilter.onchange = (e)=>useFunction(filterCategory,e);
}

function resetProd(){
    document.getElementById("prodsearch").value = '';
    load_elems = prods;
    loadProds();
}

function loadOPS(){
    loadProds();
    loadCatFilter();
    document.getElementById("lowonstock").onclick = ()=>useFunction(getLowOnStock,null);
    document.getElementById("resetprod").onclick = resetProd;
    document.getElementById("sortprods").onchange = (e)=>useFunction(sortBy,e);
    document.getElementById("prodsearch").onkeydown = (e)=>useFunction(filterName,e);
    document.getElementById("generatechart").onclick = generateChart;
}

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
function sortBy(e){
    return prods.sort((a,b)=>b[e.target.value]-a[e.target.value]);
}

// q5

function filterName(e){
    return prods.filter((val)=>val.name.match(RegExp('.*'+e.target.value+'.*','gi')));
}

//q6
function generateChart(){
    const priceByCategory = prods.reduce((acc, prod) => {
        acc[prod.category] = (acc[prod.category] || 0) + prod.price;
        return acc;
    }, {});
    
    const categories = Object.keys(priceByCategory);
    const priceValues = Object.values(priceByCategory);
    
    const ctx = document.getElementById('productChart').getContext('2d');
    const productChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Prices by Category',
                data: priceValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}