using CafeGameAPI.Auth.Models;
using System.ComponentModel.DataAnnotations;

namespace CafeGameAPI.Data.Entities
{
    public class Reservation : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public Computer Computer { get; set; }
        [Required]
        public string UserId { get; set; }
        public CafeGameUser User { get; set; }
    }
}
