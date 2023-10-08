using System.ComponentModel.DataAnnotations;

namespace CafeGameAPI.Data.Dtos
{
    public record ComputerDto(int Id, string Ram, string Cpu, string Gpu, string MonitorResolution, string MonitorRefreshRate);
    public record CreateComputerDto([Required] string Ram, [Required] string Cpu, [Required] string Gpu, [Required] string MonitorResolution, [Required] string MonitorRefreshRate);
    public record UpdateComputerDto([Required] string Ram, [Required] string Cpu, [Required] string Gpu, [Required] string MonitorResolution, [Required] string MonitorRefreshRate);
}
