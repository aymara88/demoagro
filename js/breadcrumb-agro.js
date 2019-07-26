$(document).ready(function () {
    $('#box-bread-brumb ul li').eq(0).html('<a href="https://demoagro.myvtex.com" title="Home">Inicio</a>')
    $('#box-bread-brumb ul li').eq(0).css('font-size', '10px')
    $('#box-bread-brumb ul li').eq(0).css('margin-left', '3px')
    $('#box-bread-brumb ul li').eq(0).css('color', 'green')
    $('#box-bread-brumb ul li').eq(1).html('<a href="https://demoagro.myvtex.com/agro-categorias" title="Categorías">Categorías</a>')

    document.querySelectorAll('div.bread-crumb li a').forEach(a => {
        a.innerHTML = a.innerHTML.toUpperCase()
    })
    
});