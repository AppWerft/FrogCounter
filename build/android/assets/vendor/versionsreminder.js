var versionCompare=function(e,t){var n,a,r,i=(""+e).split("."),s=(""+t).split("."),o=Math.min(i.length,s.length);for(r=0;o>r;r++)if(n=r?parseFloat("0."+i[r],10):parseInt(i[r],10),a=r?parseFloat("0."+s[r],10):parseInt(s[r],10),isNaN(n)&&(n=i[r]),isNaN(a)&&(a=s[r]),n!=a)return n>a?1:a>n?-1:NaN;return i.length===s.length?0:i.length<s.length?-1:1};module.exports=function(){var e=Ti.App.getVersion(),t=(arguments[0]||{},"https://play.google.com/store/apps/details?id="+Ti.App.getId()),n=Ti.Network.createHTTPClient({onerror:function(){console.log("Warning: no connection to playstore "+e)},onload:function(){var n=/itemprop="softwareVersion">(.*?)</m.exec(this.responseText);if(!n)return void console.log("Warning: no connection to playstore "+e);var a=n[1].replace(/\s+/g,"");switch(console.log("Store=["+a+"] app=["+Ti.App.getVersion()+"]"),versionCompare(Ti.App.getVersion(),a)){case-1:var r=Ti.UI.createAlertDialog({cancel:1,buttonNames:["Zum Playstore","Abbruch"],message:"Es gibt eine neue Version in Playstore.\n\nDiese App auf Deinem "+Ti.Platform.model+" ist in Version  "+Ti.App.getVersion()+"\n\nIm Playstore  gibt es schon  "+a+" und wartet auf Dich.\n\nWillst Du erneuern?",title:"Neue Froschzählerversion"});r.show(),r.addEventListener("click",function(e){e.index!=e.source.cancel&&Ti.Platform.openURL(t)});break;case 1:Ti.Android&&Ti.UI.createNotification({message:Ti.App.getName()+" ist neuer als neu … ("+Ti.App.getVersion()+")"}).show();break;case 0:break;default:console.log("Warning: versions compare has error")}}});n.open("GET",t),n.send()};