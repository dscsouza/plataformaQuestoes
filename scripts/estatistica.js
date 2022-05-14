estatistica = []
let qtdCerta = 0
let qtdErrada = 0 

function resgatarDadosEstatistica(){
    estatistica = []
    idUser = firebase.auth().currentUser.uid


    //consulta os comentários no banco de dados
    //eles ficam salvos em uma collection dentro da questão
    db.collection(usuarios).doc(idUser.toString())
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