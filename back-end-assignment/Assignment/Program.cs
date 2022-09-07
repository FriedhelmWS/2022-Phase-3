using Microsoft.EntityFrameworkCore;
using Assignment.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(c => { c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin()); });
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<WebAPIDBContext>(options =>
            options.UseSqlite("Data Source=.\\MyDatabase.sqlite"));
builder.Services.AddScoped<IWebAPIRepo, DBWebAPIRepo>();


var app = builder.Build();

app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();