var frogs=[{name:"Erdkröte",images:["Erdkroete/0.jpg","Erdkroete/1.jpg","Erdkroete/2.jpg","Erdkroete/3.jpg","Erdkroete/4.jpg"],description:"ein Text ohne Sinn"},{name:"Grasfrosch",description:"ein Text ohne Sinn",images:["Grasfrosch/1.jpg","Grasfrosch/2.jpg","Grasfrosch/3.jpg","Grasfrosch/4.jpg"]},{name:"Teichmolch",images:["Teichmolch/1.jpg","Teichmolch/2.jpg","Teichmolch/3.jpg","Teichmolch/4.jpg"]},{name:"Fadenmolch",images:["Fadenmolch/0.jpg","Fadenmolch/1.jpg","Fadenmolch/2.jpg","Fadenmolch/4.jpg"]},{name:"Bergmolch",images:["Bergmolch/1.jpg","Bergmolch/2.jpg","Bergmolch/4.jpg","Bergmolch/5.jpg"]},{name:"Grünfrosch",images:["Gruenfrosch/1.jpg","Gruenfrosch/2.jpg","Gruenfrosch/3.jpg"]},{name:"Moorfrosch",images:["Moorfrosch/1.jpg","Moorfrosch/2.jpg","Moorfrosch/3.jpg"]},{name:"Springfrosch",images:["Springfrosch/1.jpg","Springfrosch/2.jpg","Springfrosch/3.jpg"]}],Model=new(require("model/index")),flippableView=require("de.manumaticx.androidflip");module.exports=function(){var e=Ti.UI.createWindow({title:"Froschzähler",fullScreen:!0}),t=frogs.map(function(e){var t=Ti.UI.createView(),i=Ti.UI.createScrollView({backgroundColor:"black",scrollType:"vertical",layout:"vertical",bubbleParent:!1});return t.add(i),e.images.forEach(function(e){i.add(Ti.UI.createImageView({top:0,image:"/assets/"+e,width:Ti.UI.FILL,height:"auto"}))}),t.animalname=Ti.UI.createLabel({top:10,left:10,color:"#6f7",opacity:.7,font:{fontWeight:"bold",fontSize:36},text:e.name}),t.add(t.animalname),t.counter=Ti.UI.createLabel({top:0,right:10,height:100,color:"#DF8F00",opacity:1,font:{fontWeight:"bold",fontSize:96},text:""}),t.add(t.counter),t});return e.scrollableView=flippableView.createFlipView({views:t}),e.add(e.scrollableView),e.button=Ti.UI.createButton({backgroundImage:"/assets/counter.png",width:200,height:160,bottom:10,opacity:.6}),e.add(e.button),e.button.animate({opacity:1}),e.scrollableView.addEventListener("flipped",function(i){t[i.index].children[0].children[0].animate({opacity:1,duration:100}),e.button.animate({opacity:.6})}),e.scrollableView.peakNext(!0),e.button.addEventListener("touchstart",function(){if(!Model.getId())return void Ti.UI.createNotification({message:"Um Amphibien zählen zu können, musst Du rechts oben auf den Zähler klicken und eine Zählung mit „+“ anlegen.",duration:1e4}).show();e.button.backgroundImage="/assets/counter_.png",setTimeout(function(){e.button.backgroundImage="/assets/counter.png"},50);var i=Model.incrementCounter(frogs[e.scrollableView.currentPage].name);t[e.scrollableView.currentPage].counter.text=i}),e.addEventListener("open",require("ui/actionbar")),require("vendor/versionsreminder")(),e};