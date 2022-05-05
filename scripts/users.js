



function questaoResolvida(certoErrado){
    
    idUser = firebase.auth().currentUser.uid //recupera o uID do usuário
    
    //utiliza o método set(), caso o documento com uID  do usuário não tenha sido criado, ele cria nesse momento
   


                 db.collection("usuarios").doc(idUser)
                 .collection("questoes").doc((questions[questaoAtual].ID).toString()).set({
                     conceito: certoErrado,
                 }).then(()=>{
                     resgatarComentarios()
                     alerta("Questão registrada.", false, "info")
                 }).catch(err=>{
                     alerta("Ocorreu um erro. Verifique sua conexão com a internet.", false, "danger")
                 })



}