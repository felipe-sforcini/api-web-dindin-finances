const express = require('express');
const { verificarToken } = require('./filtro/verificar-token');
const { cadastrarUsuario } = require('./controladores/usuario/cadastrar-usuario');
const { login } = require('./controladores/usuario/login');
const { detalharUsuario } = require('./controladores/usuario/detalhar-usuario');
const { atualizarUsuario } = require('./controladores/usuario/atualizar-usuario');
const { listarCategorias } = require('./controladores/categoria/listar-categorias');
const { listarTransacoes } = require('./controladores/transacao/listar-transacoes');
const { cadastrarTransacao } = require('./controladores/transacao/cadastrar-transacao');
const { detalharTransacao } = require('./controladores/transacao/detalhar-transacao');
const { atualizarTransacao } = require('./controladores/transacao/atualizar-transacao');
const { excluirTransacao } = require('./controladores/transacao/excluir-transacao');
const { extratoTransacoes } = require('./controladores/transacao/extrato-transacoes');


const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', login);

rotas.use(verificarToken);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', atualizarUsuario);

rotas.get('/categoria', listarCategorias);

rotas.get('/transacao', listarTransacoes);
rotas.post('/transacao', cadastrarTransacao);
rotas.get('/transacao/extrato', extratoTransacoes);
rotas.get('/transacao/:id', detalharTransacao);
rotas.put('/transacao/:id', atualizarTransacao);
rotas.delete('/transacao/:id', excluirTransacao);

module.exports = rotas;