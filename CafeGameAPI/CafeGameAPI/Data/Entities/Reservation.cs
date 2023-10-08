namespace CafeGameAPI.Data.Entities
{
    public class Reservation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public Computer Computer { get; set; }
    }
}
