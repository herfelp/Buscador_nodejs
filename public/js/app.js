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
      var dat = JSON.parse(datos);
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
        var item_ = item.replace(/ /g, '');
        $('#ciudad').append('<option value=' + item_ + '>' + item + '</option>')
      });

      $.each(tipos_unicos, function(i, item) {
        var item_ = item.replace(/ /g, '');
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

  $('#lista').empty()

  $.ajax({
    url: "buscar",
    dataType: 'text',
    type: 'GET',
    success: function(datos) {

      var dat = JSON.parse(datos)
      var dat_f_c = [];
      var dat_f = [];
      var dat_f_t = [];

      if ($('#personalizada').hasClass('invisible')) {

        dat_f = dat;

      } else {

        $.each(dat, function(i, item) {
          var $this = dat[i];
          var ciudad_ = item.Ciudad.replace(/ /g, '');
          if (ciudad != null) {

            if (ciudad_.toUpperCase() == ciudad.toUpperCase()) {
              dat_f_c.push($this)
            };
          } else {
            dat_f_c.push($this)
          };
        });

        $.each(dat_f_c, function(i, item) {
          var $this = dat_f_c[i];
          var tipo_ = item.Tipo.replace(/ /g, '');
          if (tipo != null) {
            if (tipo_.toUpperCase() == tipo.toUpperCase()) {
              dat_f_t.push($this)
            };
          } else {
            dat_f_t.push($this)
          };
        });

        $.each(dat_f_t, function(i, item) {
          var $this = dat_f_t[i];
          var precio = item.Precio;
          var long = precio.length;
          var res = precio.slice(1, long);
          precio_ = res.replace(/,/g, '');
          var precio_x = Number(precio_)

          if (precio_min <= precio_x && precio_max >= precio_x) {
            dat_f.push($this)
          };
        });
      };

      $.each(dat_f, function(i, item) {

        var propiedad_template = '<div class="card horizontal">' +
          '<div class="card-image"><img src=":image:"></div>' +
          '<div class="card-stacked"><div class="card-content">' +
          '<div><b>Direccion: </b><p style="display:inline">:direccion:</p></div>' +
          '<div><b>Ciudad: </b><p style="display:inline">:ciudad:</p></div>' +
          '<div><b>Telefono: </b><p style="display:inline">:telefono:</p></div>' +
          '<div><b>Código postal: </b><p style="display:inline">:codigo:</p></div>' +
          '<div><b>Precio: </b><p style="display:inline">:precio:</p></div>' +
          '<div><b>Tipo: </b><p style="display:inline">:tipo:</p></div></div></div></div>'

        var new_prop = propiedad_template.replace(':image:', 'img/home.jpg')
          .replace(':direccion:', item.Direccion)
          .replace(':ciudad:', item.Ciudad)
          .replace(':telefono:', item.Telefono)
          .replace(':codigo:', item.Codigo_Postal)
          .replace(':precio:', item.Precio)
          .replace(':tipo:', item.Tipo)

        $('#lista').append(new_prop);

      });


    }
  });

});
