// ===========================================
// FORMULÁRIOS E VALIDAÇÕES EM JAVASCRIPT
// ===========================================

// Este arquivo contém validações completas e personalizadas
// para formulários, demonstrando diversos conceitos de JavaScript

console.log('📋 Sistema de validação carregado!');

// ===========================================
// PARTE 1: SELECIONANDO ELEMENTOS DO FORMULÁRIO
// ===========================================

// Seleciona o formulário principal
const formulario = document.getElementById('formularioCadastro');

// Seleciona todos os campos do formulário
const campoNome = document.getElementById('nome');
const campoEmail = document.getElementById('email');
const campoSenha = document.getElementById('senha');
const campoConfirmarSenha = document.getElementById('confirmarSenha');
const campoDataNascimento = document.getElementById('dataNascimento');
const campoCpf = document.getElementById('cpf');
const campoTelefone = document.getElementById('telefone');
const campoEstado = document.getElementById('estado');
const campoTermos = document.getElementById('termos');

// Seleciona botões
const btnEnviar = document.getElementById('btnEnviar');
const btnLimpar = document.getElementById('btnLimpar');

// Seleciona área de resultado
const resultadoEnvio = document.getElementById('resultadoEnvio');
const dadosEnviados = document.getElementById('dadosEnviados');

console.log('✅ Todos os elementos foram selecionados');

// ===========================================
// PARTE 2: FUNÇÕES DE VALIDAÇÃO
// ===========================================

/**
 * Função para mostrar mensagem de erro
 * @param {string} campoId - ID do campo
 * @param {string} mensagem - Mensagem de erro
 */
function mostrarErro(campoId, mensagem) {
    const campo = document.getElementById(campoId);
    const erroSpan = document.getElementById(`erro-${campoId}`);
    const sucessoSpan = document.getElementById(`sucesso-${campoId}`);
    
    // Remove classe de sucesso e adiciona classe de erro
    campo.classList.remove('valido');
    campo.classList.add('invalido');
    
    // Mostra mensagem de erro e esconde sucesso
    erroSpan.textContent = mensagem;
    erroSpan.style.display = 'block';
    if (sucessoSpan) {
        sucessoSpan.style.display = 'none';
    }
    
    console.log(`❌ Erro no campo ${campoId}: ${mensagem}`);
}

/**
 * Função para mostrar mensagem de sucesso
 * @param {string} campoId - ID do campo
 */
function mostrarSucesso(campoId) {
    const campo = document.getElementById(campoId);
    const erroSpan = document.getElementById(`erro-${campoId}`);
    const sucessoSpan = document.getElementById(`sucesso-${campoId}`);
    
    // Remove classe de erro e adiciona classe de sucesso
    campo.classList.remove('invalido');
    campo.classList.add('valido');
    
    // Esconde mensagem de erro e mostra sucesso
    erroSpan.style.display = 'none';
    if (sucessoSpan) {
        sucessoSpan.style.display = 'block';
    }
    
    console.log(`✅ Campo ${campoId} validado com sucesso`);
}

/**
 * Função para limpar validação de um campo
 * @param {string} campoId - ID do campo
 */
function limparValidacao(campoId) {
    const campo = document.getElementById(campoId);
    const erroSpan = document.getElementById(`erro-${campoId}`);
    const sucessoSpan = document.getElementById(`sucesso-${campoId}`);
    
    campo.classList.remove('valido', 'invalido');
    erroSpan.style.display = 'none';
    if (sucessoSpan) {
        sucessoSpan.style.display = 'none';
    }
}

// ===========================================
// PARTE 3: VALIDAÇÕES ESPECÍFICAS
// ===========================================

/**
 * Valida o nome completo
 * Regras: mínimo 3 caracteres, apenas letras e espaços
 */
function validarNome() {
    const nome = campoNome.value.trim();
    
    if (nome === '') {
        mostrarErro('nome', 'O nome é obrigatório');
        return false;
    }
    
    if (nome.length < 3) {
        mostrarErro('nome', 'O nome deve ter no mínimo 3 caracteres');
        return false;
    }
    
    // Regex: apenas letras, espaços e acentos
    const regexNome = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!regexNome.test(nome)) {
        mostrarErro('nome', 'O nome deve conter apenas letras');
        return false;
    }
    
    // Verifica se tem pelo menos nome e sobrenome
    const partesNome = nome.split(' ').filter(parte => parte.length > 0);
    if (partesNome.length < 2) {
        mostrarErro('nome', 'Digite seu nome completo (nome e sobrenome)');
        return false;
    }
    
    mostrarSucesso('nome');
    return true;
}

/**
 * Valida o email
 * Regras: formato válido de email
 */
