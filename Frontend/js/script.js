function efetuarAtualizacao(){

    let nome = document.getElementById("Nome");
    let email = document.getElementById("Email");
    let id = document.getElementById("txtId");

    
    

    nome.value = n
    email.value = e
    
}
function atualizar(id, name, email){
    
    if(confirm(`Você realmente deseja atualizar o usuário ${name}`)==1){


        n = prompt(`Atualizar o nome: ${name} para`, name)
        e = prompt(`Atualizar o email: ${email} para ` ,email)
 
       // alert(n)
        //alert(e)

        fetch("http://127.0.0.1:3000/api/update/"+id,{
        method: "PUT",
        headers:{
        "accept":"application/json",
        "content-type": "application/json" 
        },
        body:JSON.stringify({
          name:n,
          email:e
        })
        })
        .then((rs)=> rs.json())
        .then((dados)=>{
          alert("Dados atualizados");
          document.location.reload()
        }).catch((e)=>console.error(e))


     


    }
    
}



function apagar(id){
    if(confirm("Você realmente deseja apagar este usuário?")==1){
        fetch(`http://127.0.0.1:3000/api/delete/${id}`,{
            method:"DELETE",
            headers:{
                "accept":"application/json",
                "content-type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((dados)=>{
            alert(dados);
            document.location.reload();
        })
        .catch((e)=>console.error(e))
    }
}
function carregar(){
    const container = document.querySelector(".container");

    fetch("http://127.0.0.1:3000/api/users")
    .then((res)=>res.json())
    .then((dados)=>{
        let saida = "";
        dados.map((rs)=>{
            saida+=`
            <div class="card col-3">
                <img src="img/user.png" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${rs.name}</h5>
            <p class="card-text">${rs.email}</p>
            <a href="#" class="btn btn-primary" id="atualizar"  onclick="atualizar(${rs.id},'${rs.name}','${rs.email}')"  data-bs-toggle="modal" data-bs-target="#atualizarModal">Atualizar</a>
            <a href="#" class="btn btn-danger" id="deletar" onclick=apagar(${rs.id})>Deletar</a>
            </div>
            </div> 
            `;
        });
        container.innerHTML = saida;
    })
}

document.body.onload = ()=>{carregar()}

// fazer a referencia ao botão cadastrar que está na
//página index.html
const btnCadastrar = document.querySelector("#btnCadastrar");
btnCadastrar.onclick = ()=>{
    if(confirm("Você deseja cadatrar este cliente?")==1){
        fetch("http://127.0.0.1:3000/api/create",{
            method:"POST",
            headers:{
                "accept":"application/json",
                "content-type":"application/json"
            },
            body:JSON.stringify({
                name:document.querySelector("#txtNome").value,
                email:document.querySelector("#txtEmail").value
            })
        })
        .then((res)=>res.json())
        .then((dados)=>{
            alert(dados);
            document.location.reload();
        })
        .catch((erro)=>{
            console.error(erro)
        })

    }
}



