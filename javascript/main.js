(function () {
  const findsomeone = document.getElementById("findsomeone")
  const findprofile = document.getElementById("findprofile")
  const client_id = "5e97702878fc61c32cc3"
  const client_secret = "4da0c6f9f726879ea0f44ffc2b889fa58c5f364d"
  const url = "https://api.github.com/users"
  const count = 7
  const sort = "created: asc"

  async function getUser(usuario) {
    const findprofileResponse = await fetch(
      `${url}/${usuario}?client_id=${client_id}&client_secret=${client_secret}`
    );

    const repositoryResponse = await fetch(
        `${url}/${usuario}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
    );

    const profile = await findprofileResponse.json()
    const repository = await repositoryResponse.json()

    return {profile, repository}
  }

  function presentProfile(usuario) {
    findprofile.innerHTML = `<div class="row mt-3">
        <div class="col-md-4">
          <div class="card bg-dark" style="width: 18rem" > 
            <img class="card-img-top" src="${usuario.avatar_url}" alt="foto perfil" />
            <ul class="list-group list-group-flush">
              <li class="list-group-item bg-dark text-white">Repositórios: <span class="badge badge-light">${usuario.public_repos}</span></li>
              <li class="list-group-item bg-dark text-white">Seguidores: <span class="badge badge-light">${usuario.followers}</span></li>
              <li class="list-group-item bg-dark text-white">Seguindo: <span class="badge badge-light">${usuario.following}</span></li>
            </ul>
            <div class="card-body">
              <a href="${usuario.html_url}" target="_blank" class="btn btn-light btn-block">Ver Perfil</a>
            </div>
          </div>
        </div>
        <div class="col-md-8"><div id="repos"></div></div>
      </div>
      <footer class=" bg-dark text-center text-white mt-3">
      Projeto Criado Por <a class="text-white" href="https://github.com/Ewerton-TI">Ewerton de Oliveira</a>
    </footer>`
  }

 function presentRepository(repository){
        let output = ''

        repository.forEach(reposi => {
            output += `<div class="card card-body mb-2 bg-dark">
            <div class="row">
                <div class="col-md-6"><a class="text-white" href="${reposi.html_url}" target="_blank">${reposi.name}</a></div>
                <div class="col-md-6">
                    <span class="badge badge-light">Stars: ${reposi.stargazers_count}</span>
                    <span class="badge badge-light">Forks: ${reposi.forks_count}</span>
                </div>
            </div>
        </div>`
        })
        
        document.getElementById("repos").innerHTML = output;
  }

  findsomeone.addEventListener("keyup", (n) => {
    const usuario = n.target.value

    if (usuario.length > 0) {
      getUser(usuario).then(res => {
      presentProfile(res.profile);
      presentRepository(res.repository);
    })
    }
  })
})()
