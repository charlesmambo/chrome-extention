const inputEl = document.getElementById('input-el');
const btn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');
const ulEl = document.getElementById('ul-el');
const localStorageItem = JSON.parse(localStorage.getItem('myLeads'));

let myLeads = [];


if (localStorageItem){
    myLeads = localStorageItem;
    render(myLeads);
}

function render(leads) {
    let listItems = '';
    for (let i = 0; i < leads.length; i++){
        listItems += `<li>
                         <a href="${leads[i]}" target="_blank">
                         ${leads[i]}
                         </a>
                      </li>`;
    }
    ulEl.innerHTML = listItems
}


btn.addEventListener('click', ()=>{
    myLeads.push(inputEl.value);
    inputEl.value = '';
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads);

});

const tab = [
    {url: "www.google.com"}
]
tabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })

})

deleteBtn.addEventListener('dblclick', () =>{
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});
