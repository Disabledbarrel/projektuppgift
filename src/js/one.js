/*Webbutveckling III
Elin Larsson HT-19
*/

/* document.getElementById('addCourse').addEventListener('submit', addCourse); // För att läsa in till databas
window.addEventListener("load", getText); // Laddar in kurser från databas

function getText() {
    fetch('http://studenter.miun.se/~ella1800/dt173g/moment5_steg1/api/course/read.php') // Hämtar med get
    .then((msg) => msg.json())
    .then((msg) => {
        let output = '<h2>Kurser jag läst:</h2><table class="courses">'; // Skriver ut till DOM
        msg.data.forEach(function(course) {
            output += `
                <tr>
                    <th>
                        <h4>Kurskod:</h4>
                    </th>
                    <th>
                        <h4>Kursnamn:</h4>
                    </th>
                    <th>
                        <h4>Progression</h4>
                    </th>
                    <th>
                        <h4>Kursplan:</h4>
                    </th>
                </tr>
                <tr>
                    <td>
                        ${course.code}
                    </td>
                    <td>
                        ${course.name}
                    </td>
                    <td>
                        ${course.progression}
                    </td>
                    <td>
                        <a href="${course.course_syllabus}" target="_blanc">Webblänk</a>
                    </td>
                </tr>
            `;
        });
        output += '</table>'
        document.getElementById('output').innerHTML = output;
    })
    .catch((err) => console.log(err))

}

function addCourse(e) { // Lägga till kurser med POST
    e.preventDefault();

    let code = document.getElementById('code').value;
    let name = document.getElementById('name').value;
    let progression = document.getElementById('progression').value;
    let plan = document.getElementById('plan').value;

    if(code != '' && name != '' && progression != '' && plan != '') {
        fetch('http://studenter.miun.se/~ella1800/dt173g/moment5_steg1/api/course/create.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({code:code, name:name, progression:progression, course_syllabus:plan})
        })
        .then((msg) => {
            document.getElementById('output').innerHTML = '';
            getText();
            document.getElementById('code').value = '';
            document.getElementById('name').value ='';
            document.getElementById('progression').value ='';
            document.getElementById('plan').value ='';
        })
 
    }
}
*/
