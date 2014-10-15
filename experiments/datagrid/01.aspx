<%@ Page Language="C#" AutoEventWireup="true" CodeFile="01.aspx.cs" Inherits="experiments_datagrid_01" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="container">
    
        <h1>Persons</h1>

        <asp:GridView CssClass="table" ID="GridView1" runat="server" AllowPaging="True" AllowSorting="True" AutoGenerateColumns="False" DataKeyNames="Id" DataSourceID="SqlDataSource1" EmptyDataText="There are no data records to display.">
            <Columns>
                <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" ShowSelectButton="True" />
                <asp:BoundField DataField="Id" HeaderText="Id" ReadOnly="True" SortExpression="Id" />
                <asp:BoundField DataField="FirstName" HeaderText="FirstName" SortExpression="FirstName" />
                <asp:BoundField DataField="LastName" HeaderText="LastName" SortExpression="LastName" />
            </Columns>
        </asp:GridView>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:db123ConnectionString1 %>" DeleteCommand="DELETE FROM [Person] WHERE [Id] = @Id" InsertCommand="INSERT INTO [Person] ([FirstName], [LastName]) VALUES (@FirstName, @LastName)" ProviderName="<%$ ConnectionStrings:db123ConnectionString1.ProviderName %>" SelectCommand="SELECT [Id], [FirstName], [LastName] FROM [Person]" UpdateCommand="UPDATE [Person] SET [FirstName] = @FirstName, [LastName] = @LastName WHERE [Id] = @Id">
            <DeleteParameters>
                <asp:Parameter Name="Id" Type="Int32" />
            </DeleteParameters>
            <InsertParameters>
                <asp:Parameter Name="FirstName" Type="String" />
                <asp:Parameter Name="LastName" Type="String" />
            </InsertParameters>
            <UpdateParameters>
                <asp:Parameter Name="FirstName" Type="String" />
                <asp:Parameter Name="LastName" Type="String" />
                <asp:Parameter Name="Id" Type="Int32" />
            </UpdateParameters>
        </asp:SqlDataSource>
    
    </div>
    </form>
</body>
</html>
