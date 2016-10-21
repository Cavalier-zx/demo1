/**
 * Created by Cavalier on 2016/5/10.
 */
//��װanimate����
//obj������
//json��Ҫִ�еĶ���
//fn���ص�����
function z_animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k == "opacity") {
                var target = json[k] * 100;
                var leader = Math.round(getStyle(obj, k || "filter") * 100) || 100;
            } else if (k == "Color") {
                var target = json[k];
            } else if (k == "borderBottom") {
                var target = json[k];
            } else {
                var target = json[k];
                var leader = parseInt(getStyle(obj, k));
            }
            var step = (target - leader) / 30;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            if (k == "opacity") {
                obj.style.opacity = leader / 100;
                obj.style.filter = "alpha(opacity=" + leader + ")";
            } else if (k == "zIndex") {
                obj.style.zIndex = target;
            } else if (k == "Color") {
                obj.style.color = target;
            } else if (k == "borderBottom") {
                obj.style.borderBottom = target;
            } else {
                obj.style[k] = leader + "px";
            }
            if (leader != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 10)
}
//����IEд��
//��ȡ��������
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}
//����IEд��
//��ȡҳ��������������ĸ߶�
function getScroll() {
    if (window.pageYOffset) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    } else if (document.compatMode == "CSS1Compat") {
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    } else {
        return {
            top: document.body.scrollTop,
            left: document.body.scrollLeft
        }
    }
}

//��ȡclassName
//��� IE6��7��8����������
function getClassName(value) {
    if (document.getElementsByClassName) {
        return document.getElementsByClassName(value);
    }
    var oTagName = document.getElementsByTagName("*");
    var oClassName = null;
    var arrTagName = [];
    for (var i = 0; i < oTagName.length; i++) {
        oClassName = oTagName[i].className.split(" ");
        for (var j = 0; j < oClassName.length; j++) {
            if (oClassName[j] == value) {
                arrTagName.push(oTagName[i]);
            }
        }
    }
    return arrTagName;
}

