// Promoção de supermercado
// Um supermercado deseja automatizar sua política de descontos.
// Clientes que realizarem compras a partir de R$ 150 recebem 5% de desconto. Compras a partir de R$ 300 recebem 10%, e compras a partir de R$ 500 recebem 15%.
// O sistema deverá determinar o valor final da compra e informar ao cliente quanto economizou. A gerência exige que nenhum valor inválido seja aceito.


const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 3000;


app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'Minha API está funcionando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});

// app.post('/compras', (req, res) =>{
//     const compras = {valor1, valor2, valor3, valor4} = req.body ?? {}

//     function comprasParaDesconto(compras) {
//         if(compras>=500){
//             return compras * 0.85
//         } else if (compras>=300){
//             return compras * 0.90
//         } else if (compras>=150){
//             return compras * 0.95
//         } else {
//             return compras
//         }
//     }

//     const comprasComDesconto = {}

//     for(const chave in compras){
//         comprasComDesconto[chave] = comprasParaDesconto(compras[chave]);
//     }
//     res.json({
//         "mensagem": "Os valores das suas compras descontadas ficam respectivamente",
//         compras: comprasComDesconto
//     })
// })


//  Um estacionamento cobra R$ 8 pela primeira hora e R$ 5 por cada hora adicional iniciada.
// O proprietário deseja um sistema capaz de calcular o valor devido por um motorista com base no tempo de permanência.
// Qualquer fração de hora adicional será cobrada como uma hora completa. Por exemplo, um veículo estacionado durante 2 horas e 15 minutos deverá pagar por 3 horas.

// app.post("/estacionamento", (req, res) =>{
//     const tempo = req.body ?? {}

//     function horasPagas(tempo){

//         const horas = Math.ceil(tempo / 60)

//         let valor;

//         if(horas<=1){
//             valor = 8
//         } else{
//           valor = 8 + ((horas - 1) * 5)
//     }

   
//     return {
//           "Tempo de permanência": `${tempo} minutos`,
//         "Horas cobradas": horas,
//         "Valor a pagar": `R$ ${valor},00`
//     };
       
//     }

//     const valorPago = {}

//     for(const chave in tempo){
//         valorPago[chave] = horasPagas(tempo[chave])
//     }

//     res.json({
//         "mensagem": "Resultado do estacionamento",
//         resultados: valorPago
//     })
// })


// Uma companhia de abastecimento deseja incentivar o consumo consciente.
// O valor cobrado é de R$ 3 por metro cúbico para os primeiros 10 m³, R$ 5 para os próximos 10 m³ e R$ 8 para o consumo que ultrapassar 20 m³.
// O sistema deverá calcular o valor da conta considerando o consumo em cada faixa e identificar consumidores que ultrapassaram 30 m³, classificando-os como consumo elevado.


// app.post("/consumo", (req, res) => {
//     const consumo = req.body ?? {}


//     function metrosPagos(consumo){

//         let valor;

//         if(consumo<=10){
//             valor = consumo * 3
//         } else if (consumo <= 20) {
//             valor = (10 * 3) + ((consumo - 10) * 5)
//         } else{
//             valor = (10 * 3) + ((consumo - 10) * 5) + ((consumo - 20) * 8)
//         }

//         let classificacao;

//         if(consumo > 30){
//             classificacao = "Consumo elevado"
//         } else {
//             classificacao = "Consumo adequado"
//         }

//         return{
//             "Consumo": `${consumo} m³`,
//             "Valor da conta": `R$ ${valor},00`,
//             "Classificação": classificacao
//         };
//     }

//     const resultados = {};

//     for (const chave in consumo){
//         resultados[chave] = metrosPagos (consumo[chave])
//     }

//     res.json({
//           mensagem: "Resultado do consumo de água:",
//           consumidores: resultados
//     })
// })


// Uma empresa possui uma área restrita que somente pode ser acessada por funcionários autorizados.
// Cada funcionário possui um código de identificação e uma senha. O sistema deverá verificar as credenciais e informar se o acesso foi autorizado.
// Após três tentativas consecutivas incorretas, o acesso daquele funcionário deverá ser bloqueado. Um administrador deverá conseguir desbloquear funcionários.

app.post("/funcionarios", (req, res) =>{
    const funcAutorizados = {cod: "2383" ,senha: "banana"}
})