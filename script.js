document.addEventListener("DOMContentLoaded", function () {
    var filmesAssistidos = JSON.parse(localStorage.getItem("filmesAssistidos")) || {};

    var links = document.querySelectorAll(".original a");
    links.forEach(function (filme) {
        var href = filme.getAttribute("href");
        if (filmesAssistidos[href]) {
            filme.style.color = "red";
        }
    });

    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        if (e.target && e.target.tagName === "A") {
            var filme = e.target;
            var href = filme.getAttribute("href");


            if (filme.parentElement.classList.contains("original")) {
                if (filme.style.color === "red") {
                    filme.style.color = "white";
                    delete filmesAssistidos[href];
                } else {
                    filme.style.color = "red";
                    filmesAssistidos[href] = true;
                }

                localStorage.setItem("filmesAssistidos", JSON.stringify(filmesAssistidos));
            }
        }
    });
});


function filtrarFilmes() {
    var generoSelecionado = document.querySelector(".genero-filtro").value;
    var listaFilmes = document.createElement("div");
    listaFilmes.className = "lista-filmes";
    var filmes;

    if (generoSelecionado === "todos") {
        filmes = document.querySelectorAll(".original a");
    } else {
        filmes = document.querySelectorAll("a[class*='" + generoSelecionado + "']");

    }

    var listaOriginal = document.querySelector(".lista-filmes");
    if (listaOriginal) {
        listaOriginal.remove();
    }

    var quebraDeLinha = document.createElement("br");
    listaFilmes.appendChild(quebraDeLinha);

    filmes.forEach(function (filme) {
        var filmeLink = document.createElement("a");
        filmeLink.href = filme.getAttribute("href");
        filmeLink.textContent = filme.textContent;
        listaFilmes.appendChild(filmeLink);
        listaFilmes.appendChild(document.createElement("br"));
    });
    if (filmes.length === 0) {
        var nenhumFilmeElemento = document.createElement("div");
        nenhumFilmeElemento.textContent = "Sem resultados.";
        listaFilmes.appendChild(nenhumFilmeElemento);
    }
    var divOriginal = document.querySelector(".original");
    divOriginal.style.display = "none";
    var header = document.querySelector("header");
    header.appendChild(listaFilmes);

    var warnElement = document.getElementById("warn");
    if (warnElement) {
        warnElement.style.display = "none";

    }

    var hiElement = document.querySelector(".hi");
    if (hiElement) {
        hiElement.style.display = "none";
    }

}

