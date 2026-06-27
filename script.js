const scriptURL = "https://script.google.com/macros/s/AKfycbxZifS7yOyK-wSh2VrcL6pISgIZa2xax-rGhcmThX6ztKwvsnBuMU5SKa6gLG2ONcvq/exec";

let messages = {};

// Load the messages.json file
fetch("messages.json")
  .then(res => res.json())
  .then(data => {
    messages = data;
  });

function getZodiac(dateString) {

  const d = new Date(dateString);
  const day = d.getDate();
  const month = d.getMonth() + 1;

  if((month==3&&day>=21)||(month==4&&day<=19)) return "aries";
  if((month==4&&day>=20)||(month==5&&day<=20)) return "taurus";
  if((month==5&&day>=21)||(month==6&&day<=20)) return "gemini";
  if((month==6&&day>=21)||(month==7&&day<=22)) return "cancer";
  if((month==7&&day>=23)||(month==8&&day<=22)) return "leo";
  if((month==8&&day>=23)||(month==9&&day<=22)) return "virgo";
  if((month==9&&day>=23)||(month==10&&day<=22)) return "libra";
  if((month==10&&day>=23)||(month==11&&day<=21)) return "scorpio";
  if((month==11&&day>=22)||(month==12&&day<=21)) return "sagittarius";
  if((month==12&&day>=22)||(month==1&&day<=19)) return "capricorn";
  if((month==1&&day>=20)||(month==2&&day<=18)) return "aquarius";
  return "pisces";
}

function getReading(){

  const name = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;
  const time = document.getElementById("time").value;
  const place = document.getElementById("place").value;

  if(!dob || !time || !place){
      alert("Please fill all required fields.");
      return;
  }

  const zodiac = getZodiac(dob);

  const readingArray = messages[zodiac];
  const reading = readingArray[Math.floor(Math.random()*readingArray.length)];

  const luckyColors = ["Royal Blue","Emerald Green","Golden","Purple","Crimson","Silver"];
  const luckyNumbers = [3,5,7,9,11,21,27,33];

  const luckyColor = luckyColors[Math.floor(Math.random()*luckyColors.length)];
  const luckyNumber = luckyNumbers[Math.floor(Math.random()*luckyNumbers.length)];

  fetch(scriptURL,{
      method:"POST",
      body:JSON.stringify({
          name:name,
          dob:dob,
          time:time,
          place:place
      })
  });

  document.getElementById("result").style.display="block";

  document.getElementById("result").innerHTML=`
  <h2>🌌 Your Cosmic Reading</h2>

  <h3>Hello ${name || "Friend"} ✨</h3>

  <p><b>Your Zodiac:</b> ${zodiac.toUpperCase()}</p>

  <p>${reading}</p>

  <p><b>Lucky Color:</b> ${luckyColor}</p>

  <p><b>Lucky Number:</b> ${luckyNumber}</p>

  <p><b>Daily Affirmation</b></p>

  <p>"I welcome every new opportunity with confidence and gratitude."</p>
  `;
}