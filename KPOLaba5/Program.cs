using Microsoft.AspNetCore.Authentication.OAuth;
using System.Net.Http.Headers;

namespace KPOLaba5;

public static class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllersWithViews();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        // builder.Services.AddEndpointsApiExplorer();
        // builder.Services.AddSwaggerGen();


        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
            // app.UseSwagger();
            // // app.UseSwaggerUI();
            // app.UseSwaggerUI(options =>
            // {
            //     options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
            //     options.RoutePrefix = string.Empty;
            // });
        }

        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthorization();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");
        

        app.Run();
    }
}