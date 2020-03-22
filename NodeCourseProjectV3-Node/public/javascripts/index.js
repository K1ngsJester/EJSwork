let userArray = [];
let motorcycleArray = [];
let position = 3;
let user;


// define a constructor to create player objects
let PlayerObject = function (pPosition, pMoney, pName, pAddress) {
    this.PlayerPosition = pPosition;
    this.PlayerMoney = pMoney;
    this.PlayerName = pName;
    this.PlayerAddress = pAddress;
}
let motorcycleObject = function (pPrice, pName) {
    this.motorcyclePrice = pPrice;
    this.motorcycleName = pName;
}

document.addEventListener("DOMContentLoaded", function () {

    buildList();
    list();

    $(document).on("pagebeforeshow", "#page1", function (event) {   // have to use jQuery 
        FillArrayFromServer();  // need to get fresh data
        // createList(); this can't be here, as it is not waiting for data from server
    });
    


    document.getElementById("createUser").addEventListener("click", function () {
        let money = document.getElementById("money").value;
        let name = document.getElementById("name").value;
        let address = document.getElementById("address").value;
        player = new PlayerObject(position, money, name, address);
        addNewPlayer(player);
        position++;
        FillArrayFromServer();
    });

    document.getElementById("buttonAddMoney").addEventListener("click", function () {
        let y = document.getElementById("addMoney").value;
        userArray[user].PlayerMoney -= -(y);        
        document.getElementById("IDparm").innerHTML = "You have $" + userArray[user].PlayerMoney;
        document.getElementById("IDparmHere").innerHTML = "Hello "+userArray[user].PlayerName+". You have $" + userArray[user].PlayerMoney;
        //document.location.href = "index.html#page2";
        //document.location.href = "index.html#page3";


    });

    document.getElementById("buttonSortHigh").addEventListener("click", function () {
        motorcycleArray = motorcycleArray.sort(comparePriceHigh);
        list();
    });

    document.getElementById("buttonSortLow").addEventListener("click", function () {
        motorcycleArray = motorcycleArray.sort(comparePriceLow);;
        list();
    });

    document.getElementById("buttonDelete").addEventListener("click", function () {
        let deletePlayer = document.getElementById("deletePlayer").value;

        deletePlayer = deletePlayer.toLowerCase();

        for (let i = 0; i < userArray.length; i++) {
            if (deletePlayer == (userArray[i].PlayerName).toLowerCase()) {
                userArray.splice(i,1);
        }
        createList();
    }

        // doing the call to the server right here
        fetch('users/deletePlayer/' + deletePlayer, {
            // users/deleteMovie/Moonstruck   for example, this is what the URL looks like sent over the network
            method: 'DELETE'
        })
            // now wait for 1st promise, saying server was happy with request or not
            .then(responsePromise1 => responsePromise1.text()) // ask for 2nd promise when server is node
            .then(responsePromise2 => console.log(responsePromise2), document.location.href = "index.html#refreshPage")  // wait for data from server to be valid
            // force jump off of same page to refresh the data after delete
            .catch(function (err) {
                console.log(err);
                alert(err);
            });


    });
    $(document).on("pagebeforeshow", "#refreshPage", function (event) {
        document.location.href = "index.html#page1";
    });
    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("money").value = "";
        document.getElementById("name").value = "";
        document.getElementById("address").value = "";
    });
    $(document).on("pagebeforeshow", "#Load", function (event) {   // have to use jQuery 
        document.getElementById("money").value = "";
        document.getElementById("name").value = "";
        document.getElementById("address").value = "";
    });

});
function buildList() {
    MC0 = new motorcycleObject(14799, "2020 Suzuki Hayabusa");
    MC1 = new motorcycleObject(17699, "2020 Suzuki GSX-R1000R");
    MC2 = new motorcycleObject(15599, "2020 Suzuki GSX-R1000");
    MC3 = new motorcycleObject(12499, "2020 Suzuki GSX-R750");
    MC4 = new motorcycleObject(11399, "2020 Suzuki GSX-R600");
    MC5 = new motorcycleObject(4899, "2020 Suzuki GSX250R");
    MC6 = new motorcycleObject(11599, "2019 Suzuki GSX-S1000F");
    MC7 = new motorcycleObject(4899, "2019 Suzuki GSX250R");

    motorcycleArray.push(MC0);
    motorcycleArray.push(MC1);
    motorcycleArray.push(MC2);
    motorcycleArray.push(MC3);
    motorcycleArray.push(MC4);
    motorcycleArray.push(MC5);
    motorcycleArray.push(MC6);
    motorcycleArray.push(MC7);
}

