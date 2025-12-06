import express from "express";

const host = '0.0.0.0';
const porta = 3000;

var listaUsuarios = [];

const server = express();

server.use(express.urlencoded({extended: true }));

server.get("/cadastroUsuario", (requisicao, resposta) =>{
    resposta.send(`
        <DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            <title>Menu do Sistema</title>
        </head>
        <body>
            <div classe="Container">
                <h1 classe="text-center border m-3 p-3 bg-light"> Cadastro de Usuário </h1>
            
                <form method="POST" action="/adicionarUsuario" class="row g-3">
                    <div class="col-md-6">
                        <label for="Email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="Email" name="Email" >
                    </div>
                    <div class="col-md-6">
                        <label for="Senha" class="form-label">Senha</label>
                        <input type="password" class="form-control" id="Senha" name="Senha" >
                    </div>
                    <div class="col-12">
                        <label for="Endereco" class="form-label">Endereço</label>
                        <input type="text" class="form-control" id="Endereco" name="Endereco" placeholder="...">
                    </div>
                    <div class="col-md-6">
                        <label for="Cidade" class="form-label">Cidade</label>
                        <input type="text" class="form-control" id="Cidade" name="Cidade" >
                    </div>
                    <div class="col-md-4">
                        <label for="Estado" class="form-label">Estado</label>
                        <select id="Estado" class="form-select" name="Estado">
                        <option selected>Selecionar</option>
                        <option>São Paulo </option>
                        <option>Rio de Janeiro</option>
                        <option>Minas Gerais</option>
                        <option>Espírito Santo</option>
                        <option>Paraná</option>
                        <option>Santa Catarina</option>
                        <option>Rio Grande do Sul</option>
                        <option>Bahia</option>
                        <option>Pernambuco</option>
                        <option>Ceará</option>
                        <option>Goiás</option>
                        <option>Distrito Federal</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="CEP" class="form-label">CEP</label>
                        <input type="text" class="form-control" id="CEP" name="CEP">
                    </div>
                    <div class="col-12">
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="gridCheck">
                        <label class="form-check-label" for="gridCheck">
                            Confira-me
                        </label>
                        </div>
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Cadastrar</button>
                    </div>
                    </form>
            </div>

            </body>
             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

        </html>
        `);
});

server.post('/adicionarUsuario', (requisicao, resposta) => {
    const Email = requisicao.body.Email;
    const Senha = requisicao.body.Senha;
    const Endereco = requisicao.body.Endereco;
    const Cidade = requisicao.body.Cidade;
    const Estado = requisicao.body.Estado;
    const CEP = requisicao.body.CEP;
    listaUsuarios.push({Email, Senha, Endereco, Cidade, Estado, CEP});
resposta.redirect("/listaUsuarios");

});

server.get("/listarUsuarios", (requisicao, resposta) => {
    let conteudo = `
        <DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            <title>Lista de Usuaruios do Sistema </title>
        </head>
        <body> 
         <div classe="Container">
                    <h1 classe="text-center border m-3 p-3 bg-light"> Cadastro de Usuário </h1>
                    <table classe="table table-striped table-hover">
                <thead>
                    <tr>
                    <th>Email</th>
                    <th>Senha</th>
                    <th>Endereco</th>
                    <th>Cidade</th>
                    <th>Estado</th>
                    <th>CEP</th>
                    </tr>
                </thead>

        <tbody>`;

        for (let i =0; i < listaUsuarios.length; i++ ){
            conteudo += `
            <tr> 
                <td>${listaUsuarios[i].Email}</td>
                <td>${listaUsuarios[i].Senha}</td>
                <td>${listaUsuarios[i].Endereco}</td>
                <td>${listaUsuarios[i].Cidade}</td>
                <td>${listaUsuarios[i].Estado}</td>
                <td>${listaUsuarios[i].CEP}</td>
            `;
        }
        conteudo+= `      </tbody>
                   </table>
                   <a classe="btn btn-secondary" href="/cadastroUsuario">Voltar</a>
              </div>       
            </body>
                         <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

            </html>  
        `

    resposta.send(conteudo);
});

server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`)
});

