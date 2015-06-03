function FieldAuditor(opts){
    var self = this;
    //Form that has inputs to track in it; will also be where the tracking inputs will be appended
    self.formName = opts["formName"];
    if (!self.formName) { throw "FieldAuditor: formName option must be specified"; }
    //Selector to determine what types of inputs to track
    self.inputSelector = opts["inputSelector"] || "input[type='text'], input[type='checkbox'], input[type='radio'], select, textarea";
    //This is what the input(s) will be named that track changes
    self.changesName = opts["changesName"] || "changes[]";
    self.form = $(self.formName);

    self.affectedElements = self.form.find(self.inputSelector);
    self.affectedElements.each(function(){
        $(this).attr('data-original', $(this).val());
    });
    self.affectedElements.on("change", function(){
        var changeId = $(this).attr("id") + "_change";
        $(changeId).remove();
        var changeVal = JSON.stringify({ "old_value" : $(this).attr("data-original"),
                                         "new_value" : $(this).val(),
                                         "name" : $(this).attr("name")
                                       });
        self.form.append("<input name='" + self.changesName + "' type='hidden' id='" + changeId + "' value='" + changeVal + "'>");
    });
}
