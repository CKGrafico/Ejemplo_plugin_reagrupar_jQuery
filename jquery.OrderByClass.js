
/* /////////////////////////////////////////////
Documento creado por: Enrique Fernández Guerra
Web del creador: http://www.ckgrafico.com
Url del código original: http://www.ckgrafico.com
Fecha de creación: Octubre 2012
Nadie podrá evitar que copies pero deja la fuente para que otros lleguen al original
///////////////////////////////////////////// */

// Le pasas el tipo de filtro a utilizar
// ordena las capas hijas del contenedor donde aplicamos el plugin

$.fn.orderbyclass = function(filtro,hijo){
	var usadas = new Array();
	var elementos = new Array();
	var contenedor = $(this);

	// si es la primera vez que entro
	if(!contenedor.data("orderby_elementos")){
		//por cada hijo que tengo
		contenedor.find(hijo).each(function(){
			elementos.push($(this));
		});

		contenedor.data("orderby_elementos",elementos)
	}else{
		elementos = contenedor.data("orderby_elementos");
	}



	contenedor.html("");

	for(e in elementos){
		var clase = elementos[e].attr("data-"+filtro);
		var clase_spaces = clase.replace(/ /g, '_');
		var isWord = isNaN(parseInt(clase_spaces));

		if(isWord){
			var busca = $.inArray(clase_spaces,usadas);
		}else{
			var busca = $.inArray(parseInt(clase_spaces),usadas);
		}

		if(busca < 0){

			//dependiendo si es palabra o numero hago una cosa u otra
			if(!isWord){
				clase_spaces = parseInt(clase_spaces);
				usadas.push(clase_spaces);
				usadas.sort(function(a,b){return a-b});
			}else{
				usadas.push(clase_spaces);
				usadas.sort();
			}


			//dependiendo de donde ha quedado ordenado
			var pos = $.inArray(clase_spaces,usadas);
			var insert = "<div class='title' id='orderby_"+clase_spaces+"'><span>"+ clase +"</span><br><br></div>";

			if(pos == 0){
				contenedor.prepend(insert);
			}else if(pos == (usadas.length-1)){
				contenedor.append(insert);
			}else{
				contenedor.find("#orderby_"+usadas[pos-1]).after(insert);
			}
		}

		contenedor.find("#orderby_"+clase_spaces).append(elementos[e][0].outerHTML);
	}

};