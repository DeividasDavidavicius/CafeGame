using CafeGameAPI.Auth.Models;
using System.ComponentModel.DataAnnotations;

namespace CafeGameAPI.Data.Entities
{
    public class Computer
    {
        public int Id { get; set; }
        public string Ram { get; set; }
        public string Cpu { get; set; }
        public string Gpu { get; set; }
        public string MonitorResolution { get; set; }
        public string MonitorRefreshRate { get; set; }
        public InternetCafe InternetCafe { get; set; }
    }
}