window.onload = function () {
//            -------------------------------������--------------------------------------
    var z_wrap = document.getElementById("z_wrap");
    var z_triang = getClassName("z_triang");
    //var z_detail = getClassName("z_detail");
    var z_order = getClassName("z_order");
    var z_wr = getClassName("w-r");
    var z_index = "";
    for (var i = 0; i < z_triang.length; i++) {
        //�����Զ�������
        z_triang[i].setAttribute("index", i);
        //z_detail[i].setAttribute("index", i);
        //ͼƬ
        z_wr[i].setAttribute("index", i);
        z_triang[i].addEventListener("mouseover", function () {
            //��ȡ�Զ�������
            z_index = this.getAttribute("index");
            for (var j = 0; j < z_wr.length; j++) {
                z_wr[j].style.display = "none";
            }
            z_wr[z_index].style.display = "block";
            z_animate(this, {left: 15, fontSize: 25}, function () {
                //�ص�����������ִ���������Ӵ֣�p��ǩ��ʾ
                z_triang[z_index].style.fontWeight = "bold";
                z_order[z_index].style.fontWeight = "bold";
                //z_detail[z_index].style.display = "block";
            });
            z_animate(z_order[z_index], {fontSize: 30, Color: "black", borderBottom: "solid 3px #ff0000"});
        });
        z_triang[i].addEventListener("mouseout", function () {
            this.style.fontWeight = "";
            z_order[z_index].style.fontWeight = "";
            //z_detail[z_index].style.display = "none";
            z_order[z_index].style.color = "#8E8E8E";
            z_order[z_index].style.borderBottom = "";
            z_animate(this, {left: -5, fontSize: 18});
            z_animate(z_order[z_index], {fontSize: 18});
        })
    }


//            -------------------------------�ֲ�ͼ--------------------------------------
    //H5������IE�»��м���������
    var z_carousel_ul = document.querySelectorAll("#z_carousel .z_container_left ul")[0];
    var z_cr_top_ul = document.querySelectorAll("#z_carousel .z_container_right .z_cr_top ul")[0];
    var z_bottom_left = document.querySelectorAll("#z_carousel .z_bottom_left  ul")[0];
    var z_bottom_right = document.querySelectorAll("#z_carousel .z_bottom_right ul")[0];
    var z_carousel_li = document.querySelectorAll("#z_carousel .z_container_left li");
    var z_d = document.querySelectorAll("#z_carousel .z_d")[0];
    var z_arrow = document.querySelectorAll("#z_carousel .z_arrow")[0];
    //���Ҽ�ͷ
    var z_prev = document.querySelectorAll("#z_carousel .z_prev")[0];
    var z_next = document.querySelectorAll("#z_carousel .z_next")[0];
    var z_i = 0;
    //�ֲ���
    var set = "";
    //��
    var z_isture = true, z_lock = true;


    //            ------------------------------ԭ��---------------------------------------
    for (var i = 0; i < z_carousel_li.length - 1; i++) {
        z_d.appendChild(document.createElement("span"));
    }
    //��ȡԭ��
    var z_span = document.querySelectorAll("#z_carousel .z_d span");
    for (var j = 0; j < z_span.length; j++) {
        //�Զ�������
        z_span[j].setAttribute("index", j);
        z_carousel_li[j].setAttribute("index", j);
        z_span[j].addEventListener("click", function () {
            for (var k = 0; k < z_span.length; k++) {
                //�Ƴ�class
                z_span[k].removeAttribute("class");
            }
            z_span[this.getAttribute("index")].className = "sp";
            if (this.getAttribute("index"))
            //����ͼƬ�ڼ��� ? ����
                z_i = this.getAttribute("index") - 1;
            //ͼƬ�����ƶ�
            z_speed();
        })
    }
    z_span[0].className = "sp";

    //����ִ��
    function z_speed() {
        //�жϵ����һ������ִ����ϵ�ʱ��ż���ִ����һ������
        if (z_isture) {
            z_i++;
            if (z_i >= z_carousel_li.length) {
                z_carousel_ul.style.left = 0;
                z_cr_top_ul.style.left = 0;
                z_bottom_left.style.left = 0;
                z_bottom_right.style.left = 0;
                z_i = 1;
            }
        }
        z_isture = false;
        //ͼƬ����
        z_move(z_carousel_ul, "", false);
        z_move(z_bottom_left, "", true);
        z_move(z_bottom_right, "", true);
        z_move(z_cr_top_ul, "true", false);
        for (var k = 0; k < z_span.length; k++) {
            //�Ƴ�class
            z_span[k].removeAttribute("class");
        }
        //���ͼƬ�����һ�ţ�ԭ����ǵ�һ��
        if (z_i >= 5) {
            z_span[0].className = "sp";
        } else {
            z_span[z_i].className = "sp";
        }
    }

    //�ֲ�
    set = setInterval(z_speed, 3000);

    //�ֲ�ͼ��div
    var z_container = document.querySelectorAll("#z_carousel .z_container")[0];
    z_setMouseout(z_container);
    z_clearMouseover(z_container);

    z_setMouseout(z_d);
    z_clearMouseover(z_d);

    z_clearMouseover(z_arrow);
    z_setMouseout(z_arrow);

//            ���ͷ����¼�
    z_clearMouseover(z_prev);
//            �Ҽ�ͷ����¼�
    z_clearMouseover(z_next);
//            ���ͷ��굥���¼�
    z_prev.addEventListener("click", function () {
        clearInterval(set);
        //���������û�Ƶ�������һ��
        if (!z_lock) {
            return;
        }
        if (z_i <= 0) {
            z_carousel_ul.style.left = "-3000px";
            z_cr_top_ul.style.left = "-3000px";
            z_bottom_left.style.left = "-1500px";
            z_bottom_right.style.left = "-1500px";
            z_i = 4;
        } else {
            z_i--;
        }

        z_isture = false;
        z_speed();
    });
    //��
    z_next.addEventListener("click", function () {
        clearInterval(set);
        //���������û�Ƶ�������һ��
        if (!z_lock) {
            return;
        }
        if (z_i >= 5) {
            z_carousel_ul.style.left = "0";
            z_cr_top_ul.style.left = "0";
            z_bottom_left.style.left = "0";
            z_bottom_right.style.left = "0";
            z_i = 1;
        } else {
            z_i++;
        }
        z_isture = false;
        z_speed();
    });
//            ����뿪�����븴��
    function z_setMouseout(obj) {
        //����뿪
        obj.addEventListener("mouseout", function () {
            set = setInterval(z_speed, 3000);
            z_arrow.style.display = "none";
        });
    }

//            �����룬���븴��
    function z_clearMouseover(obj) {
        //������ԭ��
        obj.addEventListener("mouseover", function () {
            clearInterval(set);
            z_arrow.style.display = "block";
        });
    }

    //ͨ�ô���
    //obj��Ҫ�ƶ���Ԫ�ض���
    //str�����һ�������Ƿ�ִ�����
    //true/false��Ҫִ���ĸ���������
    function z_move(obj, str, bool) {
        //��ʼִ�ж���������
        z_lock = false;
        if (bool) {
            //�ص�����������ִ����ϴ���
            z_animate(obj, {left: -(300 * z_i)}, function () {
                z_lock = true;
            });
        } else {
            z_animate(obj, {left: -(600 * z_i)}, function () {
                z_lock = true;
            });
        }
        if (str != "") {
            z_isture = str;

            //z_lock = true;
        }
    }


}