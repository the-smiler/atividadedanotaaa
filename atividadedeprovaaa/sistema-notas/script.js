function normalizeGrade(value) {
  if (value === null || value === undefined) {
    return NaN;
  }

  const numeric = Number(String(value).trim().replace(',', '.'));
  return Number.isFinite(numeric) ? numeric : NaN;
}

function calcularMedia(notas) {
  const soma = notas.reduce((total, nota) => total + nota, 0);
  return soma / notas.length;
}

function obterSituacao(media, nomeEstudante) {
  const nome = String(nomeEstudante || '').trim();
  const finalIsA = nome.length > 0 && /a$/i.test(nome);

  if (media >= 7) {
    return finalIsA ? 'Aprovada' : 'Aprovado';
  }

  if (media >= 5) {
    return 'Recuperação';
  }

  return finalIsA ? 'Reprovada' : 'Reprovado';
}

function validarFormulario(nomeEstudante, notas) {
  if (!String(nomeEstudante).trim()) {
    return 'Informe o nome do estudante.';
  }

  for (let i = 0; i < notas.length; i += 1) {
    const valor = notas[i];

    if (valor === null || valor === undefined || String(valor).trim() === '') {
      return `Informe a nota ${i + 1}.`;
    }

    const nota = normalizeGrade(valor);
    if (!Number.isFinite(nota) || nota < 0 || nota > 10) {
      return `A nota ${i + 1} deve estar entre 0 e 10.`;
    }

    notas[i] = nota;
  }

  return null;
}

function renderResultado(mensagem, tipo) {
  const resultado = document.getElementById('resultado');
  if (!resultado) {
    return;
  }

  resultado.textContent = mensagem;
  resultado.classList.remove('success', 'error');

  if (tipo === 'success') {
    resultado.classList.add('success');
  }

  if (tipo === 'error') {
    resultado.classList.add('error');
  }
}

function limparCampos() {
  const form = document.getElementById('form-notas');
  if (form) {
    form.reset();
  }

  renderResultado('Preencha os dados para visualizar o resultado.', '');
}

function inicializarSistema() {
  const form = document.getElementById('form-notas');
  const btnLimpar = document.getElementById('btnLimpar');

  if (!form || !btnLimpar) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nomeEstudante = document.getElementById('nomeAluno').value;
    const notas = [
      document.getElementById('nota1').value,
      document.getElementById('nota2').value,
      document.getElementById('nota3').value,
    ];

    const erro = validarFormulario(nomeEstudante, notas);
    if (erro) {
      renderResultado(erro, 'error');
      return;
    }

    const media = calcularMedia(notas);
    const situacao = obterSituacao(media, nomeEstudante);
    const mensagem = `${nomeEstudante}: média ${media.toFixed(1).replace('.', ',')} — ${situacao}`;

    renderResultado(mensagem, 'success');
  });

  btnLimpar.addEventListener('click', limparCampos);
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', inicializarSistema);
}

if (typeof module !== 'undefined') {
  module.exports = {
    normalizeGrade,
    calcularMedia,
    obterSituacao,
    validarFormulario,
  };
}
