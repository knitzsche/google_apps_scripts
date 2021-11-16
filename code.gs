
var masterId = '1Lrnm1Ggd-WInKC5JUkyicKZrUT82cjgpK4Am03VHRCM';
var master = Slides.Presentations.get(masterId);
var masterSlides = master.slides;

var preso = SlidesApp.create('Presentation Name');

var heading1 = DocumentApp.ParagraphHeading.HEADING1;
var heading2 = DocumentApp.ParagraphHeading.HEADING2;
var mylayout = SlidesApp.PredefinedLayout.TITLE_AND_BODY;
var newSlideId ="";
var par;
var txt;
var el;//the doc elements inside body

function convert() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  // Define the search parameters.
  var num = body.getNumChildren();
  for( var i=0;i<num; i++) {
    el = body.getChild(i);
    var thetype = el.getType();
    if (thetype == "PARAGRAPH"){
      txt = el.asParagraph().getText();
      if (txt == ""){continue}
        if (el.asParagraph().getHeading() == heading1 || thetype == "PARAGRAPH" && el.asParagraph().getHeading() == heading2){
        sl = preso.appendSlide(mylayout); 
        shapes = sl.getShapes();
        shapes[0].getText().appendParagraph(el.asParagraph().getText());
      } else {// is para but not a heading
        var slides = preso.getSlides();
        var sl = slides[slides.length-1]
        shapes = sl.getShapes();
        shapes[1].getText().appendParagraph(el.getText());
      }
    } else if (thetype == "LIST_ITEM"){
      txt = el.asListItem().getText();
      if (txt == ""){continue}
      var slides = preso.getSlides();
      var sl = slides[slides.length-1]
      shapes = sl.getShapes();
      
      shapes[1].getText().appendText(el.getText()+'\n');
      var pars = shapes[1].getText().getParagraphs();
      // don't know why this is not pars.length-1!
      pars[pars.length-2].getRange().getListStyle().applyListPreset(SlidesApp.ListPreset.DISC_CIRCLE_SQUARE);

    }
  }
}
