/**
 * Placeholder test - checks that an attribute or the content of an
 * element itself is not a placeholder (i.e. "click here" for links).
 */
quail.components.placeholder = function(quail, test, Case, options) {

  var resolve = function (element, resolution) {
    test.add(Case({
      element: element,
      expected: $(element).closest('.quail-test').data('expected'),
      status: resolution
    }));
  };

  test.get('$scope').find(options.options.selector).each(function() {
    var text = '';
    if (typeof options.options.attribute !== 'undefined') {
      if ((typeof $(this).attr(options.options.attribute) === 'undefined' ||
            (options.options.attribute === 'tabindex' &&
              $(this).attr(options.options.attribute) <= 0
            )
         ) &&
         !options.options.content
        ) {
        resolve(this, 'failed');
        return;
      }
      else {
        if ($(this).attr(options.options.attribute) && $(this).attr(options.options.attribute) !== 'undefined') {
          text += $(this).attr(options.options.attribute);
        }
      }
    }
    if (typeof options.options.attribute === 'undefined' ||
      !options.options.attribute ||
      options.options.content) {
      text += $(this).text();
      $(this).find('img[alt]').each(function() {
        text += $(this).attr('alt');
      });
    }
    if (typeof text === 'string' && text.length > 0) {
      text = quail.cleanString(text);
      var regex = /^([0-9]*)(k|kb|mb|k bytes|k byte)$/g;
      var regexResults = regex.exec(text.toLowerCase());
      if (regexResults && regexResults[0].length) {
        resolve(this, 'failed');
      }
      else if (options.options.empty && quail.isUnreadable(text)) {
        resolve(this, 'failed');
      }
      else if (quail.strings.placeholders.indexOf(text) > -1 ) {
        resolve(this, 'failed');
      }
      // It passes.
      else {
        resolve(this, 'passed');
      }
    }
    else {
      if (options.options.empty && typeof text !== 'number') {
        resolve(this, 'failed');
      }
    }
  });
};
