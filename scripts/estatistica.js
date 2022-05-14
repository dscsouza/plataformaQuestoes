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
    .collection('questoes')..get().then(snapshot=>{
        snapshot.forEach(doc=>{
            estatistica.push(doc.data())
        })

    }).then(()=>{

        estatistica.find(q => {q.conceito === "certa"?qtdCerta++:qtdErrada++})
        totalResolvidas = estatistica.length
        console.log(`Você respondeu ${totalResolvidas} questões. Acertou ${qtdCerta}, errou ${qtdErrada}, \n ${((qtdCerta/totalResolvidas)*100).toFixed(2)}% de acertos e ${((qtdErrada/totalResolvidas) * 100).toFixed(2)}% de erro.`)
        
        
    })
}