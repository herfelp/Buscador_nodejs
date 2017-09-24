//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

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

$.ajax({
    url: "buscar",
    dataType: 'text',
    type: 'GET',
    success: function(datos){
      var dat = JSON.parse(datos)
    console.log(dat)
    console.log(dat[0])

    var lugares = [];
    var tipos = [];
    var mayor = [];
    var menor = [];



    }
  });



function setForm(){


};





$("#buscar").click(function() {
   var ciudad = $('#selectCiudad').val();
   var tipo = $('#selectTipo').val();
  //var chk=$("#checkPersonalizada").is(':checked');
  $.ajax({
			url: "buscar",
      dataType: 'json',
      type: 'GET',
			success: function(datos){


      console.log(datos)
			}
		});

});
