document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('rental-days');
    const increaseButton = document.querySelector('.btn-increment');
    const decreaseButton = document.querySelector('.btn-decrement');

    // Atualiza o preço total sempre que o valor do input muda
    inputField.addEventListener('input', updateTotalPrice);

    increaseButton.addEventListener('click', function (event) {
        event.preventDefault(); // Previne o comportamento padrão do botão
        let currentValue = parseInt(inputField.value); // Pega o valor atual do input
        if (currentValue < 30) { // Limite máximo de 30 dias
            inputField.value = currentValue + 1; // Aumenta o valor em 1
            updateTotalPrice(); // Atualiza o preço total
        }
    });

    decreaseButton.addEventListener('click', function (event) {
        event.preventDefault(); // Previne o comportamento padrão do botão
        let currentValue = parseInt(inputField.value); // Pega o valor atual do input
        if (currentValue > 1) { // Limite mínimo de 1 dia
            inputField.value = currentValue - 1; // Diminui o valor em 1
            updateTotalPrice(); // Atualiza o preço total
        }
    });
});

// Função para atualizar o preço total com base na quantidade de dias
function updateTotalPrice() {
    const dailyPrice = 10.00; // Preço por dia
    const days = document.getElementById('rental-days').value; // Obtém o valor dos dias
    const totalPrice = dailyPrice * days; // Calcula o preço total
    
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2); // Atualiza o texto do preço total
}

// Função para mostrar/ocultar o calendário
function toggleCalendar(event) {
    event.preventDefault(); // Previne o comportamento padrão do botão
    const calendarInput = document.getElementById('calendar-input'); // Obtém o input de data
    calendarInput.style.display = calendarInput.style.display === 'none' ? 'block' : 'none'; // Alterna a visibilidade do input
    if (calendarInput.style.display === 'block') {
        calendarInput.focus(); // Foca no input de data quando mostrado
    }
}

// Função para atualizar os dias com base na data selecionada
function updateDaysFromCalendar(input) {
    const selectedDate = new Date(input.value); // Obtém a data selecionada
    const today = new Date(); // Obtém a data atual
    const rentalDays = Math.ceil((selectedDate - today) / (1000 * 60 * 60 * 24)); // Calcula a diferença em dias
    
    // Garante que o número de dias seja pelo menos 1
    document.getElementById('rental-days').value = Math.max(rentalDays, 1); 
    updateTotalPrice(); // Atualiza o preço total
    input.style.display = 'none'; // Oculta o input após a seleção
}

function previewImages(event) {
    const files = event.target.files; // Obtém os arquivos selecionados
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const errorMessage = document.getElementById('error-message');

    // Limpa a mensagem de erro
    errorMessage.style.display = 'none'; 

    if (imagePreviewContainer.children.length + files.length > 3) { // Verifica se a soma das imagens atuais e novas ultrapassa 3
        errorMessage.textContent = "Você pode escolher no máximo 3 imagens.";
        errorMessage.style.display = 'block'; // Mostra a mensagem de erro
        return; // Sai da função se mais de 3 imagens forem selecionadas
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Cria um elemento de imagem
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file); // Cria um URL temporário para a imagem
        img.style.width = '100px'; // Define a largura da imagem
        img.style.height = '100px'; // Define a altura da imagem
        img.style.marginRight = '10px'; // Espaço entre as imagens
        img.onload = () => URL.revokeObjectURL(img.src); // Libera o URL após a imagem ser carregada

        // Adiciona a imagem ao contêiner
        imagePreviewContainer.appendChild(img);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.querySelector('.submit-button'); // Botão de postar produto

    submitButton.addEventListener('click', function (event) {
        // Impede a submissão do formulário para mostrar a mensagem
        event.preventDefault(); 

        // Cria uma mensagem
        const message = document.createElement('div'); 
        message.textContent = 'Produto postado com sucesso!'; // Texto da mensagem
        message.style.backgroundColor = '#a94ee5'; // Cor de fundo roxa
        message.style.color = '#fff'; // Cor do texto
        message.style.padding = '10px'; // Espaçamento interno
        message.style.borderRadius = '5px'; // Bordas arredondadas
        message.style.position = 'absolute'; // Posição absoluta
        message.style.top = '50%'; // Centraliza verticalmente
        message.style.left = '50%'; // Centraliza horizontalmente
        message.style.transform = 'translate(-50%, -50%)'; // Ajusta a posição para o centro
        message.style.zIndex = '1000'; // Garante que a mensagem fique acima de outros elementos

        // Adiciona a mensagem na página
        document.body.appendChild(message);

        // Remove a mensagem após 3 segundos
        setTimeout(function () {
            message.remove(); // Remove a mensagem da página
        }, 3000);

        // Se você quiser realmente enviar o formulário após mostrar a mensagem,
        // você pode descomentar a linha abaixo:
        // document.querySelector('form').submit();
    });
});
