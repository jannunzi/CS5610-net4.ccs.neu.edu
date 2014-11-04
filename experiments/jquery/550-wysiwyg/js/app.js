$(function () {
    function init()
    {
        $(".add-btn").click(addBtnHandler);
        $(".save-btn").click(saveBtnHandler);
    }
    
    init();

    function saveBtnHandler() {
        var elements = $(".ide");
        console.log(elements);
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
            .draggable({ grid: [10, 10] })
            .resizable({ grid: [10, 10] })
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
            parentElement.find("img").attr("src", url);
        }
    }

    var htmlTemplates = {
        "H1": "<h1 class='ide h1'>Heading 1</h1>",
        "H2": "<h2 class='ide h2'>Heading 2</h2>",
        "H3": "<h3 class='ide h3'>Heading 3</h3>",
        "P": "<p contenteditable='true' class='ide p'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>",
        "DIV": "<div contenteditable='true' class='ide div'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>",
        "IMG": "<div class='ide img'><img width='100%' height='100%' src='http://img2.wikia.nocookie.net/__cb20090524204255/starwars/images/1/1a/R2d2.jpg'/></div>"
    };
});
