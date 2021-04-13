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
				[ 1199, 2 ]
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
  /*** for side common position  ***/
  var hbrowser = $(window).height();
	var sideh = $('.side_header').height();
  if(hbrowser < 1140){
    $('.side_com').addClass('_short');
		$('.main_container, .main_container .visual .bx-viewport').css({
			// 'height': hbrowser + 100
			'height': sideh + 124
		})
  }else{
    $('.side_com').removeClass('_short');
		$('.main_container').css({
			'height': 'calc(100% - 124px)'
		})
		$('.main_container .visual .bx-viewport').css({
			'height': '100%'
		})
  }
  $(window).resize((100, function(e) {
    var hbrowser = $(window).height();
		var sideh = $('.side_header').height();


    if(hbrowser < 1140){
      $('.side_com').addClass('_short');
			$('.main_container, .main_container .visual .bx-viewport').css({
				// 'height': hbrowser + 100
				'height': sideh + 124
			})
    }else{
      $('.side_com').removeClass('_short');
			$('.main_container').css({
				'height': 'calc(100% - 124px)'
			})
			$('.main_container .visual .bx-viewport').css({
				'height': '100%'
			})
    }
  }));
  if($('.gnb').find('.sub_menu').length > 0) gnboverMenu();

	/*** for common allmenu ***/
	$(".btn_allbrand").bind("click", function (e) {
    var dheight = $(document).height();
		$('body').append('<div class=mask></div>');
    $('body').find('.mask').css('height', dheight).show();
    $('#allBrandlayer').attr('tabindex', '0').show().focus();

    e.preventDefault();
  });
	$('#allBrandlayer .layerCont').children('.close').bind('click', function (e) {
    $('body').find('.mask').remove();
    $('#allBrandlayer').removeAttr('tabindex').hide();

    e.preventDefault();
  });

	if($('.card_list').length > 0) {
		var bnrh = $('.card_list .banner').find('img').height();
		$('.card_list .banner').css({
			'height': bnrh
		})
	}
  $( window ).resize( function() {
		var delay0 = setTimeout(function(){
			var bnrh = $('.card_list .banner').find('img').height();
			var bnrw = $('.card_list .banner').width();
			$('.card_list .banner, .card_list .bxslider').css({
				'height': bnrh
			})
			$('.card_list .banner img').css({
				'width': bnrw
			})
			var delay1 = setTimeout(function(){
				$('.card_list').cardGrid({
					no_columns: 2,
					padding_x: 0,
					padding_y: 0,
					single_column_breakpoint: 1040
				});

				clearTimeout(delay1);
			}, 600);

			clearTimeout(delay0);
		}, 300);
  } );

});

if($('.card_list').length > 0) {
	$('.card_list').cardGrid({
    no_columns: 2,
    padding_x: 0,
    padding_y: 0,
		single_column_breakpoint: 1040
  });
}

/*** for gnb over/out  ***/
var gnboverMenu = function() {
  $('.gnb > ul > li').mouseover(function () {
    if(!$('.gnb').hasClass('show')){
      $('.gnb').find('.sub_menu').stop().slideDown();
      $('.gnb').addClass('show');
    }
  });
  $('.gnb').mouseleave(function () {
    $('.gnb').find('.sub_menu').stop().slideUp();
    $('.gnb').removeClass('show');
  });
}
