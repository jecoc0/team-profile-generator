module.exports = templateData => {
  const { managerName, managerId, managerEmail, managerOffice } = templateData
  return `
  
<!DOCTYPE html>
<html lang="en">

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
  


  </section>

</body>

</html>
`
}