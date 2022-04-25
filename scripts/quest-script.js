//EXIBE A QUESTÃO

idQuestions = [];
questao = { }

function allIdQuestion(_callback){
    db.collection(questoes).get().then(snapshot=>{
        snapshot.forEach((docs) =>{
           idQuestions.push(docs.id);
        })
    }).catch(error=>{
        console.log("Erro ao acesar o banco de dados: ", error)
    });
    return idQuestions;
    _callback()
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








// FUNÇÕES LEITURA E ALTERAÇÃO NO BANCO DE DADOS

document.querySelector("#bt-responder").addEventListener("click",()=>{
    // console.log("click");
    
    setTimeout(() => {
        
        console.log(buildObjQuestao(idQuestions[1]))
    }, 500);
    
    allIdQuestion()
    
    
    
   
    
});


