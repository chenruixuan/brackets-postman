define(function(require, exports, module){
    var CodeMirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror"),
        ThemeManager = brackets.getModule("view/ThemeManager"),
        ko = require('../vendor/knockout'),
        _ = require('../vendor/lodash'),
        codemirrorInstance = null,
        codemirrorConfig = {
            readOnly: false,
            mode: {
                name: "javascript",
                json: true
            },
            theme: ThemeManager.getCurrentTheme().name
        };

    function getValue(valueAccessor){
        return valueAccessor() || '';
    }

    ko.bindingHandlers.codeMirror = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel){
            //One instance of codemirror should be available
            if (!codemirrorInstance){
                codemirrorInstance = CodeMirror(function(elt){
                    element.parentNode.appendChild(elt);
                }, _.extend(codemirrorConfig, {
                    value: getValue(valueAccessor)
                }));
            }

            ko.utils.domNodeDisposal.addDisposeCallback(element, function(){
                //TODO: investigate how to and call codemirror disposer

                $(element.parentNode).find('.CodeMirror').remove();
                codemirrorInstance = null;
            });
        },
        update: function(element, valueAccessor){
            codemirrorInstance.doc.setValue(getValue(valueAccessor));
        }
    }
});
