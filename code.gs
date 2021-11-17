function convert() {
  var heading1 = DocumentApp.ParagraphHeading.HEADING1;
  var heading2 = DocumentApp.ParagraphHeading.HEADING2;
  var mylayout = SlidesApp.PredefinedLayout.TITLE_AND_BODY;
  var txt;
  var el;//the doc elements inside body
  var doc = DocumentApp.getActiveDocument();
  var preso = SlidesApp.create(doc.getName());
  var slides;
  var sl;
  var shapes;
  var body = doc.getBody();
 
  // Set slides title
  preso.getSlides()[0].getShapes()[0].getText().appendText(doc.getName());

  for( var i=0; i<body.getNumChildren(); i++) {
    el = body.getChild(i);
    var thetype = el.getType();
    Logger.log('type %s', thetype)
    if (thetype == "PARAGRAPH"){
      if (el.asParagraph().getHeading() == heading1 || thetype == "PARAGRAPH" && el.asParagraph().getHeading() == heading2){
        sl = preso.appendSlide(mylayout); 
        shapes = sl.getShapes();
        shapes[0].getText().appendParagraph(el.asParagraph().getText());
        Logger.log('=== HEADER: %s', el.asParagraph().getText());
        continue;
      } else {// is para but not a heading  
        txt = el.asParagraph().getText();
        
        slides = preso.getSlides();
        sl = slides[slides.length-1]
        shapes = sl.getShapes();
        res = el.findElement(DocumentApp.ElementType.INLINE_IMAGE);
        if (res != null){
          Logger.log('************ INLINE IMAGE');
          shapes[1].replaceWithImage(res.getElement().asInlineImage());
          continue;
        } else {
          if (txt == ""){continue} //ignore empty paras 
          shapes[1].getText().appendParagraph(el.getText());
        }
      }
    } else if (thetype == "LIST_ITEM"){
            var nest = el.asListItem().getNestingLevel();
      //Logger.log('=========== nest: ' + nest);
      txt = el.asListItem().getText();
      if (txt == ""){continue} //ignore empty paras
      slides = preso.getSlides();
      sl = slides[slides.length-1]
      shapes = sl.getShapes();
      var pre = '';
      var txtrng = shapes[1].getText();
      
      var ftxt = pre + el.getText();
      if (txtrng.getLength() == 0){
        shapes[1].getText().appendParagraph(el.getText());
      } else {
        shapes[1].getText().appendParagraph(el.getText());
      }
      var pars = shapes[1].getText().getParagraphs();
      // don't know why this is not pars.length-1!
      pars[pars.length-2].getRange().getListStyle().applyListPreset(SlidesApp.ListPreset.DISC_CIRCLE_SQUARE);

      switch (nest){
       case 1:
        pars[pars.length-2].getRange().getTextStyle().setForegroundColor(255,0,0);
        pars[pars.length-2].getRange().getParagraphStyle().setIndentStart(50);//works, but glyph is not indented
        break;
       case 2:
        pars[pars.length-2].getRange().getTextStyle().setForegroundColor(0,255,0);
      }
    }
  }
}
