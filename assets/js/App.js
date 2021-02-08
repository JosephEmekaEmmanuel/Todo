let templateCall = document.querySelector("#addlist");
let btnAdd = document.getElementById("btnadd");
let btnRemove = document.getElementById("btnremove");
let incomingtask = document.querySelector("#todoItem");
let listul = document.querySelector(".ul");
var arr = [];

webStorageFunc("read");



const callAdd = () => {
    templateCall.style.display = "block";
};

btnAdd.addEventListener("click",() =>{
    addLists(incomingtask.value);
});

function showList(){
    listul.innerHTML = "";
    if(arr.length <= 0){
        document.querySelector("#empty").style.display = "block";
    }else{
        document.querySelector("#empty").style.display = "none";
        let count = 0;
        arr.forEach(mdata => {
            if(mdata.trim().length > 3){
                let li = document.createElement("li");
                let spang = createSpan("goodsvg",count);
                let spani = createSpan("items",count);
                let spanc = createSpan("cancelsvg",count);
                spani.textContent = mdata;
                li.appendChild(spang);
                li.appendChild(spani);
                li.appendChild(spanc);
                listul.appendChild(li);
                count++;
            }
        });
        maFunc();



    }    
}

function addLists(mdata){
    arr.push(mdata);
    showList();
    webStorageFunc("write");
}

function createSpan(attribute, num){
    let cspan = document.createElement("span");
    cspan.setAttribute("class",attribute);
    cspan.setAttribute("id",num);
    return cspan;
}


btnRemove.addEventListener("click",() =>{
    templateCall.style.display = "none";
    incomingtask.value = "";
});


function maFunc() {
    document.querySelectorAll(".cancelsvg").forEach(item => {
        item.addEventListener("click", e =>{
            delArray(item.getAttribute("id"));
            showList();
        });
    });
}

const delArray = (i) => {
    // arr[i] = "";
};

function webStorageFunc(x) {
    if(typeof(Storage) !== undefined){
        if(x=="read"){
            if(localStorage.getItem("json") !== null){
                const arrF = localStorage.getItem("json").split(",");
                arrF.forEach(item =>{
                    if(item.trim().length > 1) arr.push(item);
                });
            }else localStorage.setItem("json",arr);
        }else localStorage.setItem("json",arr); 
        showList();

    }else console.log("No support for Web storage");
}

