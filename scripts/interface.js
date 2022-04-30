respostaAtual = ''

listaQuestoes = [];

darkMode = false;

if (darkMode){
    document.querySelector("#indexPrincipal").classList.add("bg-dark")
    document.querySelector("#indexPrincipal").classList.add("text-white")

}else {
    document.querySelector("#indexPrincipal").classList.add("bg-white")
    document.querySelector("#indexPrincipal").classList.add("text-black")

}




// FUNÇÕES DE LOGIN

function logar(){
    document.querySelector("#spin").classList.remove("d-none")
    username = document.querySelector("#username").value
    password = document.querySelector("#password").value
    console.log(username, password)
    login(username, password)

    
    
}
function selecionar(a){
    questaoSelecionada = a.id
    if (respostaAtual == ''){
        $("#" + questaoSelecionada).toggleClass(`table-info ${textColor}`)
        respostaAtual = questaoSelecionada    
    }else if(questaoSelecionada != respostaAtual){
        $("#" + respostaAtual).toggleClass(`table-info ${textColor}`)
        $("#" + questaoSelecionada).toggleClass(`table-info ${textColor}`)
        respostaAtual = questaoSelecionada
    } else if (a == 99){
        $("#" + respostaAtual).toggleClass(`table-info ${textColor}`)
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



