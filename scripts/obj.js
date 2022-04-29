
bdQuestoes = db.collection(questoes)
bdComentarios = db.collection(raizComentarios)
bdAnotacoes = db.collection(raizAnotacoes)
bdUsuarios = db.collection(raizUsuarios)
bdIds = db.collection(raizIds)


bancoQuestoes = {
    id: banco.id,
    ano: banco.ano,
    banca: banco.banca,
    cargo: banco.cargo,
    enunciado: banco.enunciado,
    alternativas:{
        a: "",
        b: "",
        c: "",
        d: "",
        e: "",
        gabarito: ""
    },
    comentarios: ()=>{

        bdQuestoes.doc(bancoQuestoes.id).get().then(snapshot=>{
            idComentarios = snapshot.data()
        }).then({
            idComentarios.forEach(element => {
                bdComentarios.doc(element).get().then(snapshot=>{
                    comentariosQuestao.push(snapshot.data() 
                })

                
            });
            
        })

        

    }
}