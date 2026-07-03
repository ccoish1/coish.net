(function () {
  var lightCone = document.getElementById("light-cone");
  var lampHalo = document.getElementById("lamp-halo");
  var groundLit = document.getElementById("ground-lit");
  var shadowText = document.getElementById("shadow-text");
  var scene = document.querySelector(".scene");
  var flames = document.querySelectorAll(".flame, .flame-core");
  var glasses = document.querySelectorAll(".lantern-glass");

  if (!lightCone || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var intensity = 1;

  function applyIntensity(value) {
    intensity = value;
    lightCone.style.opacity = String(value);
    if (lampHalo) lampHalo.style.opacity = String(0.55 + value * 0.45);
    if (groundLit) groundLit.style.opacity = String(0.65 + value * 0.35);
    if (shadowText) {
      shadowText.style.opacity = String(0.72 + value * 0.2);
      shadowText.style.filter = "blur(" + (1.2 - value * 0.5) + "px)";
    }
    flames.forEach(function (el) {
      el.style.opacity = String(0.7 + value * 0.3);
      el.style.transform = "scale(" + (0.9 + value * 0.12) + ")";
    });
    glasses.forEach(function (el) {
      el.style.opacity = String(0.65 + value * 0.35);
    });
  }

  function nextFlickerDelay() {
    return 40 + Math.random() * 120;
  }

  function tick() {
    var roll = Math.random();

    if (roll < 0.06) {
      // Brief blackout / heavy dim
      applyIntensity(0.15 + Math.random() * 0.2);
      scene.classList.add("is-dim");
      scene.classList.remove("is-flash");
      setTimeout(tick, 60 + Math.random() * 140);
      return;
    }

    if (roll < 0.1) {
      // Sharp flash then recover
      applyIntensity(1.15 + Math.random() * 0.15);
      scene.classList.add("is-flash");
      scene.classList.remove("is-dim");
      setTimeout(function () {
        applyIntensity(0.75 + Math.random() * 0.2);
        scene.classList.remove("is-flash");
        setTimeout(tick, nextFlickerDelay());
      }, 30 + Math.random() * 50);
      return;
    }

    if (roll < 0.25) {
      // Quick stutter
      applyIntensity(0.5 + Math.random() * 0.35);
      scene.classList.add("is-dim");
    } else {
      // Normal warm flicker
      applyIntensity(0.78 + Math.random() * 0.22);
      scene.classList.remove("is-dim");
    }

    setTimeout(tick, nextFlickerDelay());
  }

  applyIntensity(0.92);
  setTimeout(tick, 200);
})();
