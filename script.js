const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MS", "MT", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const selectEstado = document.getElementById("estados");

estados.forEach((estado, index) => {
    const option = document.createElement("option");
    option.value = index === estados.length - 1 ? "EX" : estado.toUpperCase();
    option.text = estado;
    selectEstado.appendChild(option);
});

const formasPagamento = ["Cartão de Crédito", "Cartão de Débito", "PIX", "Dinheiro", "Cheque"];

const selectPagamento = document.getElementById("formasPagamento");

formasPagamento.forEach((forma, index) => {
    const option = document.createElement("option");
    option.value = index; 
    option.text = forma;
    selectPagamento.appendChild(option);
});

document.getElementById("gerarNotaFiscalBtn").addEventListener("click", function() {
    calcularImpostos();
});

function calcularImpostos() {
    if (!validarCampos()) {
        return;
    }

    const valor = parseFloat(document.getElementById("valor").value);
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const informacoesTributarias = {
        cfop: 5102,
        cst: "00"
    };

    const icms = valor * quantidade * 0.18;
    const ipi = valor * quantidade * 0.05;
    const pis = valor * quantidade * 0.0065;
    const cofins = valor * quantidade * 0.0333;

    const totais = {
        valorTotalProdutosServicos: valor * quantidade,
        desconto: 0,
        baseCalculoICMS: valor * quantidade,
        icms: icms,
        ipi: ipi,
        pis: pis,
        cofins: cofins,
        valorTotalNotaFiscal: valor * quantidade + icms + ipi + pis + cofins
    };

    preencherNotaFiscal(totais);
}

function validarCampos() {
    const camposObrigatorios = [
        "razaoSocial",
        "cnpj",
        "destinatarioNome",
        "destinatarioCpf",
        "destinatarioEndereco",
        "destinatarioEstado",
        "dataEmissao",
        "horaEmissao",
        "produtoServicoNome",
        "valor",
        "quantidade"
    ];

    for (const campoId of camposObrigatorios) {
        const valorCampo = document.getElementById(campoId).value.trim();
        if (valorCampo === "") {
            document.getElementById(campoId).style.border = "1px solid red";
            alert(`O campo "${campoId}" é obrigatório e não foi preenchido.`);
            return false;
        } else {
            document.getElementById(campoId).style.border = "";
        }
    }

    return true;
}

function preencherNotaFiscal(totais) {
    const formaPagamentoSelecionada = formasPagamento[document.getElementById("formasPagamento").value];
    const notaFiscal = `
        <h2>Nota Fiscal</h2>

        <h3>Emitente</h3>
        <p>Razão Social/Nome: <strong>${document.getElementById("razaoSocial").value}</strong></p>
        <p>CNPJ: <strong>${document.getElementById("cnpj").value}</strong></p>
        <p>Email: <strong>${document.getElementById("emailEmitente").value}</strong></p>
        <p>Estado: <strong>${document.getElementById("estadoEmitente").value}</strong></p>
        <p>Cidade: <strong>${document.getElementById("cidadeEmitente").value}</strong></p>

        <h3>Destinatário</h3>
        <p>Nome/Razão Social: <strong>${document.getElementById("destinatarioNome").value}</strong></p>
        <p>CPF: <strong>${document.getElementById("destinatarioCpf").value}</strong></p>
        <p>Email: <strong>${document.getElementById("emailDestinatario").value}</strong></p>
        <p>Endereço: <strong>${document.getElementById("destinatarioEndereco").value}</strong></p>
        <p>Estado: <strong>${document.getElementById("destinatarioEstado").value}</strong></p>
        <p>Cidade: <strong>${document.getElementById("destinatarioCidade").value}</strong></p>
        <p>UF: <strong>${document.getElementById("estados").value}</strong></p>
        <p>Data da Emissão: <strong>${document.getElementById("dataEmissao").value}</strong></p>
        <p>Hora da Emissão: <strong>${document.getElementById("horaEmissao").value}</strong></p>

        <h3>Serviço</h3>
        <p>Nome: <strong>${document.getElementById("produtoServicoNome").value}</strong></p>
        <p>Descrição: <strong>${document.getElementById("descricaoServico").value}</strong></p>
        <p>Valor: <strong>R$ ${document.getElementById("valor").value}</strong></p>
        <p>Quantidade: <strong>${document.getElementById("quantidade").value} Unidades</strong></p>

        <h3>Impostos</h3>
        <p>ICMS: 18% - <strong>R$ ${totais.icms.toFixed(2)}</strong></p>
        <p>IPI: 5% - <strong>R$ ${totais.ipi.toFixed(2)}</strong></p>
        <p>PIS: 1.65% - <strong>R$ ${totais.pis.toFixed(2)}</strong></p>
        <p>COFINS: 7.60% - <strong>R$ ${totais.cofins.toFixed(2)}</strong></p>

        <h3>Valor Total com impostos:</h3>
        <p><strong>R$ ${totais.valorTotalNotaFiscal.toFixed(2, ",")}</strong></p>
        <p>Forma de pagamento: <strong>${formaPagamentoSelecionada}</strong></p>

        <button type="button" onclick="window.location.href='index.html'">Nova nota fiscal</button> 
    `;

    document.getElementById("notaFiscal").innerHTML = notaFiscal;
}
const calcularImpostosElement = document.getElementById("calcularImpostos");


