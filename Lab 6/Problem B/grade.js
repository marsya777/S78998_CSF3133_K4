// Error 1  (grade.html, Line 9):  onsubmit="checkMark()" must be onsubmit="return checkMark()", otherwise
//                                 the false returned by validation is ignored and the form is still submitted.
// Error 2  (grade.html, Line 17): onclick="showtable()" must be showTable() - JavaScript is case-sensitive,
//                                 so the button did nothing ("showtable is not defined").
// Error 3  (grade.html, Line 19): <script src="grades.js"> must be "grade.js" - the file name was wrong,
//                                 so no JavaScript was loaded and nothing happened when the button was clicked.
// Error 4  (grade.js, Line 5):    if (name = "") uses assignment (=). It must be a comparison: name === "".
//                                 (This is why an empty name was accepted.)
// Error 5  (grade.js, Line 9):    isNan() must be isNaN() (capital N).
// Error 6  (grade.js, Line 14):   mark < 0 && mark > 100 can never be true. It must use OR: mark < 0 || mark > 100.
//                                 (This is why 150 was accepted.)
// Error 7  (grade.js, Line 28):   getElementByID must be getElementById (lowercase d).
// Error 8  (grade.js, Line 30):   style.colour must be style.color (American spelling in CSS/DOM).
// Error 9  (grade.js, Line 31):   return true makes the form submit and reload the page, so the result
//                                 disappears immediately. It must be return false.
// Error 10 (grade.js, Line 38):   for (let i = 1; ...) skips the first row (grade A). It must start at i = 0.
// Error 11 (grade.js, Line 42):   innerHtml must be innerHTML, so the table was never displayed.

// checkMark(): validate input, work out the grade and show it 
function checkMark() {
  let name = document.forms["gradeForm"]["name"].value.trim();
  let mark = document.forms["gradeForm"]["mark"].value.trim();

  // Empty name (Error 4 fixed: === instead of =)
  if (name === "") {
    alert("Name must be filled out.");
    return false;
  }

  // (Part 2): empty mark check
  if (mark === "") {
    alert("Mark field cannot be empty.");
    return false;
  }

  // Non-numeric mark (Error 5 fixed: isNaN)
  if (isNaN(mark)) {
    alert("Please enter a valid numeric value.");
    return false;
  }

  mark = parseFloat(mark);

  // Out-of-range mark (Error 6 fixed: || instead of &&)
  if (mark < 0 || mark > 100) {
    alert("Mark must be between 0 and 100.");
    return false;
  }

  // Work out the grade
  let grade;
  let colour;              // (Part 2): colour depends on the grade
  if (mark >= 80) {
    grade = "A";
    colour = "green";
  } else if (mark >= 65) {
    grade = "B";
    colour = "green";
  } else if (mark >= 50) {
    grade = "C";
    colour = "orange";
  } else {
    grade = "F";
    colour = "red";
  }

  // Show the result (Errors 7 and 8 fixed: getElementById, style.color)
  let result = document.getElementById("result");
  result.innerHTML = name + " got grade " + grade;
  result.style.color = colour;

  // (Part 2): show the date and time the grade was checked
  document.getElementById("checkedOn").innerHTML = "Checked on: " + new Date();

  // Error 9 fixed: return false so the page is not reloaded and the result stays
  return false;
}

// (Part 2): randomMark() puts a whole number from 0 to 100 into the mark field 
function randomMark() {
  document.getElementById("mark").value = Math.floor(Math.random() * 101);
}

// showTable(): display the grade table using a loop
function showTable() {
  let grades = ["A", "B", "C", "F"];
  let ranges = ["80-100", "65-79", "50-64", "0-49"];
  let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";

  // Error 10 fixed: start at 0 so that all four grades appear
  for (let i = 0; i < grades.length; i++) {
    tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
  }
  tableHTML += "</table>";

  // Error 11 fixed: innerHTML (capital HTML)
  document.getElementById("tableContainer").innerHTML = tableHTML;
}
