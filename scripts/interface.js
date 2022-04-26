questaoAtual = ''

listaQuestoes = [];





// FUNÇÕES DE LOGIN

function logar(){
    username = document.querySelector("#username").value
    password = document.querySelector("#password").value
    console.log(username, password)
    login(username, password)
    
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



