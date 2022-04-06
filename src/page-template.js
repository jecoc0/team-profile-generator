module.exports = (pageTemplateData) => {

  // finding the object of manager in the entire array based on their employeeJobClass of 'manager'
  const manager = pageTemplateData.find((employee) => employee.employeeJobClass === 'manager');
  // same here. Filtering employees based on job class and returnin a new array
  const employees = pageTemplateData.filter((employee) => employee.employeeJobClass !== 'manager') || []

  //since we don't need to do any looping and we know there is just 1 manager, we can just destructure the data out of the object
  const { managerName, managerId, managerEmail, managerOffice } = manager
  return `
  <html>

    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${managerName}'s Team</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
    <nav class="navbar navbar-expand-lg navbar-danger bg-danger justify-content-center">
    <h2 class="text-white">${managerName}'s Team</h2>
  </nav>
      <section class="d-flex flex-row justify-content-center flex-wrap mt-5">
        <div class="p-2 border border-warning mt-3 p-3">
          <div class="bg-warning p-2 text-white">
            <h2>${managerName}</h2>
            <h3>Manager</h3>
          </div>
          <div>
            <ul class="p-2">
              <li>User ID : ${managerId}</li>
              <li>email address: <a href="mailto:${managerEmail}">${managerEmail}</a></li>
              <li>Office Number: ${managerOffice}</li>
            </ul>
          </div>
        </div>
        ${employees?.map(
    ({
      employeeName,
      employeeJobClass,
      employeeId,
      employeeEmail,
      employeeGithub,
      internSchool
    }) => {
      return `<div class="p-2 border border-warning mt-3 p-3">
      <div class="bg-warning p-2 text-white">
        <h2>${employeeName}</h2>
        <h3>${employeeJobClass}</h3>
      </div>
      <div>
        <ul class="p-2">
          <li>User ID : ${employeeId}</li>
          <li>email address: <a href="mailto:${employeeEmail}">${employeeEmail}</a></li>
          <li>${employeeGithub ? `github: <a href="https://github.com/${employeeGithub}">` : "school:"} ${employeeGithub || internSchool} ${employeeGithub ? "</a>" : ""} </li> 
        </ul>
      </div>
    </div>`;
    }
  )}
      </section>
    </body>
  </html>
  `;
}