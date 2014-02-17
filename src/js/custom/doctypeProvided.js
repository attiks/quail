quail.doctypeProvided = function() {
  if(!document.doctype) {
    quail.testFails('doctypeProvided', $(document));
  }
};
