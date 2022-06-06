namespace TodoApi.Models
{
    public enum TodoItemType
    {
        Urgent,
        MediumUrgent,
        NonUrgent
    }
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
        public TodoItemType Type { get; set; }
    }
}