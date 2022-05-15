
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhLvuScY2JBwnjRh0bNaEA6FNwSBsV2LA",
  authDomain: "questionsplatform.firebaseapp.com",
  projectId: "questionsplatform",
  storageBucket: "questionsplatform.appspot.com",
  messagingSenderId: "281612669871",
  appId: "1:281612669871:web:33580b25f722980a8b555a",
  measurementId: "G-RE70HMRJ4M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const auth = firebase.auth();
const questoes = "bancoQuestoes"; //seta a collection onde são armazenadas as questões
const usuarios = "usuarios"; //seta a collection onde são armazenadas os dados do usuário
const raizComentarios = "comentarios"
const raizAnotacoes = "anotacoes"
const raizUsuarios = "usuarios"
const raizIds = "ids"



const storage = firebase.storage();
const storageRef = firebase.storage().ref();
const imgUsers = storageRef.child('imgUsers')
const imgQuestoes = storageRef.child('imgQuestoes')

var configs = [];

let emailCurrentUser;




// VALIDACAO DE USUÁRIOS


function criarUsuario(email, senha){

    let newUserEmail = email;
    let newUserPassword = senha;


    auth.createUserWithEmailAndPassword(newUserEmail, newUserPassword)
        .then(user=>{
            console.log(user);
        }).catch(error =>{
            console.log(error);
        })

}




function logout(){
    auth.signOut().then(console.log("Usuário deslogado.")).catch(error=>{
        console.log("erro ao fazer logout: ", error)
    })

}




//função criada para exibir alertas no topo da tela
//parâmetros:
//mensagem: "mensagem a ser exibida"
//dismiss:  true: exibe botao de fechar. 
//          false: esconde automaticamente depois de 3s
//tipo:
//     primary, danger, secondary, sucess, warning, alert, dark   
//      todos os tipos de alerta definidos no bootstrap
//      
function alerta(mensagem, dismiss, tipo){
    
    if (dismiss){
        document.querySelector('#alertTopContainer').innerHTML = `
        <div id="alertTop" class="alert alert-danger alert-dismissible fade show  fixed-top shadow" role="alert"> 
            <div class="row">
                <div class="col-sm">
                    ${mensagem}
                </div>
            <div class="col-sm">
                <button type="button" class="close  text-right" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </div>
            </div>       
        </div>`
        
    } else if (!dismiss){
        document.querySelector('#alertTopContainer').innerHTML = `
            
                <div  id="alertTop" class="w-auto fixed-top alert alert-${tipo} fade show shadow" role="alert"> 
                    <div class="row text-center">
                        <div class="col-sm">
                            ${mensagem}
                        </div>
                    </div>
                </div>
            
            `
        $("#alertTop").fadeOut(3000);
    }
    
    
}




function injetarQuestoesTeste(qtd){

    for(let i=1; i<qtd; i++){
    
    numeroQuestao = i.toString()
    db.collection(questoes).doc(numeroQuestao).set(
        {
            "ID": i,
            "cargo": "Psicólogo",
            "orgao": `Prefeitura de Paulínia/SP ${numeroQuestao}`,
            "ano": 2021,
            "idUser": "testando o campo anotações",
            "banca": "FGV",
            "alternativas": {
              "gabarito": "d",
              "b": "a lei criará varas da Justiça do Trabalho, podendo, nas comarcas não abrangidas por sua jurisdição, atribuí-la aos Juízes Federais, com recurso para o respectivo Tribunal Regional Federal.",
              "e": "a Escola Nacional de Formação e Aperfeiçoamento de Magistrados do Trabalho e o Conselho Superior da Justiça do Trabalho funcionarão junto ao Conselho Nacional de Justiça, vinculado ao Supremo Tribunal Federal.",
              "d": "o Tribunal Superior do Trabalho compor-se-á de 27 Ministros, escolhidos dentre brasileiros com mais de 35 e menos de 65 anos, nomeados pelo Presidente da República após aprovação pela maioria absoluta do Senado Federal.",
              "a": "o Tribunal Superior do Trabalho será composto por juízes dos Tribunais Regionais, oriundos da magistratura, indicados pelo colégio de Presidentes e Corregedores dos Tribunais Regionais, além de 1/5 oriundo da advocacia e Ministério Público do Trabalho e 1/5 indicados pelas confederações sindicais.",
              "c": "são órgãos da Justiça do Trabalho as Comissões de Conciliação Prévia, as Varas do Trabalho, os Tribunais Regionais do Trabalho e o Tribunal Superior do Trabalho."
            },
            "enunciado": `${numeroQuestao}Em consonância com os ditames constitucionais quanto à organização e competência da Justiça do Trabalho:`
        }).then(()=>{
                 console.log(`documento ${numeroQuestao} inserido com sucesso...`)
             }).catch(err=>{
                 console.log(err);
             })


    }
}







//TESTES






//função que grava a opção do usuário pelo darkMode

function gravaDarkMode(onOff){
    
    idUser = firebase.auth().currentUser.uid //recupera o uID do usuário
    
    //utiliza o método set(), caso o documento com uID  do usuário não tenha sido criado, ele cria nesse momento
                 db.collection("usuarios").doc(idUser)
                 .collection("configs").doc("interface").set({
                    darkmode:  onOff,
                 }).then(()=>{
                    alerta("Configuração salva", false, "info")
                 }).catch(err=>{
                     alerta("Ocorreu um erro. Verifique sua conexão com a internet.", false, "danger")
                 })

}