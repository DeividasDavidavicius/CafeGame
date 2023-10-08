using System.ComponentModel.DataAnnotations;

namespace CafeGameAPI.Data.Dtos
{
    public record InternetCafeDto(int Id, string Name, string Address);
    public record CreateInternetCafeDto([Required] string Name, [Required] string Address);
    public record UpdateInternetCafeDto([Required] string Name, [Required] string Address);
}
