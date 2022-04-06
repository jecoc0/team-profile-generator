module.exports = engineerTemplateData => {
  const { employeeName, employeeEmail, employeeGithub, employeeId } = engineerTemplateData

  return `
    <div class="p-2 border border-warning mt-3 p-3">
      <div class="bg-warning p-2 text-white">
        <h2>${employeeName}</h2>
        <h3>Engineer</h3>
      </div>
      <div>
        <ul class="p-2">
          <li>User ID : ${employeeId}</li>
          <li>email address: <a href="mailto:${employeeEmail}">${employeeEmail}</a></li>
          <li>github: <a href="https://github.com/${employeeGithub}">${employeeGithub}</a></li>
        </ul>
      </div>
    </div>
  `
}