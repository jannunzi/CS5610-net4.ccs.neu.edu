$(function () {
    function init()
    {
//        localStorage.clear();
        $(".add-btn").click(addBtnHandler);
        $(".save-btn").click(saveBtnHandler);
        $(".load-btn").click(openBtnHandler);
        $("#loadDialog").dialog({
            autoOpen: false,
            resizable: false,
            modal: true,
            open : loadSavedPages,
            buttons: {
                "Load": function () {
                    var selectedPage = $("#list-of-saved-pages").val();
                    loadPage(selectedPage);
                    console.log(selectedPage);
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    }
    
    init();

    function loadPage(pageName) {
        var ide = localStorage.getItem("ide");
        ide = JSON.parse(ide);
        console.log(ide);
        if (typeof ide == "undefined" || ide == null) {
            return;
        }
        var pages = ide.pages;
        for (var p in pages) {
            if (p == pageName) {
                pageContent = pages[p];
                $(".ide").remove();
                console.log(pageContent);
            }
        }
    }

    function loadSavedPages() {
        var ide = localStorage.getItem("ide");
        ide = JSON.parse(ide);
        console.log(ide);
        if (typeof ide == "undefined" || ide == null) {
            return;
        }
        var pages = ide.pages;
        var select = $("#list-of-saved-pages");
        select.empty();
        for (var p in pages) {
            var option = $("<option>");
            option.append(p);
            select.append(option);
        }
    }
    function openBtnHandler()
    {
        $("#loadDialog").dialog("open");
    }

    function saveBtnHandler()
    {
        var elements = $(".ide");
        if (elements.length == 0)
            return;

        var pageName = prompt("Page Name");
        if (pageName == null || pageName == "")
            return;

        var contents = [];

        elements.each(function (index, element) {
            element = $(element);

            var width = element.width();
            var height = element.height();
            var pos = element.position();
            var top = pos.top;
            var left = pos.left;
            var html = element.html();
            var content = {};
            if (element.hasClass("youTube")) {
                var src = element.find("iframe").attr("src");
                content.type = 'youTube';
                content.src = src;
                html = "";
                width  += 20;
                height += 20;
            } else if (element.hasClass("h1")) {
                content.type = 'h1';
            } else if (element.hasClass("h2")) {
                content.type = 'h2';
            } else if (element.hasClass("h3")) {
                content.type = 'h3';
            } else if (element.hasClass("p")) {
                content.type = 'p';
            } else if (element.hasClass("div")) {
                content.type = 'div';
            } else if (element.hasClass("img")) {
                html = "";
                content.type = 'img';
                content.src = element.find("img").attr("src");
            }
            content.html = html;
            content.width = width;
            content.height = height;
            content.top = top;
            content.left = left;
            contents.push(content);
        });

        var ide = localStorage.getItem("ide");
        if (typeof ide == "undefined" || ide == null) {
            ide = {};
        }
        ide = JSON.parse(ide);
        if (ide.pages == null || typeof ide.pages == "undefined") {
            ide.pages = {};
        }
        ide.pages[pageName] = contents;
        localStorage.setItem("ide", JSON.stringify(ide));
    }

    function addBtnHandler()
    {
        var elementType = $(".element-type").val();
        console.log("Adding Element " + elementType);
        var html = htmlTemplates[elementType];
        var dom = $(html)
            .css({ position: "absolute", top: 100, left: 100, width: 200, height: 100 })
            .click(elementClickHandler);
            //.draggable({ grid: [10, 10] })
            //.resizable({ grid: [10, 10] });
        $("body").append(dom);
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
            .draggable("destroy")
            .resizable("destroy")
            .removeClass("selected")
            .css("z-index", 0);

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
            .draggable({ grid: [10, 10] })
            .resizable({ grid: [10, 10], handles: "n, e, w, s, ne, nw, se, sw" })
            .append($deleteBtn)
            .append($editBtn)
            .css("z-index", 1);
    }

    function deleteBtnHandler() {
        var btn = $(this);
        var parentElement = btn.parent();
        parentElement.remove();
    }

    function editBtnHandler() {
        var btn = $(this);
        var parentElement = btn.parent();
        if (parentElement.hasClass("img")) {
            var url = prompt("Provide Image URL");
            if (url == null || url == "") return;
            parentElement.find("img").attr("src", url);
        } else if (parentElement.hasClass("youTube")) {
            var url = prompt("Provide YouTube IFrame");
            if (url == null || url == "") return;
            url = url.split("/");
            url = "//www.youtube.com/embed/" + url[url.length - 1];
            parentElement.find("iframe").attr("src", url);
        }
    }

    var htmlTemplates = {
        "H1": "<h1 contenteditable='true' class='ide h1'>Heading 1</h1>",
        "H2": "<h2 contenteditable='true' class='ide h2'>Heading 2</h2>",
        "H3": "<h3 contenteditable='true' class='ide h3'>Heading 3</h3>",
        "P": "<p contenteditable='true' class='ide p'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>",
        "DIV": "<div contenteditable='true' class='ide div'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>",
        "IMG": "<div class='ide img'><img width='100%' height='100%' src='http://img2.wikia.nocookie.net/__cb20090524204255/starwars/images/1/1a/R2d2.jpg'/></div>",
    //  "YOU_TUBE": "<div class='ide youTube' style='padding:10px'><iframe width='100%' height='100%' src='//www.youtube.com/embed/EwTul9-HGu8' frameborder='0' allowfullscreen></iframe></div>"
        "YOU_TUBE": "<div class='ide youTube' style='padding:10px'><iframe width='100%' height='100%' src='//www.youtube.com/embed/SZqZSYGLk3Y' frameborder='0' allowfullscreen></iframe></div>"
    };
});
