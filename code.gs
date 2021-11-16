
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

function findHeading1() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  // Define the search parameters.
  var num = body.getNumChildren();
  for( var i=0;i<num; i++) {
    var el = body.getChild(i);
    var thetype = el.getType();
    Logger.log('type: %s', el);
    if (thetype == "PARAGRAPH"){
      txt = el.asParagraph().getText();
      if (txt == ""){continue}
      Logger.log('para txt %s', txt)
      if (el.asParagraph().getHeading() == heading1 || thetype == "PARAGRAPH" && el.asParagraph().getHeading() == heading2){
        sl = preso.appendSlide(mylayout); 
        shapes = sl.getShapes();
        shapes[0].getText().appendParagraph(el.asParagraph().getText());
      } else {
        var slides = preso.getSlides();
        var sl = slides[slides.length-1]
        shapes = sl.getShapes();
        shapes[1].getText().appendParagraph(el.getText());
        //var pars = shapes[1].getText().getParagraphs();
        //pars[pars.length-1].getRange().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.LEFT);
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
      //Logger.log('new text %s', pars[pars.length-1].getRange().asString())
    
      //var textRange = shapes[1].getText();
      //textRange.getListStyle().applyListPreset(SlidesApp.ListPreset.DIGIT_ALPHA_ROMAN);

      //var ptxt = el.asParagraph().editAsText()
      //var ff = ptxt.getFontFamily;
        //var stxt = shapes[1].editAsText();
        //stxt.FONT_FAMILY = ff;
    }
  }
}
