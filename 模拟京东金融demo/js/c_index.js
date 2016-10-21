/**
 * Created by Cavalier on 2016/5/10.
 */
//封装animate函数
//obj：对象
//json：要执行的动作
//fn：回调函数
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
//兼容IE写法
//获取外连属性
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}
//兼容IE写法
//获取页面滚动条被卷曲的高度
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

//获取className
//解决 IE6、7、8不兼容问题
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
//            -------------------------------周排行--------------------------------------
    var z_wrap = document.getElementById("z_wrap");
    var z_triang = getClassName("z_triang");
    //var z_detail = getClassName("z_detail");
    var z_order = getClassName("z_order");
    var z_wr = getClassName("w-r");
    var z_index = "";
    for (var i = 0; i < z_triang.length; i++) {
        //设置自定义属性
        z_triang[i].setAttribute("index", i);
        //z_detail[i].setAttribute("index", i);
        //图片
        z_wr[i].setAttribute("index", i);
        z_triang[i].addEventListener("mouseover", function () {
            //获取自定义属性
            z_index = this.getAttribute("index");
            for (var j = 0; j < z_wr.length; j++) {
                z_wr[j].style.display = "none";
            }
            z_wr[z_index].style.display = "block";
            z_animate(this, {left: 15, fontSize: 25}, function () {
                //回调函数，动画执行完毕字体加粗，p标签显示
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


//            -------------------------------轮播图--------------------------------------
    //H5属性在IE下会有兼容性问题
    var z_carousel_ul = document.querySelectorAll("#z_carousel .z_container_left ul")[0];
    var z_cr_top_ul = document.querySelectorAll("#z_carousel .z_container_right .z_cr_top ul")[0];
    var z_bottom_left = document.querySelectorAll("#z_carousel .z_bottom_left  ul")[0];
    var z_bottom_right = document.querySelectorAll("#z_carousel .z_bottom_right ul")[0];
    var z_carousel_li = document.querySelectorAll("#z_carousel .z_container_left li");
    var z_d = document.querySelectorAll("#z_carousel .z_d")[0];
    var z_arrow = document.querySelectorAll("#z_carousel .z_arrow")[0];
    //左右箭头
    var z_prev = document.querySelectorAll("#z_carousel .z_prev")[0];
    var z_next = document.querySelectorAll("#z_carousel .z_next")[0];
    var z_i = 0;
    //轮播器
    var set = "";
    //锁
    var z_isture = true, z_lock = true;


    //            ------------------------------原点---------------------------------------
    for (var i = 0; i < z_carousel_li.length - 1; i++) {
        z_d.appendChild(document.createElement("span"));
    }
    //获取原点
    var z_span = document.querySelectorAll("#z_carousel .z_d span");
    for (var j = 0; j < z_span.length; j++) {
        //自定义属性
        z_span[j].setAttribute("index", j);
        z_carousel_li[j].setAttribute("index", j);
        z_span[j].addEventListener("click", function () {
            for (var k = 0; k < z_span.length; k++) {
                //移除class
                z_span[k].removeAttribute("class");
            }
            z_span[this.getAttribute("index")].className = "sp";
            if (this.getAttribute("index"))
            //设置图片第几张 ? 问题
                z_i = this.getAttribute("index") - 1;
            //图片跟随移动
            z_speed();
        })
    }
    z_span[0].className = "sp";

    //动画执行
    function z_speed() {
        //判断当最后一个动画执行完毕的时候才继续执行下一个动画
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
        //图片缓动
        z_move(z_carousel_ul, "", false);
        z_move(z_bottom_left, "", true);
        z_move(z_bottom_right, "", true);
        z_move(z_cr_top_ul, "true", false);
        for (var k = 0; k < z_span.length; k++) {
            //移除class
            z_span[k].removeAttribute("class");
        }
        //如果图片是最后一张，原点就是第一个
        if (z_i >= 5) {
            z_span[0].className = "sp";
        } else {
            z_span[z_i].className = "sp";
        }
    }

    //轮播
    set = setInterval(z_speed, 3000);

    //轮播图父div
    var z_container = document.querySelectorAll("#z_carousel .z_container")[0];
    z_setMouseout(z_container);
    z_clearMouseover(z_container);

    z_setMouseout(z_d);
    z_clearMouseover(z_d);

    z_clearMouseover(z_arrow);
    z_setMouseout(z_arrow);

//            左箭头鼠标事件
    z_clearMouseover(z_prev);
//            右箭头鼠标事件
    z_clearMouseover(z_next);
//            左箭头鼠标单击事件
    z_prev.addEventListener("click", function () {
        clearInterval(set);
        //锁，控制用户频繁点击上一张
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
    //右
    z_next.addEventListener("click", function () {
        clearInterval(set);
        //锁，控制用户频繁点击下一张
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
//            鼠标离开，代码复用
    function z_setMouseout(obj) {
        //鼠标离开
        obj.addEventListener("mouseout", function () {
            set = setInterval(z_speed, 3000);
            z_arrow.style.display = "none";
        });
    }

//            鼠标进入，代码复用
    function z_clearMouseover(obj) {
        //鼠标进入原点
        obj.addEventListener("mouseover", function () {
            clearInterval(set);
            z_arrow.style.display = "block";
        });
    }

    //通用代码
    //obj：要移动的元素对象
    //str：最后一个动画是否执行完毕
    //true/false：要执行哪个动画函数
    function z_move(obj, str, bool) {
        //开始执行动画，上锁
        z_lock = false;
        if (bool) {
            //回调函数，动画执行完毕打开锁
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