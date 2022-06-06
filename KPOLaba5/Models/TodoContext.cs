using Microsoft.EntityFrameworkCore;

namespace KPOLaba5.Models;

public class TodoContext:DbContext
{
    public DbSet<TodoItem> TodoItems { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=ToDo;Integrated Security=True;");
    }
}