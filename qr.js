const updateInterval = 600; // Update Interval in seconds
var updatedTime = new Date();; // Time got updated
var updateTime = new Date();; // Time to get update

function request() {
    fetch('https://butter.museumx.kr:14443/v2.0/barcode', {
      method: 'GET',
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      updateQRImage(data.data[0].barcode);
      
      updatedTime = new Date();
      updateTime = new Date(updatedTime.getTime() + updateInterval * 1000);

    //   document.getElementById("QRImage").src = data.data[0].url;
      QrCreator.render({
        text: data.data[0].barcode,
        radius: 0.5, // 0.0 to 0.5
        ecLevel: 'H', // L, M, Q, H
        fill: '#304159', // foreground color
        background: null, // color or null for transparent
        size: 1024 // in pixels
      }, document.querySelector('#QR'));

      document.getElementById("regdt").textContent="QR regdt : " + data.data[0].regdt;
      document.getElementById("valdt").textContent="QR valdt : " + data.data[0].valdt;
      document.getElementById("updatedTime").textContent="last update : " + updatedTime.toLocaleString();
      document.getElementById("countdownTimer").textContent="updated!";
      //countdownTimer
    });
  }

  function updateQRImage(url) {
    
    console.log(url)
  }

  function updateTimer() {
    var currentTime = new Date();
    var diff = Math.floor((updateTime - currentTime)/1000);

    var str = "next update in ... ";
    if(diff > 60) str += ((diff - diff % 60) / 60) + "m ";
    str += (diff % 60) + "s";
    document.getElementById("countdownTimer").textContent=str;

    if(diff <= 0) request();
  }

  request();
  setInterval(updateTimer, 1000);