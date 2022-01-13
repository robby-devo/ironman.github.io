const turn_on = document.querySelector("#turn_on");
const jarvis_intro = document.querySelector("#j_intro");
const time = document.querySelector("#time");
const machine = document.querySelector(".machine");
const internet = document.querySelector("#internet");

const battery = document.querySelector("#battery");
const msgs = document.querySelector(".messages");

// creating a new chat tab

// whether the recognition is stopiing on my command or automatically

// create a new message
// function createMsg(who, msg) {
//   let newmsg = document.createElement("p");
//   newmsg.innerText = msg;
//   newmsg.setAttribute("class", who);
//   msgs.appendChild(newmsg);
// }
document.querySelector("#start_jarvis_btn").addEventListener("click", () => {
  recognition.start();
});

// jarvis commands

let jarvisComs = [];
jarvisComs.push("hi jarvis");
jarvisComs.push("what are your commands");
jarvisComs.push("close this - to close opened popups");
jarvisComs.push(
  "change my information - information regarding your acoounts and you"
);
jarvisComs.push("whats the weather or temperature");
jarvisComs.push("show the full weather report");
jarvisComs.push("are you there - to check fridays presence");
jarvisComs.push("shut down - stop voice recognition");
jarvisComs.push("open google");
jarvisComs.push('search for "your keywords" - to search on google ');
jarvisComs.push("open whatsapp");
jarvisComs.push("open youtube");
jarvisComs.push('play "your keywords" - to search on youtube ');
jarvisComs.push("close this youtube tab - to close opened youtube tab");
jarvisComs.push("open firebase");
jarvisComs.push("open netlify");
jarvisComs.push("open twitter");
jarvisComs.push("open my twitter profile");
jarvisComs.push("open instagram");
jarvisComs.push("open my instagram profile");
jarvisComs.push("open github");
jarvisComs.push("open my github profile");

function weather(location) {
  const weatherCont = document.querySelector(".temp").querySelectorAll("*");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      weatherCont[0].textContent = `Location : ${data.name}`;
      weatherCont[1].textContent = `Country : ${data.sys.country}`;
      weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
      weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
      weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherCont[5].textContent = `Original Temperature : ${ktc(
        data.main.temp
      )}`;
      weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
      weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
      weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
      weatherStatement = `sir the weather in ${data.name} is ${
        data.weather[0].description
      } and the temperature feels like ${ktc(data.main.feels_like)}`;
    } else {
      weatherCont[0].textContent = "Weather Info Not Found";
    }
  };

  xhr.send();
}
// weather setup

// convert temperature
function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}

// date and time
let date = new Date();
let hrs = date.getHours();
let mins = date.getMinutes();
let secs = date.getSeconds();

// autojarvis
function autoJarvis() {
  setTimeout(() => {
    recognition.start();
  }, 1000);
}

window.onload = () => {
  // onstartup

  turn_on.play();
  turn_on.addEventListener("onend", () => {
    setTimeout(() => {
      autoJarvis();
      readOut("Ready to go Sir");
      if (localStorage.getItem("jarvis_setup") == null) {
        readOut("Please fill the form sir");
      }
    }, 200);
  });

  // jarvis command addintion
  jarvisComs.forEach((e) => {
    document.querySelector(".commands").innerHTML += `<p>#${e}</p><br/>`;
  });
  time.textContent = `${hrs}:${mins}:${secs}`;
  setInterval(() => {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    time.textContent = `${hrs}:${mins}:${secs}`;
  }, 1000);

  // battery

  let batteryPromise = navigator.getBattery();
  batteryPromise.then(batteryCallback);

  function batteryCallback(batteryObject) {
    printBatteryStatus(batteryObject);
    setInterval(() => {
      printBatteryStatus(batteryObject);
    }, 5000);
  }

  function printBatteryStatus(batteryObject) {
    battery.textContent = `${batteryObject.level * 100}%`;
    if ((batteryObject.charging = true)) {
      document.querySelector(".battery").style.width = "200px";
      battery.textContent = `${
        batteryObject.level * (100).toFixed(2)
      }% Charging`;
    }
    if ((batteryObject.charging = false)) {
      //   document.querySelector(".battery").style.width = "200px";
      battery.textContent = `${
        batteryObject.level * (100).toFixed(2)
      }% Not Charging`;
    }
  }

  // internet
  navigator.onLine
    ? (internet.textContent = "online")
    : (internet.textContent = "offline");
};

// auto friday

function createMsg(who, msg) {
  let newmsg = document.createElement("p");
  newmsg.innerText = msg;

  newmsg.setAttribute("class", who);

  msgs.appendChild(newmsg);
}
//
// start jarvis with btn
if (localStorage.getItem("jarvis_setup") !== null) {
  weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
}

// jarvis information setup

const setup = document.querySelector(".jarvis_setup");

setup.style.display = "none";
if (localStorage.getItem("jarvis_setup") == null) {
  setup.style.display = "block";
  setup.querySelector("button").addEventListener("click", userInfo);
}

