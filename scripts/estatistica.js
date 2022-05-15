estatistica = []
let qtdCerta = 0
let qtdErrada = 0
let msg = ' '

function resgatarDadosEstatistica(tag){
    estatistica = []
    qtdCerta = 0
    qtdErrada = 0
    idUser = firebase.auth().currentUser.uid


    //consulta os comentários no banco de dados
    //eles ficam salvos em uma collection dentro da questão
    func1 = db.collection(usuarios).doc(idUser.toString())
    .collection('questoes').get().then(snapshot=>{
        snapshot.forEach(doc=>{
            estatistica.push(doc.data())
        })

    }).then(()=>{

        estatistica.find(q => {q.conceito === "certa"?qtdCerta++:qtdErrada++})
        totalResolvidas = estatistica.length
        console.log(`Você respondeu ${totalResolvidas} questões. Acertou ${qtdCerta}, errou ${qtdErrada}, \n ${((qtdCerta/totalResolvidas)*100).toFixed(2)}% de acertos e ${((qtdErrada/totalResolvidas) * 100).toFixed(2)}% de erro.`)
        
        
    })
    
    func1.then(()=>{

        msg = `Você respondeu ${totalResolvidas} questões. Acertou ${qtdCerta}, errou ${qtdErrada}. Ou seja, está com \n ${((qtdCerta/totalResolvidas)*100).toFixed(2)}% de acertos e ${((qtdErrada/totalResolvidas) * 100).toFixed(2)}% de erro.`

        exibirEstatiscas()
    })

}

function exibirEstatiscas(){
  
    document.querySelector("#resultadoEstatistica").innerHTML = msg
   

}

function ultimaVezResolvida(){

    //FALTA IMPLEMENTAR ESSA FUNÇÃO
    //TEREMOS QUE PESQUISAR SE A QUESTÃO EXISTE
    //CASO EXISTA EXIBIR DISCRETAMENTE UMA MENSAGEM SE O USUÁRIO JÁ RESPONDEU OU NÃO,
    //SE ACERTOU OU NÃO,  E O DIA QUE O FEZ




    idUser = firebase.auth().currentUser.uid
    campoAnotacao = document.querySelector("#text-anotacoes")
    
   //pega a questão atual e converte para number
    //a fim de posibilitar a consulta ao documento
    indexQuest = (questions[questaoAtual].ID).toString()



    func1 = db.collection(usuarios).doc(idUser.toString())
    .collection('questoes').get().then(snapshot=>{
        snapshot.forEach(doc=>{
            estatistica.push(doc.data())
        })

    }).then(()=>{

        estatistica.find(q => {q.conceito === "certa"?qtdCerta++:qtdErrada++})
        totalResolvidas = estatistica.length
        console.log(`Você respondeu ${totalResolvidas} questões. Acertou ${qtdCerta}, errou ${qtdErrada}, \n ${((qtdCerta/totalResolvidas)*100).toFixed(2)}% de acertos e ${((qtdErrada/totalResolvidas) * 100).toFixed(2)}% de erro.`)
        
        
    })
}



// TESTES UPLOAD DAS IMAGENS DOS USUÁRIOS E DE EVENTUAIS IMAGENS DAS QUESTÕES

// AO FINALIZAR, PASSAR PARA UM NOVO ARQUIVO


var fileElem = ''

//fica verificando se houve alteração no input de UPLOAD DA IMAGEM DO AVATAR
document.getElementById("uploadInput").addEventListener("change", arquivoSelecionado, false);


function selecionarArquivo(){

  fileElem = document.getElementById("uploadInput");
  if (fileElem) {
    fileElem.click();
  }
  

}

function arquivoSelecionado(){
  console.log(fileElem.files[0])
  uploadArquivo(fileElem.files[0])
}



function uploadArquivo(file){
    
    idUser = (firebase.auth().currentUser.uid).toString()
    var uploadTask = storageRef.child('imgUsers/'+ idUser).put(file);

    // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);

      //salva no banco de dados, no registro do usuário, a foto de avatar escolhida
      db.collection("usuarios").doc(idUser)
                 .collection("configs").doc('avatar').set({
                    url:  downloadURL
                 }).then(()=>{
                     resgatarComentarios()
                     alerta("Imagem alterada com sucesso.", false, "info")
                 }).catch(err=>{
                     alerta("Ocorreu um erro. Verifique sua conexão com a internet.", false, "danger")
                 })

    });
  }
);
// [END storage_monitor_upload]



}