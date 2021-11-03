onload = function() {  
    var removeButtons = document.getElementByClass('table-remove');
    for( var i = 0; i < removeButtons.length; i++ ) {
        (function(index) {
            removeButtons[index].addEventListener('click', remove);
        })(i);
    }
}

function remove(i) {
    var removeButtons = document.getElementByClass('table-remove');
    removeButtons[i].parents('tr').detach();
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
