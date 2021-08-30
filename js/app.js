$(function () {

    const worksSlider = $('[data-slider="slick"]');

    var header = $("#header");
    var headerShape = $("#headerShape");
    var introH = $("#intro").innerHeight();
    var scrollOffset = $(window).scrollTop();


    /* Fixed Header */
    checkScroll(scrollOffset);

    $(window).on("scroll resize", function () {
        introH = $("#intro").innerHeight();
        scrollOffset = $(this).scrollTop();

        checkScroll(scrollOffset);
    });

    function checkScroll(scrollOffset) {
        if (scrollOffset >= introH - 1) {
            header.addClass("fixed");
            headerShape.addClass("hide");
        } else {
            header.removeClass("fixed");
            headerShape.removeClass("hide");
        }
    }


    /* Nav__link active */
    var introHeight = $("#intro").offset().top;
    var aboutH = $("#about").offset().top;
    var worksH = $("#works").offset().top;
    var benefitsH = $("#benefits").offset().top;
    var requestH = $("#request").offset().top;
    var contactsH = $("#contacts").offset().top;

    checkScrollForNav(scrollOffset);

    $(window).on("scroll resize", function () {
        introHeight = $("#intro").offset().top;
        aboutH = $("#about").offset().top;
        worksH = $("#works").offset().top;
        benefitsH = $("#benefits").offset().top;
        requestH = $("#request").offset().top;
        contactsH = $("#contacts").offset().top;
        scrollOffset = $(this).scrollTop();

        checkScrollForNav(scrollOffset);
    });

    function checkScrollForNav(scrollOffset) {
        if (scrollOffset >= introHeight & scrollOffset < aboutH) {
            $("#nav a").removeClass("active");
        }

        if (scrollOffset >= aboutH - 70 & scrollOffset < worksH) {
            $("#nav a").removeClass("active");
            $("#navAbout").addClass("active");
        }

        if (scrollOffset >= worksH - 70 & scrollOffset < benefitsH) {
            $("#nav a").removeClass("active");
            $("#navWorks").addClass("active");
        }

        if (scrollOffset >= benefitsH - 70 & scrollOffset < requestH) {
            $("#nav a").removeClass("active");
            $("#navBenefits").addClass("active");
        }

        if (scrollOffset >= requestH - 70 & scrollOffset < contactsH) {
            $("#nav a").removeClass("active");
            $("#navRequest").addClass("active");
        }

        if (scrollOffset >= contactsH - 70) {
            $("#nav a").removeClass("active");
            $("#navContacts").addClass("active");
        }
    }


    /* Smooth scroll */
    $("[data-scroll]").on("click", function (event) {
        event.preventDefault();

        var $this = $(this);
        var blockId = $this.data('scroll');
        var blockOffset = $(blockId).offset().top;

        $("#nav a").removeClass("active");
        $this.addClass("active");

        $("#nav_toggle").removeClass("active");
        $("#nav").removeClass("active");

        $("html, body").animate({
            scrollTop: blockOffset - 69
        }, 500);
    });


    /* Menu nav toggle */
    $("#nav_toggle").on("click", function (event) {
        event.preventDefault();

        $(this).toggleClass("active");
        $("#nav").toggleClass("active");
    });


    /* Modal */
    const modalCall = $("[data-modal]");
    const modalClose = $("[data-close]");

    modalCall.on("click", function (event) {
        event.preventDefault();

        let $this = $(this);
        let modalId = $this.data('modal');

        $(modalId).addClass('show');
        $("body").addClass('no-scroll');

        setTimeout(function () {
            $(modalId).find(".modal__dialog").css({
                transform: "rotateX(0)"
            });
        }, 200);

        worksSlider.slick('setPosition');
    });

    modalClose.on("click", function (event) {
        event.preventDefault();

        let $this = $(this);
        let modalParent = $this.parents('.modal');

        modalParent.find(".modal__dialog").css({
            transform: "rotateX(90deg)"
        });

        setTimeout(function () {
            modalParent.removeClass('show');
            $("body").removeClass('no-scroll');
        }, 200);
    });



    $(".modal").on("click", function (event) {
        let $this = $(this);
        $this.find(".modal__dialog").css({
            transform: "rotateX(90deg)"
        });

        setTimeout(function () {
            $this.removeClass('show');
            $("body").removeClass('no-scroll');
        }, 200);
    });

    $(".modal__dialog").on("click", function (event) {
        event.stopPropagation();
    });



    /* Slider: https://kenwheeler.github.io/slick/ */

    worksSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        dots: true
    });

    $(".slickPrev").on("click", function (event) {
        event.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

        currentSlider.slick("slickPrev");
    });

    $(".slickNext").on("click", function (event) {
        event.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

        currentSlider.slick("slickNext");
    });



    /* Request */
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add('_sending');

            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert("Ошибка");
                form.classList.remove('_sending');
            }
        } else {
            alert('Заполните обязательные поля');
        }
    }


    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) { 
            const input = formReq[index];
            formRemoveError(input);

            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

});