function validarEmail() {
    const email = campoEmail.value.trim();
    
    if (email === '') {
        mostrarErro('email', 'O email é obrigatório');
        return false;
    }
    
    // Regex completo para validação de email
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(email)) {
        mostrarErro('email', 'Digite um email válido');
        return false;
    }
    
    mostrarSucesso('email');
    return true;
}

/**
 * Valida a senha
 * Regras: mínimo 8 caracteres, 1 maiúscula, 1 número
 */
function validarSenha() {
    const senha = campoSenha.value;
    
    if (senha === '') {
        mostrarErro('senha', 'A senha é obrigatória');
        return false;
    }
    
    if (senha.length < 8) {
        mostrarErro('senha', 'A senha deve ter no mínimo 8 caracteres');
        return false;
    }
    
    // Verifica se tem pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(senha)) {
        mostrarErro('senha', 'A senha deve conter pelo menos uma letra maiúscula');
        return false;
    }
    
    // Verifica se tem pelo menos um número
    if (!/\d/.test(senha)) {
        mostrarErro('senha', 'A senha deve conter pelo menos um número');
        return false;
    }
    
    mostrarSucesso('senha');
    
    // Se o campo de confirmar senha já foi preenchido, valida novamente
    if (campoConfirmarSenha.value !== '') {
        validarConfirmarSenha();
    }
    
    return true;
}

/**
 * Valida a confirmação de senha
 * Regras: deve ser igual à senha
 */
function validarConfirmarSenha() {
    const senha = campoSenha.value;
    const confirmarSenha = campoConfirmarSenha.value;
    
    if (confirmarSenha === '') {
        mostrarErro('confirmarSenha', 'Confirme sua senha');
        return false;
    }
    
    if (senha !== confirmarSenha) {
        mostrarErro('confirmarSenha', 'As senhas não coincidem');
        return false;
    }
    
    mostrarSucesso('confirmarSenha');
    return true;
}

/**
 * Valida a data de nascimento
 * Regras: maior de 18 anos
 */
function validarDataNascimento() {
    const dataNascimento = campoDataNascimento.value;
    
    if (dataNascimento === '') {
        mostrarErro('dataNascimento', 'A data de nascimento é obrigatória');
        return false;
    }
    
    // Converte a data para objeto Date
    const dataNasc = new Date(dataNascimento);
    const hoje = new Date();
    
    // Calcula a idade
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mes = hoje.getMonth() - dataNasc.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
        idade--;
    }
    
    console.log(`🎂 Idade calculada: ${idade} anos`);
    
    if (idade < 18) {
        mostrarErro('dataNascimento', 'Você deve ter pelo menos 18 anos');
        return false;
    }
    
    if (idade > 120) {
        mostrarErro('dataNascimento', 'Data de nascimento inválida');
        return false;
    }
    
    mostrarSucesso('dataNascimento');
    return true;
}

/**
 * Valida CPF (algoritmo completo)
 * Regras: formato correto e dígitos verificadores válidos
 */
function validarCPF() {
    let cpf = campoCpf.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    
    if (cpf === '') {
        mostrarErro('cpf', 'O CPF é obrigatório');
        return false;
    }
    
    if (cpf.length !== 11) {
        mostrarErro('cpf', 'O CPF deve ter 11 dígitos');
        return false;
    }
    
    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) {
        mostrarErro('cpf', 'CPF inválido');
        return false;
    }
    
    // Validação dos dígitos verificadores
    let soma = 0;
    let resto;
    
    // Valida o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) {
        mostrarErro('cpf', 'CPF inválido');
        return false;
    }
    
    // Valida o segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) {
        mostrarErro('cpf', 'CPF inválido');
        return false;
    }
    
    console.log(`✅ CPF ${cpf} é válido!`);
    mostrarSucesso('cpf');
    return true;
}

/**
 * Valida telefone
 * Regras: formato brasileiro (11) 98765-4321
 */
function validarTelefone() {
    const telefone = campoTelefone.value.replace(/\D/g, '');
    
    if (telefone === '') {
        mostrarErro('telefone', 'O telefone é obrigatório');
        return false;
    }
    
    // Aceita 10 dígitos (fixo) ou 11 dígitos (celular)
    if (telefone.length < 10 || telefone.length > 11) {
        mostrarErro('telefone', 'Telefone inválido');
        return false;
    }
    
    // Verifica se o DDD é válido (11 a 99)
    const ddd = parseInt(telefone.substring(0, 2));
    if (ddd < 11 || ddd > 99) {
        mostrarErro('telefone', 'DDD inválido');
        return false;
    }
    
    mostrarSucesso('telefone');
    return true;
}

