var respostaAtual = ' '
var questaoSelecionada = ' '

listaQuestoes = [];


escuro = localStorage.getItem("escuro")


// INICIALIZA AS VARIÁVEIS NO MODO CLARO
    table = "table-sm"
    back = "bg-light"
    textColor = "text-dark"
    textDark = "text-dark"
    navQuestion = "navbar-light bg-light"
    btnNavi = "btn-outline-light text-primary"
    btnPublicar = "btn-outline-dark"
    document.body.style.setProperty('--texto-questao', 'black')
    document.body.style.setProperty('--bg-color-body', 'white')
    styleTextArea = " "
    cardsComent = "max-width: 100%;"

    console.log("modo escuro desligado", escuro)
// FIM DA INCIALIZAÇÃO DAS VARIÁVEIS REFERENTES AO AMBIENTE



if (escuro == "true"){
    table = "table-dark text-white"
    textColor = "text-dark"
    textDark = ""
    back = "bg-dark text-white"
    navQuestion = "navbar-dark bg-transparent"
    btnPublicar = "btn-outline-light"
    btnNavi = "btn-secondary text-black"
    document.body.style.setProperty('--texto-questao', 'white')
    document.body.style.setProperty('--bg-color-body', 'rgba(0, 0, 0, 0.803)')
    styleTextArea ="background-color: darkgrey; color:white;"
    cardsComent = "max-width: 100%; background-color: darkgrey; color:white;"

    console.log("modo escuro ligado", escuro)
    

} else if (escuro == "false")  {
    table = "table-sm"
    back = "bg-light"
    textColor = "text-black"
    textDark = "text-dark"
    navQuestion = "navbar-light bg-light"
    document.body.style.setProperty('--texto-questao', 'black')
    document.body.style.setProperty('--bg-color-body', 'white')
    btnNavi = "btn-secondary text-black"
    btnPublicar = "btn-outline-dark"
    styleTextArea =" "
    cardsComent = "max-width: 100%;"

    console.log("modo escuro desligado", escuro)


}

document.querySelector("#noturno-usuario").addEventListener("change", ({target}) => {
    if (target.checked){
            localStorage.setItem("escuro", "true");
            table1 = "table-sm"
            table2 = "vazia"
            back1 = "bg-light"
            back2 = "vazia"
            textColor = "text-black"
            textDark = "text-dark"
            navQuestion1 = "navbar-light"
            navQuestion2  = "bg-light"
            document.body.style.setProperty('--texto-questao', 'white')
            document.body.style.setProperty('--bg-color-body', 'rgba(0, 0, 0, 0.803)')
            btnNavi1 = "btn-secondary" 
            btnNavi2 = "text-black"
            btnPublicar = "btn-outline-dark"
            removeCssEscuro()
            table1 = "table-dark" 
            table2 = "text-white"
            textColor = "text-dark"
            textDark = "vazia"
            back1 = "bg-dark" 
            back2 = "text-white"
            navQuestion1 = "navbar-dark" 
            navQuestion2 = "bg-transparent"
            btnPublicar = "btn-outline-light"
            btnNavi1 = "btn-secondary"
            btnNavi2 = "vazia"
            incluirCssEscuro()
            table = "table-dark text-white"
            document.querySelector("#text-anotacoes").style.cssText = "background-color: darkgrey; color:white;"
            document.querySelector("#coment").style.cssText = "background-color: darkgrey; color:white;"
            document.querySelectorAll(".comentClass").forEach(a=>{a.style = "max-width: 100%;background-color: darkgrey; color:white;"})
            
            // .then(arg=>{console.log("estilo dos comentários alterados...")}).catch(err=>{console.log("ainda não temos comentários...")})
            
            //reseta as variávies para a próxima questão
            textColor = "text-dark"
            textDark = ""
            back = "bg-dark text-white"
            navQuestion = "navbar-dark bg-transparent"
            btnPublicar = "btn-outline-light"
            btnNavi = "btn-secondary"
            cardsComent = "max-width: 100%; background-color: darkgrey; color:white;"
            styleTextArea = "background-color: darkgrey; color:white;"


            gravaDarkMode("true")




    } else {
            localStorage.setItem("escuro", "false");
            table1 = "table-dark" 
            table2 = "text-white"
            textColor = "text-dark"
            textDark = "vazia"
            back1 = "bg-dark" 
            back2 = "text-white"
            navQuestion1 = "navbar-dark" 
            navQuestion2 = "bg-transparent"
            btnPublicar = "btn-outline-light"
            btnNavi1 = "btn-secondary"
            btnNavi2 = "vazia"
            removeCssEscuro()
            table1 = "table-sm"
            table2 = "vazia"
            back1 = "bg-light"
            back2 = "vazia"
            textColor = "text-black"
            textDark = "text-dark"
            navQuestion1 = "navbar-light"
            navQuestion2  = "bg-light"
            document.body.style.setProperty('--texto-questao', 'black')
            document.body.style.setProperty('--bg-color-body', 'white')
            btnNavi1 = "btn-secondary" 
            btnNavi2 = "text-black"
            btnPublicar = "btn-outline-dark"
            incluirCssEscuro()
            document.querySelector("#text-anotacoes").style.cssText = " "
            document.querySelector("#coment").style.cssText = " "
            document.querySelectorAll(".comentClass").forEach(a=>{a.style = "max-width: 100%;"})
            // .then().catch(err=>{console.log("ainda não temos comentários...")})
            

            //reseta as variáveis para próxim questão
            table = "table-sm"
            back = "bg-light"
            textColor = "text-black"
            textDark = "text-dark"
            navQuestion = "navbar-light bg-light"
            btnNavi = "btn-secondary text-black"
            btnPublicar = "btn-outline-dark"
            cardsComent = "max-width: 100%;"
            styleTextArea = " "
            gravaDarkMode("false")
    }
})




