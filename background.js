const MAX_TABS = 100;
var tabs = [];
var index = -1;

function get_last_tab(){
    if (index > 0){
        index--;
    }
    return tabs[index];
}

function get_next_tab(){
    if (index < tabs.length-1){
        index++;
    }
    return tabs[index];
}

function add_new_tab(id){
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
    add_new_tab(activeInfo.tabId);
    console.log(tabs);
});

chrome.commands.onCommand.addListener(function(command) {
    var new_id;
    if(command == 'next_tab'){
        new_id = get_next_tab();
    }
    else if (command == 'previous_tab'){
        new_id = get_previous_tab();
    }
    chrome.tabs.highlight(new_id);
});