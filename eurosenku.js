$(function()
{
	var fichaJugadora; //La ficha que esté seleccionada
	var menuVisible = false;
	var contFichas = 32;
	var fichas = [
		{id: "#f0", visible: 0, x: 4, y: 4},//Ficha central
		{id: "#f1", visible: 1, x: 3, y: 1},//Primera fila
		{id: "#f2", visible: 1, x: 4, y: 1},
		{id: "#f3", visible: 1, x: 5, y: 1},
		{id: "#f4", visible: 1, x: 2, y: 2},//Segunda fila
		{id: "#f5", visible: 1, x: 3, y: 2},
		{id: "#f6", visible: 1, x: 4, y: 2},
		{id: "#f7", visible: 1, x: 5, y: 2},
		{id: "#f8", visible: 1, x: 6, y: 2},
		{id: "#f9", visible: 1, x: 1, y: 3},//Tercera fila
		{id: "#f10", visible: 1, x: 2, y: 3},
		{id: "#f11", visible: 1, x: 3, y: 3},
		{id: "#f12", visible: 1, x: 4, y: 3},
		{id: "#f13", visible: 1, x: 5, y: 3},
		{id: "#f14", visible: 1, x: 6, y: 3},
		{id: "#f15", visible: 1, x: 7, y: 3},
		{id: "#f16", visible: 1, x: 1, y: 4},//Cuarta fila
		{id: "#f17", visible: 1, x: 2, y: 4},
		{id: "#f18", visible: 1, x: 3, y: 4},
		{id: "#f19", visible: 1, x: 5, y: 4},
		{id: "#f20", visible: 1, x: 6, y: 4},
		{id: "#f21", visible: 1, x: 7, y: 4},
		{id: "#f22", visible: 1, x: 1, y: 5},//Quinta fila
		{id: "#f23", visible: 1, x: 2, y: 5},
		{id: "#f24", visible: 1, x: 3, y: 5},
		{id: "#f25", visible: 1, x: 4, y: 5},
		{id: "#f26", visible: 1, x: 5, y: 5},
		{id: "#f27", visible: 1, x: 6, y: 5},
		{id: "#f28", visible: 1, x: 7, y: 5},
		{id: "#f29", visible: 1, x: 2, y: 6},//Sexta fila
		{id: "#f30", visible: 1, x: 3, y: 6},
		{id: "#f31", visible: 1, x: 4, y: 6},
		{id: "#f32", visible: 1, x: 5, y: 6},
		{id: "#f33", visible: 1, x: 6, y: 6},
		{id: "#f34", visible: 1, x: 3, y: 7},//Septima fila
		{id: "#f35", visible: 1, x: 4, y: 7},
		{id: "#f36", visible: 1, x: 5, y: 7}
	];


	/***********************************************
	** Elimina una ficha en una casilla dado el id
	***********************************************/
	function ocultaFicha( idCasilla )
	{
		//Oculta ficha en interfaz
		$(idCasilla).attr('style', 'fill-opacity:0;stroke-opacity:0');

		//Oculta ficha en diccionario de fichas
		for(var i=0; i<fichas.length; i++)
		{
			if(fichas[i].id === idCasilla)
			{
				fichas[i].visible = 0;
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

		//Muestra ficha en diccionario de fichas
		for(var i=0; i<fichas.length; i++)
		{
			if(fichas[i].id === idCasilla)
			{
				fichas[i].visible = 1;
			}
		}
	}

	/***********************************************
	** Selecciona una ficha dado el id de la casilla
	***********************************************/
	function seleccionaFicha( idCasilla )
	{
		//Si ya hay una ficha seleccionada
		if(fichaJugadora != undefined)
		{
			deseleccionaFicha(fichaJugadora);
		}

		$(idCasilla).attr('stroke', 'Black');
		fichaJugadora = idCasilla;
	}

	/***********************************************
	** Deselecciona una ficha dado el id de la casilla
	***********************************************/
	function deseleccionaFicha( idCasilla )
	{
		$(idCasilla).attr('stroke', 'Crimson');
	}

	function logicaFichas ( idFicha )
	{
		var clavija = {};
		var miFicha = {};
		var fichaComida = {};

		clavija.x = fichas[ idFicha.substring( 2,idFicha.length ) ].x;
		clavija.y = fichas[ idFicha.substring( 2,idFicha.length ) ].y;
		miFicha.x = fichas[ fichaJugadora.substring( 2,fichaJugadora.length ) ].x;
		miFicha.y = fichas[ fichaJugadora.substring( 2,fichaJugadora.length ) ].y;

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

				for(var i = 0; i<fichas.length; i++)
				{
					if(fichas[i].x === fichaComida.x && fichas[i].y === fichaComida.y)
					{
						//Si hay para comer
						if( fichas[i].visible === 1 )
						{
							ocultaFicha(fichas[i].id); //Ocultar ficha comida
							ocultaFicha(fichaJugadora); //Ocultar ficha seleccionada
							muestraFicha(idFicha); //Mostrar ficha en espacio
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

				for(var i = 0; i<fichas.length; i++)
				{
					if(fichas[i].x === fichaComida.x && fichas[i].y === fichaComida.y)
					{
						//Si hay para comer
						if( fichas[i].visible === 1 )
						{
							ocultaFicha(fichas[i].id); //Ocultar ficha comida
							ocultaFicha(fichaJugadora); //Ocultar ficha seleccionada
							muestraFicha(idFicha); //Mostrar ficha en espacio
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
	function clickFicha( idCasilla )
	{
		//Click en un espacio vacío
		if( $(idCasilla).attr('style') === 'fill-opacity:0;stroke-opacity:0' )
		{
			//Si hay una ficha seleccionada
			if(fichaJugadora != undefined)
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
			for(var i=0; i<fichas.length; i++)
			{
				for(var j=0; j<fichas.length; j++)
				{
					for(var k=0; k<fichas.length; k++)
					{
						// En la misma fila
						if((fichas[i].y == fichas[j].y == fichas[k].y) && !movimientosPosibles)
						{
							//Consecutivas
							if( fichas[i].x == (fichas[j].x - 1) == (fichas[k].x - 2) )
							{	
								//Dos fichas consecutivas y un espacio vacío
								if( ((fichas[i].visible == 1)
										&& (fichas[j].visible == 1)
										&& (fichas[k].visible == 0))
									|| ((fichas[i].visible == 0)
										&& (fichas[j].visible == 1)
										&& (fichas[k].visible == 1))
								)
									movimientosPosibles = true;
							}
						}
						// En la misma columna
						else if((fichas[i].x == fichas[j].x == fichas[k].x) && !movimientosPosibles)
						{
							//Consecutivas
							if( fichas[i].y == (fichas[j].y - 1) == (fichas[k].y - 2) )
							{	
								//Dos fichas consecutivas y un espacio vacío
								if( ((fichas[i].visible == 1)
										&& (fichas[j].visible == 1)
										&& (fichas[k].visible == 0))
									|| ((fichas[i].visible == 0)
										&& (fichas[j].visible == 1)
										&& (fichas[k].visible == 1))
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

		for(var i=0; i<fichas.length; i++)
		{
			nombreID = "" + nombreID + i;
			$(nombreID).html(fichas[i].id + ': ' + fichas[i].visible);
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
		fichas = [
			{id: "#f0", visible: 0, x: 4, y: 4},//Ficha central
			{id: "#f1", visible: 1, x: 3, y: 1},//Primera fila
			{id: "#f2", visible: 1, x: 4, y: 1},
			{id: "#f3", visible: 1, x: 5, y: 1},
			{id: "#f4", visible: 1, x: 2, y: 2},//Segunda fila
			{id: "#f5", visible: 1, x: 3, y: 2},
			{id: "#f6", visible: 1, x: 4, y: 2},
			{id: "#f7", visible: 1, x: 5, y: 2},
			{id: "#f8", visible: 1, x: 6, y: 2},
			{id: "#f9", visible: 1, x: 1, y: 3},//Tercera fila
			{id: "#f10", visible: 1, x: 2, y: 3},
			{id: "#f11", visible: 1, x: 3, y: 3},
			{id: "#f12", visible: 1, x: 4, y: 3},
			{id: "#f13", visible: 1, x: 5, y: 3},
			{id: "#f14", visible: 1, x: 6, y: 3},
			{id: "#f15", visible: 1, x: 7, y: 3},
			{id: "#f16", visible: 1, x: 1, y: 4},//Cuarta fila
			{id: "#f17", visible: 1, x: 2, y: 4},
			{id: "#f18", visible: 1, x: 3, y: 4},
			{id: "#f19", visible: 1, x: 5, y: 4},
			{id: "#f20", visible: 1, x: 6, y: 4},
			{id: "#f21", visible: 1, x: 7, y: 4},
			{id: "#f22", visible: 1, x: 1, y: 5},//Quinta fila
			{id: "#f23", visible: 1, x: 2, y: 5},
			{id: "#f24", visible: 1, x: 3, y: 5},
			{id: "#f25", visible: 1, x: 4, y: 5},
			{id: "#f26", visible: 1, x: 5, y: 5},
			{id: "#f27", visible: 1, x: 6, y: 5},
			{id: "#f28", visible: 1, x: 7, y: 5},
			{id: "#f29", visible: 1, x: 2, y: 6},//Sexta fila
			{id: "#f30", visible: 1, x: 3, y: 6},
			{id: "#f31", visible: 1, x: 4, y: 6},
			{id: "#f32", visible: 1, x: 5, y: 6},
			{id: "#f33", visible: 1, x: 6, y: 6},
			{id: "#f34", visible: 1, x: 3, y: 7},//Septima fila
			{id: "#f35", visible: 1, x: 4, y: 7},
			{id: "#f36", visible: 1, x: 5, y: 7}
		];

		deseleccionaFicha(fichaJugadora);
		muestraFicha(".ficha");
		ocultaFicha("#f0");
		contFichas = 32;
		fichaJugadora = undefined;

		changeMenu();
	}


	/**********************
	** Manejo de eventos
	**********************/
	$(".botonM").on('click', changeMenu);
	$("#reiniciar").on('click', reiniciaPartida);
	$("#volverJuego").on('click', changeMenu);


	$("#f1").on('click', function(){clickFicha("#f1");});
	$("#f2").on('click', function(){clickFicha("#f2");});
	$("#f3").on('click', function(){clickFicha("#f3");});
	//$("#f4").on('click', function(){clickFicha("#f4");});
	$("#f5").on('click', function(){clickFicha("#f5");});
	$("#f6").on('click', function(){clickFicha("#f6");});
	$("#f7").on('click', function(){clickFicha("#f7");});
	//$("#f8").on('click', function(){clickFicha("#f8");});
	$("#f9").on('click', function(){clickFicha("#f9");});
	$("#f10").on('click', function(){clickFicha("#f10");});
	$("#f11").on('click', function(){clickFicha("#f11");});
	$("#f12").on('click', function(){clickFicha("#f12");});
	$("#f13").on('click', function(){clickFicha("#f13");});
	$("#f14").on('click', function(){clickFicha("#f14");});
	$("#f15").on('click', function(){clickFicha("#f15");});
	$("#f16").on('click', function(){clickFicha("#f16");});
	$("#f17").on('click', function(){clickFicha("#f17");});
	$("#f18").on('click', function(){clickFicha("#f18");});
	$("#f19").on('click', function(){clickFicha("#f19");});
	$("#f20").on('click', function(){clickFicha("#f20");});
	$("#f21").on('click', function(){clickFicha("#f21");});
	$("#f22").on('click', function(){clickFicha("#f22");});
	$("#f23").on('click', function(){clickFicha("#f23");});
	$("#f24").on('click', function(){clickFicha("#f24");});
	$("#f25").on('click', function(){clickFicha("#f25");});
	$("#f26").on('click', function(){clickFicha("#f26");});
	$("#f27").on('click', function(){clickFicha("#f27");});
	$("#f28").on('click', function(){clickFicha("#f28");});
	//$("#f29").on('click', function(){clickFicha("#f29");});
	$("#f30").on('click', function(){clickFicha("#f30");});
	$("#f31").on('click', function(){clickFicha("#f31");});
	$("#f32").on('click', function(){clickFicha("#f32");});
	//$("#f33").on('click', function(){clickFicha("#f33");});
	$("#f34").on('click', function(){clickFicha("#f34");});
	$("#f35").on('click', function(){clickFicha("#f35");});
	$("#f36").on('click', function(){clickFicha("#f36");});
	$("#f0").on('click', function(){clickFicha("#f0");}); //Ficha central
})

