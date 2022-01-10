module.exports = internTemplateData => {
  const { employeeName, employeeId, employeeEmail, internSchool }
  return `

    <div class="p-2 border border-warning mt-3 p-3">
      <div class="bg-warning p-2 text-white">
        <h2>${employeeName}</h2>
        <h3>Intern</h3>
      </div>
      <div>
        <ul class="p-2">
          <li>User ID : ${employeeId}</li>
          <li>email address: <a href="mailto:${employeeEmail}">${employeeEmail}</a></li>
          <li>school: ${internSchool} </li>
        </ul>
      </div>
    </div>
  `
}