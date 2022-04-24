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
const turma = "turmaA" // declaramos essa constante para o nome da coleção

// ****** ler todos os dados da coleção, todas as referências
// db.collection("turmaA").get()
//                         .then((snapshot)=>{

//                             snapshot.forEach((doc) => {
//                                 let aluno = doc.data();
//                                 console.log(aluno.nome)
//                                 // console.log(doc.data()); essa linha trás os dados do firebase

                                
//                             });

//                         });

// ******** AQUI ELE BUSCA SOMENTE UM DOCUMENTO DA COLEÇÃO
//O DOC INICIAL, o código, é exatamente o código do documento

// let docRef = db.collection("turmaA").doc("kXv9IGwJ8pxjJnCjzU09");
// //o método get().then() é uma promisse, ou seja, o parâmetro é um callback
// docRef.get().then((doc)=>{
//     console.log(doc.data()); //quando fazemos doc.data(), ele trás todos os dados do documento

//     nome = doc.data().nome; //aqui ele trás o campo nome do registro
//     console.log(nome);

// })

// aqui vamos buscar todos os documentos que contenham o nome Ana Luísa
// temos também: >,  <, >=, <=,  mas o diferente não temos
//para fazer diferente, adicionamos mais um where, e colocamos um > e outro menor <
//assim ele trás só os diferentes

// db.collection("turmaA").where("nome", "==", "Ana Luísa").get()
//     .then(snapshot=>
//     {
//         snapshot.forEach((doc) => 
//         {
//             let aluno2 = doc.data();
//             console.log(aluno2.nome, aluno2.sobrenome);
//         })
//     })



// busca todos os alunos com notas maiores que 8, por exemplo
    // db.collection("turmaA").where("notas.nota1", ">", 8).get()
    // .then(snapshot=>
    // {
    //     snapshot.forEach((doc) => 
    //     {
    //         console.log('###### alunos com notas maiores que: 8')
    //         aluno3 = doc.data();
    //         console.log(aluno3.nome, aluno3.sobrenome);
    //     })
    // })


console.log("**********************************************************");

//INCLUINDO DOCUMENTOS
// db.collection(turma).add({
//     nome: "Marcos",
//     sobrenome: "Santos",
//     notas: {
//         nota1: 6.5,
//         nota2: 9.4
//     }
// }).then(doc=>{
//     console.log("documento inserido com sucesso...", doc)
// }).catch(err=>{
//     console.log(err);
// })


//INCLUINDO UM DOCUMENTO NOVO SETANDO O ID DO DOCUMENTO
//podemos incluir ou modificar os dados
//aqui se alterarmos o objeto, ele sobrescreve todo o registro

// db.collection(turma).doc("AlunoNovo2").set(
// {
//     nome:"Marisson",
//     sobrenome:"Souza Castelo",
//     notas:{
//         nota1:10,
//         nota2: 5.5
//     }
// }).then(()=>{
//          console.log("documento inserido com sucesso...")
//      }).catch(err=>{
//          console.log(err);
//      })



//aqui ele está alterando apenas um campo do documento
//passando o argumento {merge:true}


// db.collection(turma).doc("AlunoNovo2").set(
// {
//     sobrenome:"Silva",
// }, {merge:true}
// ).then(()=>{
//          console.log("documento inserido com sucesso...")
//      }).catch(err=>{
//          console.log(err);
//      })


//EXISTE OUTRO MÉTODO PARA ALTERAR UM REGISTRO, O UPDATE
//aqui não vamos nos preocupar com o argumento {merge:true}


// db.collection(turma).doc("AlunoNovo2").update(
//     {
//         sobrenome:"Silva Update",
//         "notas.nota2": 9.5, //em campos do tipo map, temos que usar entre aspas
//         faltas: 8,   //podemos criar campos
//         cidades: ["Manaus", "São Paulo"]
//     }
//     ).then(()=>{
//              console.log("documento inserido com sucesso...")
//          }).catch(err=>{
//              console.log(err);
//          })

// PASSAR UM CAMPO DO TIPO ARRAY

// db.collection(turma).doc("AlunoNovo2").update(
//     {
//         cidades: firebase.firestore.FieldValue.arrayUnion("Rio de Janeiro")
//         //temos também o método arrayRemove, para remover um elemento do array
//     }
//     ).then(()=>{
//              console.log("documento inserido com sucesso...")
//          }).catch(err=>{
//              console.log(err);
//          })


//PODEMOS INCREMENTAR O VALOR DAQUELE CAMPO

// db.collection(turma).doc("AlunoNovo2").update(
//     {
//         faltas: firebase.firestore.FieldValue.increment(1)
//         //aqui ele incrementa 1 no campo faltas, que no início era 5
//     }
//     ).then(()=>{
//              console.log("documento inserido com sucesso...")
//          }).catch(err=>{
//              console.log(err);
//          })


//SNAPSHOT - funciona como observador. monitora alterações no banco
//toda vez que o banco for alterado, ele executa o callback
// para esse caso específico, alterações em qualquer
// parte do banco, ele executa  a função

/*

db.collection("turmaA").onSnapshot(
    snapshot=>
    {
        snapshot.forEach((doc) => 
        {
            console.log('alunos com notas maiores que: 8')
            aluno3 = doc.data();
            console.log(aluno3.nome, aluno3.sobrenome);
        })
    })


*/

// aqui vamos fazer o mesmo exemplo acima
// mas somente para quando houver alterações
//no doc "AlunoNovo2"

/*
db.collection(turma).doc("AlunoNovo2").onSnapshot(
    (doc)=>  
        {
           console.log(doc.data()) 
        }
        )

*/

//funciona também com o where, caso haja alterações
// nos campos resultado da pesquisa com where


//APAGANDO CAMPOS E DOCUMENTOS

//no exemplo abaixo selecionamos todos os campos cujo nome contém Marcos
//e deletamos

/*

db.collection(turma).where("nome", "==", "Marcos").get()
    .then(snapshot=>
    {
        snapshot.forEach((doc) => 
        {
            console.log('deletando todos os documentos cujo nome contenha Marcos');
            db.collection(turma).doc(doc.id).delete().then(()=>
            {
                console.log("documentos deletados com sucesso")
            }).catch((err)=>{
                console.log("erro: ", err)
            });
            
        })
    })

*/


//# criando usuários no firebase
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


function escrever(){
    db.collection("lista")
        .add({title: "Novo Objeto", numero: Math.random()})
        .then(doc=>{
            console.log(doc);
        })
        .catch(error=>{
            console.log("erro ao escrever: ", error);
        })
}


//REGRAS DE SEGURANÇA NO FIREBASE

//USAR ESSA REGRA DE SEGURANÇA PARA PODER ESCREVER APENAS QUANDO 
//UM USUÁRIO ESTIVER LOGADO
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null;
    }
  }
}
*/

// allow write: if request.auth.uid != null; << NESSA LINHA PODEMOS COLOCAR O ID de um
//usuário específico



login("novo@teste.com", "123abc");

lerLista()

escrever();



