$(document).ready(function() {
    

    $('header').load('include/header.html', function(){
        // gnb 를 mo_gnb_box에 삽입
        let gnbHtml = $('.gnb').html();
        $('.mo_gnb_box .mo_gnb').html(gnbHtml);

        let spotMenu = $('.spotmenu').clone();
        $('.mo_nav').prepend(spotMenu);

        // let logSpot = $('.login_page').length;
        // if(logSpot > 0){
        //     $('nav .spotmenu').hide();
        // }

        //sub 페이지 구분해서 sub 클래스 추가
        let mainPage = $('body.main').length
        if(mainPage <= 0){
            $('.mo_menu').addClass('sub');
        }

        $('.mo_menu').click(function(){
            $(this).toggleClass('on'); 
            $('.mo_gnb_box').fadeToggle();
            $('.mo_gnb_box').toggleClass('on');  
        })


        
        let circleW = $('.mouse_circle').width();
        let circleH = $('.mouse_circle').height();
        let y
        $(window).mousemove(function(e){
            let x = e.clientX;
            y = e.clientY;
            $('.mouse_circle').css({left: x-circleW/2, top: y-circleH/2});
        })
        
        $(window).scroll(function() {
            $('.mouse_circle').css({top: y - circleH / 2});
        });
        


        $('.merong').mouseenter(function(){
            $('.mouse_circle').css({transform:'scale(3)', background:'blue', border:'1px solid'})
            console.log('k')
        })
        
        $('.merong').mouseleave(function(){
            $('.mouse_circle').css({transform:'', background:'', border:''})
        })
        ///////////////


        $(window).resize(function(){  
            let winW = $(window).width();
            
            if(winW > 768){
                $('.mo_gnb_box').hide();
                $('.mo_gnb_box').removeClass('on');
                $('.mo_menu').removeClass('on');
            }
        })

        //pc menu
        $('header .gnb').mouseenter(function(){
            $('.lnb').stop().slideDown(300);
        })
        
        $('header .gnb').mouseleave(function(){
            $('.lnb').stop().slideUp(300);
        })

        //mobile menu
        $('.mo_gnb > li > a').click(function(){
            $('.mo_gnb .lnb').slideUp(300);
            $(this).siblings('.lnb').stop().slideToggle(300);
            return false
        })
    });


    $('footer').load('include/footer.html');

    let snbWidth, snbLeft, snbTop, snbHeight;

    function snbLine(){
        let snbLength = $('.snb').length;
        let snbOnLeng = $('.snb li.on').length;

        if(snbLength > 0 && snbOnLeng > 0){
            snbWidth = $('.snb li.on').width()
            snbLeft = $('.snb li.on').position().left;
            snbTop = $('.snb li.on').position().top;
            snbHeight = $('.snb li.on').height();
            $('.snb_line').css({left: snbLeft, width: snbWidth, top:snbTop + snbHeight});
        };        
    }
    snbLine()  //새로고침때 실행
    
    $(window).resize(function(){
        snbLine()  //화면크기 변경할때 실행
    })

    $('.snb li').mouseenter(function(){
        let snbLeft2 = $(this).position().left;
        let snbWidth2 = $(this).width();
        $('.snb_line').css({left: snbLeft2, width: snbWidth2});
    })

    $('.snb li').mouseleave(function(){
        $('.snb_line').css({left: snbLeft, width: snbWidth});
    })



    let rollingNumber = 0;

    $('#section1 li').mouseenter(function() {
        clearInterval(autoRolling)
        rollingNumber = $(this).index()

        $(this).addClass('on').siblings().removeClass('on');

        let imgSrc = $(this).find('figure img').attr('src') ;
        let h3Text = $(this).find('h3').text() ;
        let cateText = $(this).find('.cate').text() ;
        
        $('.big_img img').attr('src', imgSrc);
        $('.big_img img').hide()
        $('.big_img img').fadeIn()


        $('.big_img').removeClass('on')
        
        setTimeout(function(){
            $('.big_img').addClass('on')
            $('.big_img .text strong').text(h3Text)
            $('.big_img .text .cate').text(cateText)
        },500)
    });

    $('#section1 li').mouseleave(function() {
        autoRolling = setInterval(imgRolling, 2000)
    })



    // let imgRolling = setInterval(함수, 시간)

    // clearInterval(imgRolling)

    let autoRolling = setInterval(imgRolling, 3000)

    function imgRolling(){
        rollingNumber++
        if(rollingNumber >= 4){
            rollingNumber = 0
        }

        $('.small_img li').eq(rollingNumber).addClass('on').siblings().removeClass('on');
        
        let imgSrc = $('.small_img li').eq(rollingNumber).find('figure img').attr('src');
        let h3Text = $('.small_img li').eq(rollingNumber).find('h3').text() ;
        let cateText = $('.small_img li').eq(rollingNumber).find('.cate').text() ;

        $('.big_img img').attr('src', imgSrc)
        $('.big_img img').hide()
        $('.big_img img').fadeIn()


        $('.big_img').removeClass('on')
        
        setTimeout(function(){
            $('.big_img').addClass('on')
            $('.big_img .text strong').text(h3Text)
            $('.big_img .text .cate').text(cateText)
        },500)
    }


    $('#section3 .content .name').each(function(){
        let name = $(this).text(); //박경태
        let nameComp = name.substr(0,1) + '*' + name.substr(2,1)

        $(this).text(nameComp)
    })



    $('.floating_menu a').click(function(){
        let target = $(this).attr('href')
        let targetPos = $(target).offset().top
        $('html, body').animate({scrollTop: targetPos}, 500);
    });

    // $(window).scroll(function(){
    //     let scrollTop = $(this).scrollTop();
    //     let sec1Top = $('#section1').offset().top;
    //     let sec2Top = $('#section2').offset().top;
    //     let sec3Top = $('#section3').offset().top;
    //     let winH = $(window).height();

    //     if(scrollTop >= sec1Top - winH/4){
    //         $('.floating_menu a').removeClass('on');
    //         $('.floating_menu a[href="#section1"]').addClass('on');
    //     } else {
    //         $('.floating_menu a').removeClass('on');
    //     }
        
    //     if(scrollTop >= sec2Top - winH/4){
    //         $('.floating_menu a').removeClass('on');
    //         $('.floating_menu a[href="#section2"]').addClass('on');
    //     }

    //     if(scrollTop >= sec3Top - winH/4){
    //         $('.floating_menu a').removeClass('on');
    //         $('.floating_menu a[href="#section3"]').addClass('on');
    //     } 
    // })

    let floatLength = $('.floating_menu.sub').length
    
    if(floatLength < 1){  //메인페이지인경우 실행
        $(window).scroll(function(){
            let scrollTop = $(this).scrollTop();
            let winH = $(window).height();
            $('.floating_menu a').removeClass('on');
            
            $('.floating_menu a').not('[href="#visual"]').each(function(){
                let target = $(this).attr('href')
                let targetPos = $(target).offset().top;
                
                if(scrollTop >= targetPos - winH/4){
                    $('.floating_menu a').removeClass('on');
                    $(this).addClass('on');
                } 
            })
        })
    }
    
    


    /* login page */
    $('.view_pw').click(function(){
        $(this).hide();
        $('.hide_pw').show();
        $(this).siblings('input').attr('type', 'text');
    })
    $('.hide_pw').click(function(){
        $(this).hide();
        $('.view_pw').show();
        $(this).siblings('input').attr('type', 'password');
    })

    /* $('a,button').mouseenter(function(){
        let btn1W = $(this).innerWidth();
        let btn1H = $(this).innerHeight();
        let btn1bdrd = $(this).css('border-radius');
        let btn1Top = $(this).offset().top
        let btn1Left = $(this).offset().left
        $('.mouse_circle').css({width:btn1W, height:btn1H, borderRadius:btn1bdrd, border:'4px solid red', background: 'rgba(255,0,0,0.2)', transform: 'translate(calc(-50% + 10px),calc(-50% + 10px))', top:btn1Top - btn1H/2, left:btn1Left - btn1W/2});
        console.log(btn1W,btn1H)
    })
    $('a,button').mouseleave(function(){
        $('.mouse_circle').css({width:'', height:'', borderRadius:'', top:'', left:'', border:'', background: '', transform: ''});
    }) */

    /* 회원가입 파일선택 */
    $('#photo').change(function(){
        /* let filePath = $(this).val()
            filePath = filePath.split('\\')
        let fileLength = filePath.length; //3
        $('.file_name').text(filePath[fileLength-1]); */

        let filePath = $(this).val()
            filePath = filePath.split('\\').pop()
        $('.file_name').text(filePath);
    })

})