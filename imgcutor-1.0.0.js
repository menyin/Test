/**
 * Created by Administrator on 2017/3/8.
 */
$(function () {
    /**
     * ͼƬ�ü���
     * @author ������
     * @vision 1.0.0
     * @createtime 2017-03-06
     * @reference
     jquey-1.8.3.min.js+
     jquery-ui-widget.js
     jquery.iframe-transport.js
     jquery.fileupload.js
     js/layer-v3.0.2/layer.js
     layer.css
     jquery.Jcrop.js
     jquery.Jcrop.css
     * */
    (function (w) {
        w.imgCutor = {};
        w.imgCutor.open= open;
        /**
         *��ͼƬ�ü�������
         * @params {object} options ��ʼ������
         * @desciption options�����������ԣ�
         title ����������
         yesbt ������ȷ����ť����
         nobt ������ȡ����ť����
         filebt �����������ť����
         uploadurl ԭͼ�ϴ����ܺ�̨�����ַ
         imgcuturl ��ͼ�����ܺ�̨�����ַ�����������ѡ����ͼ�������÷���ӿڴ��ݲ���x��y��width��height
         yescall ������ɺ�ص�(yesbt��ťȷ���󴥷�) �������������磺{bigimg:'http:www.server.com/bigimg.jpg',bigimg:'http:www.server.com/litteimg.jpg'}
         **/
        function open(options) {
            if(!options){
                return 'error:options must be require';
            }
            if(!options.uploadurl){
                return 'error:uploadurl must be require';
            }

            var title = options.title||'ͼƬ�ü���';
            var yesbt = options.yesbt||'ȷ��';
            var nobt = options.nobt||'ȡ��';
            var filebt = options.filebt||'���';
            var noimgmsg = options.noimgmsg||'����ѡ����е�ͼƬ��';


            layer.open({
                type: 1,
                title: title,
                shadeClose: true,
                shade: 0.8,
//                area: ['50%', '60%'],
                area: ['820px', '580px'],
                btn: [yesbt, nobt, filebt],
                content: sHtml,//content������ʽ��type����������1Ϊhtml�ı���2ΪiframeǶ��ҳ��...
                success: function () {
                    /*��ʼ���ϴ��ؼ�*/
                    initialFileButton(options.uploadurl);
                },
                yes: function (index, dom) {
                    if(!$('#target').attr('src')){
                        alert(noimgmsg);
                        return false;
                    }
                    //��ȷ�����гߴ緢�͸����������в��У��ڻص���������лص�
                    var x=$('#x').val();
                    var y=$('#y').val();
                    var width=$('#w').val();
                    var height=$('#h').val();
                    var oSize = {x: $('#x').val(), y: $('#y').val(), width: $('#w').val(), height: $('#h').val()};
                    var imgUrl=$('#target').attr('src');
                    /*http://localhost:8080/mtwsns-snss/sgmtw/UploadImg/ImgCut?imgUrl=/upload/album/photo/20170307/WecuC5qudSecppji.png&x=10&y=10&width=100&height=100*/
                    var url=options.imgcuturl+'?imgUrl='+imgUrl+'&x='+x+'&y='+y+'&width='+width+'&height='+height;
                    $.get(url, function (data) {
                        data=JSON.parse(data);
                        if (data&&options.yescall) {
                            data.ori=$('#target').attr('src');
                            options.yescall.apply(null,[data]);
                        }else{
                            options.yescall.apply(null,[null]);
                        }
                    });
                    layer.close(index);
                },
                cancel: function (index) {
                },
                btn3: function () {//����ļ�ȷ����ť
                    $('#fileuploadBtn').click();
                    return false;
                }
            });
        }

        /**
         * ����ļ���ť��ʼ��
         */
        function initialFileButton(uploadUrl) {
            $('#fileuploadBtn').fileupload({
                url: uploadUrl,
                dataType: 'json',
                pasteZone: $('#fileuploadBtn'),
                formData: {},
                done: function (e, data) {

                    if(data.result.flag!=undefined){
                        if(data.result.flag=="false"){
                            mtwAlert(data.result.msg);
                            return false;
                        }
                    }

                    var img=new Image();
                    img.onload=function(){
                        $('#target').attr('src',data.result[0].ori);
                        change_image(data.result[0].ori);
                    }
                    img.src=data.result[0].ori;

                },
                change: function (e, data) {

                },
                fail: function (e, data) {

                },
                progressall: function (e, data) {

                }
            });
        }

        /**
         * ͼƬ��������ʼ��
         * @param {string} sImgSrc ��Ҫ���еĴ�ͼurl
         */
        function change_image(sImgSrc) {
            /*���ø���λ��img��src begin*/
            $("#target").attr('src', sImgSrc);
            $('#preview').attr('src', sImgSrc);
            $('#preview2').attr('src', sImgSrc);
            /*���ø���λ��img��src end*/

            /*���� begin*/
//            $("#target").attr('src', 'images/eeeeeee.png');
//            $("#preview").attr('src', 'images/eeeeeee.png');
//            $("#preview2").attr('src', 'images/eeeeeee.png');
            /*���� end*/

            var iOrignHeight = $('#target').height();
            var iTargetW = $('#target').width();
            var iTargetH = $('#target').height();
            /*�޶�ͼƬ��̶������� begin*/
            if (iTargetW > iTargetH) {
                $('#target').css({'width': '100%'});
            } else {
                $('#target').css({'height': '100%'});
            }
            /*�޶�ͼƬ��̶������� begin*/

            //�洢���ű���
//        var iOrignScale=Math.round(($('#target').width()/iTargetW)*100)/100;
            var iOrignScale = iTargetW / $('#target').width();
            var jcrop_api, boundx, boundy;
            setTimeout(function () {
                $('#target').Jcrop({
                        minSize: [48, 48],//��ʼ����С��������
                        setSelect: [0, 0, 220, 220],//��ʼ����������
                        onChange: updatePreview,
                        onSelect: updatePreview,
                        onSelect: updateCoords,
                        aspectRatio: 1
                    },
                    function () {
// Use the API to get the real image size
                        var bounds = this.getBounds();
                        boundx = bounds[0];
                        boundy = bounds[1];
// Store the API in the jcrop_api variable
                        jcrop_api = this;
                    });

                function updatePreview(c) {
                    if (parseInt(c.w) > 0) {
                        var rx = 48 / c.w; //Сͷ��Ԥ��Div�Ĵ�С
                        var ry = 48 / c.h;

                        $('#preview').css({
                            width: Math.round(rx * boundx) + 'px',
                            height: Math.round(ry * boundy) + 'px',
                            marginLeft: '-' + Math.round(rx * c.x) + 'px',
                            marginTop: '-' + Math.round(ry * c.y) + 'px'
                        });
                    }
                    {
                        var rx = 199 / c.w; //��ͷ��Ԥ��Div�Ĵ�С
                        var ry = 199 / c.h;
                        $('#preview2').css({
                            width: Math.round(rx * boundx) + 'px',
                            height: Math.round(ry * boundy) + 'px',
                            marginLeft: '-' + Math.round(rx * c.x) + 'px',
                            marginTop: '-' + Math.round(ry * c.y) + 'px'
                        });
                    }
                };

                function updateCoords(c) {
//                $('#x').val(c.x);
//                $('#y').val(c.y);
//                $('#w').val(c.w);
//                $('#h').val(c.h);
                    //��Ϊԭͼ�ŵ��������н������ţ�����Ҫԭͼ����ӳ����гߴ磬�Ա����͸���������
                    $('#x').val(parseInt(c.x * iOrignScale));
                    $('#y').val(parseInt(c.y * iOrignScale));
                    $('#w').val(parseInt(c.w * iOrignScale));
                    $('#h').val(parseInt(c.h * iOrignScale));
                };

            }, 500);

        }

        /*������html*/
        var sHtml = '<div id="imgcutor" style="width:470px;height: 470px;float: left;background: gray;margin:0 20px;"><img  id="target"></div>' +
            '<div style="width:190px;height:195px;margin:0 20px;overflow:hidden; float:right;"><img style="float:left;" id="preview2" ></div>' +
            '<div style="width:48px;height:48px;margin:0 10px;overflow:hidden; float:right;"><img style="float:left;" id="preview" ></div>' +
            '<div style="clear: both;"></div>' +
            '<form action="#" method="post" onsubmit="return checkCoords()" style="width: 0;height: 0;" enctype="multipart/form-data" id="form">' +
            '<input type="file" name="file" style="width: 0;height: 0;" id="fileuploadBtn" onchange="">' +
            '<input type="hidden" id="x" name="x" />' +
            '<input type="hidden" id="y" name="y" />' +
            '<input type="hidden" id="w" name="w" />' +
            '<input type="hidden" id="h" name="h" />'+
                // '<input type="submit" value="�ü�"/>'+
            '</form>'
    })(window);


});