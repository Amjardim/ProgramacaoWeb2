var genericDeleteButton = "<td><button id='%IDNAME%'>Delete</button></td>"


onload = function() {
    
    // configura botoes adicionar
    document.getElementById('idAdicionar').addEventListener('click', adicionarMoeda);
    
    // carrega moedas
    
    // configura botoes de deletar
    configuraBotoesDeletar();
}

function adicionarMoeda() {
    var table = document.getElementById("idCarteiraMoedas");
    var formDataMoedaNova = getFormDataMoedaNova();
    var row = table.insertRow(table.length);
    row.id = formDataMoedaNova.nome;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = formDataMoedaNova.nome;
    cell2.innerHTML = formDataMoedaNova.qtd;
    cell3.innerHTML = formDataMoedaNova.valor;
    cell4.innerHTML = formDataMoedaNova.deleteButton;
    configuraBotoesDeletar();
}

function getFormDataMoedaNova() {
    var nome = 'BTC';
    var moedaNovaDict = {
        'nome' : nome,
        'qtd'  : '10' ,
        'valor':'3.507.241 BRL',
        'deleteButton' : genericDeleteButton.replace('%IDNAME%','idDelete'+nome)
    };
    return moedaNovaDict;
}

function configuraBotoesDeletar() {
    var table = document.getElementById('idCarteiraMoedas');
    for (var i = 1, row; row = table.rows[i]; i++) {
        var nome = row.innerText.split('\t')[0];
        var botaoDelete = document.getElementById('idDelete'+nome);
        console.log(nome);
        botaoDelete.addEventListener('click',removeMoeda);
    }    
}

function removeMoeda(botao) {
    var nome = botao.target.id.replace('idDelete','');
    var table = document.getElementById('idCarteiraMoedas');
    var row = document.getElementById(nome);
    row.remove();
}

// const newTr = "
// <tr class="hide">
//   <td class="pt-3-half" contenteditable="true">Example</td>
//   <td class="pt-3-half" contenteditable="true">Example</td>
//   <td class="pt-3-half">
//     <span class="table-up"
//       ><a href="#!" class="indigo-text"
//         ><i class="fas fa-long-arrow-alt-up" aria-hidden="true"></i></a
//     ></span>
//     <span class="table-down"
//       ><a href="#!" class="indigo-text"
//         ><i class="fas fa-long-arrow-alt-down" aria-hidden="true"></i></a
//     ></span>
//   </td>
//   <td>
//     <span class="table-remove"
//       ><button
//         type="button"
//         class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light"
//       >
//         Remove
//       </button></span
//     >
//   </td>
// </tr>
// ";

// $('.table-add').on('click', 'i', () => {
//     const $clone = $tableID.find('tbodytr').last().clone(true).removeClass('hide table-line'); 
//     if ($tableID.find('tbody tr').length === 0) { 
//         $('tbody').append(newTr);
//     } 
//     $tableID.find('table').append($clone); 
// });


// $tableID.on('click', '.table-remove', function () {
//     $(this).parents('tr').detach();
// });
// 
// $tableID.on('click', '.table-up', function () {
//     const $row = $(this).parents('tr');
//     if ($row.index() === 0) {
//         return;
//     } 
//     $row.prev().before($row.get(0));
// }); 
// 
// $tableID.on('click','.table-down', function () {
//     const $row = $(this).parents('tr');
//     $row.next().after($row.get(0));
//     
// }); 
