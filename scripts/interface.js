questaoAtual = ''

listaQuestoes = [];







// FUNÇÕES DE LOGIN

function logar(){
    username = document.querySelector("#username")
    password = document.querySelector("#password")

    login(username.value, password.value)

    window.location.href = "./questoes.html";

    listaQuestoes = consultaLista();

    
}
function selecionar(a){
    questaoSelecionada = a.id
    if (questaoAtual == ''){
        $("#" + questaoSelecionada).toggleClass("table-active")
        questaoAtual = questaoSelecionada    
    }else if(questaoSelecionada != questaoAtual){
        $("#" + questaoAtual).toggleClass("table-active")
        $("#" + questaoSelecionada).toggleClass("table-active")
        questaoAtual = questaoSelecionada
    }
    console.log(a.id)
    // document.querySelector(a.id).toggleClass()
  
}


function ignorar(a){
    questaoIgnorada = a.id;
    $("#" + questaoSelecionada).toggleClass("riscado");
    
}


