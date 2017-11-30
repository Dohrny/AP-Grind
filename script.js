var AP = 1;
var AKlevel = 1;
var AKpercent = 100 * (1.3 * AKlevel);
var champions = 1;
var championCost
var MAX_CHAMPIONS = 6;
var resources = 500;
var notifier;
var APtext;
var AKtext;
var AKtimerText
var championsText;
var AKready
var championsReady
var dungeonReady

window.onload = function () {
    APtext = document.getElementById("AP");
    AKtext = document.getElementById("AK");
    championsText = document.getElementById("champions");
    resourcesText = document.getElementById("resources")
    notifier = document.getElementById("notifications");
    AKtimerText = document.getElementById("AKtimer")
    updateValues()
    championsReady = true
    dungeonReady = true
    championCost = 1
    AKready = true
};
//add AP every second
window.setInterval(updateAP, 1000);
function updateAP() {
    APtext.innerHTML = AP.toLocaleString();
    AP += Math.floor(1 * (AKpercent / 100 * champions));
}
// +1 champions. --add cost that increases for each champ
function addChampion() {
    if (champions < 6) {
        if (resources >= championCost) {
            champions += 1;
            resources -= championCost
            championCost = championCost * 10
            updateValues()
            notifier.innerHTML = "added a Champion";
        }
    }
}
//increase AK by 1. --add cost and time gate
function increaseAK() {
    if (AKready) {
        AKlevel += 1;
        AKtext.innerHTML = AKlevel.toString();
        AKpercent = Math.round(AKpercent * 1.3)
        AKready = false
        
        startTimer(0, 5)
    }
}

//maybe this timer will work. i know it makes more sense
function startTimer(m, s) {
    document.getElementById("increaseAKButton").textContent = m + ":" + s;
    if (s == 0) {
        if (m == 0) {
            AKready = true
            document.getElementById("increaseAKButton").textContent = "AK+"
            return
        }
        else if (m != 0) {
            m = m - 1;
            s = 60;
            t();
        }
    }
    s = s - 1;
    t();

    function t() { setTimeout(function () { startTimer(m, s) }, 1000) };
}

//give reward for pressing button. has a chance to fail
function runDungeon() {
    if (dungeonReady == true) {
        var elem = document.getElementById("dungeonBar")
        var width = 0
        var id = setInterval(frame, 100)

        function frame() {
            if (width >= 100) {
                var fail = Math.floor(Math.random() * 100 + 1)
                dungeonReady = true
                clearInterval(id)

                if (fail > 33) {
                    rewardPlayer()
                }
                else {
                    notifier.innerHTML = "dungeon failed. you are a noob"
                }
            }
            else {
                width++
                elem.style.width = width + "%"
                elem.innerHTML = width * 1 + "%"
                dungeonReady = false
            }
        }
    }
}
//when progrss bar fill. give reward
function sendChampions() {
    if (championsReady == true) {
        var elem = document.getElementById("missionBar");
        var width = 0;
        var id = setInterval(frame, 100)

        function frame() {
            if (width >= 100) {
                rewardPlayer()
                championsReady = true
                clearInterval(id)
            }
            else {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML = width * 1 + "%";
                championsReady = false
            }
        }
    }
}
//gives AP or resources
function rewardPlayer() {
    var reward = Math.round(Math.random())

    if (reward == 0) {
        var APgained = Math.floor(AKpercent / 10);
        AP += APgained;
        updateValues()
        notifier.innerHTML = "gained " + APgained + "AP";
        console.log(AKpercent)
    }
    if (reward == 1) {
        resources += 10;
        updateValues()
        notifier.innerHTML = "gained 10 resources";
    }
}

function updateValues() {
    APtext.innerHTML = AP.toLocaleString()
    AKtext.innerHTML = AKlevel.toString()
    resourcesText.innerHTML = resources.toString()
    championsText.innerHTML = champions.toString()
}
