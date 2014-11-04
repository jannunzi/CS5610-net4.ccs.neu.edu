<%@ Page Language="C#" AutoEventWireup="true" CodeFile="profile.aspx.cs" Inherits="experiments_db_donations_profile" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../css/bootstrap.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">

    <%
        var username = Request["username"];
    %>

    <div class="container">
        <h1>Profile</h1>

        Hello <%= username %>

        <a href="search.aspx" class="btn btn-success">Search</a>

        <asp:DataList ID="DataList1" runat="server" DataKeyField="Id" DataSourceID="SqlDataSource1">
            <ItemTemplate>
                <asp:Label ID="firstNameLabel" runat="server" Text='<%# Eval("firstName") %>' />
                <asp:Label ID="lastNameLabel" runat="server" Text='<%# Eval("lastName") %>' />
                (<asp:Label ID="emailLabel" runat="server" Text='<%# Eval("email") %>' />)
<br />
            </ItemTemplate>
        </asp:DataList>
        <p>

            <asp:GridView CssClass="table" ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="Id" DataSourceID="SqlDataSource1" EmptyDataText="There are no data records to display.">
                <Columns>
                    <asp:BoundField DataField="Id" HeaderText="Id" ReadOnly="True" SortExpression="Id" />
                    <asp:BoundField DataField="firstName" HeaderText="firstName" SortExpression="firstName" />
                    <asp:BoundField DataField="lastName" HeaderText="lastName" SortExpression="lastName" />
                    <asp:BoundField DataField="email" HeaderText="email" SortExpression="email" />
                    <asp:BoundField DataField="username" HeaderText="username" SortExpression="username" />
                    <asp:BoundField DataField="password" HeaderText="password" SortExpression="password" />
                </Columns>
            </asp:GridView>
            <asp:SqlDataSource
                ID="SqlDataSource1" 
                runat="server" 
                ConnectionString="<%$ ConnectionStrings:CS5610_LecturesConnectionString1 %>" 
                DeleteCommand="DELETE FROM [Sponsor] WHERE [Id] = @Id" 
                InsertCommand="INSERT INTO [Sponsor] ([firstName], [lastName], [email], [username], [password]) VALUES (@firstName, @lastName, @email, @username, @password)" 
                ProviderName="<%$ ConnectionStrings:CS5610_LecturesConnectionString1.ProviderName %>" 
                SelectCommand="SELECT [Id], [firstName], [lastName], [email], [username], [password] FROM [Sponsor] WHERE username=@username" 
                UpdateCommand="UPDATE [Sponsor] SET [firstName] = @firstName, [lastName] = @lastName, [email] = @email, [username] = @username, [password] = @password WHERE [Id] = @Id">
                <DeleteParameters>
                    <asp:Parameter Name="Id" Type="Int32" />
                </DeleteParameters>
                <InsertParameters>
                    <asp:Parameter Name="firstName" Type="String" />
                    <asp:Parameter Name="lastName" Type="String" />
                    <asp:Parameter Name="email" Type="String" />
                    <asp:Parameter Name="username" Type="String" />
                    <asp:Parameter Name="password" Type="String" />
                </InsertParameters>
                <UpdateParameters>
                    <asp:Parameter Name="firstName" Type="String" />
                    <asp:Parameter Name="lastName" Type="String" />
                    <asp:Parameter Name="email" Type="String" />
                    <asp:Parameter Name="username" Type="String" />
                    <asp:Parameter Name="password" Type="String" />
                    <asp:Parameter Name="Id" Type="Int32" />
                </UpdateParameters>
                <SelectParameters>
                    <asp:QueryStringParameter Name="username" Type="String" QueryStringField="username" />
                </SelectParameters>
            </asp:SqlDataSource>

        </p>

    </div>
    </form>
</body>
</html>