function list() {
    let divSelectionlist = document.getElementById("selection");
    
    while (divSelectionlist.firstChild) {    // remove any old data so don't get duplicates
        divSelectionlist.removeChild(divSelectionlist.firstChild);
    };

    
    let ul = document.createElement('ul');
    motorcycleArray.forEach(function (element, ) {   // use handy array forEach method
        let li = document.createElement('li');
        let img = document.createElement("img");
        img.src = 'images/' + element.motorcycleName + '.jpg';
        li.innerHTML = "<a class='onePlayer' data-parm=" + element.motorcyclePrice + " href='#page3'>Price: $" + element.motorcyclePrice + " " + element.motorcycleName + "</a >";
        ul.appendChild(img);
        ul.appendChild(li);
    });
    divSelectionlist.appendChild(ul)
    let classname = document.getElementsByClassName("onePlayer");
    Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function () {
            let parm = this.getAttribute("data-parm");  // passing in the record.Id
            //do something here with parameter on  pickbet page
            userArray[user].PlayerMoney -= parm;
            document.getElementById("IDparm").innerHTML = "Here is your account after purchase: $" + userArray[user].PlayerMoney;
            document.getElementById("IDparmHere").innerHTML = "Hello "+userArray[user].PlayerName+". You have $" + userArray[user].PlayerMoney;
            document.getElementById("location").innerHTML = "Thank you " + userArray[user].PlayerName + " for your purchase. <br /> your motorcycle will be sent to: " + userArray[user].PlayerAddress;
            //document.location.href = "index.html#page3";
        });
    });
}




function createList()
{
  // clear prior data
  let divUserlist = document.getElementById("PlayerList");
  while (divUserlist.firstChild) {    // remove any old data so don't get duplicates
      divUserlist.removeChild(divUserlist.firstChild);
  };

  let ul = document.createElement('ul');  
  userArray.forEach(function (element,) {   // use handy array forEach method
    let li = document.createElement('li');
    li.innerHTML = "<a data-transition='pop' class='onePlayer' data-parm=" + element.PlayerPosition + "  href='#page2'>Click to browse Motorcycles: </a> " + element.PlayerName;
    ul.appendChild(li);
  });
  divUserlist.appendChild(ul)

    // set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
    let classname = document.getElementsByClassName("onePlayer");
    Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function(){
            let parm = this.getAttribute("data-parm");  // passing in the record.Id
            //do something here with parameter on  pickbet page
            user = parm;
            document.getElementById("IDparmHere").innerHTML = "$" + userArray[user].PlayerMoney;
            //document.location.href = "index.html#page2";
        });
    });
};
function addNewPlayer(player) {

    // the required post body data is our movie object passed in, newMovie

    // create request object
    const request = new Request('/users/addPlayer', {
        method: 'POST',
        body: JSON.stringify(player),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    // pass that request object we just created into the fetch()
    fetch(request)
        // wait for frist server promise response of "200" success (can name these returned promise objects anything you like)
        // Note this one uses an => function, not a normal function, just to show you can do either 
        .then(theResonsePromise => theResonsePromise.json())    // the .json sets up 2nd promise
        // wait for the .json promise, which is when the data is back
        .then(theResonsePromiseJson => console.log(theResonsePromiseJson), document.location.href = "#ListAll")
        // that client console log will write out the message I added to the Repsonse on the server
        .catch(function (err) {
            console.log(err);
        });

}; // end of addNewPlayer
function FillArrayFromServer() {
    // using fetch call to communicate with node server to get all data
    fetch('users/playerList')
        .then(function (theResonsePromise) {  // wait for reply.  Note this one uses a normal function, not an => function
            return theResonsePromise.json();
        })
        .then(function (serverData) { // now wait for the 2nd promise, which is when data has finished being returned to client
            console.log(serverData);
            userArray.length = 0;  // clear array
            userArray = serverData;   // use our server json data which matches our objects in the array perfectly
            createList();  // placing this here will make it wait for data from server to be complete before re-doing the list
        })
        .catch(function (err) {
            console.log(err);
        });
};
function comparePriceLow(a, b) {
    const bikeA = a.motorcyclePrice;
    const bikeB = b.motorcyclePrice;

    let comparison = 0;
    if (bikeA > bikeB) {
        comparison = 1;
    } else if (bikeA < bikeB) {
        comparison = -1;
    }
    return comparison;
}
function comparePriceHigh(a, b) {
    const bikeA = a.motorcyclePrice;
    const bikeB = b.motorcyclePrice;

    let comparison = 0;
    if (bikeA < bikeB) {
        comparison = 1;
    } else if (bikeA > bikeB) {
        comparison = -1;
    }
    return comparison;
}