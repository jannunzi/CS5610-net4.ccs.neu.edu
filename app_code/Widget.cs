using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Widget
/// </summary>
public class Widget
{
    public int id { set; get; }
    public string html { set; get; }
    public int top { set; get; }
    public int left { set; get; }
    public int width { set; get; }
    public int height { set; get; }
    public string type { set; get; }
    public Widget(int id, string html, int top, int left, int width, int height, string type)
    {
        this.id = id;
        this.height = height;
        this.width = width;
        this.html = html;
        this.top = top;
        this.left = left;
        this.type = type;
    }
	public Widget()
	{
		//
		// TODO: Add constructor logic here
		//
	}
}