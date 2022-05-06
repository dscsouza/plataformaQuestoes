function login(email, password){
    document.querySelector("#spin").classList.remove("d-none")
   console.log("função login", auth)
    //persistência de dados do usuário
    //SESSION - fica logado na aba atual, mas em novas abas não loga
    //LOCAL - pode abrir várias abas que continua logado
    //NONE - SE ATUALIZAR a página o usuário desloga
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() =>{

        auth.signInWithEmailAndPassword(email, password)
        .then( loggedUser => {
            console.log("Login efetuado: ",auth.currentUser);
            console.log("UID do usuário: ", firebase.auth().currentUser.uid)
            
            
                        
            document.querySelector("#spin").classList.add("d-none")
            window.location.href = "./questoes.html";
        })        
        .catch(error =>{
            console.log("Ocorreu algum erro na autenticação: ", error);
            document.querySelector("#spin").classList.add("d-none")
            document.querySelector('#alertTopContainer').innerHTML = `<div id="alertTop" class="alert alert-danger alert-dismissible fade show  fixed-top shadow" role="alert"> 
            <div class="row">
            <div class="col-sm">
            ${error.message}
            </div>
            <div class="col-sm">
            <button type="button" class="close  text-right" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span>
            </div>
            </div>
            
            
            </div>`
      
        })


    }).catch(error =>{
        console.log("Ocorreu algum erro na presistência dos dados:  ", error);
        document.querySelector("#spin").classList.add("d-none")
    })
    
}



