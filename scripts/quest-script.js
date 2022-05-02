//EXIBE A QUESTÃO

idQuestions = [];
questao = { }
questions = []
questaoAtual = 0;
comments = [];

escuro = localStorage.getItem("darkMode");

// INICIALIZA AS VARIÁVEIS NO MODO CLARO
    table = "table-sm"
    back = "bg-light"
    textColor = "text-black"
    textDark = "text-dark"
    navQuestion = "navbar-light bg-light"
    document.body.style.setProperty('--texto-questao', 'black')
    document.body.style.setProperty('--bg-color-body', 'white')
    btnNavi = "btn-outline-light text-primary"
    btnPublicar = "btn-outline-dark"

    console.log("modo escuro desligado", escuro)
// FIM DA INCIALIZAÇÃO DAS VARIÁVEIS REFERENTES AO AMBIENTE



if (escuro == "true"){
    table = "table-dark text-white"
    textColor = "text-dark"
    textDark = ""
    back = "bg-dark text-white"
    navQuestion = "navbar-dark bg-transparent"
    document.body.style.setProperty('--texto-questao', 'white')
    document.body.style.setProperty('--bg-color-body', 'rgba(0, 0, 0, 0.803)')
    btnPublicar = "btn-outline-light"
    btnNavi = "btn-outline-light"

    console.log("modo escuro ligado", escuro)
    

} else if (escuro == "false")  {
    table = "table-sm"
    back = "bg-light"
    textColor = "text-black"
    textDark = "text-dark"
    navQuestion = "navbar-light bg-light"
    document.body.style.setProperty('--texto-questao', 'black')
    document.body.style.setProperty('--bg-color-body', 'white')
    btnNavi = "btn-outline-light text-primary"
    btnPublicar = "btn-outline-dark"

    console.log("modo escuro desligado", escuro)


}




function allIdQuestion(){
    
    
        db.collection(questoes).get().then(snapshot=>{
            snapshot.forEach((docs) =>{
               idQuestions.push(docs.id);
               questions.push(docs.data())
            })
        }).then((a)=>{
            
            // CONSTRUIR A INTERFACE AQUI
            // qAtual = buildObjQuestao(idQuestions[1]);
            console.log(questions[0])
            exibirQuestão(questaoAtual)




        }).
        catch(error=>{
            console.log("Erro ao acesar o banco de dados: ", error)

            document.querySelector('#alertTopContainer').innerHTML = `<div id="alertTop" class=" float-left alert alert-danger fade show  fixed-top shadow " role="alert"> ${error.message}. <a href="./index.html">Voltar para tela de login</a><button type="button" class="close  text-right" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></div>`
        });
    
}

function buildObjQuestao(id){
    i = 0;
    let docRef = db.collection(questoes).doc(id);
    // retorna os dados da questão
    docRef.get().then((doc)=>{
        qt = doc.data()
        questao = {
            id: qt.ID,
            ano: qt.ano,
            banca: qt.banca,
            cargo: qt.cargo,
            orgao: qt.orgao,
            enunciado: qt.enunciado,
            alternativas: {
                a: qt.alternativas.a,
                b: qt.alternativas.b,
                c: qt.alternativas.c,
                d: qt.alternativas.d,
                e: qt.alternativas.e,
                gabarito: qt.alternativas.gabarito
            }
        }
    })
    return questao;
}

//constrói um array com os comentários
//array comentario[i]
function buildObjComment(id){
    i = 0;
    comentario = [];
    let docRef = db.collection(questoes).doc(id);
    // retorna os dados da questão
    docRef.get().then((doc)=>{
        qt = doc.data().comentarios
        comentario[i] = {
            datahora: qt.i.datahora,
            autor: qt.i.autor,
            comentario: qt.i.comentario
        }
        i++;
    })
}




//VERIFICA O USUÁRIO LOGADO
auth.onAuthStateChanged(user=>{
    if (user){
        usuarioLogado = user.email;
    }else{
        usuarioLogado = "Ninguém logado"
    }
})







// FUNÇÕES LEITURA E ALTERAÇÃO NO BANCO DE DADOS

function imprimeID(){
    console.log(idQuestions[1])

}

allIdQuestion()

