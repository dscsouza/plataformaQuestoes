//EXIBE A QUESTÃO

idQuestions = [];
questao = { }
questions = []
questaoAtual = 0;
comments = [];
aleatoria = 1
btnAtivado = false


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
}



// FUNÇÕES LEITURA E ALTERAÇÃO NO BANCO DE DADOS
function imprimeID(){
    console.log(idQuestions[1])

}

//exibe a questão, devendo ser passada a posição desta no vetor questions
// obs.: o array questions[] é onde são guardadas as questões vindas do banco de dados
function exibirQuestao(pos){
    
    document.querySelector("#bodyApp").innerHTML=`
    
        <nav class="navbar sticky-top navbar-light bg-transparent">
        
        <div style="display: inline-grid; grid-template-columns: 1fr 10fr 1fr; width:100%">

                <button class="navbar-toggler" style=""  type="button" onclick="userMenu()" data-toggle="modal" data-target="#interfaceUsuario" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Alterna navegação">
                <span class="navbar-toggler-icon"></span>
                </button>

            
            <div style="" class="bg-primary bg-gradient text-center text-white font-weight-light border rounded p-2 bd-highlight" >
                Questão ${questions[pos].ID} -
                Ano: ${questions[pos].ano} -

                Banca: ${questions[pos].banca} -

                Órgão: ${questions[pos].orgao} -

                Cargo: ${questions[pos].cargo}
            </div>
          
            <button class=" g-col-1 navbar-toggler" style="" type="button" onclick="" data-toggle="modal" data-target="#modalFilter" aria-controls="navbarToggleExternalContent" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                        </svg>
            </button>
        

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
          <button id="n4" class="btn ${btnNavi} font-italic">
                
                <div class="d-block d-sm-none">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                  </svg>
                
                
                </div>

                <div class="d-none d-sm-block"> 
                  



                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg> Anterior
                
                </div>
      


            </button>
          </a>
          

          <div class="d-flex justify-content-center text-center">
        
          <button id="btn-responder" class="btn btn-primary btn-md" onclick="responder()">Responder</button> 
          
        </div>



          
          <a id="btn-proxima" onclick = "qProxima()" href="#" tabindex="1">
          <button id="n5" class="btn ${btnNavi} font-italic">

          <div class="d-block d-sm-none">

          <svg class="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
            <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>


          </div>
          <div class="d-none d-sm-block">

          
            Próxima
            <svg class="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
            <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/></svg>


          </div >

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
