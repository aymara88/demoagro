/*($(document).ready(function(){
  document.querySelector('.n4colunas h2').firstChild.nodeValue = 'Últimos Productos';
}))*/

($(document).ready(function () {
  $("#2banner1 .box-banner").prepend("<a href='https://demoagro.myvtex.com/agro-categorias/vegetales-organicos'><h2 class='texto-2banner1 text-left'>SALUDABLE Y DELICIOSO</h2></a>");
  $("#2banner1 .box-banner").prepend("<a id='boton-2banner1' class='btn btn-default btn-gris boton-banner' href='https://demoagro.myvtex.com/agro-categorias/vegetales-organicos' role='button'>VER MÁS</a>");

  $("#2banner2 .box-banner").prepend("<a href='https://demoagro.myvtex.com/agro-categorias/frutas-organicas'><h2 class='texto-2banner2 text-right'>MOMENTOS DULCES</h2></a>");
  $("#2banner2 .box-banner").prepend("<a id='boton-2banner2' class='btn btn-default btn-gris boton-banner' href='https://demoagro.myvtex.com/agro-categorias/frutas-organicas' role='button'>VER MÁS</a>");

  $("#2banner3 .box-banner").prepend("<a href='https://demoagro.myvtex.com/agro-categorias/especias-de-tu-cocina'><h2 class='texto-2banner3 text-right'>EL SABOR DE LO ÚNICO</h2></a>");
  $("#2banner3 .box-banner").prepend("<a id='boton-2banner3' class='btn btn-default btn-gris boton-banner' href='https://demoagro.myvtex.com/agro-categorias/especias-de-tu-cocina' role='button'>VER MÁS</a>");
}))