var frogs=require("model/frogs"),Model=new(require("model/index")),flippableView=require("de.manumaticx.androidflip");module.exports=function(){var e=Ti.UI.createWindow({title:"Froschzähler",fullScreen:!0}),t=frogs.map(function(e){var t=Ti.UI.createView(),i=Ti.UI.createScrollView({backgroundColor:"black",scrollType:"vertical",layout:"vertical",bubbleParent:!1});return t.add(i),e.images.forEach(function(e){i.add(Ti.UI.createImageView({top:0,image:"/assets/"+e,width:Ti.UI.FILL,height:"auto"}))}),t.animalname=Ti.UI.createLabel({top:10,left:10,color:"#6f7",opacity:.7,zIndex:999,font:{fontWeight:"bold",fontSize:36},text:e.name}),t.latinname=Ti.UI.createLabel({top:50,left:10,zIndex:999,color:"#6f7",opacity:.7,font:{fontWeight:"bold",fontSize:20,fontStyle:"cursive"},text:e.latin||""}),t.add(t.animalname),t.add(t.latinname),t.counter=Ti.UI.createLabel({top:-20,right:10,zIndex:999,height:120,color:"#DF8F00",opacity:1,font:{fontWeight:"bold",fontSize:96},text:""}),t.add(t.counter),t});return e.scrollableView=flippableView.createFlipView({views:t}),e.add(e.scrollableView),e.button=Ti.UI.createButton({backgroundImage:"/assets/counter.png",width:200,height:160,bottom:10,opacity:.6}),e.add(e.button),e.button.animate({opacity:.6}),e.add(Ti.UI.createView({top:0,height:90,touchEnabled:!1,backgroundColor:"#4000"})),e.scrollableView.addEventListener("flipped",function(i){t[i.index].children[0].children[0].animate({opacity:1,duration:100}),e.button.animate({opacity:.6})}),e.scrollableView.peakNext(!0),e.button.addEventListener("touchstart",function(){if(!Model.getId())return void Ti.UI.createNotification({message:"Um Amphibien zählen zu können, musst Du rechts oben auf den Zähler klicken und eine Zählung mit „+“ anlegen.",duration:1e4}).show();e.button.backgroundImage="/assets/counter_.png",setTimeout(function(){e.button.backgroundImage="/assets/counter.png"},50);var i=Model.incrementCounter(frogs[e.scrollableView.currentPage].name);t[e.scrollableView.currentPage].counter.text=i}),e.addEventListener("open",require("ui/actionbar")),require("vendor/versionsreminder")(),e};