/**
 * Valida select de estado
 */
function validarEstado() {
    const estado = campoEstado.value;
    
    if (estado === '') {
        mostrarErro('estado', 'Selecione seu estado');
        return false;
    }
    
    mostrarSucesso('estado');
    return true;
}

/**
 * Valida checkbox de termos
 */
function validarTermos() {
    if (!campoTermos.checked) {
        mostrarErro('termos', 'Você deve aceitar os termos de uso');
        return false;
    }
    
    // Limpa erro se existir
    document.getElementById('erro-termos').style.display = 'none';
    return true;
}

// ===========================================
// PARTE 4: MÁSCARAS DE ENTRADA
// ===========================================

/**
 * Aplica máscara de CPF: 000.000.000-00
 */
function mascaraCPF(valor) {
    return valor
        .replace(/\D/g, '') // Remove tudo que não é dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após 3 dígitos
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após 3 dígitos
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona hífen antes dos 2 últimos
}

/**
 * Aplica máscara de telefone: (00) 00000-0000
 */
function mascaraTelefone(valor) {
    valor = valor.replace(/\D/g, '');
    
    if (valor.length <= 10) {
        // Telefone fixo: (00) 0000-0000
        return valor
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    } else {
        // Celular: (00) 00000-0000
        return valor
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2');
    }
}

// Aplica as máscaras conforme o usuário digita
campoCpf.addEventListener('input', function() {
    this.value = mascaraCPF(this.value);
});

campoTelefone.addEventListener('input', function() {
    this.value = mascaraTelefone(this.value);
});

console.log('🎭 Máscaras de entrada aplicadas');

// ===========================================
// PARTE 5: EVENTOS DE VALIDAÇÃO EM TEMPO REAL
// ===========================================

// Valida cada campo quando o usuário termina de editar (blur)
campoNome.addEventListener('blur', validarNome);
campoEmail.addEventListener('blur', validarEmail);
campoSenha.addEventListener('blur', validarSenha);
campoConfirmarSenha.addEventListener('blur', validarConfirmarSenha);
campoDataNascimento.addEventListener('blur', validarDataNascimento);
campoCpf.addEventListener('blur', validarCPF);
campoTelefone.addEventListener('blur', validarTelefone);
campoEstado.addEventListener('change', validarEstado);
campoTermos.addEventListener('change', validarTermos);

console.log('👂 Eventos de validação em tempo real configurados');

// ===========================================
// PARTE 6: VALIDAÇÃO COMPLETA DO FORMULÁRIO
// ===========================================

/**
 * Valida todos os campos do formulário
 * @returns {boolean} - true se todos válidos, false se algum inválido
 */
function validarFormularioCompleto() {
    console.log('🔍 Iniciando validação completa do formulário...');
    
    // Chama todas as funções de validação
    const nomeValido = validarNome();
    const emailValido = validarEmail();
    const senhaValida = validarSenha();
    const confirmarSenhaValida = validarConfirmarSenha();
    const dataNascimentoValida = validarDataNascimento();
    const cpfValido = validarCPF();
    const telefoneValido = validarTelefone();
    const estadoValido = validarEstado();
    const termosValido = validarTermos();
    
    // Retorna true apenas se TODOS forem válidos
    const formularioValido = nomeValido && emailValido && senhaValida && 
                             confirmarSenhaValida && dataNascimentoValida && 
                             cpfValido && telefoneValido && estadoValido && termosValido;
    
    if (formularioValido) {
        console.log('✅ Formulário completamente válido!');
    } else {
        console.log('❌ Formulário contém erros');
    }
    
    return formularioValido;
}

// ===========================================
// PARTE 7: EVENTO DE SUBMIT DO FORMULÁRIO
// ===========================================

formulario.addEventListener('submit', function(evento) {
    // Previne o comportamento padrão (enviar e recarregar a página)
    evento.preventDefault();
    
    console.log('📨 Tentativa de envio do formulário...');
    
    // Valida todo o formulário
    if (validarFormularioCompleto()) {
        // Se válido, coleta os dados
        const dados = {
            nome: campoNome.value.trim(),
            email: campoEmail.value.trim(),
            dataNascimento: campoDataNascimento.value,
            cpf: campoCpf.value,
            telefone: campoTelefone.value,
            estado: campoEstado.value
        };
        
        console.log('📊 Dados coletados:', dados);
        
        // Mostra os dados na tela
        mostrarResultado(dados);
        
        // Desabilita o botão de enviar
        btnEnviar.disabled = true;
        btnEnviar.textContent = '✅ Cadastro Enviado!';
        btnEnviar.style.background = '#27ae60';
        
        // Em uma aplicação real, aqui você enviaria os dados para o servidor
        // fetch('/api/cadastro', { method: 'POST', body: JSON.stringify(dados) })
    } else {
        console.log('⚠️ Corrija os erros antes de enviar');
        
        // Rola a página até o primeiro erro
        const primeiroErro = document.querySelector('.invalido');
        if (primeiroErro) {
            primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
            primeiroErro.focus();
        }
    }
});

