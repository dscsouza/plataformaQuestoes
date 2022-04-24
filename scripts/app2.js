// Inicializando o Firebase
const firebaseConfig = {

    apiKey: "AIzaSyBj72fCD38TFSS-e6jjcUmCTUoWIAOucdc",

    authDomain: "colegio-21505.firebaseapp.com",

    projectId: "colegio-21505",

    storageBucket: "colegio-21505.appspot.com",

    messagingSenderId: "1006539121032",

    appId: "1:1006539121032:web:502e0ad848ef7b125e9a3d",

    measurementId: "G-ZQ33NNKRNZ"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();



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
    let userEmail = email;
    let userPassword = password;

   
    //persistência de dados do usuário
    //SESSION - fica logado na aba atual, mas em novas abas não loga
    //LOCAL - pode abrir várias abas que continua logado
    //NONE - SE ATUALIZAR a página o usuário desloga
    auth.setPersistence(firebase.auth.Auth.Persistence.NONE).then(()=>{

        auth.signInWithEmailAndPassword(userEmail, userPassword)
        .then( loggedUser => {
            // console.log(loggedUser);
            console.log("Login efetuado: ",auth.currentUser.email);
        }).catch(error =>{
            console.log("Ocorreu algum erro na autenticação: ", error);
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
