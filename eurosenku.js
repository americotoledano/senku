$(function()
{
	var fichaSeleccionada; //La ficha que esté seleccionada
	var menuVisible = false;
	var contFichas = 32;
	var tablero = [
		{id: "#f1", ficha: true, x: 3, y: 1},//Primera fila
		{id: "#f2", ficha: true, x: 4, y: 1},
		{id: "#f3", ficha: true, x: 5, y: 1},
		{id: "#f4", ficha: true, x: 3, y: 2},//Segunda fila
		{id: "#f5", ficha: true, x: 4, y: 2},
		{id: "#f6", ficha: true, x: 5, y: 2},
		{id: "#f7", ficha: true, x: 1, y: 3},//Tercera fila
		{id: "#f8", ficha: true, x: 2, y: 3},
		{id: "#f9", ficha: true, x: 3, y: 3},
		{id: "#f10", ficha: true, x: 4, y: 3},
		{id: "#f11", ficha: true, x: 5, y: 3},
		{id: "#f12", ficha: true, x: 6, y: 3},
		{id: "#f13", ficha: true, x: 7, y: 3},
		{id: "#f14", ficha: true, x: 1, y: 4},//Cuarta fila
		{id: "#f15", ficha: true, x: 2, y: 4},
		{id: "#f16", ficha: true, x: 3, y: 4},
		{id: "#f17", ficha: false, x: 4, y: 4},
		{id: "#f18", ficha: true, x: 5, y: 4},
		{id: "#f19", ficha: true, x: 6, y: 4},
		{id: "#f20", ficha: true, x: 7, y: 4},
		{id: "#f21", ficha: true, x: 1, y: 5},//Quinta fila
		{id: "#f22", ficha: true, x: 2, y: 5},
		{id: "#f23", ficha: true, x: 3, y: 5},
		{id: "#f24", ficha: true, x: 4, y: 5},
		{id: "#f25", ficha: true, x: 5, y: 5},
		{id: "#f26", ficha: true, x: 6, y: 5},
		{id: "#f27", ficha: true, x: 7, y: 5},
		{id: "#f28", ficha: true, x: 3, y: 6},//Sexta fila
		{id: "#f29", ficha: true, x: 4, y: 6},
		{id: "#f30", ficha: true, x: 5, y: 6},
		{id: "#f31", ficha: true, x: 3, y: 7},//Septima fila
		{id: "#f32", ficha: true, x: 4, y: 7},
		{id: "#f33", ficha: true, x: 5, y: 7},
	];


	/***********************************************
	** Elimina una ficha en una casilla dado el id
	***********************************************/
	function ocultaFicha( idCasilla )
	{
		//Oculta ficha en interfaz
		$(idCasilla).attr('style', 'fill-opacity:0;stroke-opacity:0');

		//Oculta ficha en diccionario de casillas (tablero)
		for(var i=0; i<tablero.length; i++)
		{
			if(tablero[i].id === idCasilla)
			{
				tablero[i].ficha = false;
			}
		}
	}

	/***********************************************
	** Muestra una ficha en una casilla dado el id
	***********************************************/
	function muestraFicha( idCasilla )
	{
		//Muestra ficha en interfaz
		$(idCasilla).attr('style', '');

		//Muestra ficha en diccionario de casillas (tablero)
		for(var i=0; i<tablero.length; i++)
		{
			if(tablero[i].id === idCasilla)
			{
				tablero[i].ficha = true;
			}
		}
	}

	/***********************************************
	** Selecciona una ficha dado el id de la casilla
	***********************************************/
	function seleccionaFicha( idCasilla )
	{
		//Si ya hay una ficha seleccionada
		if(fichaSeleccionada != undefined)
		{
			deseleccionaFicha(fichaSeleccionada);
		}

		$(idCasilla).attr('stroke', 'Black');
		fichaSeleccionada = idCasilla;
	}

	/***********************************************
	** Deselecciona una ficha dado el id de la casilla
	***********************************************/
	function deseleccionaFicha( idCasilla )
	{
		$(idCasilla).attr('stroke', 'Crimson');
	}

	/***********************************************
	** Recibe el id de una casilla vacía en la que se ha hecho click, estando la ficha seleccionada en fichaSeleccionada
	***********************************************/
	function logicaFichas ( idCasilla )
	{
		var clavija = {}; //Almacena coordenadas de la casilla vacía
		var miFicha = {}; //Almacena coordenadas de la casilla con la ficha seleccionada
		var fichaComida = {}; //Almacena coordenadas de la casilla con la posible ficha a comer

		clavija.x = tablero[ idCasilla.substring( 2,idCasilla.length ) - 1 ].x;
		clavija.y = tablero[ idCasilla.substring( 2,idCasilla.length ) - 1 ].y;
		miFicha.x = tablero[ fichaSeleccionada.substring( 2,fichaSeleccionada.length ) - 1 ].x;
		miFicha.y = tablero[ fichaSeleccionada.substring( 2,fichaSeleccionada.length ) - 1 ].y;

		//Se juega en el eje x
		if( miFicha.y === clavija.y )
		{
			//Ficha seleccionada y espacio vacío a una distacia de 2
			if( Math.abs( miFicha.x - clavija.x ) === 2 )
			{
				//Hallo coordenadas de la probable ficha a comer
				fichaComida.x = Math.max(miFicha.x, clavija.x) - 1;
				fichaComida.y = miFicha.y;
				//alert(fichaComida.x + ":" + fichaComida.y);

				for(var i = 0; i<tablero.length; i++)
				{
					if(tablero[i].x === fichaComida.x && tablero[i].y === fichaComida.y)
					{
						//Si hay para comer
						if( tablero[i].ficha === true )
						{
							ocultaFicha(tablero[i].id); //Ocultar ficha comida
							ocultaFicha(fichaSeleccionada); //Ocultar ficha seleccionada
							muestraFicha(idCasilla); //Mostrar ficha en casilla vacía
							contFichas --;//Decrementar contador fichas
							estadoPartida(); //Comprobamos estado partida
						}
					}
				}
					
			}
		}

		//Se juega en el eje y
		if( miFicha.x === clavija.x )
		{
			//Ficha seleccionada y espacio vacío a una distacia de 2
			if( Math.abs( miFicha.y - clavija.y ) === 2 )
			{
				//Hallo coordenadas de la probable ficha a comer
				fichaComida.y = Math.max(miFicha.y, clavija.y) - 1;
				fichaComida.x = miFicha.x;

				for(var i = 0; i<tablero.length; i++)
				{
					if(tablero[i].x === fichaComida.x && tablero[i].y === fichaComida.y)
					{
						//Si hay para comer
						if( tablero[i].ficha === true )
						{
							ocultaFicha(tablero[i].id); //Ocultar ficha comida
							ocultaFicha(fichaSeleccionada); //Ocultar ficha seleccionada
							muestraFicha(idCasilla); //Mostrar ficha en casilla vacía
							contFichas --; //Decrementar contador fichas
							estadoPartida(); //Comprobamos estado partida
						}
					}
				}
			}
		}
	}

	/*********************************************************
	** Maneja lo que ocurre al hacer click sobre una casilla
	*********************************************************/
	function clickCasilla( idCasilla )
	{
		//Click en un espacio vacío
		if( $(idCasilla).attr('style') === 'fill-opacity:0;stroke-opacity:0' )
		{
			//Si hay una ficha seleccionada
			if(fichaSeleccionada != undefined)
			{
				logicaFichas(idCasilla);
			}
		}
		//Click en una ficha
		else
		{
			seleccionaFicha( idCasilla );
		}
	}

	/***********************************************************
	** Calcula el estado de la partida (ganada/sin movimientos)
	***********************************************************/
	function estadoPartida()
	{
		var movimientosPosibles = false;
		var tempMovs;

		//Si el juego está ganado
		if(contFichas == 1)
		{
			if( confirm('¡Ha ganado el juego! ¿Desea reiniciar la partida?') )
			{
				reiniciaPartida();
			}
		}
		//Si el juego no está ganado
		else
		{
			//Ver si hay tres espacios consecutivos y en una misma fila o columna,
			//teniendo dos fichas juntas y un espacio vacío
			for(var i=0; i<tablero.length; i++)
			{
				for(var j=0; j<tablero.length; j++)
				{
					for(var k=0; k<tablero.length; k++)
					{
						// En la misma fila
						if((tablero[i].y == tablero[j].y == tablero[k].y) && !movimientosPosibles)
						{
							//Consecutivas
							if( tablero[i].x == (tablero[j].x - 1) == (tablero[k].x - 2) )
							{	
								//Dos fichas consecutivas y un espacio vacío
								if( ((tablero[i].ficha == true)
										&& (tablero[j].ficha == true)
										&& (tablero[k].ficha == false))
									|| ((tablero[i].ficha == false)
										&& (tablero[j].ficha == true)
										&& (tablero[k].ficha == true))
								)
									movimientosPosibles = true;
							}
						}
						// En la misma columna
						else if((tablero[i].x == tablero[j].x == tablero[k].x) && !movimientosPosibles)
						{
							//Consecutivas
							if( tablero[i].y == (tablero[j].y - 1) == (tablero[k].y - 2) )
							{	
								//Dos fichas consecutivas y un espacio vacío
								if( ((tablero[i].ficha == true)
										&& (tablero[j].ficha == true)
										&& (tablero[k].ficha == false))
									|| ((tablero[i].ficha == false)
										&& (tablero[j].ficha == true)
										&& (tablero[k].ficha == true))
								)
									movimientosPosibles = true;
							}
						}

						if(movimientosPosibles)
						{
							//alert("caquita");
							break;
						}
					}

					if(movimientosPosibles)
					{
						//alert("caquita");
						break;

					}
				}

				if(movimientosPosibles)
				{
						//alert("caquita");
						break;
				}
			}

			if(!movimientosPosibles)
			{
				if( confirm('Sin movimientos posibles. ¿Desea reiniciar la partida?') )
				{
					reiniciaPartida();
				}
			}
			/*else
			{
				alert("Movimiento" +i+","+j+","+k);
			}*/
		}
	}

	//CHIVATO
	/*function chivato()
	{
		var nombreID = "#chivato";

		for(var i=0; i<tablero.length; i++)
		{
			nombreID = "" + nombreID + i;
			$(nombreID).html(tablero[i].id + ': ' + tablero[i].visible);
			nombreID = "#chivato";
		}
	}

	setInterval(function(){chivato();}, 1000);
	chivato();*/

	/***************************
	** Muestra/oculta el menu
	***************************/
	function changeMenu()
	{
		if(menuVisible)
		{
			$(".menuClass").attr("style", "fill-opacity:0;stroke-opacity:0");
			$("#menu").attr("width", "0");
			$("#menu").attr("height", "0");
			$("#reiniciar").html("");
			$("#volverJuego").html("");
			menuVisible = false;
		}
		else
		{
			$(".menuClass").attr("style", "");
			$("#menu").attr("width", "100%");
			$("#menu").attr("height", "100%");
			$("#reiniciar").html("Reiniciar partida");
			$("#volverJuego").html("Volver al juego");
			menuVisible = true;
		}
	}

	/***********************
	** Reinicia la partida
	***********************/
	function reiniciaPartida()
	{
		tablero = [
			{id: "#f1", ficha: true, x: 3, y: 1},//Primera fila
			{id: "#f2", ficha: true, x: 4, y: 1},
			{id: "#f3", ficha: true, x: 5, y: 1},
			{id: "#f4", ficha: true, x: 3, y: 2},//Segunda fila
			{id: "#f5", ficha: true, x: 4, y: 2},
			{id: "#f6", ficha: true, x: 5, y: 2},
			{id: "#f7", ficha: true, x: 1, y: 3},//Tercera fila
			{id: "#f8", ficha: true, x: 2, y: 3},
			{id: "#f9", ficha: true, x: 3, y: 3},
			{id: "#f10", ficha: true, x: 4, y: 3},
			{id: "#f11", ficha: true, x: 5, y: 3},
			{id: "#f12", ficha: true, x: 6, y: 3},
			{id: "#f13", ficha: true, x: 7, y: 3},
			{id: "#f14", ficha: true, x: 1, y: 4},//Cuarta fila
			{id: "#f15", ficha: true, x: 2, y: 4},
			{id: "#f16", ficha: true, x: 3, y: 4},
			{id: "#f17", ficha: false, x: 4, y: 4},
			{id: "#f18", ficha: true, x: 5, y: 4},
			{id: "#f19", ficha: true, x: 6, y: 4},
			{id: "#f20", ficha: true, x: 7, y: 4},
			{id: "#f21", ficha: true, x: 1, y: 5},//Quinta fila
			{id: "#f22", ficha: true, x: 2, y: 5},
			{id: "#f23", ficha: true, x: 3, y: 5},
			{id: "#f24", ficha: true, x: 4, y: 5},
			{id: "#f25", ficha: true, x: 5, y: 5},
			{id: "#f26", ficha: true, x: 6, y: 5},
			{id: "#f27", ficha: true, x: 7, y: 5},
			{id: "#f28", ficha: true, x: 3, y: 6},//Sexta fila
			{id: "#f29", ficha: true, x: 4, y: 6},
			{id: "#f30", ficha: true, x: 5, y: 6},
			{id: "#f31", ficha: true, x: 3, y: 7},//Septima fila
			{id: "#f32", ficha: true, x: 4, y: 7},
			{id: "#f33", ficha: true, x: 5, y: 7},
		];

		deseleccionaFicha(fichaSeleccionada);
		muestraFicha(".ficha");
		ocultaFicha("#f17");
		contFichas = 32;
		fichaSeleccionada = undefined;

		changeMenu();
	}

	/**********************
	** Manejo de eventos
	**********************/
	$(".botonM").on('click', changeMenu);
	$("#reiniciar").on('click', reiniciaPartida);
	$("#volverJuego").on('click', changeMenu);


	$("#f1").on('click', function(){clickCasilla("#f1");});
	$("#f2").on('click', function(){clickCasilla("#f2");});
	$("#f3").on('click', function(){clickCasilla("#f3");});
	$("#f4").on('click', function(){clickCasilla("#f4");});
	$("#f5").on('click', function(){clickCasilla("#f5");});
	$("#f6").on('click', function(){clickCasilla("#f6");});
	$("#f7").on('click', function(){clickCasilla("#f7");});
	$("#f8").on('click', function(){clickCasilla("#f8");});
	$("#f9").on('click', function(){clickCasilla("#f9");});
	$("#f10").on('click', function(){clickCasilla("#f10");});
	$("#f11").on('click', function(){clickCasilla("#f11");});
	$("#f12").on('click', function(){clickCasilla("#f12");});
	$("#f13").on('click', function(){clickCasilla("#f13");});
	$("#f14").on('click', function(){clickCasilla("#f14");});
	$("#f15").on('click', function(){clickCasilla("#f15");});
	$("#f16").on('click', function(){clickCasilla("#f16");});
	$("#f17").on('click', function(){clickCasilla("#f17");});
	$("#f18").on('click', function(){clickCasilla("#f18");});
	$("#f19").on('click', function(){clickCasilla("#f19");});
	$("#f20").on('click', function(){clickCasilla("#f20");});
	$("#f21").on('click', function(){clickCasilla("#f21");});
	$("#f22").on('click', function(){clickCasilla("#f22");});
	$("#f23").on('click', function(){clickCasilla("#f23");});
	$("#f24").on('click', function(){clickCasilla("#f24");});
	$("#f25").on('click', function(){clickCasilla("#f25");});
	$("#f26").on('click', function(){clickCasilla("#f26");});
	$("#f27").on('click', function(){clickCasilla("#f27");});
	$("#f28").on('click', function(){clickCasilla("#f28");});
	$("#f29").on('click', function(){clickCasilla("#f29");});
	$("#f30").on('click', function(){clickCasilla("#f30");});
	$("#f31").on('click', function(){clickCasilla("#f31");});
	$("#f32").on('click', function(){clickCasilla("#f32");});
	$("#f33").on('click', function(){clickCasilla("#f33");});
})

