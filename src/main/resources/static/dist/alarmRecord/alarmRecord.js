var vm=new Vue({el:".mainCon",data:{isLoading:!0,noData:'<img class="noData" src="resources/dist/images/noData.png">'+common_js_lang["manage.title.noData"],transColumn:[{title:common_js_lang["manage.title.taskId"],key:"jobId",ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:e.row.jobId,placement:"top"}},e.row.jobId)}},{title:common_js_lang["dbManage.text.taskName"],key:"jobName",ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:e.row.jobName,placement:"top"}},e.row.jobName)}},{title:common_js_lang["manage.title.inApp"],key:"projectName",ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:e.row.projectName,placement:"top"}},e.row.projectName)}},{title:common_js_lang["common.option.alarmSetting"],key:"alarmRule",ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:[common_js_lang["rule.option.taskFail"],"",common_js_lang["rule.option.clientOff"]][+e.row.alarmRule],placement:"top"}},[common_js_lang["rule.option.taskFail"],"",common_js_lang["rule.option.clientOff"]][+e.row.alarmRule])}},{title:common_js_lang["rule.option.alarmContent"],key:"alarmContent",className:"content",ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:e.row.alarmContent,placement:"top"}},e.row.alarmContent)}},{title:common_js_lang["rule.option.alarmUser"],key:"notifyUser",ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:e.row.notifyUser,placement:"top"}},e.row.notifyUser)}},{title:common_js_lang["alarm.option.createTime"],key:"createTime",width:155,ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:vm.time2str(e.row.createTime),placement:"top"}},vm.time2str(e.row.createTime))}}],clientColumn:[{title:common_js_lang["rule.option.ruleType"],key:"alarmType",ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:e.row.alarmType,placement:"top"}},e.row.alarmType)}},{title:common_js_lang["clientList.option.clientName"],key:"clientName",ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:e.row.clientName,placement:"top"}},e.row.clientName)}},{title:common_js_lang["manage.title.inApp"],key:"projectName",ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:e.row.projectName,placement:"top"}},e.row.projectName)}},{title:common_js_lang["manage.title.taskId"],key:"jobId",ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:e.row.jobId,placement:"top"}},e.row.jobId)}},{title:common_js_lang["common.option.alarmSetting"],key:"alarmRule",ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:[common_js_lang["rule.option.taskFail"],"",common_js_lang["rule.option.clientOff"]][+e.row.alarmRule],placement:"top"}},[common_js_lang["rule.option.taskFail"],"",common_js_lang["rule.option.clientOff"]][+e.row.alarmRule])}},{title:common_js_lang["rule.option.alarmContent"],key:"alarmContent",className:"content",width:140,ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:e.row.alarmContent,placement:"top"}},e.row.alarmContent)}},{title:common_js_lang["rule.option.alarmUser"],key:"notifyUser",ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:e.row.notifyUser,placement:"top"}},e.row.notifyUser)}},{title:common_js_lang["alarm.option.createTime"],key:"createTime",width:155,ellipsis:!0,render:function(t,e){return t("Tooltip",{props:{content:vm.time2str(e.row.createTime),placement:"top"}},vm.time2str(e.row.createTime))}}],transList:[],clientList:[],transType:"1",transWord:"",clientType:"2",activeName:"0",clientListGot:!1,transListGot:!1,transParam:{jobType:0,pageNo:1,pageSize:10},clientParam:{jobType:1,pageNo:1,pageSize:10},transPager:{total:0,current:0},clientPager:{total:0,current:0}},created:function(){for(var t={},e=location.search.replace(/^\?|\?$/g,"").split("&"),n=0,o=e.length;n<o;n++){var a=e[n].split("=");t[a[0]]=a[1]||""}"0"==t.activeName?(this.transParam.ruleId=t.id,this.getTransList()):"1"==t.activeName?(this.getTransList(),this.clientParam.ruleId=t.id,this.listChange("1")):this.getTransList()},methods:{typeChange:function(){this.transWord=""},time2str:function(t){var e=new Date(t),n={y:e.getFullYear(),M:e.getMonth()+1,d:e.getDate(),h:e.getHours(),m:e.getMinutes(),s:e.getSeconds()};for(var o in n)"y"!==o&&+n[o]<10&&(n[o]="0"+n[o]);return n.y+"-"+n.M+"-"+n.d+" "+n.h+":"+n.m+":"+n.s},getaAlarmList:function(t){return $.get("alarm/history/list",t)},listChange:function(t){this.activeName=t,"1"!=t||this.clientListGot||this.getClientList()},getTransList:function(){var t=this;this.isLoading=!0,this.getaAlarmList(this.transParam).then(function(e){200==e.code?(t.transListGot=!0,t.transList=e.model.data,t.transPager.total=e.model.totalCount||0,t.transPager.current=e.model.currentPage||0):ErrTip(e.i18nMsg.title,e.i18nMsg.detail,e.msg)}).always(function(){t.isLoading=!1})},getClientList:function(){var t=this;this.isLoading=!0,this.getaAlarmList(this.clientParam).then(function(e){200==e.code?(t.clientListGot=!0,t.clientList=e.model.data,t.clientList.total=e.model.totalCount||0,t.clientList.current=e.model.currentPage||0):ErrTip(e.i18nMsg.title,e.i18nMsg.detail,e.msg)}).always(function(){t.isLoading=!1})},transSearch:function(){if(""==this.transWord.trim())delete this.transParam.jobName,delete this.transParam.jobId;else if("1"==this.transType){if(!this.transWord.trim().match(/^\d+$/))return void MsgTip("info",common_js_lang["manage.info.taskIdInfo"]);delete this.transParam.jobName,this.transWord=+this.transWord.trim(),this.transParam.jobId=this.transWord}else delete this.transParam.jobId,this.transParam.jobName=this.transWord.trim();delete this.transParam.ruleId,this.transParam.pageNo=1,this.getTransList()},clientTypeChange:function(){"2"==this.clientType?delete this.clientParam.alarmType:this.clientParam.alarmType=this.clientType,delete this.transParam.ruleId,this.clientParam.pageNo=1,this.getClientList()},pagerChange:function(t){"0"==this.activeName?(this.transParam.pageNo=t,this.getTransList()):(this.clientParam.pageNo=t,this.getClientList())}}});