var AP = 1;
var AKlevel = 1;
var AKpercent = 100 * (1.3 * AKlevel);
var champions = 1;
var MAX_CHAMPIONS = 6;
var resources = 0;
var notifier;
var APtext;
var AKtext;
var championsText;
window.onload = function () {
    APtext = document.getElementById("AP");
    AKtext = document.getElementById("AK");
    championsText = document.getElementById("champions");
    notifier = document.getElementById("notifications");
    AKtext.innerHTML = AKlevel.toString();
    championsText.innerHTML = champions.toString();
};
window.setInterval(updateAP, 1000);
function updateAP() {
    APtext.innerHTML = AP.toString();
    AP += Math.floor(1 * (AKpercent / 100 * champions));
}
// +1 champions. --add cost that increases for each champ
function addChampion() {
    if (champions < 6) {
        champions += 1;
        championsText.innerHTML = champions.toString();
        notifier.innerHTML = "added a Champion";
    }
}
//increase AK by 1. --add cost and time gate
function increaseAK() {
    AKlevel += 1;
    AKtext.innerHTML = AKlevel.toString();
    AKpercent = 100 * (1.3 * AKlevel);
}
//give reward for pressing button. soon progress bar w/ fail chance
function runDungeon() {
    var reward = Math.round(Math.random());
    if (reward == 0) {
        var APgained = Math.floor(10 * AKpercent / 100);
        AP += APgained;
        APtext.innerHTML = AP.toString();
        notifier.innerHTML = "gained " + APgained + "AP";
    }
    if (reward == 1) {
        resources += 10;
        document.getElementById("resources").innerHTML = resources.toString();
        notifier.innerHTML = "gained 10 resources";
    }
}
//when progrss bar fill. give reward --fix running multiple at once
function sendChampions() {
    var elem = document.getElementById("missionBar");
    var width = 0;
    var id = setInterval(frame, 100);
    function frame() {
        if (width >= 100) {
            runDungeon(); //fix this
            clearInterval(id);
        }
        else {
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = width * 1 + "%";
        }
    }
}
