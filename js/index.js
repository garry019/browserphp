var precio1 = 0;
var precio2 = 0;
var estado = true;
/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 0,
    to: 100000,
    prefix: "$",
    onStart: function(data){
      precio1 = data.from;
      precio2 = data.to;
    },
    onChange: function(data){
      precio1 = data.from;
      precio2 = data.to;
    }
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
// function playVideoOnScroll(){
//   var ultimoScroll = 0,
//       intervalRewind;
//   var video = document.getElementById('vidFondo');
//   $(window)
//     .scroll((event)=>{
//       var scrollActual = $(window).scrollTop();
//       if (scrollActual > ultimoScroll){
//        video.play();
//      } else {
//         //this.rewind(1.0, video, intervalRewind);
//         video.play();
//      }
//      ultimoScroll = scrollActual;
//     })
//     .scrollEnd(()=>{
//       video.pause();
//     }, 10)
// }

$('select').material_select();
$('select').on('contentChanged', function() {
    $(this).material_select();
  });

function verTodo(){
  var contenedor = $('.colContenido');
  $('#mostrarTodos').on('click',function(e){
    e.preventDefault();
    $('.itemMostrado').remove();
    document.getElementById('formulario').reset();
    $.ajax({
      url: 'proceso.php',
      type: 'POST',
      data: {proceso:'todos'},
      success: function(data){
        var content = JSON.parse(data);
        $.each(content, function(i, item) {
          showItem(item['Ciudad'],item['Tipo'],item['Direccion'],item['Telefono'],item['Codigo_Postal'],item['Precio']);
        });
      }
    })
  })
}

function ciudad(){
  $.ajax({
    url: 'proceso.php',
    type: 'POST',
    data: {proceso:'ciudad'},
    success: function(data){
      var content = JSON.parse(data);
      content = content.sort()
      for(i=0;i<content.length;i++){
        $("#selectCiudad").append('<option>'+content[i]+'</option>');
        $("#selectCiudad").trigger('contentChanged');
      }
    }
  })
}

function tipo(){
  $.ajax({
    url: 'proceso.php',
    type: 'POST',
    data: {proceso:'tipo'},
    success: function(data){
      var content = JSON.parse(data);
      content = content.sort();
      for(i=0;i<content.length;i++){
        $("#selectTipo").append('<option>'+content[i]+'</option>');
        $("#selectTipo").trigger('contentChanged');
      }
    }
  })
}

function buscar(){
  var ciudad = $('#selectCiudad');
  var tipo = $('#selectTipo');
  $('#submitButton').on('click',function(){
    $('.itemMostrado').remove();
    $.ajax({
      url: 'proceso.php',
      type: 'POST',
      data: {
        proceso:'buscar',
        ciudad: ciudad.val(),
        tipo: tipo.val(),
        from: precio1,
        to: precio2
      },
      success: function(data){
        var content = JSON.parse(data);
        $.each(content, function(i, item) {
          showItem(item['Ciudad'],item['Tipo'],item['Direccion'],item['Telefono'],item['Codigo_Postal'],item['Precio']);
        });
      }
    })
  })

}

function showItem(ciudad,tipo,dir,tel,cp,precio){
  $('.colContenido').append('<div class="itemMostrado card"><img src="img/home.jpg" alt=""><div class="card-stacked card-action"> <div><b>Ciudad:</b> '+ciudad+'</div><div><b>Tipo:</b> '+tipo+'</div><div><b>Dirección:</b> '+dir+'</div><div><b>Teléfono:</b> '+tel+'</div><div><b>Código postal:</b> '+cp+'</div> <div class="precioTexto">Precio <b>'+precio+'</b></div></div></div>');
}

inicializarSlider();
//playVideoOnScroll();
verTodo();
ciudad();
tipo();
buscar();
