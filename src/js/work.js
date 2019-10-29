/*Webbutveckling III
Elin Larsson HT-19
*/
window.addEventListener("load", getWork); // Laddar in utbildning från databas

function getWork() {
  fetch(
    "http://studenter.miun.se/~ella1800/dt173g/projekt_api/api/api/work/read.php"
  ) // Hämtar med get
    .then(msg => msg.json())
    .then(msg => {
      let output = ""; // Skriver ut till DOM
      if (msg.data != null) {
        msg.data.forEach(function(work) {
          output += `
                 <div class="job">
                    <h4>Befattning: ${work.title}</h4>
                    <h5>Arbetsplats: ${work.workplace}</h5>
                    <p>${work.description}</p>
                    <p>Start: ${work.startdate}</p>
                    <p>Slut: ${work.stopdate}</p>
                 </div>
              `;
        });
        document.getElementById("output2").innerHTML = output;
      } else {
        document.getElementById("output2").innerHTML =
          "<p>Inga utbildningar hittades</p>";
      }
    })
    .catch(err => console.log(err));
}
