keyComment = []

meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho'
        ,'Agosto','Setembro','Outubro','Novembro','Dezembro']

semana = ['domingo','segunda-feira','terça-feira','quarta-feira'
        ,'quinta-feira','sexta-feira','sábado']

function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
}

function exibirComentarios(arrayComment){
    nodeComentario = " "
    j = 0;
    
    //cria um array secundário que armazena os segundos e os índices
    var mapped = arrayComment.map(function(el, i) {
        return { index: i, value: el.datahora.seconds};
    })
    //ordena o array secundário pelos valores em ordem crescente
    //mantendo os índices atrelados a cada valor
    mapped.sort(function(a, b) {
        return +(a.value > b.value) || +(a.value === b.value) - 1;
    });
    //retorna em result, o array comments organizado
    //em ordem crescente, levando em consideração os índices em mapped
    var result = mapped.map(function(el){
        return comments[el.index];
    });

    result.forEach((arg)=>{
        console.log(arg)
        console.log(arg.datahora.seconds)
        dataPublicacao = new Date(arg.datahora.seconds *1000)

        let diaSemana = semana[dataPublicacao.getDay()]
        let dia = dataPublicacao.getDate()
        let mes = meses[dataPublicacao.getMonth()]
        let ano = dataPublicacao.getFullYear()

        let hora = addZero(dataPublicacao.getHours())
        let minuto = addZero(dataPublicacao.getMinutes())

        if (arg.autor == firebase.auth().currentUser.email){
            deleteComment = "delete-comment-on"
        } else {
            deleteComment = "delete-comment-off"
        }
        nodeComentario += `
        <div class="${deleteComment} comentClass card border-secondary mb-2 ${textColor}" style="${cardsComent}; text-align: left;">
          <div class="card-header small">Publicado ${diaSemana} dia ${dia} de ${mes} de ${ano} às ${hora}:${minuto}h</div>
          <div class="card-body">
            <h5 class="card-title ">${arg.autor}</h5>
            <p class="card-text">
            ${arg.comentario}
            </p>
          </div>
            <div class="p-2 ${deleteComment}" style="text-align: right;" onclick="deletarComentario(this)" data-key=${keyComment[j]}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="lixeira bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </div>
        </div>`;

        document.querySelector("#list-coment").innerHTML = nodeComentario
        j++
        

    })

}




function publicarComentario(){





    //pegar hora do servidor do firebase
    //firebase.database.ServerValue.TIMESTAMP

    //usuarioLogado
    publicacao = document.querySelector("#coment").value

    if (publicacao == ""){
        alerta("Digite um comentário antes de publicar...", false, "info")
        return
    }

    console.log(`Autor: ${firebase.auth().currentUser.email} - comentário: ${publicacao}`)
    datahoraAtual = firebase.default.firestore.Timestamp.now()


    //pega a questão atual e converte para number
    //a fim de posibilitar a consulta ao documento
    indexQuest = (questions[questaoAtual].ID).toString()


    idUser = firebase.auth().currentUser.uid
    userLogado = firebase.auth().currentUser.email



db.collection(questoes).doc(indexQuest)
    .collection('comentarios').doc().set({
        comentario: publicacao,
        datahora: datahoraAtual,
        autor: userLogado
    }).then(()=>{
        resgatarComentarios()
        alerta("Comentário incluído com sucesso.", false, "info")
    }).catch(err=>{
        alerta("Ocorreu um erro. Verifique sua conexão com a internet.", false, "danger")
    })
    document.querySelector("#coment").value = ""
}

function resgatarComentarios(){
    comments = []
    keyComment = []
    idUser = firebase.auth().currentUser.uid

    //pega a questão atual e converte para number
    //a fim de posibilitar a consulta ao documento
    indexQuest = (questions[questaoAtual].ID).toString()

    
    

    //consulta os comentários no banco de dados
    //eles ficam salvos em uma collection dentro da questão
    db.collection(questoes).doc(indexQuest)
    .collection('comentarios').get().then(snapshot=>{
        snapshot.forEach(doc=>{
            keyComment.push(doc._delegate._key.path.segments[doc._delegate._key.path.segments.length-1]) 
            //doc._delegate._document.key.segments
            comments.push(doc.data())
        })

    }).then(()=>{
        exibirComentarios(comments)
    })
    
    
}


function deletarComentario(elemento){
    comentarioDeletar = elemento.dataset.key
    indexQuest = (questions[questaoAtual].ID).toString()



    db.collection(questoes).doc(indexQuest).collection('comentarios').doc(comentarioDeletar).delete().then(() => {
        exibirQuestao(questaoAtual)
        alerta("Comentário excluído com sucesso.", false, "info")
    }).catch((error) => {
        exibirQuestao(questaoAtual)
        alerta("Ocorreu algum erro ao excluir o comentário. Tente novamente...", false, "warning")
    });


}
