!function(){var t=null,e={startBt:document.querySelector("[data-start]"),stopBt:document.querySelector("[data-stop]")};function r(){e.stopBt.setAttribute("disabled",!0)}e.startBt.addEventListener("click",(function(){e.startBt.setAttribute("disabled",!0),e.stopBt.removeAttribute("disabled"),t=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));document.body.style.backgroundColor=t}),1e3)})),e.stopBt.addEventListener("click",(function(){e.startBt.removeAttribute("disabled"),r(),clearInterval(t)})),r()}();
//# sourceMappingURL=01-color-switcher.e0daad9b.js.map