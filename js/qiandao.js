var shaking = false;
var $qdSuccess = $('#qdSuccess');
var $pwDialog = $('.pw-dialog');
var $wrapperMask = $('.wrapper-mask');
var $dialogForm = $('.dialog-form');
var hasQiandao = false;

$('.chest-small, .chest-big').hover(function () {
    if(shaking) return false;
    $('.bubble-box').hide();
    $(this).find('.bubble-box').show();
}, function () {
    $(this).find('.bubble-box').hide();
});

$('.chest-small, .chest-big').on('click', function () {
    if(shaking) {
        return false;
    }
    var $this = $(this);
    shaking = true;
    $this.addClass('shake shake-constant').find('.bubble-box').hide();
    setTimeout(function () {
        shaking = false;
        $this.removeClass('shake shake-constant');
        $pwDialog.show();
        $wrapperMask.show();
    },2000);
});

//点击签到
$('.btn-qiandao').on('click', function () {
    if(!hasQiandao) {
        $(this).removeClass('btn-qiandao').addClass('btn-hasqiandao');
        $qdSuccess.show();
        $wrapperMask.show();
        hasQiandao = true;
    } else {
        return false;
    }
});
$('.mask, .wrapper-mask').on('click', function () {
    if($qdSuccess.css('display') !== 'none') {
        $qdSuccess.find('.btn-close').click();
    }
});
//签到成功
$('#qdSuccess .btn-close').on('click', function () {
    $qdSuccess.hide();
    $wrapperMask.hide();
});
//关闭获奖提示框
$('.pw-dialog .btn-close').on('click', function () {
    $pwDialog.hide();
    $wrapperMask.hide();
});
//打开填写收货人信息框
$('.btn-receiver').on('click', function () {
    $pwDialog.hide();
    $dialogForm.show();
});
//关闭输入框
$('.btn-close-form').on('click', function () {
    $dialogForm.hide();
    $wrapperMask.hide();
});

 $('.turn-on-off').click(function () {
     window.parent.document.getElementById('qiandao').style.display = 'none';
 });
var calendar = new Calendar({ dom: '.calendar' });
