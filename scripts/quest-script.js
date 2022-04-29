//EXIBE A QUESTÃO

idQuestions = [];
questao = { }
questions = []
questaoAtual = 0;
comments = [];


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

//constroi objetos dos comentários
function comentario(id, datahora, autor, comentario){ 
    this.id = id; 
    this.datahora = datahora;
    this.autor = autor;
    this.comentario = comentario; 
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






// document.querySelector("#bt-responder").addEventListener("click",()=>{
       
// });




function exibirQuestão(pos){



    document.querySelector("#bodyApp").innerHTML=`
    <div class="container bg-light">
    <div class="alert alert-warning text-center">Questão ${questions[pos].ID}</div>

    <div id="info-questao" class="alert alert-light  text-center">
        <div class="row">
            <div class="col-sm">
                Ano: ${questions[pos].ano}
            </div>
            <div class="col-sm">
                Banca: ${questions[pos].banca}
            </div>
            <div class="col-sm">
                Órgão: ${questions[pos].orgao}
            </div>
            <div class="col-sm">
                Cargo: ${questions[pos].cargo}
            </div>
          </div>
    </div>

    <div class="alert alert-light  text-justify text-color-black">
        

        <span class="text-justify font-weight-bold margin-bottom-5px">
        ${questions[pos].enunciado}
        </span>

    <table class="table table-hover">
        <!-- <thead>
          <tr>
            <th scope="col"> </th>
            <th scope="col"> 
            </th> 
          </tr>
        </thead> -->
        <tbody>
          <tr id="a" class="ponteiro" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
            <th scope="row">A</th>
            <td>
            ${questions[pos].alternativas.a}
            </td>
          </tr>
          <tr id="b" class="ponteiro" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
            <th scope="row">B</th>
            <td>
            ${questions[pos].alternativas.b}
            </td>
          </tr>
          <tr id="c" class="ponteiro" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
            <th scope="row">C</th>
            <td colspan="2">
            ${questions[pos].alternativas.c}
            </td>
          </tr>
          <tr id="d" class="ponteiro" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
            <th scope="row">D</th>
            <td colspan="2">
            ${questions[pos].alternativas.d}
            </td>
          </tr>
          <tr id="e" class="ponteiro" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
            <th scope="row">E</th>
            <td colspan="2">
            ${questions[pos].alternativas.e}
            </td>
          </tr>
        </tbody>
      </table>

      <div id="botoes">
    <div id="info-questao" class="alert alert-light  text-center">
      <div class="row">
          <div class="col-sm">
          
          <a id="btn-anterior" onclick = "qAnterior()" href="#" tabindex="-1">
          <div class="btn btn-outline-light text-primary font-italic ">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
</svg>
          Anterior 
          
          
            </div>
          </a>
          
          </div>
          <div class="col-sm">
              <div id="qAcertou" class="text-success"></div>
              <div id="qErrou" class="text-danger"></div>
          </div>
          <div class="col-sm">
          <button id="btn-responder" class="btn btn-primary" onclick="responder()">Responder</button> 
          </div>
          <div class="col-sm">
            <div id="qCerta" class="text-info"></div>
          </div>
          <div class="col-sm">
          <a id="btn-proxima" onclick = "qProxima()" href="#" tabindex="1">
          <div class="btn btn-outline-light text-primary font-italic">
          Próxima 
          <svg class="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
  <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg>
            </div>
          </a>
          </div>
        </div>
      </div>  
  </div> 
      </div>`







      document.querySelector("#anotacaoes-comentario").innerHTML=`
<div class="container bg-light">
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
          <button id="publi-coment" class="btn btn-outline-secondary btn-sm" onclick="publicarComentario()">Publicar</button>
        </div>            
      </div>


      <div id="list-coment">

      </div>


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
                <button class="btn btn-primary btn-sm" onclick="salvarAnotacao()">Salvar</button>
            </div>
          </div>  
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
        <div class="card border-secondary mb-2" style="max-width: 100%;">
          <div class="card-header">${arg.datahora}</div>
          <div class="card-body text-secondary">
            <h5 class="card-title">${arg.autor}</h5>
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
    anotacoes = document.querySelector("#text-anotacoes").value
    idUser = firebase.auth().currentUser.uid


db.collection(questoes).doc(idQuestions[questaoAtual])
    .collection('anotacoes').doc(idUser).set({
        anotacao: anotacoes
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
        $("#qErrou").text("Errou!")
        $("#qCerta").text("Resposta certa: " + respostaCerta)

        $("#qErrou").fadeOut(2000, ()=>{
            $("#qErrou").text(" ")
            $("#qErrou").show()
        })
        $("#qCerta").fadeOut(3000, ()=>{
            $("#qCerta").text(" ")
            $("#qCerta").show()
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