respostaAtual = ''

listaQuestoes = [];





// FUNÇÕES DE LOGIN

function logar(){
    $("#spin").toggleClass("d-none")
    username = document.querySelector("#username").value
    password = document.querySelector("#password").value
    console.log(username, password)
    login(username, password)

    
    
}
function selecionar(a){
    questaoSelecionada = a.id
    if (respostaAtual == ''){
        $("#" + questaoSelecionada).toggleClass("table-info")
        respostaAtual = questaoSelecionada    
    }else if(questaoSelecionada != respostaAtual){
        $("#" + respostaAtual).toggleClass("table-info")
        $("#" + questaoSelecionada).toggleClass("table-info")
        respostaAtual = questaoSelecionada
    } else if (a == 99){
        $("#" + respostaAtual).toggleClass("table-info")
        respostaAtual = ''
        respostaAtual = questaoSelecionada
    }
    console.log(a.id)
    // document.querySelector(a.id).toggleClass()
  
}


function ignorar(a){
    questaoIgnorada = a.id;
    $("#" + questaoSelecionada).toggleClass("riscado");
    
}



