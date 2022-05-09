(function () {
  const time = getTimeString(new Date());
  document.getElementById("ment").innerText = `Good ${time}`;
})();

function getTimeString(date) {
  const hours = date.getHours();
  if (hours >= 5 && hours <= 10) return "Morning! ☀️";
  if (hours >= 11 && hours <= 17) return "Afternoon! 🏙";
  if (hours >= 18 && hours <= 21) return "Evening! 🌉";
  else return "Night.. 🌙";
}
