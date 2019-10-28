/*Webbutveckling III
Elin Larsson HT-19
*/
window.addEventListener("load", getProjects); // Laddar in projekt från databas

function getProjects() {
  fetch(
    "http://studenter.miun.se/~ella1800/dt173g/projekt_api/api/api/project/read.php"
  ) // Hämtar med get
    .then(msg => msg.json())
    .then(msg => {
      let output = ""; // Skriver ut till DOM
      if (msg.data != null) {
        msg.data.forEach(function(project) {
          output += `
                 <div class="item">
                    <a href="${project.url}" target="_blank">
                        <img src="${project.image}" alt="project">
                    </a>
                    <div class="item-text">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="${project.url}" target="_blank" class="project_link">Till projektet <i class="fas fa-external-link-alt"></i></a>
                    </div>
                 </div>
              `;
        });
        document.getElementById("projects").innerHTML = output;
      } else {
        document.getElementById("projects").innerHTML =
          "<p>Ingaprojekt hittades</p>";
      }
    })
    .catch(err => console.log(err));
}
