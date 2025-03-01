(function() {
  var totalDuration = 80 * 1000;
  var videoClickDuration = 1000; 
  var clickInterval = 1; 
  var buttonClickCount = 20; 

  var automationStart = Date.now();

  var video = document.querySelector("video");
  if (!video) {
    console.log("No video element found.");
    return;
  }

  var buyButton = document.querySelector(".buyButton");
  if (!buyButton) {
    console.log("No buy button found.");
    return;
  }

  function runCycle() {
    if (Date.now() - automationStart >= totalDuration) {
      console.log("Automation stopped after " + totalDuration / 1000 + " seconds.");
      return;
    }
    
    var cycleStart = Date.now();
    var videoInterval = setInterval(function() {
      video.click();
      if (Date.now() - cycleStart >= videoClickDuration) {
        clearInterval(videoInterval);
        
        var clicks = 0;
        var buttonInterval = setInterval(function() {
          buyButton.click();
          clicks++;
          if (clicks >= buttonClickCount) {
            clearInterval(buttonInterval);
            runCycle();
          }
        }, clickInterval);
      }
    }, clickInterval);
  }

  console.log("Starting automation for " + totalDuration / 1000 + " seconds...");
  runCycle();
})();
