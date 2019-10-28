/*Webbutveckling III
Elin Larsson HT-19
*/
window.addEventListener("load", getEducation); // Laddar in utbildning från databas

function getEducation() {
  fetch(
    "http://localhost/projekt_webbutvecklingIII/projekt_API/api/education/read.php"
  ) // Hämtar med get
    .then(msg => msg.json())
    .then(msg => {
      let output = ""; // Skriver ut till DOM
      if (msg.data != null) {
        msg.data.forEach(function(education) {
          output += `
                 <div class="job">
                    <h4>${education.course}</h4>
                    <h5>Lärosäte: ${education.school}</h5>
                    <p>Start: ${education.startdate}</p>
                    <p>Slut: ${education.stopdate}</p>
                 </div>
              `;
        });
        document.getElementById("output").innerHTML = output;
      } else {
        document.getElementById("output").innerHTML =
          "<p>Inga utbildningar hittades</p>";
      }
    })
    .catch(err => console.log(err));
}
