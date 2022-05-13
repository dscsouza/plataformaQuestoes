

function qAnterior(){
    if (questaoAtual == 0){
        alerta("Você já está na primeira questão.", false, "warning")
    } else {
        questaoAtual --  
        exibirQuestao(questaoAtual)   
    }
    console.log(`ANTERIOR: Questão atual: ${questaoAtual}. Tamanho Array Questions ${questions.length}. ID questão  - ${questions[questaoAtual].ID}`)

   
}

function qProxima(){
         // a próxima questão sempre é uma questão aleatória
        //o histórico de questões é salvo no array
        // questions[0...x]

     
        //só incrementa a variável  questãoAtual, se ela for menor 
        //que a quantidade de questões no array questions
        //isso evita que o sistema tente exibir uma questão que ainda não foi carregada
        if (questaoAtual < questions.length){
            questaoAtual ++
            exibirQuestaoAleatoria()
        } else {
            alerta("Carregando...",false, "warning")
        }
 
        console.log(`PRÓXIMA: Questão atual: ${questaoAtual}. Array Questions ${questions.length}`)         
}


// VERIFICA SE A RESPOSTA ESTÁ CORRETA

function responder(){
    if (respostaAtual == " "){
        alerta("Selecione uma alternativa...", false, "warning")
        return
    }

    respostaCerta = questions[questaoAtual].alternativas.gabarito
    console.log(`Questao atual: ${questaoAtual}, Resposta Certa: ${respostaCerta}, Questão Selecionada ${respostaAtual}`)

    if (respostaAtual == respostaCerta){
        console.log("resposta certa")
        $("#qAcertou").text("Acertou!").fadeOut(3000, ()=>{
            $("#qAcertou").text(" ")
            $("#qAcertou").show()
        })

        questaoResolvida("certa")
        $("#" + respostaAtual).toggleClass("resposta-certa")
        setTimeout(() => {
            // $("#" + respostaAtual).removeClass("resposta-certa")
            selecionar(99)
        }, 420);

        document.querySelector("#btn-responder").disabled = true
        document.querySelector("#btn-responder").classList.add("ponteiro-proibido")
        
    }else{
        $("#" + respostaAtual).toggleClass("resposta-errada")
        $("#" + respostaCerta).toggleClass("resposta-certa")
        $("#qErrou").text("Errou!    -    "+"Resposta certa: " + respostaCerta)

        $("#qErrou").fadeOut(2000, ()=>{
            $("#qErrou").text(" ")
            $("#qErrou").show()
        })

        questaoResolvida("errada")
       

        console.log("resposta errada")
        
        setTimeout(() => {
            // $("#" + respostaAtual).removeClass("resposta-errada")
            // $("#" + respostaCerta).removeClass("resposta-certa")
            selecionar(99)
        }, 420);
        document.querySelector("#btn-responder").disabled = true
        document.querySelector("#btn-responder").classList.add("ponteiro-proibido")

        
    }

   

}