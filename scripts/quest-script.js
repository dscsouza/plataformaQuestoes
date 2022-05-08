//EXIBE A QUESTÃO

idQuestions = [];
questao = { }
questions = []
questaoAtual = 0;
comments = [];
aleatoria = 1
btnAtivado = false





escuro = localStorage.getItem("escuro")


// INICIALIZA AS VARIÁVEIS NO MODO CLARO
    table = "table-sm"
    back = "bg-light"
    textColor = "text-dark"
    textDark = "text-dark"
    navQuestion = "navbar-light bg-light"
    btnNavi = "btn-outline-light text-primary"
    btnPublicar = "btn-outline-dark"
    document.body.style.setProperty('--texto-questao', 'black')
    document.body.style.setProperty('--bg-color-body', 'white')
    styleTextArea = " "
    cardsComent = "max-width: 100%;"

    console.log("modo escuro desligado", escuro)
// FIM DA INCIALIZAÇÃO DAS VARIÁVEIS REFERENTES AO AMBIENTE



if (escuro == "true"){
    table = "table-dark text-white"
    textColor = "text-dark"
    textDark = ""
    back = "bg-dark text-white"
    navQuestion = "navbar-dark bg-transparent"
    btnPublicar = "btn-outline-light"
    btnNavi = "btn-secondary text-black"
    document.body.style.setProperty('--texto-questao', 'white')
    document.body.style.setProperty('--bg-color-body', 'rgba(0, 0, 0, 0.803)')
    styleTextArea ="background-color: darkgrey; color:white;"
    cardsComent = "max-width: 100%; background-color: darkgrey; color:white;"

    console.log("modo escuro ligado", escuro)
    

} else if (escuro == "false")  {
    table = "table-sm"
    back = "bg-light"
    textColor = "text-black"
    textDark = "text-dark"
    navQuestion = "navbar-light bg-light"
    document.body.style.setProperty('--texto-questao', 'black')
    document.body.style.setProperty('--bg-color-body', 'white')
    btnNavi = "btn-secondary text-black"
    btnPublicar = "btn-outline-dark"
    styleTextArea =" "
    cardsComent = "max-width: 100%;"

    console.log("modo escuro desligado", escuro)


}


//chama a função que consulta o banco de dados e cria os objetos contendo as questões, que serão usados pelas demais funções



exibirQuestaoAleatoria()


//função que lÊ o banco de dados e trás as informações das questões
function allIdQuestion(){
        db.collection(questoes).doc(aleatoria.toString()).get().then(doc=>{
                //inclui a próxima questão no array questions
                questions.push(doc.data()) 
                //mostra o jSon da questão no console
                console.log(questions[questaoAtual])
                //exibe a questão atual, inicialmente esse valor é 0
                exibirQuestao(questaoAtual)

                //a variável  "questaoAtual" é incrementada
                // ou decrementada quando o usuário clica
                //em próxima ou anterior   
        }).
        catch(error=>{
            console.log("Erro ao acesar o banco de dados: ", error)

            document.querySelector('#alertTopContainer').innerHTML = `<div id="alertTop" class=" float-left alert alert-danger fade show  fixed-top shadow " role="alert"> ${error.message}. <a href="./index.html">Voltar para tela de login</a><button type="button" class="close  text-right" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></div>`
        });



        
    
        //rotina que consulta o banco de dados do firebase
        //para fins de testes, está limitada a trazer somente duas questões
        /*
        db.collection(questoes).limit(2).get().then(snapshot=>{
            snapshot.forEach((docs) =>{
               idQuestions.push(docs.id);
               questions.push(docs.data())
            })
        }).then((a)=>{
            
            // CONSTRUIR A INTERFACE AQUI
            // qAtual = buildObjQuestao(idQuestions[1]);
            console.log(questions[0])
            exibirQuestao(questaoAtual)




        }).
        catch(error=>{
            console.log("Erro ao acesar o banco de dados: ", error)

            document.querySelector('#alertTopContainer').innerHTML = `<div id="alertTop" class=" float-left alert alert-danger fade show  fixed-top shadow " role="alert"> ${error.message}. <a href="./index.html">Voltar para tela de login</a><button type="button" class="close  text-right" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></div>`
        });
        */


    
}








