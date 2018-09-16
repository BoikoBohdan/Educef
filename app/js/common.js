$( document ).ready(function() {
		var filters = new Array();
    $('.filters__result span').html($('.courses__list li').length);
		//filter list click
		$('.filter__select').on('click', function(){
			let state = $(this).hasClass('active');
			$('.filter__select').removeClass('active');
			if(!state){
				$(this).addClass('active');
			}
		});
		//filter check
		$('.filter__select').on('change', function(){
			var checkedfilter = [];
			let that = this;
			$(this).find('input').each(function() {
			    if($(this).prop('checked')){
			    	checkedfilter.push($(this).attr(`data-`+$(that).attr('data-target')));
			    }
			});
			filters[$(that).attr('data-target')] = checkedfilter;
			sort_courses(filters);
			add_filter(filters);
			empty_filter();
			$('.filters__result span').html($('.courses__list li:visible').length);
		});
		$('#sort').on('change', function(){
			if($('#sort option:selected').val() == 0){
				$(".courses__list li").sort(sort_li).appendTo('.courses__list');
			}
			else{
				$(".courses__list li").sort(reverse_sort_li).appendTo('.courses__list');
			}
			function sort_li(a, b) {
		    return ($(b).data('price')) < ($(a).data('price')) ? 1 : -1;
		  }
		  function reverse_sort_li(a, b) {
		    return ($(b).data('price')) > ($(a).data('price')) ? 1 : -1;
		  }
		});
		$('.category-nav__show i').on('click', function(){
			$('.category-nav__show i').toggleClass('active');
			if($(this).data('show') == 'list'){
				$('.courses__item').addClass('courses__show-list');
			}
			else{
				$('.courses__item').removeClass('courses__show-list');
			}
		});
});
//function to sort coursese by filter
function sort_courses(filters){
	$('.courses__item').addClass("hidden");
	$('.courses__item').each(function() {
		let el = this;
		let show = true;
		for (var i = 1, atts = el.attributes, n = atts.length, arr = []; i < n; i++){
		    arr.push(atts[i].nodeValue);
		}
		for(filter in filters){
			if(filters[filter] == ''){
				delete filters[filter];
			}
			else{				
				if(arr_in_arr(arr, filters[filter]) && show){
					show = true;
				}
				else if(!arr_in_arr(arr, filters[filter])){
					show = false;
				}
			}
		}
		if(show){
			$(this).removeClass('hidden')
		}
	});
}
//add filter
function add_filter(filters){
	$('.filters__list').html('');
	for(filter in filters){
		if(filters[filter]){
			for(key in filters[filter]){
				$('.filters__list').append('<li class="filters__item" data-target='+filter+' data-'+ filter+'='+filters[filter][key]+'><i class="fa fa-times" aria-hidden="true"></i><span class="filter__name">' + $(`input[data-`+filter+`='`+filters[filter][key]+`']`).parent().find('.filter__name').html()+'</span></li>');
			}
		}
	}
	//delete filter
	$('.filters__list i').on('click', function(){
		let target = $(this).parent().attr('data-target');
		console.log(target);
		delete filters[target][$(this).parent().data(target)];
		$('input[data-'+target+'="'+$(this).parent().data(target)+'"').trigger('click');
		$(this).parent().remove();
		sort_courses(filters);
	});
}
//array search in array 
function arr_in_arr(arr, haystack) {
    return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
    });
};
//sort price
function price(a, b){
    return ($(b).data('position')) < ($(a).data('position')) ? 1 : -1;    
}
//empty filter
function empty_filter(){
	if($('.filters__list').html() == ''){
		$('.filters__list').html('<span>No filter</span>');
	}
}