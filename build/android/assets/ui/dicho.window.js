var Model=new(require("model/index")),Dicho=require("model/dichotomy.adapter"),АктйонБар=require("com.alcoapps.actionbarextras");module.exports=function(e){var t=Ti.UI.createWindow({fullScreen:!0,title:"Bestimmung"}),i=Dicho.getDecision(e);t.setTitle(i.title),t.list=Ti.UI.createTableView(),t.add(t.list);var o=i.questions.map(function(e,t){var i=Ti.UI.createTableViewRow({height:Ti.UI.SIZE,hasChild:!0,itemId:e.id,wiki:e.wiki});return i.add(Ti.UI.createLabel({text:t+1,left:10,top:5,color:"#6f7",opacity:.7,font:{fontSize:36,fontWeight:"bold"}})),i.add(Ti.UI.createView({top:10,right:10,bottom:10,left:60,layout:"vertical"})),i.children[1].add(Ti.UI.createLabel({left:0,textAlign:"left",text:e.questiontext,font:{fontSize:18}})),e.images.length&&i.children[1].add(Ti.UI.createImageView({left:0,top:10,image:e.images[0],width:Ti.UI.FILL,height:"auto",defaultImage:"/assets/default.png"})),e.description&&i.children[1].add(Ti.UI.createLabel({left:0,textAlign:"left",text:e.description,font:{fontSize:14}})),i});return t.list.setData(o),t.list.addEventListener("click",function(e){e.row.itemId?require("ui/dicho.window")(e.row.itemId).open():e.row.wiki&&require("ui/wiki.window")({wiki:e.row.wiki}).open()}),t.addEventListener("open",function(e){АктйонБар.setTitle("Bestimmungsschlüssel"),АктйонБар.setSubtitle(i.title),e.source.getActivity().actionBar.displayHomeAsUp=!0;var t=e.source.getActivity();t.actionBar.onHomeIconItemSelected=function(){e.source.close()},t.onCreateOptionsMenu=function(e){e.menu.add({title:"Sound-DB",itemId:2,icon:Ti.App.Android.R.drawable.ic_action_frog,showAsAction:Ti.Android.SHOW_AS_ACTION_IF_ROOM}).addEventListener("click",function(){require("ui/sound.window")().open()})}}),t};