// FUNÇÕES LEITURA E ALTERAÇÃO NO BANCO DE DADOS

function imprimeID(){
    console.log(idQuestions[1])

}


/*
//AO ABRIR A PÁGINA QUESTÕES, VERIFICA QUAL USUÁRIO EST[A LOGADO E SALVA NA 
//VARIÁVEL usuarioLogado
auth.onAuthStateChanged(user=>{
    if (user){
        usuarioLogado = user.email;
    }else{
        usuarioLogado = "Ninguém logado"
    }
})
*/






function exibirQuestao(pos){
    
    document.querySelector("#bodyApp").innerHTML=`
    
        <nav class="navbar sticky-top navbar-light bg-transparent w-100">
        
        <div class="d-flex justify-content-center w-100">
            <nav class="navbar bg-semitransparente">
                <button class="navbar-toggler" type="button" onclick="userMenu()" data-toggle="modal" data-target="#interfaceUsuario" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Alterna navegação">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </nav>
            <div class="w-100 bg-primary bg-gradient text-center text-white font-weight-light border rounded">
                Questão ${questions[pos].ID} -
                Ano: ${questions[pos].ano} -

                Banca: ${questions[pos].banca} -

                Órgão: ${questions[pos].orgao} -

                Cargo: ${questions[pos].cargo}
            </div>
            </div>
        </nav>

    <div id = "n1" class="w-100 container ${back}">

        <div id="n2" class="container-fluid alert alert-light text-justify ${back}">
        

        <div id= "n3"class="p-2 shadow-sm text-justify ${table} ${textDark} font-weight-bold mb-2 ml-1">
        ${questions[pos].enunciado}
        </div>

        <table id="tableQuestion" class="table ${table} table-borderless">
            <tbody>
                <tr id="a" class="question ponteiro" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
                    <th scope="row" class="letra align-middle">A</th>
                    <td class="">
                        <div class="">
                            ${questions[pos].alternativas.a}
                        </div>
                    </td>
                </tr>
                <tr id="b" class="question ponteiro" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
                    <th scope="row" class="letra align-middle">B</th>
                    <td>
                    ${questions[pos].alternativas.b}
                    </td>
                </tr>
                <tr id="c" class="question ponteiro" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
                    <th scope="row" class="letra align-middle">C</th>
                    <td colspan="2">
                    ${questions[pos].alternativas.c}
                    </td>
                </tr>
                <tr id="d" class="question ponteiro" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
                    <th scope="row" class="letra align-middle">D</th>
                    <td colspan="2">
                    ${questions[pos].alternativas.d}
                    </td>
                </tr>
                <tr id="e" class="question ponteiro" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
                    <th scope="row" class="letra align-middle">
                    <div> E</div>
                    </th>
                    <td colspan="2">
                    ${questions[pos].alternativas.e}
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="h-25 d-inline-block">
            <div id="qAcertou" class="text-success"></div>
            <div id="qErrou" class="text-danger"></div>
        </div>


        <!--
        <div class="d-flex justify-content-center text-center">
        <div class="w-50">
          <button id="btn-responder" class="btn btn-outline-primary btn-sm" onclick="responder()">Responder</button> 
          </div>
        </div>
        -->
        
    </div>    

        
        <nav id="navQuestion" class="navbar sticky-bottom ${navQuestion} bg-gradient">
    
          <a id="btn-anterior" onclick = "qAnterior()" href="#" tabindex="-1">
          <button id="n4" class="btn ${btnNavi} font-italic ">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
                Anterior 
            </button>
          </a>
          

          <div class="d-flex justify-content-center text-center">
        
          <button id="btn-responder" class="btn btn-primary btn-md" onclick="responder()">Responder</button> 
          
        </div>



          
          <a id="btn-proxima" onclick = "qProxima()" href="#" tabindex="1">
          <button id="n5" class="btn ${btnNavi} font-italic">
            Próxima 
            <svg class="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
            <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
          </a>

          
      
      </nav>`





      document.querySelector("#anotacaoes-comentario").innerHTML=`
<div id="n6" class="container ${back}">
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item">
      <a class="nav-link active" id="coment-tab" data-toggle="tab" href="#comentarios" role="tab" aria-controls="comentarios" aria-selected="true">
        <!-- <img src="./img/ico_comment.png" class="rounded float-left icone" alt="imagem comentário" srcset=""> -->
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
        </svg>
        Comentários
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="anot-tab" data-toggle="tab" href="#anotacoes" role="tab" aria-controls="anotacoes" aria-selected="false">
        <!-- <img src="./img/ico_anotações.png" class="rounded float-left icone" alt="imagem anotações" srcset=""> -->
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
        Anotações
      </a>
    </li>
  </ul>

  <div class="tab-content" id="myTabContent">

    <div class="tab-pane fade show active" id="comentarios" role="tabpanel" aria-labelledby="coment-tab">
      <!-- COMENTÁRIOS -->
      <div id="autor-coment" class="font-weight-light">
        ${firebase.auth().currentUser.email}
      </div>
    

      <div class="input-group mb-2">
        <textarea id="coment" class="form-control" style="${styleTextArea}" aria-label="Digite seu comentário aqui..."  placeholder="Digite seu comentário aqui..."></textarea>
        <div class="input-group-append">
          <button id="publi-coment" class="btn ${btnPublicar} btn-sm" onclick="publicarComentario()">Publicar</button>
        </div>            
      </div>


      <div id="list-coment">

      </div>

    <br><br><br>

    </div>

    <div class="tab-pane fade" id="anotacoes" role="tabpanel" aria-labelledby="anot-tab">
      <!-- ANOTAÇÕES  -->
      <div class="input-group mb-1">
          <textarea id="text-anotacoes" class="form-control border-top-0" style="${styleTextArea}"  aria-label="Suas anotações..." rows="5"></textarea>
      </div>
      <!-- BOTÃO SALVAR ANOTAÇÃO -->
        <div class="row">
            <div class="col-sm">
                
            </div>
            <div class="col-sm">
                
            </div>
            <div class="col-sm">
                
            </div>
            <div class="col-sm">
                
            </div>
            <div class="col-sm">
                <button class="btn btn-primary btn-sm" onclick="salvarAnotacao()"><span id="spin-anot" class="spinner-border spinner-border-sm mr-1 d-none"></span>Salvar</button>
            </div>
          </div>
          <br><br><br>  
    </div>
  </div>
</div>

   </div>
</div>`

 respostaAtual = ' '
 questaoSelecionada = ' '

resgatarComentarios()
exibeAnotacoes(pos)





}

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
            <div class="p-2 ${deleteComment}" style="text-align: right;" onclick="deletarComentario(this)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="lixeira bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </div>
        </div>`;

        document.querySelector("#list-coment").innerHTML = nodeComentario
        

    })

}




function publicarComentario(){

//pegar hora do servidor do firebase
//firebase.database.ServerValue.TIMESTAMP

    //usuarioLogado
    publicacao = document.querySelector("#coment").value
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
}

function resgatarComentarios(){
    comments = []
    idUser = firebase.auth().currentUser.uid

    //pega a questão atual e converte para number
    //a fim de posibilitar a consulta ao documento
    indexQuest = (questions[questaoAtual].ID).toString()


    //consulta os comentários no banco de dados
    //eles ficam salvos em uma collection dentro da questão
    db.collection(questoes).doc(indexQuest)
    .collection('comentarios').get().then(snapshot=>{
        snapshot.forEach(doc=>{
            comments.push(doc.data())
        })

    }).then(()=>{
        exibirComentarios(comments)
    })
    
    
}


function deletarComentario(elemento){
    console.log("deletar comentário", elemento)
}


function exibeAnotacoes(pos){
    idUser = firebase.auth().currentUser.uid
    campoAnotacao = document.querySelector("#text-anotacoes")
    
   //pega a questão atual e converte para number
    //a fim de posibilitar a consulta ao documento
    indexQuest = (questions[questaoAtual].ID).toString()


    db.collection(questoes).doc(indexQuest)
    .collection('anotacoes').doc(idUser)    
    .get().then(snapshot=>{
        if (snapshot.data()){
            console.log(snapshot.data())
            campoAnotacao.value = snapshot.data().anotacao
        } else {
            console.log("Sem anotações para recuperar...")
        }
    }).then((a)=>{
         
       console.log("Banco de dados lido com sucesso...")
    }).
    catch(error=>{
        console.log("Erro ao acesar anotação: ", error)

        // document.querySelector('#alertTopContainer').innerHTML = `<div id="alertTop" class=" float-left alert alert-danger fade show  fixed-top shadow " role="alert"> ${error.message}. <a href="./index.html">Voltar para tela de login</a><button type="button" class="close  text-right" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></div>`
    });


}



function salvarAnotacao(){
    console.log("salvando anotação...")
    $("#spin-anot").toggleClass("d-none")
    anotacoes = document.querySelector("#text-anotacoes").value
    idUser = firebase.auth().currentUser.uid
   
    //pega a questão atual e converte para number
    //a fim de posibilitar a consulta ao documento
    indexQuest = (questions[questaoAtual].ID).toString()

db.collection(questoes).doc(indexQuest)
    .collection('anotacoes').doc(idUser).set({
        anotacao: anotacoes
    }).then(()=>{
        $("#spin-anot").toggleClass("d-none")
        alerta("Anotação salva...", false, "info")
        console.log("anotação salvo...")
    }).catch(err=>{
        $("#spin-anot").toggleClass("d-none")
        console.log("Houve um erro ao salvar: " + err)
    })
    

}





function qAnterior(){
    if (questaoAtual == 0){
        alerta("Você já está na primeira questão.", false, "warning")
    } else {
        questaoAtual --  
        exibirQuestao(questaoAtual)   
    }
    console.log(`ANTERIOR: Questão atual: ${questaoAtual}. Tamanho Array Questions ${questions.length}. ID questão  - ${questions[questaoAtual].ID}`)

   
}

function qProxima(){
         // a próxima questão sempre é uma questão aleatória
        //o histórico de questões é salvo no array
        // questions[0...x]

     
        //só incrementa a variável  questãoAtual, se ela for menor 
        //que a quantidade de questões no array questions
        //isso evita que o sistema tente exibir uma questão que ainda não foi carregada
        if (questaoAtual < questions.length){
            questaoAtual ++
            exibirQuestaoAleatoria()
        } else {
            alerta("Carregando...",false, "warning")
        }
 
        console.log(`PRÓXIMA: Questão atual: ${questaoAtual}. Array Questions ${questions.length}`)         
}


// VERIFICA SE A RESPOSTA ESTÁ CORRETA

function responder(){
    if (respostaAtual == " "){
        alerta("Selecione uma alternativa...", false, "warning")
        return
    }

    respostaCerta = questions[questaoAtual].alternativas.gabarito
    console.log(`Questao atual: ${questaoAtual}, Resposta Certa: ${respostaCerta}, Questão Selecionada ${respostaAtual}`)

    if (respostaAtual == respostaCerta){
        console.log("resposta certa")
        $("#qAcertou").text("Acertou!").fadeOut(3000, ()=>{
            $("#qAcertou").text(" ")
            $("#qAcertou").show()
        })

        questaoResolvida("certa")
        $("#" + respostaAtual).toggleClass("resposta-certa")
        setTimeout(() => {
            $("#" + respostaAtual).removeClass("resposta-certa")
            selecionar(99)
        }, 420);
    }else{
        $("#qErrou").text("Errou!    -    "+"Resposta certa: " + respostaCerta)

        $("#qErrou").fadeOut(2000, ()=>{
            $("#qErrou").text(" ")
            $("#qErrou").show()
        })

        questaoResolvida("errada")
       

        console.log("resposta errada")
        $("#" + respostaAtual).toggleClass("resposta-errada")
        $("#" + respostaCerta).toggleClass("resposta-certa")
        setTimeout(() => {
            $("#" + respostaAtual).removeClass("resposta-errada")
            $("#" + respostaCerta).removeClass("resposta-certa")
            selecionar(99)
        }, 420);
        
    }

   

}


document.querySelector("#noturno-usuario").addEventListener("change", ({target}) => {
    if (target.checked){
            localStorage.setItem("escuro", "true");
            table1 = "table-sm"
            table2 = "vazia"
            back1 = "bg-light"
            back2 = "vazia"
            textColor = "text-black"
            textDark = "text-dark"
            navQuestion1 = "navbar-light"
            navQuestion2  = "bg-light"
            document.body.style.setProperty('--texto-questao', 'white')
            document.body.style.setProperty('--bg-color-body', 'rgba(0, 0, 0, 0.803)')
            btnNavi1 = "btn-secondary" 
            btnNavi2 = "text-black"
            btnPublicar = "btn-outline-dark"
            removeCssEscuro()
            table1 = "table-dark" 
            table2 = "text-white"
            textColor = "text-dark"
            textDark = "vazia"
            back1 = "bg-dark" 
            back2 = "text-white"
            navQuestion1 = "navbar-dark" 
            navQuestion2 = "bg-transparent"
            btnPublicar = "btn-outline-light"
            btnNavi1 = "btn-secondary"
            btnNavi2 = "vazia"
            incluirCssEscuro()
            table = "table-dark text-white"
            document.querySelector("#text-anotacoes").style.cssText = "background-color: darkgrey; color:white;"
            document.querySelector("#coment").style.cssText = "background-color: darkgrey; color:white;"
            document.querySelectorAll(".comentClass").forEach(a=>{a.style = "max-width: 100%;background-color: darkgrey; color:white;"})
            
            // .then(arg=>{console.log("estilo dos comentários alterados...")}).catch(err=>{console.log("ainda não temos comentários...")})
            
            //reseta as variávies para a próxima questão
            textColor = "text-dark"
            textDark = ""
            back = "bg-dark text-white"
            navQuestion = "navbar-dark bg-transparent"
            btnPublicar = "btn-outline-light"
            btnNavi = "btn-secondary"
            cardsComent = "max-width: 100%; background-color: darkgrey; color:white;"
            styleTextArea = "background-color: darkgrey; color:white;"


            gravaDarkMode("true")




    } else {
            localStorage.setItem("escuro", "false");
            table1 = "table-dark" 
            table2 = "text-white"
            textColor = "text-dark"
            textDark = "vazia"
            back1 = "bg-dark" 
            back2 = "text-white"
            navQuestion1 = "navbar-dark" 
            navQuestion2 = "bg-transparent"
            btnPublicar = "btn-outline-light"
            btnNavi1 = "btn-secondary"
            btnNavi2 = "vazia"
            removeCssEscuro()
            table1 = "table-sm"
            table2 = "vazia"
            back1 = "bg-light"
            back2 = "vazia"
            textColor = "text-black"
            textDark = "text-dark"
            navQuestion1 = "navbar-light"
            navQuestion2  = "bg-light"
            document.body.style.setProperty('--texto-questao', 'black')
            document.body.style.setProperty('--bg-color-body', 'white')
            btnNavi1 = "btn-secondary" 
            btnNavi2 = "text-black"
            btnPublicar = "btn-outline-dark"
            incluirCssEscuro()
            document.querySelector("#text-anotacoes").style.cssText = " "
            document.querySelector("#coment").style.cssText = " "
            document.querySelectorAll(".comentClass").forEach(a=>{a.style = "max-width: 100%;"})
            // .then().catch(err=>{console.log("ainda não temos comentários...")})
            

            //reseta as variáveis para próxim questão
            table = "table-sm"
            back = "bg-light"
            textColor = "text-black"
            textDark = "text-dark"
            navQuestion = "navbar-light bg-light"
            btnNavi = "btn-secondary text-black"
            btnPublicar = "btn-outline-dark"
            cardsComent = "max-width: 100%;"
            styleTextArea = " "
            gravaDarkMode("false")
    }
})




function incluirCssEscuro(){
        n1 =  document.querySelector("#n1")
        n2 = document.querySelector("#n2")
        n3 = document.querySelector("#n3")
        n4 = document.querySelector("#n4")
        n5 = document.querySelector("#n5")
        n6 = document.querySelector("#n6")
        tableQ = document.querySelector("#tableQuestion")
        navQ = document.querySelector("#navQuestion")
        publiComent = document.querySelector("#publi-coment")
        cardComentarios = document.querySelector(".comentClass")


// document.querySelectorAll(".comentClass").forEach((a)=>{a.classList.add("deyvison")})

        n1.classList.add(back1)
        n1.classList.add(back2)
        n2.classList.add(back1)
        n2.classList.add(back2)
        n3.classList.add(table1)
        n3.classList.add(table2)
        n3.classList.add(textDark)
        n4.classList.add(btnNavi1)
        n4.classList.add(btnNavi2)
        n5.classList.add(btnNavi1)
        n5.classList.add(btnNavi2)

        n6.classList.add(back1)
        n6.classList.add(back2)
        tableQ.classList.add(table1)
        tableQ.classList.add(table2)
        navQ.classList.add(navQuestion1)
        navQ.classList.add(navQuestion2)
        publiComent.classList.add(btnPublicar)
}

function removeCssEscuro(){
n1 =  document.querySelector("#n1")
n2 = document.querySelector("#n2")
n3 = document.querySelector("#n3")
n4 = document.querySelector("#n4")
n5 = document.querySelector("#n5")
n6 = document.querySelector("#n6")
tableQ = document.querySelector("#tableQuestion")
navQ = document.querySelector("#navQuestion")
publiComent = document.querySelector("#publi-coment")
cardComentarios = document.querySelector(".comentClass")


n1.classList.remove(back1)
n1.classList.remove(back2)
n2.classList.remove(back1)
n2.classList.remove(back2)
n3.classList.remove(table1)
n3.classList.remove(table2)
n3.classList.remove(textDark)
n4.classList.remove(btnNavi1)
n4.classList.remove(btnNavi2)
n5.classList.remove(btnNavi1)
n5.classList.remove(btnNavi2)

n6.classList.remove(back1)
n6.classList.remove(back2)
tableQ.classList.remove(table1)
tableQ.classList.remove(table2)
navQ.classList.remove(navQuestion1)
navQ.classList.remove(navQuestion2)
publiComent.classList.remove(btnPublicar)
}






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



function exibirQuestaoAleatoria(){
    ultima = {}
    
                    db.collection("bancoQuestoes")
                    .orderBy("ID", "desc")
                    .limit(1)
                    .get()
                    .then(snapshot=>{
                        snapshot.forEach(doc=>{
                            ultima = doc.data()
                        })
                    }).then(()=>{
                        questaoAleatoria(ultima.ID)
                        console.log("finalizou busca aleatória")
                        allIdQuestion()


                    })

                   
}


function questaoAleatoria(a){

 console.log(a)

 aleatoria = Math.floor(Math.random() * (a - 1) + 1)
console.log(aleatoria)


}
