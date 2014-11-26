const MAX_TABS = 100;
var tabs = [];
var index = -1;

function getLastTab(){
    index--;
    return tabs[index-1];
}

function getNextTab(){
    index++;
    return tabs[index+1];
}

function addNewTab(id){
    if (index == tabs.length-1){
        index++;
        tabs.push(id);
    }
    else{
        index++;
        tabs[index] = id;
    }
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
    //console.log("ID: "+activeInfo.tabId);
    addNewTab(activeInfo.tabId);
    console.log(tabs);
});

chrome.commands.onCommand.addListener(function(command) {
    var new_id;
    if(command == 'next_tab'){
        new_id = getNextTab();
    }
    else if (command == 'previous_tab'){
        new_id = getPreviousTab();
    }
    chrome.tabs.move(new_id);
});