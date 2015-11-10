
var Img = function(srcUrl, imgDesc) {
   var url = url;
   var desc = imgDesc;
   var tags = [];
   var path = "klxns/";
   static var defDelDate = "never";
   var delDate = defDelDate;

   this.addTag = function(tag) {
      tags.append(tag);
   }

   this.changeDesc = function(newDesc) {
      this.desc = newDesc;
   }

   this.changePath = function(newPath) {
      this.path = newPath;
   }

   this.changeDeleteDate = function(newDelDate) {
      this.delDate = newDelDate;
   }

   this.changeDefDelDate = function(newDefDelDate) {
      defDelDate = newDefDelDate;
   }
}