function incluirCssEscuro(){
        n1 =  document.querySelector("#n1")
        n2 = document.querySelector("#n2")
        n3 = document.querySelector("#n3")
        n4 = document.querySelector("#n4")
        n5 = document.querySelector("#n5")
        n6 = document.querySelector("#n6")
        tableQ = document.querySelector("#tableQuestion")
        navQ = document.querySelector("#navQuestion")
        publiComent = document.querySelector("#publi-coment")
        cardComentarios = document.querySelector(".comentClass")


// document.querySelectorAll(".comentClass").forEach((a)=>{a.classList.add("deyvison")})

        n1.classList.add(back1)
        n1.classList.add(back2)
        n2.classList.add(back1)
        n2.classList.add(back2)
        n3.classList.add(table1)
        n3.classList.add(table2)
        n3.classList.add(textDark)
        n4.classList.add(btnNavi1)
        n4.classList.add(btnNavi2)
        n5.classList.add(btnNavi1)
        n5.classList.add(btnNavi2)

        n6.classList.add(back1)
        n6.classList.add(back2)
        tableQ.classList.add(table1)
        tableQ.classList.add(table2)
        navQ.classList.add(navQuestion1)
        navQ.classList.add(navQuestion2)
        publiComent.classList.add(btnPublicar)
}

function removeCssEscuro(){
n1 =  document.querySelector("#n1")
n2 = document.querySelector("#n2")
n3 = document.querySelector("#n3")
n4 = document.querySelector("#n4")
n5 = document.querySelector("#n5")
n6 = document.querySelector("#n6")
tableQ = document.querySelector("#tableQuestion")
navQ = document.querySelector("#navQuestion")
publiComent = document.querySelector("#publi-coment")
cardComentarios = document.querySelector(".comentClass")


n1.classList.remove(back1)
n1.classList.remove(back2)
n2.classList.remove(back1)
n2.classList.remove(back2)
n3.classList.remove(table1)
n3.classList.remove(table2)
n3.classList.remove(textDark)
n4.classList.remove(btnNavi1)
n4.classList.remove(btnNavi2)
n5.classList.remove(btnNavi1)
n5.classList.remove(btnNavi2)

n6.classList.remove(back1)
n6.classList.remove(back2)
tableQ.classList.remove(table1)
tableQ.classList.remove(table2)
navQ.classList.remove(navQuestion1)
navQ.classList.remove(navQuestion2)
publiComent.classList.remove(btnPublicar)
}





function selecionar(a){
    questaoSelecionada = a.id
    if (respostaAtual == ' ' & a != 99){
        $("#" + questaoSelecionada).toggleClass(`table-info ${textColor}`)
        respostaAtual = questaoSelecionada    
    }else if(questaoSelecionada != respostaAtual & a != 99){
        $("#" + respostaAtual).toggleClass(`table-info ${textColor}`)
        $("#" + questaoSelecionada).toggleClass(`table-info ${textColor}`)
        respostaAtual = questaoSelecionada
    } else if (a == 99){
        $("#" + respostaAtual).toggleClass(`table-info ${textColor}`)
        respostaAtual = ' '
        questaoSelecionada = ' '
    }
    console.log(a.id)
    // document.querySelector(a.id).toggleClass()
  
}


function ignorar(a){
    questaoIgnorada = a.id;
    $("#" + questaoSelecionada).toggleClass("riscado");
    
}


