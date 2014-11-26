const MAX_TABS = 100;
var tabs = [];
var index = 0;

function getLastTab(){
    index--;
    return tabs[index-1];
}

function getNextTab(){
    index++;
    return tabs[index+1];
}

function addNewTab(id){
    tabs.push(id);
    index++;
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
    //console.log("ID: "+activeInfo.tabId);
    addNewTab(activeInfo.tabId);
    console.log(tabs);
});

