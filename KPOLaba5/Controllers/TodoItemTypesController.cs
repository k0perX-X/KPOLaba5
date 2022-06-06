using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KPOLaba5.Models;

namespace KPOLaba5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemTypesController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoItemTypesController()
        {
            _context = new TodoContext();
        }

        // GET: api/TodoItemTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetTodoItemsTypes()
        {
            return await _context.TodoItems.GroupBy(o => o.Type).Select(o => o.Key).ToListAsync();
        }

    //     // GET: api/TodoItemTypes/5
    //     [HttpGet("{id}")]
    //     public async Task<ActionResult<TodoItemType>> GetTodoItemType(long id)
    //     {
    //       if (_context.TodoItemsTypes == null)
    //       {
    //           return NotFound();
    //       }
    //         var todoItemType = await _context.TodoItemsTypes.FindAsync(id);
    //
    //         if (todoItemType == null)
    //         {
    //             return NotFound();
    //         }
    //
    //         return todoItemType;
    //     }
    //
    //     // PUT: api/TodoItemTypes/5
    //     // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    //     [HttpPut("{id}")]
    //     public async Task<IActionResult> PutTodoItemType(long id, TodoItemType todoItemType)
    //     {
    //         if (id != todoItemType.Id)
    //         {
    //             return BadRequest();
    //         }
    //
    //         _context.Entry(todoItemType).State = EntityState.Modified;
    //
    //         try
    //         {
    //             await _context.SaveChangesAsync();
    //         }
    //         catch (DbUpdateConcurrencyException)
    //         {
    //             if (!TodoItemTypeExists(id))
    //             {
    //                 return NotFound();
    //             }
    //             else
    //             {
    //                 throw;
    //             }
    //         }
    //
    //         return NoContent();
    //     }
    //
    //     // POST: api/TodoItemTypes
    //     // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    //     [HttpPost]
    //     public async Task<ActionResult<TodoItemType>> PostTodoItemType(TodoItemType todoItemType)
    //     {
    //       if (_context.TodoItemsTypes == null)
    //       {
    //           return Problem("Entity set 'TodoContext.TodoItemsTypes'  is null.");
    //       }
    //         _context.TodoItemsTypes.Add(todoItemType);
    //         await _context.SaveChangesAsync();
    //
    //         return CreatedAtAction("GetTodoItemType", new { id = todoItemType.Id }, todoItemType);
    //     }
    //
    //     // DELETE: api/TodoItemTypes/5
    //     [HttpDelete("{id}")]
    //     public async Task<IActionResult> DeleteTodoItemType(long id)
    //     {
    //         if (_context.TodoItemsTypes == null)
    //         {
    //             return NotFound();
    //         }
    //         var todoItemType = await _context.TodoItemsTypes.FindAsync(id);
    //         if (todoItemType == null)
    //         {
    //             return NotFound();
    //         }
    //
    //         _context.TodoItemsTypes.Remove(todoItemType);
    //         await _context.SaveChangesAsync();
    //
    //         return NoContent();
    //     }
    //
    //     private bool TodoItemTypeExists(long id)
    //     {
    //         return (_context.TodoItemsTypes?.Any(e => e.Id == id)).GetValueOrDefault();
    //     }
    }
}
