jQuery.CateNav=function(elem1,elem2){
		//添加目录
		var currObj;
		var offsetTop=0;
		var h2List = new Array(), // 用于存储 h2 标签内容，也即二级标题内容
			h3List = new Array(); // 用于存储 h3 标签内容，也即三级标题内容
		
		var addNav=function(){
			var i1 = 0, // 用于计数
                i2 = 0,
                n1 = 0,
                n2 = 0;
			var temp = '<dl style="display:block;">'; // temp 用于保存菜单索引
			var cateList = $(elem1).html().match(/(<h[2-3][^>]*>.*?<\/h[2-3]>)/ig); // cateList 用于保存 h2 或 h3 标签的元素
			for(var i = 0 ; i < cateList.length ; i++){
				if(/(<h2[^>]*>.*?<\/h2>)/ig.test(cateList[i])){ // 如果是 h2 标签
					n1++;
					n2 = 0;
					temp += '<dd class="cate-item1"><span>'+n1+'</span><a href="#'+n1+'">'+cateList[i].replace(/<[^>].*?>/g,"")+'</a></dd>';
					h2List[i1] = n1;
					i1++;
				}else{ // 若是 h3 标签
					n2++;
					temp += '<dd class="cate-item2"><span>'+n1+'.'+n2+'</span><a href="#'+n1+'_'+n2+'">'+cateList[i].replace(/<[^>].*?>/g,"")+'</a></dd>';
					h3List[i2] = n1 + '_' + n2; // 设置标题名
					i2++;
				}
			}
			temp += '</dl>';
			$(elem2).append(temp);
		};
    
		//添加锚点，锚点中的文本节点内容为空
		var addPoint=function(){
			var i1 = i2 = 0;
			$(elem1).find('h2').each(function(){
				$(this).prepend('<a name="' + h2List[i1] + '"></a>');
				i1++;
			});
			$(elem1).find('h3').each(function(){
				$(this).prepend('<a name="'+ h3List[i2] + '"></a>');
				i2++;
			});
		};
    
		//点击锚点，跳转制定位置
		var clickPoint=function(){
			$(elem2+' a').click(function(e){
				e.preventDefault();
				$(elem2+' dd').removeClass('active');
				$(this).parent('dd').addClass('active');
				currObj=$("[name='"+$(this).attr('href').replace(/#/,'')+"']");
				offsetTop=currObj.offset().top;
				$('html,body').animate({
					scrollTop:offsetTop
				},500,'swing');
			});
		};

		//屏幕滚动，显示并选中锚点
		var scrollWin=function(){
			var windowTop = 0;
			$(window).scroll(function(){
				windowTop = $(window).scrollTop(); // 当前滚动条的位置
                $(elem2+' dl').slideDown(750);
                //console.log(windowTop, $(elem1).offset().top);
				/*if( windowTop >= $(elem1).offset().top ){ //判断滚动条距离与 文章y轴的距离大小
					$(elem2+' dl').slideDown(750);
				}else{
					$(elem2+' dl').slideUp(750);
				}*/
				$(elem2+' a').each(function(){
					currObj = $("[name='"+$(this).attr('href').replace(/#/,'')+"']");
					offsetTop = currObj.offset().top;
					if(windowTop > offsetTop){
						$(elem2+' dd').removeClass('active');
						$(this).parent('dd').addClass('active');
						return;
					}
				});
			});
		};
		var init=function(){
			addNav();
			addPoint();
			clickPoint();
			scrollWin();
		}
		init();
	}