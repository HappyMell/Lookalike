$(function () {
    $('.info').each(function () {
        $(this).click(function () {
            window.scrollTo(document.getElementById('#card'), 800, {
                behavior: 'smooth',
            })

        })
    })
});