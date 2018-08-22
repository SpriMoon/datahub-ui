function getConnect(){var a=$("#userApp").val(),e=$("#targetType").val(),t="db/list",i=31,n="";e==globalParam.commonLinkType.hdfs?t="hdfs/list":n=4,e==globalParam.commonLinkType.spark&&(i=62),a&&$.fn.ajaxAPI({url:t+"?pid="+a+"&groups="+n+"&dbType="+i,callback:function(a){var t='<option value="" disabled>'+common_js_lang["db.info.selectLink"]+"</option>";e==globalParam.commonLinkType.hdfs&&adminConfigData.hdfs.id&&(t+='<option value="'+adminConfigData.hdfs.id+'">'+adminConfigData.hdfs.connName+"</option>"),e==globalParam.commonLinkType.hive&&adminConfigData.hive.id&&(t+='<option value="'+adminConfigData.hive.id+'">'+adminConfigData.hive.connName+"</option>"),a.model.data.map(function(a){t+='<option value="'+a.id+'">'+a.connName+"</option>"}),$(".configTask .connId").html(t).val("").select2()}})}function getDir(a){var e=""==(a=a||""),t=""!=a?$('.dirDos [data-base="'+a+'"] > .ul'):$(".hdfsTab .dirDos > .ul");$.fn.ajaxAPI({url:e&&"hdfs/dir/home"||"hdfs/dir/list",data:{base:a,hid:$(".connId").val(),pid:$("#userApp").val()},loadTime:e?10:2e3,callback:function(i){if(t.parent().find(".show").addClass("in"),t.fadeIn(),!e&&0==i.model.length)return t.siblings("p").find(".show").addClass("out"),!1;e&&(i.model=[i.model]);a.length;var n=template("template/hdfsDir",{dir:i.model,len:a.length});t.html(n),e&&getDataHandle()},complete:function(){t.parent().find(".show").removeClass("got")}})}function getDB(){$("#globalLoadCon").show(),$.when(globalParam.promiseFunc.getDb({id:$(".connId").val(),pid:$("#userApp").val()})).then(function(a){var e='<option value="" disabled="disabled">'+common_js_lang["local.option.getDb"]+"</option>";a.databases.map(function(a){e+='<option data-catalog="'+a.catalog+'" data-schema="'+a.schema+'" data-name="'+a.name+'">'+a.name+"</option>"}),$("#dbName").html(e).val("").select2(),a.databases&&a.databases.length<=0&&MsgTip("info",common_js_lang["dump.info.dbNone"]),getDataHandle()}).always(function(){$("#globalLoadCon").hide()})}function listFile(a){var e="<td> -- </td>",t='<td class="res">'+common_js_lang["local.info.uping"]+"</td>";return a.size>=0&&(e="<td>"+convertFileSize(a.size)+"</td>"),globalParam.fileIndex++,$(".configFilePath .file-list .tableNoData").parent().remove(),$(".configFilePath .file-list tbody").append('<tr class="f'+globalParam.fileIndex+'"><td title="'+a.name+'">'+a.name+"</td>"+e+'<td class="progress"><span class="process-sliderCon"><div class="process-slider" style="width:0"></div></span><span class="process-res"></span></td>'+t+'<td><a class="del" title="'+common_js_lang["clientList.option.del"]+'"><i></i></a></td></tr>'),"f"+globalParam.fileIndex}function convertFileSize(a){return a<1024?(a||0)+" bytes":a/1024<1024?(a/1024).toFixed(2)+" KB":(a/1024/1024).toFixed(2)+" MB"}function configList(){var a=!1,e=+$(".configTask #targetType").val()!=globalParam.targetType,t=globalParam.connId!=+$(".configTask .connId").val(),i=globalParam.tmpAppId!=$("#userApp").val();e||t||i?(a=!0,$(".item.item2 h3 i").html([common_js_lang["csv.text.hdfsNote"],common_js_lang["csv.text.hiveNote"],common_js_lang["csv.text.hiveNote"]][+$(".configTask #targetType").val()-1]),+$(".configTask #targetType").val()==globalParam.commonLinkType.hdfs?getDir(""):getDB()):dataHandle(a)}function dataHandle(a){(a||globalParam.fileTableChange)&&(globalParam.fileTable=globalParam.fileTable.map(function(a,e){return globalParam.targetType==globalParam.commonLinkType.hdfs?(a.param=JSON.stringify({fileName:a.tableName,tarName:a.tableName}),a.sourceParam=JSON.stringify({filePath:a.filePath,srcPath:a.srcPath,tableName:a.tableName})):a.sheets=a.sheets.map(function(t){return t.param=JSON.stringify({tableName:t.name}),t.sourceParam=JSON.stringify({filePath:a.filePath,srcPath:a.srcPath,tableName:a.tableName,name:t.name,totalRowSize:a.totalRowSize,rowSize:t.rowSize,index:t.index,columnSize:t.header&&t.header.columnSize||1,fileTag:e}),t}),a}),globalParam.fileTableChange=!1,$(".rightSide h4 b").html("(0)"),globalParam.targetType!=globalParam.commonLinkType.hdfs?($(".leftSide .allSelected.cur").removeClass("cur"),$(".leftSide, .transfer").show(),$(".rightSide").removeClass("all"),$(".rightSide thead").html(template("template/thead",{isDb:!0})),$(".rightSide .target-item").html('<tr class="noDataTr"><td colspan="4" class="tableNoData"><img src="resources/dist/images/noData.png">'+common_js_lang["manage.title.noData"]+"</td></tr>"),$(".item2 .tblList > .ul").html(template("template/source",{data:globalParam.fileTable,type:globalParam.targetType}))):($(".rightSide h4 b").html("("+globalParam.fileTable.length+")"),$(".leftSide, .transfer").hide(),$(".rightSide").addClass("all"),$(".rightSide thead").html(template("template/thead",{isDb:!1})),$(".rightSide .target-item").html(template("template/hdfsList",{files:globalParam.fileTable})))),$(".stepCon").animate({"margin-left":"-100%"},250,function(){$(".stepCon .item1").height(200),$(".stepCon .item2").height("auto")}),$(".processCon .itemCon").removeClass("cur").eq(1).addClass("cur")}function getDataHandle(){globalParam.targetType=+$(".configTask #targetType").val(),globalParam.connId=+$(".configTask .connId").val(),globalParam.tmpAppId=$("#userApp").val(),dataHandle(!0)}function checkBoxSelect(a){var e=$(".leftSide.sourceTbl");this.container=a.container?a.container:e,this.event()}function configParam(){this.listContainer=$(".rightSide"),this.configContainer=$(".global-ConfigCon"),this.mask=$(".global-mask"),this.newType=2,this.editor=editor,this.event()}function paramTrans(a,e){for(var t="",i=[],n=[],l=-1,o=0,r=a.length;o<r;o++)a[o].fileIndex===t?(i[l].sheets.push(a[o]),n[l][a[o].index]=e[o]):(t=a[o].fileIndex,i[l=i.length]={srcPath:a[o].srcPath,filePath:a[o].filePath,tableName:a[o].tableName,totalRowSize:a[o].totalRowSize,sheets:[a[o]]},n[l]={},n[l][a[o].index]=e[o]);return{src:i,tar:n}}var editor=CodeMirror.fromTextArea($(".new-sql textarea")[0],{lineNumbers:!0}),tmpParam={fileIndex:0,targetType:0,fileTable:[],fileTableChange:!1,fileCurLength:0,columnSep:"\t",tmpAppId:0,connId:0,hiveParam:[],formDataAjax:{},batchTblMode:!1};$.extend(globalParam,tmpParam),$("body").on("click","button.index",function(){window.location.href="./"}),$(".configTask").on("change","#targetType",function(a,e){getConnect()}),$("#userApp").change(function(){getConnect()}),getConnect(),window.onbeforeunload=function(){if($(".taskName").val().trim()||$(".taskDes").val().trim()||$(".file-list  tr .progress").length>0)return common_js_lang["common.info.leavePage"]},$(".file-btn").on("change","#fileupload",function(a){for(var e=$(this)[0].files?$(this)[0].files:{name:$(this).val().split("\\").slice(-1)[0]},t=!0,i=0,n=e.length;i<n;i++){if($(".file-list tbody tr").length>=5){MsgTip("",common_js_lang["dump.info.limit5"],"info");break}if(".xls"==e[i].name.slice(-4).toLowerCase()||-1!=[".xlsx"].indexOf(e[i].name.slice(-5).toLowerCase()))if(e[i].size>104857600)MsgTip("",common_js_lang["local.info.excelSize"],"info");else if(e[i].name&&e[i].name.length>60)MsgTip("",common_js_lang["s3.info.fileName100"]);else{var l=new FormData,o=listFile(e[i]);l.append("file",e[i]),globalParam.formDataAjax[o]=$.ajax({url:"job/excel/file/upload",type:"post",data:l,class:o,fileTitle:e[i].name,contentType:!1,processData:!1,xhr:function(){var a=this.class,e=new XMLHttpRequest;return e.upload.addEventListener("progress",function(e){if(e.lengthComputable){var t=parseInt(100*e.loaded/e.total);$(".file-list ."+a+" .process-slider").css({width:t+"%"}),$(".file-list ."+a+" .process-res").html(t+"%"),100==t&&$(".file-list ."+a+" .res").html("<div>"+common_js_lang["local.info.pausing"]+"</div>")}},!1),e},success:function(a){if(200==a.code){var e=this.class,t=this.fileTitle;a.model=a.model.map(function(a,i){return 0==i&&(a.firstTitle=t),a.indexTag=e,a.fileType=".xls"==t.slice(-4)?".xls":t.slice(-5),a}),Array.prototype.push.apply(globalParam.fileTable,a.model),globalParam.fileTableChange=!0,$(".file-list ."+this.class).addClass("uploaded"),$(".file-list ."+this.class+" .res").addClass("ok").html(common_js_lang["local.info.upOver"])}else $(".file-list ."+this.class+" .res").html('<div style="color:red" title="'+a.msg+'">'+common_js_lang["local.info.upFail"]+"</div>")},error:function(){$(".file-list ."+this.class+" .process-slider").animate({width:"100%"},5),$(".file-list ."+this.class+" .process-res").html("100%"),$(".file-list ."+this.class+" .res").addClass("error").html(common_js_lang["local.info.upErr"])}})}else t&&MsgTip({title:"",text:common_js_lang["local.info.excleType"],type:"info",timer:2e3}),t=!1}var r=$(this).clone().val("");$(this).remove(),$(".file-btn").append(r)}),$(".configFilePath").on("click",".del",function(){var a=$(this);swal({title:"",text:common_js_lang["local.info.delFile"],type:"info",showCancelButton:!0},function(){globalParam.fileTableChange=!0;var e=a.parents("tr").attr("class");a.parents("tr").remove(),$(".configFilePath tbody tr").length<=0&&$(".configFilePath tbody").append('<tr><td colspan="5" class="tableNoData"><img src="resources/dist/images/noData.png">'+common_js_lang["manage.title.noData"]+"</td></tr>"),e.indexOf("uploaded")>-1?globalParam.fileTable=globalParam.fileTable.filter(function(a){return-1==e.indexOf(a.indexTag)}):(swal.close(),globalParam.formDataAjax[e].abort())})}),$(".item1").on("click",".nextStep",function(){var a=$(".item1 .taskName").val().trim();$(".configTask .taskDes").val().trim();if(!a)return MsgTip("",common_js_lang["local.info.taskNameNone"],"info"),!1;if($("#userApp").val()||0)if($(".connId").val()||""){if(globalParam.fileTable.length<=0)return MsgTip("",common_js_lang["local.info.tblNone"],"info"),!1;for(var e=$(".file-list tbody tr"),t=0,i=e.length;t<i;t++)if(!e.eq(t).hasClass("uploaded"))return MsgTip("",common_js_lang["local.info.upUncomplete"].replace(/\[x\]/g,"["+(t+1)+"]"),"info"),!1;configList()}else MsgTip("",common_js_lang["db.info.selectLink"],"info");else MsgTip("",common_js_lang["dbManage.title.setApp"],"info")});var hoverInterval=0;$(".new-sql strong").hover(function(){var a=$(this);hoverInterval=setTimeout(function(){a.find(".tip").css({display:"block"})},300)},function(){clearInterval(hoverInterval),$(this).find(".tip").css({display:"none"})}),$(".item2").on("click",".prevStep",function(){$(".stepCon").animate({"margin-left":"0"},250,function(){$(".stepCon .item1").height("auto"),$(".stepCon .item2").height("200")}),$(".processCon .itemCon").removeClass("cur").eq(0).addClass("cur")}),checkBoxSelect.prototype={event:function(){var a=this;this.container.on("click",".getTbl",function(){var a=$(this).parent().find(".tbl");"none"==a.css("display")?(a.slideDown(),$(this).html("-")):(a.slideUp(),$(this).html("+"))}),this.container.on("click",".dbSelected",function(){$(this).toggleClass("cur");var e=$(this).siblings(".tbl"),t=$(this).hasClass("cur");e.find("li").toggleClass("cur",t),e.find("li .check").toggleClass("cur",t);var i=a.container.find("li .dbSelected").length==a.container.find("li .dbSelected.cur").length;return a.container.find(".allSelected").toggleClass("cur",i),!1}),this.container.on("click",".tblSelected",function(e,t){if(e.ctrlKey||t){if(!globalParam.batchTblMode)return globalParam.batchTblMode=!0,$(this).attr("data-batch",1),!1;var i=$('.leftSide .tblSelected[data-batch="1"]');if(i.parents(".db-item").attr("data-dbname")!==$(this).parents(".db-item").attr("data-dbname"))return globalParam.batchTblMode=!1,a.container.find('.tblSelected[data-batch="1"]').attr("data-batch",0),!1;for(var n=+i.siblings("b").text(),l=+$(this).siblings("b").text(),o=$(this).parents(".tbl").find("li"),r=n>l?l:n,s=n>l?n:l,d=r;d<=s;d++)o.eq(d-1).hasClass("hidden")||(o.eq(d-1).addClass("cur"),o.eq(d-1).find(".check").addClass("cur"));globalParam.batchTblMode=!1,a.container.find('.tblSelected[data-batch="1"]').attr("data-batch",0);m=(o=$(this).parents(".tbl")).find("li").length;o.find(".check.cur").length==m?o.siblings(".dbSelected").addClass("cur"):o.siblings(".dbSelected").removeClass("cur");f=(m=a.container.find("li .dbSelected").length)==a.container.find("li .dbSelected.cur").length;return a.container.find(".allSelected").toggleClass("cur",f),!1}globalParam.batchTblMode=!1,a.container.find('.tblSelected[data-batch="1"]').attr("data-batch",0),$(this).toggleClass("cur");var c=$(this).hasClass("cur");$(this).parent().toggleClass("cur",c);var m=(o=$(this).parents(".tbl")).find("li").length;o.find(".check.cur").length==m?o.siblings(".dbSelected").addClass("cur"):o.siblings(".dbSelected").removeClass("cur");var f=(m=a.container.find(".dbSelected").length)==a.container.find(".dbSelected.cur").length;return a.container.find(".allSelected").toggleClass("cur",f),!1}),this.container.on("click",".tbl li",function(a){$(this).find(".check").trigger("click",a.ctrlKey)}),this.container.on("click",".allSelected",function(){$(this).toggleClass("cur");var e=$(this).hasClass("cur");return a.container.find(".dbSelected, .tblSelected").toggleClass("cur",e),!1})}};var leftCheckBox=new checkBoxSelect({container:$(".leftSide.sourceTbl")});$(".rightSide.targetPath").on("click",".target-db",function(){$(this).toggleClass("cur");var a=$(this).hasClass("cur"),e=$(this).parents(".target-path").attr("data-index");$('.rightSide [data-index="'+e+'"] .check').toggleClass("cur",a),$(".rightSide .target-db").length==$(".rightSide .target-db.cur").length?$(".rightSide .allSelected").addClass("cur"):$(".rightSide .allSelected").removeClass("cur")}),$(".rightSide.targetPath").on("click",".tblSelected",function(){$(this).toggleClass("cur");var a=$(this).parents("tr").attr("data-index"),e=$('.rightSide .isdb[data-index="'+a+'"] .tblSelected').length==$('.rightSide .isdb[data-index="'+a+'"] .tblSelected.cur').length;$('.rightSide .target-path[data-index="'+a+'"] .target-db').toggleClass("cur",e);var t=$(".rightSide .tblSelected").length==$(".rightSide .tblSelected.cur").length;$(".rightSide .allSelected").toggleClass("cur",t)}),$(".rightSide.targetPath").on("click",".allSelected",function(){$(this).toggleClass("cur");var a=$(this).hasClass("cur");$(".target-item").find(".tblSelected, .target-db").toggleClass("cur",a)}),$(".transfer").on("click",".move-right",function(){if(!($(".leftSide .tblList .tblSelected.cur").length<=0)){var a=$(".leftSide .tblList .db-item"),e=$(".rightSide .target-item");e.parent().find(".check").removeClass("cur");for(var t=0,i=a.length;t<i;t++){var n=a.eq(t),l=n.find(".tblSelected.cur"),o=l.length;if(0!=o){var r=n.attr("data-index"),s={index:r,count:o,dbName:n.find("> p").text(),tbls:[]},d=e.find('.target-path[data-index="'+r+'"]');if(d.length>0){for(var c=0,m=0;m<o;m++){var f=l.eq(m).siblings("p").text();0==e.find('[data-index="'+r+'"][data-tbl="'+f+'"]').length&&((p={}).tbl=f,p.param=l.eq(m).parent().attr("data-param"),p.sourceparam=l.eq(m).parent().attr("data-sourceparam"),s.tbls.push(p),c++)}var g=$(template("template/targetTbl",s)).siblings('tr:not(".target-path")');e.find('[data-index="'+r+'"]').slice(-1).after(g),d.find("b").html(+d.find("b").html()+c)}else{for(m=0;m<o;m++){var p={};p.tbl=l.eq(m).siblings("p").text(),p.param=l.eq(m).parent().attr("data-param"),p.sourceparam=l.eq(m).parent().attr("data-sourceparam"),s.tbls.push(p)}$(".rightSide .target-item").append(template("template/targetTbl",s))}}}$(".leftSide .tbl li, .leftSide i.check.cur").removeClass("cur"),$(".rightSide h4 b").html("("+$(".target-item .target-name").length+")"),$('.rightSide .target-item tr:not(".noDataTr")').length>0&&$(".rightSide .target-item .noDataTr").remove()}}),$(".transfer").on("click",".move-left",function(){$(".rightSide .target-item .check.cur").parents("tr").remove(),$(".rightSide .allSelected").removeClass("cur");for(var a=$(".rightSide .target-item .target-path"),e=0,t=0,i=a.length;t<i;t++){var n=a.eq(t).attr("data-index"),l=$('.rightSide .target-item [data-index="'+n+'"]:not(".target-path")').length;a.eq(t).find("td b").html(l),l<=0&&a.eq(t).remove(),e+=l}$(".rightSide h4 b").html("("+e+")"),0==$(".rightSide .target-item tr").length&&$(".rightSide .target-item").append('<tr class="noDataTr"><td colspan="4" class="tableNoData"><img src="resources/dist/images/noData.png">'+common_js_lang["manage.title.noData"]+"</td></tr>")}),configParam.prototype={event:function(){var a=this;a.configContainer.on("click",".btn-item",function(){"all"==$(this).attr("data-type")?globalParam.targetType!=globalParam.commonLinkType.hdfs?a.hiveBatchAct():a.hdfsBatchAct():globalParam.targetType!=globalParam.commonLinkType.hdfs?a.hiveSingleAct():a.hdfsSingleAct()}),a.listContainer.on("click",".batch",function(){a.listContainer.find(".check.cur").length<=0?MsgTip("",common_js_lang["db.info.tarEmpty"],"info"):(a.configContainer.find(".btn-item").attr("data-type","all"),a.mask.show(),a.configContainer.show(),globalParam.targetType!=globalParam.commonLinkType.hdfs?(a.configContainer.find(".hdfsTab").hide(),a.configContainer.find(".dbTab").show(),a.configContainer.find('.infoline:not(".first,:last-child")').hide(),a.configContainer.find(".new-sql").hide(),a.configContainer.find(".lineNum").val(1)):(a.configContainer.find(".dbTab").hide(),a.configContainer.find(".hdfsTab").show(),a.configContainer.find(".hdfsTab p .check").removeClass("cur"),a.configContainer.find(".hdfsTab .selectedDir").val("").attr("title",""),a.configContainer.find(".hdfsTab .res label").eq(1).hide(),a.configContainer.find(".hdfsTab .fileName").hide()))}),a.listContainer.on("click",".config",function(){$(this).addClass("active"),a.configContainer.find(".btn-item").attr("data-type","");var e=$(this).parent().attr("data-param")||"",t=e?JSON.parse(e):"";if(a.mask.show(),a.configContainer.show(),globalParam.targetType!=globalParam.commonLinkType.hdfs){a.configContainer.find(".hdfsTab").hide(),a.configContainer.find(".dbTab").show(),a.configContainer.find('.infoline:not(".first,:last-child")').show(),a.configContainer.find(".new-sql").show(),a.configContainer.find(".infoline.last").hide(),a.configContainer.find("#partitions").empty(),a.configContainer.find(".tableType").val(t.tableType||(globalParam.targetType==globalParam.commonLinkType.hive?0:1)).prop("disabled",globalParam.targetType==globalParam.commonLinkType.spark||""!=t.ddl),a.configContainer.find(".lineNum").val((t.dataRowIndex||0)+1);var i=t.name||"",n=t.tableName||$(this).siblings(".tbl").text();i?($("#dbName").val()!=i?($("#dbName").val(i).select2(),a.getTables(t)):($("#tableName").val(n).select2({tags:!0}),$("#tableName").val()!=n&&$("#tableName").append('<option value="'+n+'">'+n+"</option>").val(n).select2({tags:!0})),t.ddl&&(a.getPart(t.tableName,t.catalog,t.schema,t.partition),editor.doc.cm.setOption("readOnly",!0),editor.doc.setValue(t.ddl),$(".new-sql .CodeMirror").addClass("disabled")),t.createSql&&(editor.doc.cm.setOption("readOnly",!1),editor.doc.setValue(t.createSql),$(".new-sql .CodeMirror").removeClass("disabled"))):($("#dbName").val("").select2(),$("#tableName").html('<option value="" disabled>'+common_js_lang["local.option.setTbl"]+"</option><option>"+n+"</option>").val(n).select2({tags:!0}),a.configContainer.find(".tableType").val(globalParam.targetType==globalParam.commonLinkType.hive?0:1).prop("disabled",!0),editor.doc.cm.setOption("readOnly",!0),editor.doc.setValue(""),$(".new-sql .CodeMirror").addClass("disabled"))}else{if(a.configContainer.find(".dbTab").hide(),a.configContainer.find(".hdfsTab").show(),a.configContainer.find(".hdfsTab .res label").eq(1).show(),a.configContainer.find(".hdfsTab .fileName").show(),t.tarName)var l=t.tarDir||"",o=t.tarName||"";else{o="";if(l=t.fileName||""){o=l.split("/").slice(-1).join("/");l=l.split("/").slice(0,-1).join("/")||l.match(/\//g)&&"/"}}if(a.configContainer.find(".hdfsTab p .check").removeClass("cur"),a.configContainer.find(".hdfsTab p .show").removeClass("in"),a.configContainer.find(".hdfsTab .selectedDir").val(l).attr("title",l),a.configContainer.find(".hdfsTab .fileName").val(o),l){var r=a.configContainer.find('.hdfsTab [data-base="'+l+'"]');1==r.length&&(r.find(">p .check").addClass("cur"),r.parents(".ul").fadeIn().siblings("p").find(".show").addClass("in"))}}}),a.configContainer.on("change","#dbName",function(){if("all"!=a.configContainer.find(".btn-item").attr("data-type")){var e=a.getParam();e.name&&a.getTables(e)}}),a.configContainer.on("change","#tableName",function(){var e=a.getParam();if(e.name&&e.tableName)return e.tableName.match(/^[0-9A-Za-z]\w*$/g)?void a.getDdlAct(e,a.newType):(MsgTip("",common_js_lang["db.info.tableName"],"info"),a.configContainer.find("#tableName").val("").select2({tags:!0}),!1)}),a.configContainer.on("change",".tableType",function(){var e=a.getParam();if(e.name&&e.tableName)return e.tableName.match(/^[0-9A-Za-z]\w*$/g)?void a.getDdlAct(e,a.newType):(MsgTip("",common_js_lang["db.info.tableName"],"info"),a.configContainer.find("#tableName").val("").select2({tags:!0}),!1)}),a.configContainer.on("blur",".lineNum",function(){var e=parseInt($(this).val())||1,t=$(this).attr("data-val");if(e<1&&(e=1),$(this).val(e).attr("data-val",e),!editor.doc.cm.isReadOnly()&&t!=e){var i=a.getParam();if(i.name&&i.tableName)return i.tableName.match(/^[0-9A-Za-z]\w*$/g)?void a.getDdlAct(i,a.newType):(MsgTip("",common_js_lang["db.info.tableName"],"info"),a.configContainer.find("#tableName").val("").select2({tags:!0}),!1)}}),a.configContainer.on("click",".btn-cancel, .cancel",function(){a.closeConfig()}),a.configContainer.on("click",".hdfsTab li p .show",function(){if(0==$(this).parent().siblings("ul").find("li").length){if($(this).hasClass("got"))return!1;$(this).addClass("got"),getDir($(this).parents("li").data("base"))}else $(this).toggleClass("in"),$(this).parent().siblings("ul").toggle()}),a.configContainer.on("click",".hdfsTab li p .check",function(){if(!$(this).hasClass("cur")){a.configContainer.find(".hdfsTab .check.cur").removeClass("cur"),$(this).addClass("cur");var e=$(this).parents("li").data("base");a.configContainer.find(".selectedDir").val(e).attr("title",e)}})},getParam:function(){var a=this,e=a.configContainer.find("#dbName option:selected");return{dbId:globalParam.connId,name:e.val(),pid:$("#userApp").val(),catalog:e.attr("data-catalog")||"",schema:e.attr("data-schema")||"",tableName:a.configContainer.find("#tableName").val(),sourceparam:JSON.parse($(".config.active").parent().attr("data-sourceparam")),tableType:a.configContainer.find(".tableType").val(),format:a.configContainer.find(".tableType option:selected").text(),lineNum:a.configContainer.find(".lineNum").val(),columnSep:globalParam.columnSep}},getTables:function(a){var e=this;$("#globalLoadCon").show(),$.when(globalParam.promiseFunc.getTables(a)).then(function(){$(".infoline.last").hide(),$("#partitions").empty();var t=globalParam.tblModel["tbl_"+a.dbId+"_"+a.catalog+"_"+a.schema],i='<option value="" disabled>'+common_js_lang["local.option.setTbl"]+"</option>";if(t.map(function(a){i+='<option data-name="'+a.name+'">'+a.name+"</option>"}),$("#tableName").html(i),!a.tableName||!a.tableName.match(/^[0-9A-Za-z]\w*$/g))return $("#tableName").val("").select2({tags:!0}),MsgTip("",common_js_lang["db.info.tableName"],"info"),$("#globalLoadCon").hide(),!1;$("#tableName").val(a.tableName).select2({tags:!0}),$("#tableName").val()!=a.tableName&&$("#tableName").append("<option>"+a.tableName+"</option>").val(a.tableName).select2({tags:!0}),a.tableName?a.ddl||a.createSql?$("#globalLoadCon").hide():e.getDdlAct(a,e.newType):(editor.doc.cm.setOption("readOnly","nocursor"),editor.doc.setValue(""),$(".new-sql .CodeMirror").addClass("disabled"),$("#tableName").val("").select2({tags:!0}),$("#globalLoadCon").hide())}).fail(function(){$("#globalLoadCon").hide()})},getDdlAct:function(a,e){var t=this;$("#globalLoadCon").show();var i=$.Deferred();$.when(globalParam.promiseFunc.getDdl(a,e)).then(function(e){if(e.mppTable&&globalParam.targetType==globalParam.commonLinkType.hive)return t.editor.doc.setValue(""),i.reject(),void MsgTip("info",common_js_lang["db.tip.hivexspark"]);if(!e.mppTable&&globalParam.targetType==globalParam.commonLinkType.spark)return t.editor.doc.setValue(""),i.reject(),void MsgTip("info",common_js_lang["db.tip.sparkxhive"]);if(t.editor.doc.setValue(e.ddl),e.isShow){t.editor.doc.cm.setOption("readOnly","nocursor"),t.configContainer.find(".CodeMirror").addClass("disabled");n={text:"0",orc:"1",parquet:"2",rcfile:"3",sequencefile:"4"};t.configContainer.find(".tableType").val(n[e.format]||0).prop("disabled",!0),t.getPart(a.tableName,a.catalog,a.schema,a.partition||"",i)}else{t.editor.doc.cm.setOption("readOnly",!1),t.configContainer.find(".CodeMirror").removeClass("disabled");var n={text:"0",orc:"1",parquet:"2",rcfile:"3",sequencefile:"4"};t.configContainer.find(".tableType").val(n[e.format]||(globalParam.targetType==globalParam.commonLinkType.hive?0:1)).prop("disabled",globalParam.targetType==globalParam.commonLinkType.spark||!1),t.configContainer.find("#partitions").empty(),t.configContainer.find(".hive .infoline.last").hide(),i.resolve()}}).fail(function(){t.configContainer.find("#tableName").val("").select2({tags:!0}),t.editor.doc.setValue(""),t.editor.doc.cm.setOption("readOnly","nocursor"),t.configContainer.find(".CodeMirror").addClass("disabled"),t.configContainer.find(".tableType").val(0).prop("disabled",!0),i.reject()}),$.when(i).always(function(){$("#globalLoadCon").hide()})},getPart:function(a,e,t,i,n){var l=this;$.when(globalParam.promiseFunc.getPart({dbId:globalParam.connId,tableName:a,catalog:e,schema:t})).then(function(a){l.partitionShow(a,i),n&&n.resolve()}).fail(function(){n&&n.reject()})},partitionShow:function(a,e){if($("#partitions").empty(),a&&0!=a.length){if($(".hive .infoline.last").css({display:"block"}),a.map(function(a,e){var t="";t+='<div class="item"><input type="text" class="filedName" value="'+a.name+'" disabled><label>=</label><select class="select2 filedVal selVal" data-type="'+a.name+'" id="Part_level_'+e+'">',a.parts.map(function(a){t+='<option value="'+a.value+'" title="'+a.name+'">'+a.value+"</option>"}),t+=globalParam.columnValOption+"</select></div>",$("#partitions").append(t),$("#partitions #Part_level_"+e).select2({placeholder:"value",tags:!0})}),e){var t=JSON.parse(e);for(k in t)1==$("#partitions").find('[data-type="'+k+'"]').find('[value="'+t[k]+'"]').length?$("#partitions").find('[data-type="'+k+'"]').val(t[k]).trigger("change"):$("#partitions").find('[data-type="'+k+'"]').prepend('<option value="'+t[k]+'">'+t[k]+"</option>").val(t[k]).change()}}else $(".hive .infoline.last").css({display:"none"})},hdfsBatchAct:function(){var a=this,e=a.configContainer.find(".hdfsTab .selectedDir").val().trim()||"";""!=e?$.ajax({url:"hdfs/dir/access",data:{hdfsId:globalParam.connId,dir:e,pid:$("#userApp").val()},success:function(t){200==t.code?(a.listContainer.find(".target-item .check.cur").map(function(a,t){var i=$(t).parents("tr"),n=i.find(".target-name").text();if(n.match(/\s+|\\+/g))return i.attr("data-param",JSON.stringify({tarName:""})),void i.find(".fileName").html("").attr("title","");n=n.slice(0,60);var l=(e+"/"+n).replace(/\/+/g,"/");i.attr("data-param",JSON.stringify({tarName:n,tarDir:e,fileName:l})),i.find(".fileName").html(l).attr("title",l),$(t).click()}),a.closeConfig()):ErrTip(t.i18nMsg.title,t.i18nMsg.detail,t.msg)}}):MsgTip("",common_js_lang["db.info.batchDir"],"info")},hdfsSingleAct:function(){var a=this,e=a.configContainer.find(".hdfsTab .fileName").val().trim()||"",t=a.configContainer.find(".hdfsTab .selectedDir").val().trim()||"";return t&&e?e.match(/\s+|\\+/g)?(MsgTip("",common_js_lang["local.info.fileName"],"info"),!1):void $.ajax({url:"hdfs/dir/access",data:{hdfsId:globalParam.connId,dir:t,pid:$("#userApp").val()},success:function(i){if(200==i.code){e=e.slice(0,60);var n=t+"/"+e;n=n.replace(/\/+/g,"/");var l=a.listContainer.find(".config.active").parent();l.find(".fileName").html(n).attr("title",n),l.attr("data-param",JSON.stringify({fileName:n,tarDir:t,tarName:e})),a.closeConfig()}else ErrTip(i.i18nMsg.title,i.i18nMsg.detail,i.msg)}}):(MsgTip("",common_js_lang["local.info.fileDir"],"info"),!1)},hiveBatchAct:function(){var a=this,e=$("#dbName option:selected"),t=e.val(),i=e.attr("data-catalog")||"",n=e.attr("data-schema")||"",l=globalParam.targetType==globalParam.commonLinkType.hive?0:1,o=globalParam.targetType==globalParam.commonLinkType.hive?"text":"orc",r=$(".lineNum").val();if(t){var s=a.listContainer.find(".target-item .isdb .check.cur"),d=s.length,c=[];$("#waitLoading").find("article").html("<p>"+common_js_lang["loading.info.batchConf"].replace(/\[x\]/,d)+'</p><p class="detail"></p>').end().css({display:"block"});var m=$.Deferred(),f={dbId:globalParam.connId,catalog:i,schema:n};$.when(globalParam.promiseFunc.getTables(f)).then(function(){var a=globalParam.tblModel["tbl_"+globalParam.connId+"_"+i+"_"+n],e='<option value="" disabled>'+common_js_lang["local.option.setTbl"]+"</option>";a.map(function(a){e+='<option data-name="'+a.name+'">'+a.name+"</option>"}),$("#tableName").html(e).val("").select2({tags:!0}),m.resolve()}).fail(function(){m.reject(),$("#waitLoading").hide()}),$.when(m).then(function(){for(var e=0;e<d;e++){var m=s.eq(e).parents("tr"),f=JSON.parse(m.attr("data-sourceparam")),g=m.attr("data-tbl");c[e]=$.Deferred(),g.match(/^[0-9A-Za-z]\w*$/g)?function(a,e,t){$.when(globalParam.promiseFunc.getDdl(a,2)).then(function(i){if(i.mppTable&&globalParam.targetType==globalParam.commonLinkType.hive)return e.reject(),void MsgTip("info",common_js_lang["db.tip.hivexspark"]);if(!i.mppTable&&globalParam.targetType==globalParam.commonLinkType.spark)return e.reject(),void MsgTip("info",common_js_lang["db.tip.sparkxhive"]);var n={text:"0",orc:"1",parquet:"2",rcfile:"3",sequencefile:"4"}[i.format]||0;a.tableType=n,i.isShow?a.ddl=i.ddl:a.createSql=i.ddl,a.dataRowIndex=a.lineNum-1,t.attr("data-param",JSON.stringify(a)),t.find(".db").html(a.name),t.find(".tbl").attr("title",a.tableName).html(a.tableName),t.find(".check.cur").click(),e.resolve()}).fail(function(){e.reject()})}({dbId:globalParam.connId,name:t,catalog:i,schema:n,tableName:g,tableType:l,format:o,sourceparam:f,lineNum:r},c[e],m):(m.attr("data-param",JSON.stringify({dbId:globalParam.connId,name:t,catalog:i,schema:n,tableName:"",tableType:l,dataRowIndex:r-1})),m.find(".tbl").attr("title","").html(""),c[e].resolve())}$.when.apply($,c).then(function(){$("#waitLoading").hide(),a.closeConfig()}).fail(function(){$("#waitLoading").hide()})})}else MsgTip("info",common_js_lang["client.info.noDb"])},hiveSingleAct:function(){var a=this.saveHiveParam();if(a){var e=this.listContainer.find(".config.active").parent();e.find(".db").html(a.name).attr("title",a.name),e.find(".tbl").html(a.tableName).attr("title",a.tableName),e.attr("data-param",JSON.stringify(a)),this.closeConfig()}},saveHiveParam:function(){var a=this.configContainer.find("#dbName option:selected"),e=a.val(),t=a.attr("data-catalog")||"",i=a.attr("data-schema")||"",n=this.configContainer.find("#tableName").val(),l=this.configContainer.find(".tableType").val(),o=this.savePart(),r=$(".lineNum").val()-1,s=editor.doc.getValue();if([e,n,s].indexOf("")>-1)return MsgTip("",common_js_lang["local.info.tblErr"],"info"),!1;var d="",c="";if(editor.doc.cm.isReadOnly())d=s;else{c=s,s=(s=s.substring(s.indexOf("TABLE")+"TABLE".length,s.indexOf("(")).trim()).replace(/\"|\'|`|\[|\]/g,"");try{var m=s.split(".");if(m[0]!=e||m[1]!=n)return MsgTip("",common_js_lang["db.info.sqlErr"],"info"),!1}catch(a){return MsgTip("",common_js_lang["db.info.sqlErr"],"info"),!1}}var f={dbId:globalParam.connId,name:e,catalog:t,schema:i,tableName:n,tableType:l,dataRowIndex:r,ddl:d,createSql:c};return o&&(f.partition=JSON.stringify(o)),f},savePart:function(){var a=this.configContainer.find("#partitions .filedVal"),e={};if(a.length<=0)return"";for(var t=0,i=a.length;t<i;t++)e[a.eq(t).attr("data-type")]=a.eq(t).val().trim();return e},closeConfig:function(){this.configContainer.hide(),this.mask.hide(),this.listContainer.find(".config.active").removeClass("active")}},new configParam,$("button.upload").on("click",function(){var a={jobName:($(".taskName").val()||"").trim(),note:($(".taskDes").val()||"").trim(),pid:$("#userApp").val()||0,toId:globalParam.connId,fromJson:[],toHiveJson:[],toHdfsJson:[]};a.toType=[8,9,13][+globalParam.targetType-1];var e=$('.target-item tr:not(".target-path")'),t=e.length;if($(".target-item .config").length<=0)MsgTip("",common_js_lang["db.info.confTar"],"info");else{$(this).prop("disabled",!0);for(var i=[],n=[],l=$.Deferred(),o=$.Deferred(),r=0;r<t;r++){var s=JSON.parse(e.eq(r).attr("data-param")),d=JSON.parse(e.eq(r).attr("data-sourceparam"));if(globalParam.targetType==globalParam.commonLinkType.hdfs){if(!s.tarDir||!s.tarName)return MsgTip("info",common_js_lang["local.info.hdfsParam"].replace(/\[x\]/,"["+(r+1)+"]")),void $(".upload.btn-item").prop("disabled",!1);a.fromJson.push(d),a.toHdfsJson.push({fileName:s.fileName,hid:globalParam.connId})}else{if(!s.name||!s.tableName)return MsgTip("info",common_js_lang["local.info.hiveParam"]),void $(".upload.btn-item").prop("disabled",!1);d.dataRowIndex=s.dataRowIndex;var c=e.eq(r).attr("data-index");if(d.fileIndex=c,a.fromJson.push(d),a.toHiveJson.push(s),s.createSql&&n.push({catalog:s.catalog,schema:s.schema,tableName:s.tableName,ddl:s.createSql,index:r}),s.ddl&&!s.partition){var m=globalParam.partitionsData["catalog"+s.catalog+"_schema"+s.schema+"_"+s.tableName];if(m&&m.length>0)return MsgTip("",common_js_lang["db.text.tbl"]+"["+s.tableName+"] "+common_js_lang["local.info.hiveParam"]+"\n","info"),!1;m||i.push(s)}}}i.length>=1?($("#waitLoading").find("article").html("<p>"+common_js_lang["db.text.checkWait"]+'</p><p class="detail"></p>').end().css({display:"block"}),$.when(globalParam.promiseFunc.batchPartCheck({dbId:globalParam.connId,pid:$("#userApp").val(),tablesJsonStr:JSON.stringify(i)})).then(function(){l.resolve()}).fail(function(){l.reject()})):l.resolve(),$.when(l).then(function(){function t(){if(c>=m)return i?(o.reject(),$("#waitLoading").css({display:"none"}),void ErrTip(r,l,common_js_lang["loading.info.newInfo"].replace(/\[x\]/,s).replace(/\[y\]/,d)+"\n"+i)):void o.resolve();var f=n.slice(c,c+100),g=c+100<=m?100:m-c;$.ajax({url:"db/table/create/batch",type:"post",data:{dbId:globalParam.connId,pid:$("#userApp").val(),tablesJsonStr:JSON.stringify(f)},success:function(o){200!=o.code?(r||(r=o.i18nMsg.title),l||(l=o.i18nMsg.detail),i+=o.msg+"\n",d+=g):o.model.map(function(t,o){var m=n[o+c].index;if(200!=t.code)return d++,r||(r=t.i18nMsg.title),l||(l=t.i18nMsg.detail),void(i+="["+n[o+c].tableName+"]:"+t.msg+".\n");s++,a.toHiveJson[m].ddl=t.model.ddl,a.toHiveJson[m].createSql="",a.toHiveJson[m].tableName=t.model.tableName,a.toHiveJson[m].catalog=t.model.catalog,a.toHiveJson[m].schema=t.model.schema,e.eq(m).attr("data-param",JSON.stringify(a.toHiveJson[m]))}),c+=100,$("#waitLoading").find("article .detail").html(common_js_lang["loading.info.newInfo"].replace(/\[x\]/,s).replace(/\[y\]/,d)),t()}})}if(n.length>=1){var i="",l="",r="",s=0,d=0,c=0,m=n.length;$("#waitLoading").find("article").html("<p>"+common_js_lang["loading.info.batchNew"].replace(/\[x\]/,m)+'</p><p class="detail"></p>').end().css({display:"block"}),t()}else o.resolve()}).fail(function(){o.reject()}),$.when(o).then(function(){if(globalParam.targetType!=globalParam.commonLinkType.hdfs){var e=paramTrans(a.fromJson,a.toHiveJson);a.fromJson=e.src,a.toHiveJson=e.tar}a.fromJson=JSON.stringify(a.fromJson),globalParam.targetType==globalParam.commonLinkType.hdfs?a.toHdfsJson=JSON.stringify(a.toHdfsJson):a.toHiveJson=JSON.stringify(a.toHiveJson),$.fn.ajaxAPI({url:"job/excel/save",type:"post",loadTime:0,data:a,contentType:"application/x-www-form-urlencoded",callback:function(a){window.onbeforeunload=function(){},location.href="./success"},complete:function(){$(".upload.btn-item").prop("disabled",!1)}})}).always(function(){$(".upload.btn-item").prop("disabled",!1),$("#waitLoading").css({display:"none"})})}});