$(function(){function n(){$.ajax({url:"online/client/list",data:{},success:function(n){if(200==n.code){for(var t="",i=0;i<n.model.data.length;i++){var e="",o="<tr field='"+n.model.data[i].id+"' class='oneClient'><td><input type='text' maxlength='30'  readOnly='true' class='clientName' title='"+n.model.data[i].clientName+"' value='"+n.model.data[i].clientName+"'><i class='icon editIcon'></i><div class='point'></div><div class='tipMsg'>"+common_js_lang["clientList.info.rename"]+"</div></td>",a="<td class='clientIp'>"+n.model.data[i].clientIp+"</td>";1==n.model.data[i].onLine?e="<td class='status' field='"+n.model.data[i].onLine+"'><i class='icon stateIcon stop'></i><span class='state'>"+common_js_lang["clientList.info.online"]+"</span></td>":0==n.model.data[i].onLine&&(e="<td class='status' field='"+n.model.data[i].onLine+"'><i class='icon stateIcon start'></i><span class='state'>"+common_js_lang["clientList.info.offline"]+"</span></td>"),t+=o+a+e+("<td><span class='icon setBtn'></span><span class='icon delBtn'></span><div class='pointTask'></div><a href='./clientManage' class='tipMsgTask'>"+common_js_lang["clientList.info.titleM"]+"</a><div class='pointDel'></div><div class='tipMsgDel'>"+common_js_lang["clientList.option.del"]+"</div></td></tr>")}if("Microsoft Internet Explorer"==navigator.appName&&"9."==navigator.appVersion.match(/9./i)){var s=document.createElement("div");s.innerHTML="<table>"+t+"<table>",document.getElementById("client-tbody").parentNode.replaceChild(s.firstChild.firstChild,document.getElementById("client-tbody"))}else document.getElementById("client-tbody").innerHTML=t;if(0==n.model.data.length){t='<tr><td colspan="4" style="text-align:center;padding:10px 0;font-size:16px;"><img src="resources/dist/images/noData.png" /></br>'+common_js_lang["manage.title.noData"]+"</td></tr>";$("#client-tbody").html(t)}}else if(-1==n.code)return swal({title:"",text:common_js_lang["manage.info.timeout"],type:"info",showCancelButton:!0,confirmButtonText:common_js_lang["manage.info.newdow"],cancelButtonText:common_js_lang["manage.info.tologin"]},function(n){n?window.open("./","_blank"):location.href="./"}),!1}})}function t(){$.ajax({url:"online/client/list",data:{},success:function(t){if(200==t.code&&t.model.data.length>0&&t.model.data.length==$(".oneClient").length)for(var i in t.model.data)$(".oneClient").each(function(){t.model.data[i].id==$(this).attr("field")&&($(this).children(".clientIp").html(t.model.data[i].clientIp),$(this).children(".status").attr("field")!==t.model.data[i].onLine&&($(this).children(".status").attr("field",t.model.data[i].onLine),1==t.model.data[i].onLine?($(this).children(".status").children(".stateIcon").removeClass("start").addClass("stop"),$(this).children(".status").children(".state").html(common_js_lang["clientList.info.online"])):($(this).children(".status").children(".stateIcon").removeClass("stop").addClass("start"),$(this).children(".status").children(".state").html(common_js_lang["clientList.info.offline"]))),$(this).children().eq(0).children("input").attr("title")===t.model.data[i].clientName||$(this).children().eq(0).children("input").is(":focus")||$(this).children().eq(0).children("input").attr("title",t.model.data[i].clientName).val(t.model.data[i].clientName))});else if(200==t.code&&t.model.data.length>0&&t.model.data.length>$(".oneClient").length)n();else if(-1==t.code)return swal({title:"",text:common_js_lang["manage.info.timeout"],type:"info",showCancelButton:!0,confirmButtonText:common_js_lang["manage.info.newdow"],cancelButtonText:common_js_lang["manage.info.tologin"]},function(n){n?window.open("./","_blank"):location.href="./"}),!1}})}function i(t,i){$.ajax({url:"online/client/save",data:{id:t,clientName:i},success:function(t){if(200==t.code)n();else{if(-1==t.code)return swal({title:"",text:common_js_lang["manage.info.timeout"],type:"info",showCancelButton:!0,confirmButtonText:common_js_lang["manage.info.newdow"],cancelButtonText:common_js_lang["manage.info.tologin"]},function(n){n?window.open("./","_blank"):location.href="./"}),!1;0==t.code&&MsgTip("",common_js_lang["clientList.info.nameEditFail"],"info")}}})}function e(t){$.ajax({async:!0,type:"get",contentType:"application/x-www-form-urlencoded",url:"online/client/delete",data:{clientId:t},success:function(t){if(200==t.code)n();else{if(-1==t.code)return swal({title:"",text:common_js_lang["manage.info.timeout"],type:"info",showCancelButton:!0,confirmButtonText:common_js_lang["manage.info.newdow"],cancelButtonText:common_js_lang["manage.info.tologin"]},function(n){n?window.open("./","_blank"):location.href="./"}),!1;0==t.code&&ErrTip(t.i18nMsg.title,t.i18nMsg.detail,t.msg)}}})}function o(){$("body").on("mouseover",".editIcon",function(){$(this).css({"background-color":"#e5e5e5","background-position":"-16px -32px"}),$(this).siblings(".tipMsg").show(),$(this).siblings(".point").show()}),$("body").on("mouseout",".editIcon",function(){$(this).css({"background-color":"#fff","background-position":"0px -32px"}),$(this).siblings(".tipMsg").hide(),$(this).siblings(".point").hide()}),$("body").on("mouseover",".setBtn",function(){$(this).css({"background-color":"#e5e5e5","background-position":"-16px -64px"}),$(this).siblings(".pointTask,.tipMsgTask").show()}),$("body").on("mouseout",".setBtn",function(){$(this).css({"background-color":"#fff","background-position":"0px -64px"}),$(this).siblings(".pointTask,.tipMsgTask").hide()}),$("body").on("mouseover",".delBtn",function(){$(this).css({"background-color":"#e5e5e5","background-position":"-16px -48px"}),$(this).siblings(".pointDel,.tipMsgDel").show()}),$("body").on("mouseout",".delBtn",function(){$(this).css({"background-color":"#fff","background-position":"0px -48px"}),$(this).siblings(".pointDel,.tipMsgDel").hide()});var t="";$("body").on("click",".editIcon",function(){t=$(this).siblings("input").val(),$(this).hide().siblings("input").attr("readonly",!1),$(this).siblings("input").val(t).focus()}),$("body").on("click",".delBtn",function(){a=$(this).parent().parent().attr("field"),$(".coverTip").show(),$(".tipContent").show()}),$(".delOk").click(function(){return $(".coverTip").hide(),$(".tipContent").hide(),e(a),a="",!1}),$(".delCancel").click(function(){return $(".coverTip").css("display","none"),$(".tipContent").hide(),!1}),$(".cancelIcon").click(function(){$(".coverTip").hide(),$(".tipContent").hide()}),$("body").on("click",".setBtn",function(){clearInterval("clientFresh");var n=$(this).parent().parent().attr("field"),t=$(this).parent().parent().children().eq(0).children(".clientName").val();location.href="./client.taskm?id="+n+"&user="+t}),$("body").on("blur",".clientName",function(){if("none"==$(this).siblings(".editIcon").css("display")){$(this).siblings(".editIcon").show().css("display","inline-block"),$(this).attr("readonly",!0);var e=$(this).val().trim(),o=e.match(/.{1,30}/);if($(this).attr("title")!==e)if(""==e)$(this).val(t);else if(e&&!o)swal("",common_js_lang["clientList.info.clinetNameChar"],"info"),$(this).val(t);else if(e&&o){var a=$(this).parent().parent().attr("field"),s=$(this).val().trim(),l=0;$(".clientName").each(function(){$(this).val()==s&&l++}),l>1?(MsgTip("",common_js_lang["clientList.info.nameErr"],"info"),n()):i(a,s)}}})}$.ajaxSetup({cache:!1});var a="";n();setInterval(function(){t()},1e4);o()});