//AO ABRIR A PÁGINA QUESTÕES, VERIFICA QUAL USUÁRIO EST[A LOGADO E SALVA NA 
//VARIÁVEL usuarioLogado
auth.onAuthStateChanged(user=>{
    if (user){
        usuarioLogado = user.email;
    }else{
        usuarioLogado = "Ninguém logado"
    }
})







function exibirQuestão(pos){



    document.querySelector("#bodyApp").innerHTML=`
    
    
        <nav class="navbar sticky-top navbar-light bg-transparent w-100">
        
        <div class="d-flex justify-content-center w-100">
        <nav class="navbar navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="modal" data-target="#interfaceUsuario" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Alterna navegação">
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

    <div class="w-100 container ${back}">

        <div class="container-fluid alert alert-light text-justify ${back}">
        

        <div class="p-2 shadow-sm text-justify ${table} ${textDark} font-weight-bold mb-2 ml-1">
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
          <div class="btn ${btnNavi} font-italic ">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
                Anterior 
            </div>
          </a>
          

          <div class="d-flex justify-content-center text-center">
        
          <button id="btn-responder" class="btn btn-primary btn-md" onclick="responder()">Responder</button> 
          
        </div>



          
          <a id="btn-proxima" onclick = "qProxima()" href="#" tabindex="1">
          <div class="btn ${btnNavi} font-italic">
          Próxima 
          <svg class="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
  <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg>
            </div>
          </a>

          
      
      </nav>`







      document.querySelector("#anotacaoes-comentario").innerHTML=`
<div class="container ${back}">
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
        ${usuarioLogado}
      </div>
    

      <div class="input-group mb-2">
        <textarea id="coment" class="form-control" aria-label="Digite seu comentário aqui..." placeholder="Digite seu comentário aqui..."></textarea>
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
          <textarea id="text-anotacoes" class="form-control border-top-0" aria-label="Suas anotações..." rows="5"></textarea>
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


resgatarComentarios()
exibeAnotacoes(pos)


}




function exibirComentarios(arrayComment){
    nodeComentario = " "

    arrayComment.forEach((arg)=>{
        console.log(arg)

        
        nodeComentario += `
        <div class="card border-secondary mb-2 ${textColor}" style="max-width: 100%;">
          <div class="card-header">${Date(arg.datahora.seconds)}</div>
          <div class="card-body">
            <h5 class="card-title ">${arg.autor}</h5>
            <p class="card-text">
            ${arg.comentario}
            </p>
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
    console.log(`Autor: ${usuarioLogado} - comentário: ${publicacao} - FALTA IMPLEMENTAR A FUNÇÃO PARA SALVAR O COMENTÁRIO NO BANCO DE DADOS`)
    datahoraAtual = firebase.default.firestore.Timestamp.now()


    
    idUser = firebase.auth().currentUser.uid


db.collection(questoes).doc(idQuestions[questaoAtual])
    .collection('comentarios').doc().set({
        comentario: publicacao,
        datahora: datahoraAtual,
        autor: usuarioLogado
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


    db.collection(questoes).doc(idQuestions[questaoAtual])
    .collection('comentarios').get().then(snapshot=>{
        snapshot.forEach(doc=>{
            comments.push(doc.data())
        })

    }).then(()=>{
        exibirComentarios(comments)
    })
    
    
}





function exibeAnotacoes(pos){
    idUser = firebase.auth().currentUser.uid
    campoAnotacao = document.querySelector("#text-anotacoes")


    db.collection(questoes).doc(idQuestions[questaoAtual])
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


db.collection(questoes).doc(idQuestions[questaoAtual])
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




//NAVEGAÇÃO ENTRE AS QUESTÕES
function questaoAleatoria(){

}

function qAnterior(){
    questaoAtual --
    exibirQuestão(questaoAtual)
}

function qProxima(){
    idQuestions.length
    questaoAtual++
    exibirQuestão(questaoAtual)
}


// VERIFICA SE A RESPOSTA ESTÁ CORRETA

function responder(){
    
    respostaCerta = questions[questaoAtual].alternativas.gabarito
    console.log(`Questao atual: ${questaoAtual}, Resposta Certa: ${respostaCerta}, Questão Selecionada ${respostaAtual}`)

    if (respostaAtual == respostaCerta){
        console.log("resposta certa")
        $("#qAcertou").text("Acertou!").fadeOut(3000, ()=>{
            $("#qAcertou").text(" ")
            $("#qAcertou").show()
        })

        
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