// userInfo function
function userInfo() {
  let setupInfo = {
    name: setup.querySelectorAll("input")[0].value,
    bio: setup.querySelectorAll("input")[1].value,
    location: setup.querySelectorAll("input")[2].value,
    instagram: setup.querySelectorAll("input")[3].value,
    twitter: setup.querySelectorAll("input")[4].value,
    github: setup.querySelectorAll("input")[5].value,
  };

  let testArr = [];

  setup.querySelectorAll("input").forEach((e) => {
    testArr.push(e.value);
  });

  if (testArr.includes("")) {
    readOut("sir enter your complete information");
  } else {
    localStorage.clear();
    localStorage.setItem("jarvis_setup", JSON.stringify(setupInfo));
    setup.style.display = "none";
    weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
  }
}
// userInfo function

// jarvis information setup end

// jarvis setup end

// call the weather function here
// speech recognition setup

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

//   this will create new speech recognition

const recognition = new SpeechRecognition();

//speech rec start
recognition.onstart = function () {
  console.log("voice rec active");
};

// speech rec result

recognition.onresult = function (event) {
  console.log(event);
  let current = event.resultIndex;

  let transcript = event.results[current][0].transcript;
  transcript = transcript.toLowerCase();

  let userdata = localStorage.getItem("jarvis_setup");
  //   console.log(`my words : ${transcript}`);
  createMsg("usermsg", transcript);

  if (transcript.includes("hello jarvis")) {
    readOut("hello sir how are you");
  }
  if (transcript.includes("i am good what about you")) {
    readOut("I am doing really well sir");
  }
  if (transcript.includes("what are your commands")) {
    readOut("sir, I have following commands");

    document.querySelector(".commands").style.display = "block";
  }
  if (transcript.includes("close the command section")) {
    readOut("closing command section sir");

    document.querySelector(".commands").style.display = "none";
    setup.style.display = "none";
  }

  if (transcript.includes("open youtube")) {
    readOut("opening Youtube Sir");
    window.open("https://www.youtube.com/");
  }
  if (transcript.includes("open instagram")) {
    readOut("opening instagram Sir");
    window.open("https://www.instagram.com/");
  }
  if (transcript.includes("open google")) {
    readOut("opening google Sir");
    window.open("https://www.google.co.in/");
  }
  if (transcript.includes("ok bye jarvis")) {
    readOut("bye bye sir");
    // window.open("https://www.google.co.in/");
  }

  // google search inside something

  if (transcript.includes("search for")) {
    readOut("here's the result ");

    let input = transcript.split("");
    // console.log(input);
    input.splice(0, 11);
    // input.pop();
    input = input.join("").split(" ").join("+");

    window.open(`https://www.google.com/search?q=${input}`);

    console.log(input);
  }

  if (transcript.includes("play in youtube")) {
    readOut("showing the result ");

    let input = transcript.split("");
    console.log(input);
    input.splice(0, 16);
    // input.pop();
    input = input.join("").split(" ").join("+");

    window.open(`https://www.youtube.com/results?search_query=${input}`);

    console.log(input);
  }
  if (
    transcript.includes("open firebase") ||
    transcript.includes("open fire base")
  ) {
    readOut("opening firebase Sir");
    window.open("https://console.firebase.google.com/u/0/");
  }

  // firebase with different accounts
  if (transcript.includes("open fire base") && transcript.includes("account")) {
    readOut("opening firebase console");

    let accId = transcript;
    //
    accId = accId.split("");
    accId.pop();

    accId = accId[accId.length - 1];
    console.log(`accId: ${accId}`);
    window.open(`https://console.firebase.google.com/u/&${accId}/`);
  }
  // firebase with different accounts

  // console.log(transcript);

  // readOut(transcript);  readout was for testing purpose

  /*Giving instructions
  hi- hello sir

  open google -- opening google 'google.com'
  
  
  */
  // github command

  if (transcript.includes("open github")) {
    readOut("opening github sir");
    window.open("https://github.com/");
  }

  if (transcript.includes("open my github profile")) {
    readOut("opening your github profile sir");
    window.open(`https://github.com/${JSON.parse(userdata).github}`);
  }
};

//speech rec stop
recognition.onend = function (event) {
  // console.log(event);

  console.log("vr not active");
};

// make speech rec continuous

recognition.continuous = true;

startBtn.addEventListener("click", () => {
  recognition.start();
});
stopBtn.addEventListener("click", () => {
  recognition.stop();
});

// how will shazam speak (shazam speech)

function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  // different voices

  const allVoices = speechSynthesis.getVoices();
  // diff voice
  speech.text = message;
  speech.voice = allVoices[5];

  speech.volume = 1;

  window.speechSynthesis.speak(speech);

  // console.log("speaking out");
  createMsg("jmsg", message);
}

speakBtn.addEventListener("click", () => {
  readOut(
    "This is how I did it on MacOS (you have to hit the gear, then select "
  );
});

// fix male voice

window.onload = function () {
  readOut("  ");
};

// take my speech and take it out
