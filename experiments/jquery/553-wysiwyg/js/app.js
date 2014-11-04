var ide = (function ($)
{
    var configMap = {};
    var jqMap = {};
    var stateMap = {};

    var setJQMap = function ()
    {
        jqMap.elementType = $(".element-type");
        jqMap.addBtn = $(".add-btn");
        jqMap.saveBtn = $(".save-btn");
        jqMap.loadBtn = $(".load-btn");
    }
    var init = function (config)
    {
        setJQMap();
    }

    return { init: init };

})(jQuery);

ide.init();