$(document).ready(function() {
  $('select').material_select();

});

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()

setForm()

function unicos(array) {
  return array.filter(function(el, index, arr) {
    return index === arr.indexOf(el);
  });
};

$('#rangoPrecio').on("change", function() {
  var $this = $(this),
    value = $this.prop("value").split(";");
  precio_min = value[0];
  precio_max = value[1];
});

function setForm() {

  $.ajax({
    url: "buscar",
    dataType: 'text',
    type: 'GET',
    success: function(datos) {
      var dat = JSON.parse(datos)
      console.log(dat)

      var lugares = [];
      var tipos = [];
      var precios = [];
      var precios_n = [];

      $.each(dat, function(i, item) {
        lugares[i] = item.Ciudad;
        tipos[i] = item.Tipo;
        precios[i] = item.Precio;
      });
      $.each(precios, function(i) {
        var long = precios[i].length;
        var res = precios[i].slice(1, long);
        precios_n[i] = res.replace(',', '');
      });

      p_min = Math.min.apply(null, precios_n);
      p_max = Math.max.apply(null, precios_n);

      lugares_unicos = unicos(lugares);
      tipos_unicos = unicos(tipos);


      $.each(lugares_unicos, function(i, item) {
        var item_ = item.replace(/ /g, '_');
        $('#ciudad').append('<option value=' + item_ + '>' + item + '</option>')
      });

      $.each(tipos_unicos, function(i, item) {
        var item_ = item.replace(/ /g, '_');
        $('#tipo').append('<option value=' + item_ + '>' + item + '</option>')
      });

    }
  }).done(function() {
    $("#rangoPrecio").ionRangeSlider({
      type: "double",
      grid: false,
      min: 0,
      max: 100000,
      from: p_min,
      to: p_max,
      prefix: "$"
    });
  });

};


$("#buscar").click(function() {
  var ciudad = $('#ciudad').val();
  var tipo = $('#tipo').val();
  var value = $('#rangoPrecio').prop("value").split(";");
  var precio_min = value[0];
  var precio_max = value[1];

  $.ajax({
    url: "buscar",
    dataType: 'text',
    type: 'GET',
    success: function(datos) {

      var dat = JSON.parse(datos)
      console.log(dat)
      console.log(ciudad)
      console.log(tipo)
      console.log(precio_min)
      console.log(precio_max)

     $.each(dat, function(i, item) {



     });




    }
  });

});
