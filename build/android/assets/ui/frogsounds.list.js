var FrogSounds=require("model/frogsounds.adapter");module.exports=function(e){console.log(e);var t=Ti.UI.createView();return t.add(Ti.UI.createLabel({text:e,color:"green",font:{fontSize:30,fontWeight:"bold"}})),Ti.UI.createListView({sections:[Ti.UI.createListSection({items:FrogSounds.getRecordsBySpecies(e).map(function(e){return{properties:{itemId:JSON.stringify(e),accessoryType:Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE},description:{text:e.description},author:{text:"Autor: "+e.author},ctime:{text:"Aufnahme: "+e.cdate+" "+e.ctime}}})})],templates:{template:require("TEMPLATES").frogsounds},defaultItemTemplate:"template",headerView:t})},$.add($.scrollableView);