/**
 * Mostra o resultado do envio na tela
 */
function mostrarResultado(dados) {
    // Monta o HTML com os dados
    const html = `
        <p><strong>Nome:</strong> ${dados.nome}</p>
        <p><strong>Email:</strong> ${dados.email}</p>
        <p><strong>Data de Nascimento:</strong> ${formatarData(dados.dataNascimento)}</p>
        <p><strong>CPF:</strong> ${dados.cpf}</p>
        <p><strong>Telefone:</strong> ${dados.telefone}</p>
        <p><strong>Estado:</strong> ${dados.estado}</p>
    `;
    
    dadosEnviados.innerHTML = html;
    resultadoEnvio.classList.remove('oculto');
    
    // Rola até o resultado
    resultadoEnvio.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Formata data de YYYY-MM-DD para DD/MM/YYYY
 */
function formatarData(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

// ===========================================
// PARTE 8: EVENTO DE RESET DO FORMULÁRIO
// ===========================================

btnLimpar.addEventListener('click', function() {
    console.log('🔄 Limpando formulário...');
    
    // Limpa todas as validações
    limparValidacao('nome');
    limparValidacao('email');
    limparValidacao('senha');
    limparValidacao('confirmarSenha');
    limparValidacao('dataNascimento');
    limparValidacao('cpf');
    limparValidacao('telefone');
    limparValidacao('estado');
    limparValidacao('termos');
    
    // Esconde o resultado
    resultadoEnvio.classList.add('oculto');
    
    // Reabilita o botão de enviar
    btnEnviar.disabled = false;
    btnEnviar.textContent = '✉️ Enviar Cadastro';
    btnEnviar.style.background = '';
    
    console.log('✅ Formulário limpo');
});

// ===========================================
// PARTE 9: DICAS E MELHORIAS
// ===========================================

// Foca no primeiro campo quando a página carrega
window.addEventListener('load', function() {
    campoNome.focus();
    console.log('🎯 Foco no primeiro campo');
});

// Mostra dicas no console
console.log(`
📚 CONCEITOS IMPORTANTES DEMONSTRADOS:

1️⃣ EVENTOS:
   - submit: Captura envio do formulário
   - blur: Valida quando campo perde foco
   - input: Aplica máscaras em tempo real
   - change: Detecta mudanças em select e checkbox

2️⃣ VALIDAÇÕES:
   - Nome: Regex para letras e espaços
   - Email: Regex para formato válido
   - Senha: Verificação de força
   - CPF: Algoritmo completo de validação
   - Data: Cálculo de idade
   - Telefone: DDD e formato brasileiro

3️⃣ MANIPULAÇÃO DOM:
   - classList.add/remove: Adiciona/remove classes
   - preventDefault(): Previne comportamento padrão
   - scrollIntoView(): Rola até elemento
   - textContent/innerHTML: Altera conteúdo

4️⃣ BOAS PRÁTICAS:
   - Feedback visual imediato
   - Mensagens de erro claras
   - Validação em tempo real
   - Máscaras de entrada
   - Acessibilidade (focus, labels)

💡 Abra o DevTools (F12) para ver todos os logs!
`);

// ===========================================
// PARTE 10: FUNÇÕES EXTRAS (PARA DESAFIOS)
// ===========================================

/**
 * Exemplo de função para validar email empresarial
 * (não está sendo usada, mas pode ser implementada nos desafios)
 */
function validarEmailEmpresarial(email) {
    const dominiosPublicos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
    const dominio = email.split('@')[1];
    
    return !dominiosPublicos.includes(dominio.toLowerCase());
}

/**
 * Exemplo de função para calcular força da senha
 * (não está sendo usada, mas pode ser implementada nos desafios)
 */
function calcularForcaSenha(senha) {
    let forca = 0;
    
    if (senha.length >= 8) forca++;
    if (senha.length >= 12) forca++;
    if (/[a-z]/.test(senha)) forca++;
    if (/[A-Z]/.test(senha)) forca++;
    if (/\d/.test(senha)) forca++;
    if (/[@$!%*?&#]/.test(senha)) forca++;
    
    if (forca <= 2) return 'fraca';
    if (forca <= 4) return 'média';
    return 'forte';
}

console.log('🚀 Sistema de validação completamente carregado e pronto para uso!');