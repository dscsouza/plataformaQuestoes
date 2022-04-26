
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
const questoes = "bancoQuestoes";

console.log(auth)
let emailCurrentUser;

// LEITURA E ALTERAÇÃO DO BANCO DE DADOS

function consultaLista(){
    i = 0;
    dados = [];
    console.log("lerlista")
    db.collection(questoes).get().then(snapshot=>{
        snapshot.forEach(item =>{
            dados.push(item.data())
           
        })
    }).catch(error=>{
        console.log("Erro ao acesar o banco de dados: ", error)
    })
    
    return dados;
}





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


function login(email, password){
   console.log("função login", auth)
    //persistência de dados do usuário
    //SESSION - fica logado na aba atual, mas em novas abas não loga
    //LOCAL - pode abrir várias abas que continua logado
    //NONE - SE ATUALIZAR a página o usuário desloga
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() =>{

        auth.signInWithEmailAndPassword(email, password)
        .then( loggedUser => {
            // console.log(loggedUser);
            console.log("Login efetuado: ",auth.currentUser);
            window.location.href = "./questoes.html";
        }).catch(error =>{
            console.log("Ocorreu algum erro na autenticação: ", error);
            $('#alertTop').toggleClass('show')
            $('#alertTop').html(" " + error.message+ "<button type='button' class='close  text-right' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span>")
        })


    }).catch(error =>{
        console.log("Ocorreu algum erro na presistência dos dados:  ", error);
    })
    
}

function logout(){
    auth.signOut().then(console.log("Usuário deslogado.")).catch(error=>{
        console.log("erro ao fazer logout: ", error)
    })

}




//listen - essa promisse é executada todas as vezes
//que o usuário muda de estado (logado/deslogado)

function observarLogin(){

    auth.onAuthStateChanged(user=>{
        if (user){
            console.log("Usuário Logado: ",user.email);
        }else{
            console.log("Ninguém logado")
        }
    })

}



// login("novo@teste.com", "123abc");
//logar depois de 3 segundos
// setTimeout(login("novo@teste.com", "123abc"),3000);
// let user = auth.currentUser
// console.log(user)


//AUTORIZAÇÃO PARA ACESSO AO BANCO DE DADOS


function lerLista(){
    db.collection("lista").get().then(snapshot=>{
        snapshot.forEach(item =>{
            console.log(item.data())
        })
    }).catch(error=>{
        console.log("Erro ao acesar o banco de dados: ", error)
    })
}

