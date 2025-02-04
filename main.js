'use strict'
// tela de resultado e o que tem dentro dela e vai ser usado
const resultScreen = document.querySelector('#result-screen');
resultScreen.style.display = 'none';
const codeDisplay = document.querySelector('#code-display');
const priceDisplay = document.querySelector('#price-display');

// inputs
const inputs = document.querySelectorAll('input');

// function para buscar descargas
const getDescarga = async (code) => {

  try {
    const response = await fetch(`https://api-consulta-de-descargas.onrender.com/descarga-${code}`);
    const descaga = await response.json();
    console.log(descaga);
    return descaga;
  } catch (error) {
    console.error("Erro:", error);
  }

};

// button submit
const btnSubmit = document.querySelector('button');
btnSubmit.addEventListener('click', async () => {
    let codeInput = inputs[0].value || null;
    let porcentagem = inputs[1].value/100 || null;
    if(code !== null && porcentagem !== null) {

        const response = await getDescarga(codeInput);
        let price = parseFloat(response.price);
        price = (price + (price * porcentagem)).toFixed(2)
        codeDisplay.textContent = response.code;
        priceDisplay.textContent = `R$ ${price}`;
        resultScreen.style.display = 'flex';

    } else {

        const response = await getDescarga(codeInput);
        const code = response.code;
        const price = response.price;
        codeDisplay.textContent = code;
        priceDisplay.textContent = `R$ ${price}`;
        resultScreen.style.display = 'flex';

    }
});

/*
url da API: http://192.168.2.8:3000/

GET /descarga code

*/
