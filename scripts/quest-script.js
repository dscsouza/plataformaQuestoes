//EXIBE A QUESTÃO

idQuestions = [];
questao = { }
questions = []

function allIdQuestion(){
    
    
        db.collection(questoes).get().then(snapshot=>{
            snapshot.forEach((docs) =>{
               idQuestions.push(docs.id);
               questions.push(docs.data())
            })
        }).then((a)=>{
            
            // CONSTRUIR A INTERFACE AQUI
            qAtual = buildObjQuestao(idQuestions[1]);
            console.log(questions[0])
            exibirQuestão(0)




        }).
        catch(error=>{
            console.log("Erro ao acesar o banco de dados: ", error)
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
          <tr id="A" class="" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
            <th scope="row">A</th>
            <td>
            ${questions[pos].alternativas.a}
            </td>
          </tr>
          <tr id="B" class="" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
            <th scope="row">B</th>
            <td>
            ${questions[pos].alternativas.b}
            </td>
          </tr>
          <tr id="C" class="" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
            <th scope="row">C</th>
            <td colspan="2">
            ${questions[pos].alternativas.c}
            </td>
          </tr>
          <tr id="D" class="" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
            <th scope="row">D</th>
            <td colspan="2">
            ${questions[pos].alternativas.d}
            </td>
          </tr>
          <tr id="E" class="" onclick="selecionar(this)" ondblclick="ignorar(this)" ontouchmove="ignorar(this)">
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
              
          </div>
          <div class="col-sm">
              
          </div>
          <div class="col-sm">
              
          </div>
          <div class="col-sm">
              
          </div>
          <div class="col-sm">
              <button id="bt-responder" class="btn btn-primary">Responder</button>
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
          <textarea class="form-control border-top-0" aria-label="Suas anotações..." rows="5"></textarea>
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
                <button class="btn btn-primary btn-sm">Salvar</button>
            </div>
          </div>  
    </div>
  </div>
</div>

   </div>
</div>`


exibirComentarios(pos)


}




function exibirComentarios(pos){
    nodeComentario = ""
    questions[pos].comment.forEach((arg)=>{
        console.log(arg)

        
        nodeComentario = `
        <div class="card border-secondary mb-2" style="max-width: 100%;">
          <div class="card-header">${arg.datahora}</div>
          <div class="card-body text-secondary">
            <h5 class="card-title">${arg.autor}</h5>
            <p class="card-text">
            ${arg.comentario}
            </p>
          </div>
        </div>` + nodeComentario;

        document.querySelector("#list-coment").innerHTML = nodeComentario

    })





// document.querySelector("#list-coment").innerHTML=`

//     <!-- COMENTÁRIO 1 -->
//         <div class="card border-secondary mb-2" style="max-width: 100%;">
//           <div class="card-header">Publicado em 24/04/2022 às 13:30h</div>
//           <div class="card-body text-secondary">
//             <h5 class="card-title">João da Silveira</h5>
//             <p class="card-text">
//               Gabarito - Letra D - D) CERTO: Art. 111-A. O Tribunal Superior
// do Trabalho compor-se-á de vinte e sete Ministros, escolhidos dentre
// brasileiros com mais de trinta e cinco e menos de sessenta e cinco anos,
// nomeados pelo Presidente da República após aprovação pela maioria absoluta do
// Senado Federal

// bons estudos
//             </p>
//           </div>
//         </div>
        
//         <!-- COMENTÁRIO 2 -->
//         <div class="card border-secondary mb-2" style="max-width: 100%;">
//           <div class="card-header">Publicado em 21/04/2022 às 13:30h</div>
//           <div class="card-body text-secondary">
//             <h5 class="card-title">Concurseira Influencer</h5>
//             <p class="card-text">
//               tribunais superiores (stf,tst,tse,stj,stm) -> 35anos ate 65 anos - tribunais inferiores (trt,tre,trf,tj,tm) -> 30anos ate 65anos
//             </p>
//           </div>`

}


function publicarComentario(){
    //usuarioLogado
    publicacao = document.querySelector("#coment").value
    console.log(`Autor: ${usuarioLogado} - comentário: ${publicacao} - FALTA IMPLEMENTAR A FUNÇÃO PARA SALVAR O COMENTÁRIO NO BANCO DE DADOS`)
    datahoraAtual = "data hora"

    const node = document.createElement("div");
    // const textnode = document.createTextNode(`
    // <div class="card border-secondary mb-2" style="max-width: 100%;">
    //   <div class="card-header">${datahoraAtual}</div>
    //   <div class="card-body text-secondary">
    //     <h5 class="card-title">${usuarioLogado}</h5>
    //     <p class="card-text">
    //     ${publicacao}
    //     </p>
    //   </div>
    // </div>`);
    // node.appendChild(textnode);
    document.getElementById("list-coment").appendChild(node).innerHTML=`
    <div class="card border-secondary mb-2" style="max-width: 100%;">
      <div class="card-header">${datahoraAtual}</div>
      <div class="card-body text-secondary">
        <h5 class="card-title">${usuarioLogado}</h5>
        <p class="card-text">
        ${publicacao}
        </p>
      </div>
    </div>`
    ;

}

function salvarAnotacao(){

}

