const assert = require('assert');
const { calcularMedia, obterSituacao, validarFormulario } = require('./script.js');

const casos = [
  { nome: 'Ana', notas: [8, 7, 9], esperado: 'Aprovada' },
  { nome: 'Bruno', notas: [6, 5, 6], esperado: 'Recuperação' },
  { nome: 'Carla', notas: [3, 4, 5], esperado: 'Reprovada' },
  { nome: 'Diego', notas: [10, 8, 9], esperado: 'Aprovado' },
];

for (const caso of casos) {
  const media = calcularMedia(caso.notas);
  const situacao = obterSituacao(media, caso.nome);
  assert.strictEqual(situacao, caso.esperado, `${caso.nome} -> ${situacao} !== ${caso.esperado}`);
}

assert.strictEqual(validarFormulario('', [8, 7, 9]), 'Digite o nome do estudante.');
assert.strictEqual(validarFormulario('Ana', [8, '', 9]), 'Digite a nota 2.');
assert.strictEqual(validarFormulario('Ana', [8, 7, 11]), 'A nota 3 deve estar entre 0 e 10.');

console.log('Testes de validação e media concluídos com sucesso.');
