document.getElementById("add-student-btn").addEventListener('click', addStudent )
document.getElementById("add-student-grade").addEventListener('click' , assignGrade)


let students = [];


function addStudent(event) {
    event.preventDefault();
    let name = document.getElementById("student-name").value ;
    let number = document.getElementById("student-number").value ;
    students.push({name, number, grade: ""});
    
    // let tbody = document.getElementById("student-details-input");
    // tbody.innerHTML += `
    //         <tr>
    //             <td>${name}</td>
    //             <td>${number}</td>
    //             <td></td>
    //         </tr>
    //         ` ;

     renderTable();

     // Clear inputs after adding
    document.getElementById("student-name").value = "";
    document.getElementById("student-number").value = "";
     
}




function assignGrade(event) {
    event.preventDefault();
    students = students.map(student =>{
    let grade = "";
    if(student.number >= 90){
        grade = "A";
    } else if(student.number < 90 && student.number >= 75){
        grade = "B";
    } else{
        grade = "C";
    }
     student.grade = grade;
    console.log(student.name, ":", grade);
    return {...student, grade};
    }) ;
  
  
    renderTable();
     analyzeSummary();
    console.log(students);

//     let tbody = document.getElementById("student-details-input");
//     students.forEach(student =>{
//  tbody.innerHTML += `
//      <tr>
//                 <td>${student.name}</td>
//                 <td>${student.number}</td>
//                 <td>${student.grader}</td>
//             </tr>
//     `;
//     })
  
    
}

function renderTable() {
    let tbody = document.getElementById("student-details-input");
    tbody.innerHTML = ""; // clear old rows

    students.forEach(student => {
        tbody.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.number}</td>
                <td>${student.grade || ""}</td>
            </tr>
        `;
    });
}
function analyzeSummary(){
    if(students.length === 0) return;

     // Calculate average marks
    let totalMarks = students.reduce((sum, student) => sum + Number(student.number), 0);
    let average = (totalMarks/students.length).toFixed(2);


    // Find topper
    let topper = students.reduce((top, student) => {
        return Number(student.number) > Number(top.number) ? student : top;
    });

    // Count pass and fail
    let passCount = students.filter(s => s.number >= 40).length;
    let failCount = students.filter(s => s.number < 40).length;


     // Render summary table
    let summaryBody = document.querySelector(".summary-result-body");
    summaryBody.innerHTML = `
        <tr>
            <td>${average}</td>
            <td>${topper.name}</td>
            <td>${passCount}</td>
            <td>${failCount}</td>
        </tr>
    `;


}

