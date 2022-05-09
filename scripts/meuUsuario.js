

function userMenu(){
    escuro = localStorage.getItem("escuro")
    console.log("modal aberto")
    idUser = firebase.auth().currentUser.uid
    document.querySelector("#emailUsuario").innerHTML = `Email: ${firebase.auth().currentUser.email}`
 
    //ajusta o botão darkMode para posição correta
    //com base na seleção do usuário
    if (escuro=="true"){
        document.querySelector("#noturno-usuario").checked = true;
    } else if (escuro=="false") {
        document.querySelector("#noturno-usuario").checked = false;
    }

  }

  function exibirDadosUser(){
    idUser = firebase.auth().currentUser.uid
    
    
}

