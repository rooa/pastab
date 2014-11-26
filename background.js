const MAX_TABS = 10;
var tabs = [];
var index_trace = -1;
var traceback = false;


function get_previous_tab(){
    if (index_trace > 0){
        index_trace--;
    }
    return tabs[index_trace];
}

function get_next_tab(){
    if (index_trace < tabs.length-1){
        index_trace++;
    }
    return tabs[index_trace];
}

function add_new_tab(id){
    if (traceback == true){
        traceback = false;
    }
    else {
        if (index_trace == tabs.length-1){
            tabs.push(id);
        }
        else {
            tabs[index_trace] = id;
        }
        index_trace += 1;
    }
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
    add_new_tab(activeInfo.tabId);
    console.log(tabs);
})

chrome.tabs.onRemoved.addListener(function(tabId){
    var idx = tabs.indexOf(tabId);
    while (idx != -1){
        tabs.splice(idx,1);
        idx = tabs.indexOf(tabId);
    }
})

chrome.commands.onCommand.addListener(function(command) {
    var new_id;
    traceback = true;
    if (command == 'previous_tab'){
        new_id = get_previous_tab();
    }
    else if (command == 'next_tab'){
        new_id = get_next_tab();
    }
    chrome.tabs.get(new_id,function(tab){
        chrome.tabs.highlight({"tabs":tab.index}, function(){});
    });
})