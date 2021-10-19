
var elOpen = document.getElementById('nav-open-button');
var elClose = document.getElementById('nav-close-button');
elOpen.onclick = openNavigation;
elClose.onclick = closeNavigation;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function openNavigation(){
    elOpen.classList.add('removed');
    //await sleep(0.3);
    var linkList = document.getElementById('link-list');
    linkList.classList.remove('removed');
    linkList.classList.remove('closed');
    linkList.classList.add('opened');
    for(var i=0; i<linkList.childElementCount; i++){
        var linkElement = linkList.children[i].children[0];
        linkElement.classList.add('unhidden');
        //await sleep(0.3);
    }
}

function closeNavigation(){
    elOpen.classList.remove('removed');
    //await sleep(0.3);
    var linkList = document.getElementById('link-list');
    linkList.classList.add('removed');
    linkList.classList.add('closed');
    linkList.classList.remove('opened');
    for(var i=0; i<linkList.childElementCount; i++){
        var linkElement = linkList.children[i].children[0];
        linkElement.classList.remove('unhidden');
        //await sleep(0.3);
    }
}