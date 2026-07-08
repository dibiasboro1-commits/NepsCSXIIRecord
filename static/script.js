// ============================================
// Student Management System
// Frontend JavaScript
// ============================================

const API_URL = "";

// ------------------------------
// Utility Functions
// ------------------------------

function showMessage(message, type = "info") {
    const area = document.getElementById("messageArea");
    area.innerHTML = message;
    area.className = type;
}

function hideAllSections() {
    document.querySelectorAll("section").forEach(sec => {
        sec.style.display = "none";
    });
}

function showSection(id) {
    hideAllSections();
    document.getElementById(id).style.display = "block";
}

async function apiRequest(method, url, data = null) {

    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(API_URL + url, options);

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Request Failed");
    }

    return result;
}

// ------------------------------
// Menu Buttons
// ------------------------------

document.getElementById("addBtn").onclick = () => {
    showSection("addSection");
};

document.getElementById("displayBtn").onclick = displayStudents;

document.getElementById("searchBtn").onclick = () => {
    showSection("searchSection");
};

document.getElementById("updateBtn").onclick = () => {
    showSection("updateSection");
};

document.getElementById("deleteBtn").onclick = () => {
    showSection("deleteSection");
};

document.getElementById("exitBtn").onclick = () => {
    showSection("exitSection");
};

// ------------------------------
// Default Section
// ------------------------------

hideAllSections();
showSection("addSection");

// ------------------------------
// Add Student
// ------------------------------

document.getElementById("addForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const student = {

        Roll_No: parseInt(document.getElementById("addRollNo").value),

        Name: document.getElementById("addName").value,

        Class: document.getElementById("addClass").value,

        Section: document.getElementById("addStudentSection").value,

        Marks: parseFloat(document.getElementById("addMarks").value)

    };
    console.log(student);
    console.log("Section value =", document.getElementById("addSection").value);
    console.log("Section element =", document.getElementById("addSection"));

    try{

        const result = await apiRequest(
            "POST",
            "/students",
            student
        );

        showMessage(result.message,"success");

        document.getElementById("addForm").reset();

    }

    catch(error){

        showMessage(error.message,"error");

    }

});

// ------------------------------
// Display Students
// ------------------------------

async function displayStudents(){

    showSection("displaySection");

    try{

       const response = await apiRequest(
    "GET",
    "/students"
);

const students = response;

        const container =
        document.getElementById(
            "studentsTableContainer"
        );

        if(students.length===0){

            container.innerHTML="<h3>No Records Found</h3>";

            return;

        }

        let html=`

        <table border="1">

        <tr>

        <th>Roll No</th>

        <th>Name</th>

        <th>Class</th>

        <th>Section</th>

        <th>Marks</th>

        </tr>

        `;

        students.forEach(student=>{

            html+=`

            <tr>

            <td>${student.Roll_No}</td>

            <td>${student.Name}</td>

            <td>${student.Class}</td>

            <td>${student.Section}</td>

            <td>${student.Marks}</td>

            </tr>

            `;

        });

        html+="</table>";

        container.innerHTML=html;

    }

    catch(error){

        showMessage(error.message,"error");

    }

}

// ------------------------------
// Search Student
// ------------------------------

document.getElementById("searchForm").addEventListener("submit",async function(e){

    e.preventDefault();

    const roll=

    document.getElementById("searchRollNo").value;

    try{

      const response = await apiRequest(
    "GET",
    "/students/" + roll
);

const student = response;

        document.getElementById("searchResult").innerHTML=`

        <h3>Student Found</h3>

        <p><b>Roll No:</b> ${student.Roll_No}</p>

        <p><b>Name:</b> ${student.Name}</p>

        <p><b>Class:</b> ${student.Class}</p>

        <p><b>Section:</b> ${student.Section}</p>

        <p><b>Marks:</b> ${student.Marks}</p>

        `;

    }

    catch(error){

        showMessage(error.message,"error");

    }

});
// ------------------------------
// Update Student
// ------------------------------

document.getElementById("updateForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const roll = document.getElementById("updateRollNo").value;

    const sectionValue = document.getElementById("updateSectionInput").value;

    console.log("Section =", sectionValue);

    const student = {

    Name: document.getElementById("updateName").value,

    Class: document.getElementById("updateClass").value,

    Section: sectionValue,

    Marks: parseFloat(document.getElementById("updateMarks").value)

};

    console.log(student);
    console.log(document.getElementById("updateSectionInput"));
    try{

        const result = await apiRequest(

            "PUT",

            "/students/" + roll,

            student

        );

        showMessage(result.message,"success");

        document.getElementById("updateForm").reset();

    }

    catch(error){

        showMessage(error.message,"error");

    }

});


// ------------------------------
// Delete Student
// ------------------------------

document.getElementById("deleteForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const roll = document.getElementById("deleteRollNo").value;

    try{

        const result = await apiRequest(

            "DELETE",

            "/students/" + roll

        );

        document.getElementById("deleteResult").innerHTML =

        "<h3>" + result.message + "</h3>";

        showMessage(result.message,"success");

        document.getElementById("deleteForm").reset();

    }

    catch(error){

        showMessage(error.message,"error");

    }

});


// ------------------------------
// Check Backend Connection
// ------------------------------

async function checkBackend(){

    try{

        await fetch("/");

        console.log("Backend Connected");

    }

    catch(error){

        console.log("Backend Not Running");

    }

}


// ------------------------------
// Initialize App
// ------------------------------

window.onload = function(){

    hideAllSections();

    showSection("addSection");

    checkBackend();

};