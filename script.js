(function () {
  var lightPool = document.getElementById("light-pool");
  var poolLit = document.getElementById("pool-lit");
  var lanternBloom = document.getElementById("lantern-bloom");
  var shadowText = document.getElementById("shadow-text");
  var flames = document.querySelectorAll(".flame, .flame-core");
  var glasses = document.querySelectorAll(".lantern-glass");

  if (!lightPool || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  function applyIntensity(value) {
    lightPool.style.opacity = String(0.55 + value * 0.45);
    if (poolLit) poolLit.style.opacity = String(0.5 + value * 0.5);
    if (lanternBloom) lanternBloom.style.opacity = String(0.5 + value * 0.5);
    if (shadowText) {
      shadowText.style.opacity = String(0.65 + value * 0.3);
    }
    flames.forEach(function (el) {
      el.style.opacity = String(0.75 + value * 0.25);
      el.style.transform = "scale(" + (0.92 + value * 0.1) + ")";
    });
    glasses.forEach(function (el) {
      el.style.opacity = String(0.7 + value * 0.3);
    });
  }

  function nextDelay() {
    return 50 + Math.random() * 130;
  }

  function tick() {
    var roll = Math.random();

    if (roll < 0.05) {
      applyIntensity(0.12 + Math.random() * 0.18);
      setTimeout(tick, 80 + Math.random() * 120);
      return;
    }

    if (roll < 0.09) {
      applyIntensity(1.05 + Math.random() * 0.1);
      setTimeout(function () {
        applyIntensity(0.7 + Math.random() * 0.2);
        setTimeout(tick, nextDelay());
      }, 40 + Math.random() * 40);
      return;
    }

    applyIntensity(0.75 + Math.random() * 0.25);
    setTimeout(tick, nextDelay());
  }

  applyIntensity(0.9);
  setTimeout(tick, 300);
})();
