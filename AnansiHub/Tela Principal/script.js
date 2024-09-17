function openTab(evt, tabName) {
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }

    var tabLinks = document.getElementsByClassName("tab-link");
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}


function voltartela() {
    window.location.href = "/Tela inicial/index.html";
}


document.getElementById('projeto-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('tituloProjeto').value;
    const descricao = document.getElementById('descricaoProjeto').value;
    const data = document.getElementById('dataEntrega').value;
    const imagemInput = document.getElementById('imagemProjeto');
    let imagem = '';
    const data_verify = new Date(); // CONSTANTE DE VERIFICAR DE DATA


    // VERIFICADORES DOS INPUTS

if(titulo.length <= 8){
    alert("Adicione pelo menos 8 caracteres no título")
}

if(descricao.length >= isNaN){
    alert("Coloque no mínimo 1 caracteres na descrição do projeto")
}

// ADICIONAR CONDIÇÃO DA DATA
// ADICIONAR OPÇÃO PARA O USUÁRIO COLOCAR IMAGEM
// ADICIONAR FUNÇÃO ARA NÃO CADASTRAR PROJETO CASO UMA DAS CONDIÇÕES NÃO SEJA ADERIDA


    if (imagemInput.files && imagemInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagem = e.target.result; 
            salvarProjeto({ titulo, descricao, data,imagem });
        };
        reader.readAsDataURL(imagemInput.files[0]);
    } else {
        salvarProjeto({ titulo, descricao, data,valor, imagem });
    }
});


function salvarProjeto(projeto) {
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    projetos.push(projeto);
    localStorage.setItem('projetos', JSON.stringify(projetos));

    
    document.getElementById('projeto-form').reset();

    
    mostrarProjetos();
}


function apagarProjeto(index) {
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    projetos.splice(index, 1); 
    localStorage.setItem('projetos', JSON.stringify(projetos));
    mostrarProjetos(); 
}


function mostrarProjetos() {
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    const principalDiv = document.getElementById('principal');

    let projetosHTML = '<h2>Projetos Cadastrados</h2>';
    projetosHTML += '<div class="service1-wrapper">'; 

    if (projetos.length > 0) {
        projetos.forEach((projeto, index) => {
            projetosHTML += `
                <div class="service1-item">
                    <h3>${projeto.titulo}</h3>
                    <p style="font-weight:bold;">Descrição:</p>
                    <p>${projeto.descricao}</p>
                    <p>Prazo de Entrega: ${projeto.data}</p>`;

         
            if (projeto.imagem) {
                projetosHTML += `<img src="${projeto.imagem}" alt="Imagem do Projeto" style="max-width: 100%; height: auto;">`;
            }

            projetosHTML += `<br><br><button onclick="apagarProjeto(${index})">Apagar</button>
                </div>`;
        });
    } else {
        projetosHTML += '<p>Nenhum projeto cadastrado.</p>';
    }

    projetosHTML += '</div>'; 
    principalDiv.innerHTML = projetosHTML;
}


document.addEventListener('DOMContentLoaded', mostrarProjetos);


function pesquisa() {
    
    const termoPesquisa = document.getElementById('searchInput').value.toLowerCase();
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    const principalDiv = document.getElementById('principal');

    let projetosHTML = '<h2>Projetos Cadastrados</h2>';
    projetosHTML += '<div class="service1-wrapper">';


    
    const projetosFiltrados = projetos.filter(projeto =>
        projeto.titulo.toLowerCase().includes(termoPesquisa) ||
        projeto.descricao.toLowerCase().includes(termoPesquisa) ||
        projeto.data.toLowerCase().includes(termoPesquisa)
    );

    if (projetosFiltrados.length > 0) {
        projetosFiltrados.forEach((projeto, index) => {
            projetosHTML += `
                <div class="service1-item">
                    <h3>${projeto.titulo}</h3>
                    <p style="font-weight:bold;">Descrição:</p>
                    <p>${projeto.descricao}</p>
                    <p> Prazo de Entrega ${projeto.data}</p>`;

            if (projeto.imagem) {
                projetosHTML += `<img src="${projeto.imagem}" alt="Imagem do Projeto" style="max-width: 100%; height: auto;">`;
            }

            projetosHTML += `<br><br><button onclick="apagarProjeto(${index})">Apagar</button>
                </div>`;
        });
    } else {
        projetosHTML += '<p>Nenhum projeto encontrado.</p>';
    }

    projetosHTML += '</div>';
    principalDiv.innerHTML = projetosHTML;
}
