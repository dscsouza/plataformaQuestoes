
localStorage.clear()


document.querySelector("#switch-noturno").checked = false;

document.querySelector("#switch-noturno").addEventListener("change", ({target}) => {
    target.checked ? modoEscuro(true) : modoEscuro(false);
})


function modoEscuro(dark){
    
    
    if (dark){
    
        document.querySelector("#indexPrincipal").classList.add("bg-dark")
        document.querySelector("#indexPrincipal").classList.add("text-white")

        document.querySelector("#indexPrincipal").classList.remove("bg-white")
        document.querySelector("#indexPrincipal").classList.remove("text-black")



        

        document.querySelector("#telaLogin").classList.add("bg-dark")
        document.querySelector("#telaLogin").classList.add("text-white")

        document.querySelector("#telaLogin").classList.remove("bg-white")
        document.querySelector("#telaLogin").classList.remove("text-black")
       


  

    localStorage.setItem("darkMode", "true");

        
    
    }else {
        
        document.querySelector("#indexPrincipal").classList.add("bg-white")
        document.querySelector("#indexPrincipal").classList.add("text-black")

        document.querySelector("#indexPrincipal").classList.remove("bg-dark")
        document.querySelector("#indexPrincipal").classList.remove("text-white")

        document.querySelector("#telaLogin").classList.add("bg-white")
        document.querySelector("#telaLogin").classList.add("text-black")

        document.querySelector("#telaLogin").classList.remove("bg-dark")
        document.querySelector("#telaLogin").classList.remove("text-white")
        localStorage.setItem("darkMode", "false");
    
    }
}
