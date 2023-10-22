const socket = io();

function addClient() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;

    if (!nome || !cpf) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const clientList = document.getElementById('clientList');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${nome}</td>
        <td>${cpf}</td>
    `;
    clientList.appendChild(row);

    document.getElementById('nome').value = '';
    document.getElementById('cpf').value = '';

    socket.emit('addClient', { nome, cpf });
}

function removeClient() {
    const nome = document.getElementById('nome').value;

    if (!nome) {
        alert('Por favor, preencha o campo "Nome" para remover o cliente.');
        return;
    }

    const clientList = document.getElementById('clientList');
    const rows = clientList.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        if (cells.length > 0 && cells[0].textContent === nome) {
            clientList.removeChild(row);
            break;
        }
    }

    document.getElementById('nome').value = '';
    document.getElementById('cpf').value = '';

    socket.emit('removeClient', nome);
}

function getClient() {
    const nome = document.getElementById('nome').value;
    if (!nome) {
        alert('Por favor, preencha o campo "Nome" para consultar o cliente.');
        return;
    }

    const clientList = document.getElementById('clientList');
    const rows = clientList.getElementsByTagName('tr');
    let found = false;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        if (cells.length > 0 && cells[0].textContent === nome) {
            const clientInfo = document.getElementById('clientInfo');
            clientInfo.innerHTML = `
                Nome: ${cells[0].textContent}<br>
                CPF: ${cells[1].textContent}<br>
            `;
            found = true;
            break;
        }
    }

    if (!found) {
        alert('Cliente não encontrado na tabela.');
    }

    document.getElementById('nome').value = '';
}