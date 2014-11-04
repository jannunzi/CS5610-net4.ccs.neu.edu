$(function () {
    function init()
    {
        $(".add-btn").click(addBtnHandler);
        $(".save-btn").click(saveBtnHandler);
        $(".load-btn").click(loadBtnHandler);
        $(".clear-btn").click(clearBtnHandler);
        $("#loadPageDialog").dialog({
            autoOpen: false,
            modal: true,
            resizable: false,
            buttons: {
                "Load": function () {
                    $("#loadPageDialog").dialog("close");
                    loadPage();
                },
                "Cancel": function () { $("#loadPageDialog").dialog("close"); }
            },
            open: populatePageList
        });

    }

    function loadPage() {
        var objStr = localStorage.getItem("ide");
        if (objStr == null)
            return;
        var ide = JSON.parse(objStr);
        var pages = ide.pages;



        var pageName = $("#pageListSelector").val();
        console.log(pageName);

        var content = pages[pageName];
        console.log(content);

        renderObjectArray(content);
    }
    
    function populatePageList() {
        var objStr = localStorage.getItem("ide");
        console.log(objStr);
        if (objStr == null)
            return;

        var ide = JSON.parse(objStr);
        var pages = ide.pages;

        var pageListSelector = $("#pageListSelector");
        pageListSelector.empty();

        for (var p in pages) {
            console.log(p);
            var option = $("<option>").append(p);
            pageListSelector.append(option);
        }

    }

    init();

    function clearBtnHandler() {
        localStorage.clear();
    }

    function renderObjectArray(contentArray) {
        for (var c in contentArray) {
            var obj = contentArray[c];
            var elementType = obj.type;
            var dom = addElementForType(elementType);
            dom.css({
                top: obj.top,
                left: obj.left,
                width: obj.width,
                height: obj.height
            });
        }
    }

    function loadBtnHandler()
    {
        var objStr = localStorage.getItem("ide");
        console.log(objStr);

        $("#loadPageDialog").dialog("open");

    }

    function saveBtnHandler() {
        var elements = $(".ide");
        if (elements.length == 0)
            return;

        var pageName = prompt("Page Name");
        if (pageName == null || pageName == "")
            return;

        var objContent = [];

        elements.each(function (index, element)
        {
            element = $(element);

            var html = element.find(".content").html();

            var position = element.position();
            var top = position.top;
            var left = position.left;
            var width = element.outerWidth();
            var height = element.outerHeight();
            var type = null;

            obj = {
                html: html,
                top: top,
                left: left,
                width: width,
                height: height
            };


            if (element.hasClass("youTube"))
            {
                obj.type = "YOU_TUBE";
                obj.src = element.find(".content").attr("src");
            } else if (element.hasClass("h1")) {
                obj.type = "H1";
            } else if (element.hasClass("h2")) {
                obj.type = "H2";
            } else if (element.hasClass("h3")) {
                obj.type = "H3";
            } else if (element.hasClass("p")) {
                obj.type = "P";
            } else if (element.hasClass("div")) {
                obj.type = "DIV";
            } else if (element.hasClass("img")) {
                obj.type = "IMG";
                obj.src = element.find(".content").attr("src");
            }

            objContent.push(obj);
        });

        var ide = localStorage.getItem("ide");

        console.log(ide);

        if (ide == null) {
            ide = {};
            ide.pages = {};
        }
        else
        {
            ide = JSON.parse(ide);
        }
        ide.pages[pageName] = objContent;

        var objStr = JSON.stringify(ide);
        console.log(objStr);

        localStorage.setItem("ide", objStr);
    }

    function addBtnHandler()
    {
        var elementType = $(".element-type").val();
        console.log("Adding Element " + elementType);
        addElementForType(elementType);
    }

    function addElementForType(elementType)
    {
        var html = htmlTemplates[elementType];
        var dom = $(html)
            .css({ position: "absolute", top: 100, left: 100, width: 200, height: 100 })
            .click(elementClickHandler);
        $("body").append(dom);
        return dom;
    }

    function elementClickHandler() {
        var element = $(this);
        unselectAllElements(element);
        selectElement(element);
    }

    function unselectAllElements(element) {
        if (element.hasClass("selected"))
            return;

        $(".selected").find(".delete-btn").remove();
        $(".selected").find(".edit-btn").remove();

        $(".selected")
            .css("box-shadow", "0px 0px 0px #888888")
            .css("z-index", 0)
            .draggable("destroy")
            .resizable("destroy")
            .removeClass("selected");

    }

    function selectElement(element) {

        if (element.hasClass("selected"))
            return;

        var deleteBtnHtml = "<button class='delete-btn btn btn-danger'>X</button>";
        var $deleteBtn = $(deleteBtnHtml).click(deleteBtnHandler);

        var editBtnHtml = "<button class='edit-btn btn btn-warning'>...</button>";
        var $editBtn = $(editBtnHtml).click(editBtnHandler);

        element
            .addClass("selected")
            .css("box-shadow", "0px 0px 5px #888888")
            .css("z-index", 1)
            .draggable({ grid: [10, 10] })
            .resizable({ grid: [10, 10], handles: "n, e, s, w, ne, se, sw, nw" })
            .append($deleteBtn)
            .append($editBtn);
    }

    function deleteBtnHandler() {
        var btn = $(this);
        var parentElement = btn.parent();
        parentElement.remove();
    }

    function editBtnHandler() {
        var btn = $(this);
        var parentElement = btn.parent();
        console.log("Editing ");
        console.log(parentElement);
        if (parentElement.hasClass("img")) {
            var url = prompt("Provide Image URL");

            if(url != "" && url != null)
                parentElement.find("img").attr("src", url);
        } else if (parentElement.hasClass("youTube")) {
            var url = prompt("Provide YouTube URL");

            if (url != "" && url != null) {
                var parts = url.split("/");
                var part = parts[parts.length - 1];
                var src = "//www.youtube.com/embed/" + part;
                parentElement.find("iframe").attr("src", src);
            }


        }
    }

    var htmlTemplates = {
        "H1": "<div class='ide h1'><h1 contenteditable='true' class='content'>Heading 1</h1></div>",
        "H2": "<div class='ide h2'><h2 contenteditable='true' class='content'>Heading 2</h2></div>",
        "H3": "<div class='ide h3'><h3 contenteditable='true' class='content'>Heading 3</h3></div>",
        "P": "<div class='ide p'><p contenteditable='true' class='content'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></div>",
        "DIV": "<div class='ide div'><div contenteditable='true' class='content'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div></div>",
        "IMG": "<div class='ide img'><img class='content' width='100%' height='100%' src='http://img2.wikia.nocookie.net/__cb20090524204255/starwars/images/1/1a/R2d2.jpg'/></div>",
        "YOU_TUBE": '<div class="ide youTube" style="padding:10px"><iframe class="content" width="100%" height="100%" src="//www.youtube.com/embed/8ISgVguTI-M" frameborder="0" allowfullscreen></iframe></div>'
    };
});
