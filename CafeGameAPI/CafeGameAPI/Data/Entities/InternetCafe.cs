using CafeGameAPI.Auth.Models;
using System.ComponentModel.DataAnnotations;

namespace CafeGameAPI.Data.Entities
{
    public class InternetCafe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    }
}
