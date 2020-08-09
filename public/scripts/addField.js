// procurar o botao
document.querySelector('#add-time').addEventListener('click', cloneField);
// quando clicar no botao

// executar uma acao
function cloneField() {
  // duplicar os campos
  const newFieldContainer = document
    .querySelector('.schedule-item')
    .cloneNode(true);
  // limpar os campos, que campos?
  const fields = newFieldContainer.querySelectorAll('input');
  fields.forEach((x) => {
    x.value = '';
  });
  // colocar na pagina onde?
  document.querySelector('#schedule-items').appendChild(newFieldContainer);
}
