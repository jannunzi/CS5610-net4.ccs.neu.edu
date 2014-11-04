<%@ Page Language="C#" AutoEventWireup="true" CodeFile="search.aspx.cs" Inherits="experiments_db_donations_search" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../css/bootstrap.css" rel="stylesheet" />
</head>
<body>

    <div class="container">
    <form action="search.aspx">
        Continent: <input name="continent" class="form-control" />
        <button class="btn btn-block btn-primary">Search</button>
    </form>

    <form id="form1" runat="server">
        <h1>Search</h1>
        <p>

            <asp:GridView CssClass="table" ID="GridView1" runat="server" AllowPaging="True" AllowSorting="True" AutoGenerateColumns="False" DataKeyNames="Id" DataSourceID="SqlDataSource1" EmptyDataText="There are no data records to display.">
                <Columns>
                    <asp:BoundField DataField="Id" HeaderText="Id" ReadOnly="True" SortExpression="Id" />
                    <asp:BoundField DataField="firstName" HeaderText="firstName" SortExpression="firstName" />
                    <asp:BoundField DataField="lastName" HeaderText="lastName" SortExpression="lastName" />
                    <asp:BoundField DataField="country" HeaderText="country" SortExpression="country" />
                    <asp:BoundField DataField="continent" HeaderText="continent" SortExpression="continent" />
                    <asp:BoundField DataField="sponsoredId" HeaderText="sponsoredId" SortExpression="sponsoredId" />
                </Columns>
            </asp:GridView>
            <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:CS5610_LecturesConnectionString1 %>" DeleteCommand="DELETE FROM [Sponsored] WHERE [Id] = @Id" InsertCommand="INSERT INTO [Sponsored] ([firstName], [lastName], [country], [continent], [sponsoredId]) VALUES (@firstName, @lastName, @country, @continent, @sponsoredId)" ProviderName="<%$ ConnectionStrings:CS5610_LecturesConnectionString1.ProviderName %>" SelectCommand="SELECT [Id], [firstName], [lastName], [country], [continent], [sponsoredId] FROM [Sponsored] WHERE continent=@continent" UpdateCommand="UPDATE [Sponsored] SET [firstName] = @firstName, [lastName] = @lastName, [country] = @country, [continent] = @continent, [sponsoredId] = @sponsoredId WHERE [Id] = @Id">
                <DeleteParameters>
                    <asp:Parameter Name="Id" Type="Int32" />
                </DeleteParameters>
                <InsertParameters>
                    <asp:Parameter Name="firstName" Type="String" />
                    <asp:Parameter Name="lastName" Type="String" />
                    <asp:Parameter Name="country" Type="String" />
                    <asp:Parameter Name="continent" Type="String" />
                    <asp:Parameter Name="sponsoredId" Type="Int32" />
                </InsertParameters>
                <UpdateParameters>
                    <asp:Parameter Name="firstName" Type="String" />
                    <asp:Parameter Name="lastName" Type="String" />
                    <asp:Parameter Name="country" Type="String" />
                    <asp:Parameter Name="continent" Type="String" />
                    <asp:Parameter Name="sponsoredId" Type="Int32" />
                    <asp:Parameter Name="Id" Type="Int32" />
                </UpdateParameters>
                <SelectParameters>
                    <asp:QueryStringParameter Name="continent" Type="String" QueryStringField="continent" />
                </SelectParameters>
            </asp:SqlDataSource>

        </p>
    </form>
    </div>
</body>
</html>
