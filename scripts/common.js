function WpQQswipe(sender)
{
	this.e=sender;
}
WpQQswipe.prototype.banner =function () {
        // 1.0 ��ȡ�õ�Ƭ�ĸ���
		var ele=$(this.e);
        var imgSize = $(ele).find("img").size();
	
        // 2.0 ��ȡ�õ�Ƭ�Ŀ�ȺͿ��
        var imgWidth = $(ele).width();
	
        // 3.0 ���� <ul> ��ǩ�Ŀ��Ϊ������*������ȣ�����ֹli�̳и��࣬����Ϊ����<li>���㹻�Ŀռ両���������У�����ʾ���лõ�Ƭ
        $(ele).children("ul").width(imgSize * imgWidth).children("li").width(imgWidth).show();
	
		// 3.1 ���� 3.0֮�� ele�ĸ߶Ȼ���ű仯
		var imgHeight =$(ele).height();
	
        // 4.0 ���ݻõ�Ƭ�������ɰ�ť

        // 4.0.1 ������ť�����������ʽ
        $btn = $("<div class='btn position-absolute'></div>");
        $btn.css({
            "z-index": "100",
            "width": "100%",
            "height": "20px",
            "left": "0",
            "top": (imgHeight - 20) + "px",
            "line-height": "20px",
            "text-align": "center"
        });
	
        // 4.0.2 ���ɰ�ť���ر����������µ���ʽ�����css�ļ��ж��壬�������ҾͲ������ˡ�
        for (var i = 0; i < imgSize; i++) {
            $dot = $("<span class='dot display-inline-block'></span>");
            $dot.css({
                "width": "12px",
                "height": "12px",
                "border-radius": "50%",
                "background": "#fff",
                "margin-right": "8px"
            });
            $btn.append($dot);
        }
	
        // 4.0.3 ���õ�һ��ѡ�У�ѡ����ʽΪactive��
        $btn.find("span").eq(0).attr("id", "active").css({ "background": "#f00" });
	
        // 4.0.4 ��ӵ�������
        $(ele).append($btn);

        var isEnd = true;   // �����ʶ���ж��Ƿ񻬶����

        // 5.0 Ϊ���ɵİ�ť�󶨵���¼�
        $btn.children("span").on({
            click: function () {
                // 5.0.1 ��ȡ���������
                var index = $(this).index();

                // 5.0.2 Ϊ����İ�ť���ѡ����ʽ���������õ�Ƭ
                $(this).attr("id", "active").css({ "background": "#f00" }).siblings("span").removeAttr("id").css({ "background": "#fff" });

                // 5.0.3 �����õ�Ƭ
                if (isEnd == true) {
                    isEnd == false;
                    $(ele).children("ul").animate({
                        marginLeft: -index * imgWidth
                    }, 300, function () {
                        isEnd = true;
                    });
                }
            }
        });

		
        // 6.0 Ϊ�õ�Ƭ��Ӵ����¼���ǰ̨��������hammer.js

        // 6.0.1 ����һ���µ�hammer�������ڳ�ʼ��ʱָ��Ҫ�����domԪ��
        var hammertime = new Hammer($(ele)[0]);
        hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
		
        // ���󻬶�
        hammertime.on("swipeleft", function (e) {
            // 6.0.2 �жϵ�ǰ�õ�Ƭ������
            var currentIndex = $btn.find("span#active").index();

            // 6.0.3 �ж��Ƿ������һ��
            if (currentIndex + 1 < imgSize) {
                // ���������ť
                $btn.children("span").eq(currentIndex + 1).click();
            }
        });
        // ���һ���
        hammertime.on("swiperight", function (e) {
            // 6.0.2 �жϵ�ǰ�õ�Ƭ������
            var currentIndex = $btn.find("span#active").index();

            // 6.0.4 �ж��Ƿ��ǵ�һ��
            if (currentIndex > 0) {
                $btn.children("span").eq(currentIndex - 1).click();
            }
        });
		
        /******************************* �ֻ��õ�Ƭ��Ч����***************************/
        /*
         * ע�����ư�Ӧ�û����Զ��������ͼ�������ʱ�䣬�������ҾͲ���ϸд�ˣ�����������Ҫ��
         */
};	