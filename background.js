const MAX_TABS = 10;
var tabs = [];
var previous_index = -1;
var index_trace = -1;

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
    if (previous_index < index_trace){
    }
    else{
        if(index_trace == tabs.length-1){
            tabs.push(id);
        }
        else{
            tabs[index_trace] = id;
        }
        index_trace += 1;
        previous_index += 1;
    }
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
    //console.log("ID: "+activeInfo.tabId);
    add_new_tab(activeInfo.tabId);
    console.log(tabs);
});

chrome.commands.onCommand.addListener(function(command) {
    var new_id;
    previous_index = index_trace;
    if(command == 'previous_tab'){
        console.log("next_tab");
        new_id = get_previous_tab();
    }
    else if (command == 'next_tab'){
        console.log("previous_tab");
        new_id = get_next_tab();
    }
    chrome.tabs.get(new_id,function(tab){
        console.log("inside get, index: "+tab.index);
        chrome.tabs.highlight({"tabs":tab.index}, function(){
            index_trace -= 1;
        });
    });
});