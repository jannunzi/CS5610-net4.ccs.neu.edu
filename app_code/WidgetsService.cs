using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WidgetsService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WidgetsService : System.Web.Services.WebService {

    List<Widget> widgets;

    public WidgetsService () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 

        widgets = new List<Widget>();

        Widget w1 = new Widget(123, "H1 HTML", 100, 200, 300, 400, "H1");
        Widget w2 = new Widget(234, "DIV HTML", 100, 200, 300, 400, "DIV");
        Widget w3 = new Widget(345, "P HTML", 100, 200, 300, 400, "P");
        Widget w4 = new Widget(456, "YOU TUBE HTML", 100, 200, 300, 400, "YOU_TUBE");

        widgets.Add(w1);
        widgets.Add(w2);
        widgets.Add(w3);
        widgets.Add(w4);
    }

    [WebMethod]
    public string HelloWorld() {
        return "Hello World !!!!";
    }

    [WebMethod]
    [System.Web.Script.Services.ScriptMethod(UseHttpGet=true)]
    public Widget getSomeWidget()
    {
        Widget w1 = new Widget(123, "HTML", 100, 200, 300, 400, "H1");
        return w1;
    }

    [WebMethod]
    [System.Web.Script.Services.ScriptMethod(UseHttpGet = true)]
    public List<Widget> getAllWidgets()
    {
        return widgets;
    }

    [WebMethod]
    [System.Web.Script.Services.ScriptMethod(UseHttpGet = true)]
    public Widget getWidgetById(int id)
    {
        foreach (Widget w in widgets)
        {
            if (w.id == id)
            {
                return w;
            }
        }
        return null;
    }
}
