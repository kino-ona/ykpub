/*
	Pinterest Grid Plugin
	Copyright 2014 Mediademons
	@author smm 16/04/2014

	Modified by John Avis 13/04/2017

	usage:

		$(document).ready(function() {
		$('#blog-landing').pinterest_grid({
			no_columns: 4
		});
	});
*/
; (function ($, window, document, undefined) {
	var pluginName = 'cardGrid',
		defaults = {
			padding_x: 10,
			padding_y: 10,
			no_columns: 4,
			margin_bottom: 50,
			breakpoints: [
				[ 767, 1 ],
				[ 991, 2 ],
				[ 1199, 3 ]
			]
		},
		columns,
		$article,
		article_width;

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype.init = function () {
		var self = this,
			resize_finish;

		$(this.element).find("img").load(function () {
			$(window).resize();
		});

		$(window).resize(function () {
			clearTimeout(resize_finish);
			resize_finish = setTimeout(function () {
				self.make_layout_change(self);
			}, 11);
		});

		self.make_layout_change(self);

		setTimeout(function () {
			$(window).resize();
		}, 500);
	};

	Plugin.prototype.calculate = function (columns) {
		var self = this,
		tallest = 0,
		row = 0,
		$container = $(this.element),
			container_width = $container.width();
		$article = $(this.element).children();

		if (columns === 1) {
			article_width = $container.width();
		} else {
			article_width = ($container.width() - self.options.padding_x * (columns - 1)) / columns;
		}

		$article.each(function() {
			$(this).css('width', article_width);
		});

		$article.each(function (index) {
			var current_column,
				left_out = 0,
				top = 0,
				$this = $(this),
				prevAll = $this.prevAll(),
				tallest = 0;

			if (columns !== 1) {
				current_column = (index % columns);
			} else {
				current_column = 0;
			}

			for (var t = 0; t < columns; t++) {
				$this.removeClass('c' + t);
			}

			if (index % columns === 0) {
				row++;
			}

			$this.addClass('c' + current_column);
			$this.addClass('r' + row);

			prevAll.each(function (index) {
				if ($(this).hasClass('c' + current_column)) {
					top += $(this).outerHeight() + self.options.padding_y;
				}
			});

			if (columns === 1) {
				left_out = 0;
			} else {
				left_out = (index % columns) * (article_width + self.options.padding_x);
			}

			$this.css({
				'left': left_out,
				'top': top
			});
		});

		this.tallest($container);
	};

	Plugin.prototype.tallest = function (_container) {
		var column_heights = [],
			largest = 0;

		var paddingy = this.options.padding_y;

		for (var z = 0; z < columns; z++) {
			var temp_height = 0;
			_container.find('.c' + z).each(function () {
				temp_height += $(this).outerHeight() + paddingy;
			});
			column_heights[z] = temp_height;
		}

		largest = Math.max.apply(Math, column_heights) - paddingy;
		_container.css('height', largest + this.options.margin_bottom);
	};

	Plugin.prototype.make_layout_change = function (_self) {
		columns = _self.options.no_columns;

		for (var i = 0; i < _self.options.breakpoints.length; i++) {
			if ($(window).width() <= _self.options.breakpoints[i][0]) {
				columns = _self.options.breakpoints[i][1];
				break;
			}
		}

		_self.calculate(columns);
	};

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
				new Plugin(this, options));
			}
		});
	}

})(jQuery, window, document);


$(document).ready(function() {
	if($('.visual').length > 0) {
		var vsh = setTimeout(function(){
			$('.visual, .visual .bx-viewport').css({
				'height': '68.068vh'
			})
			clearTimeout(vsh);
		}, 200);
	  $( window ).resize( function() {
			var vsh = setTimeout(function(){
				$('.visual, .visual .bx-viewport').css({
	        'height': '68.068vh'
	      })
				clearTimeout(vsh);
			}, 200);
	  } );
	}

	var bnrHeight = function() {
		var bnrh = $('.card_list .banner').find('img').height();
		var ani = setTimeout(function(){
			$('.card_list .banner').css({
			    'min-height': 187,
				//'height': bnrh
			})
			clearTimeout(ani);
		}, 1000);
	}
	if($('.card_list').length > 0) bnrHeight();


	/*** for common allmenu ***/
	// $('.main_header').find('.allMenuBtn').bind('click', function (e) {
  //   var dheight = $(document).height();
	// 	$('body').append('<div class=mask></div>');
  //   $('body').find('.mask').css('height', dheight).show();
  //   $('#allmenu_layer').attr('tabindex', '0').show().focus();
	//
  //   e.preventDefault();
  // });
  $('#allmenu_layer .layerCont').children('.close').bind('click', function (e) {
    $('body').find('.mask').remove();
    $('#allmenu_layer').removeAttr('tabindex').hide();

    e.preventDefault();
  });
	var winh = $(window).height();
	$(".allMenuBtn").on("click", function(){
	  var $menuLi = $(".subMenu > li:gt(0)");
		$(".subMenu").height(winh - 146);

		if(!$(".allmenuCont").hasClass("am_act")){
			$("#allmenu_layer .allmenuCont").show();
			$(".allmenuCont").addClass("am_act");

			$menuLi.on("click", "a", function(){
			    $menuLi.removeClass("on");
			    $menuLi.find("ul").hide();
			    if (!$(this).next().is(":visible")) {
					$(this).parent("li").addClass("on");
					$(this).next().show();
				}else{
					$(this).parent("li").removeClass("on");
					$(this).next().hide();
				}
			});
		}else{
			$("#wrap").removeAttr("style");
			$menuLi.off("click", "a");
			$menuLi.removeClass("on");
			$menuLi.find("ul").hide();
			$(".allmenuCont").removeClass("am_act");
			$("#allmenu_layer .allmenuCont").hide();
		}
		popupDim();
	});

	$(".allBrandBtn").on("click", function () {
	    //$("#allbrand_layer > ul").height(winh - 50);
    $("#allbrand_layer > .al_wrap").height(winh - 52);

    if (!$("#allbrand_layer").hasClass("ab_act")) {
	    var $WHeight = $(window).height();
			$(".main_container").css("min-height",$WHeight);
			$("#allbrand_layer").addClass("ab_act");
			$("#allbrand_layer").show().addClass("ab_act"); //2016-05-26
		} else {
      $("#allbrand_layer").hide().removeClass("ab_act"); //2016-05-26
			$(".main_container").removeAttr("style");
    }
    popupDim();
	});

	//�꾩껜釉뚮옖�� �リ린 2016-05-26
	$("#allbrand_layer").children(".allBrandBtn").on("click", function() {
		$(".main_header").children(".allBrandBtn").focus();
	});

});

var popupDim = function(posCenter){
	if($("#dim").hasClass("show")) {
		$("#dim").removeClass("show");
		$("body").removeClass("noScroll posA")
	}else{
		$("#dim").addClass("show");
		$("body").addClass("noScroll")
		$("#moveTop").removeClass("show");

		if(posCenter === "center"){
			$("body").addClass("posA")
		}
	}
};