using System.ComponentModel.DataAnnotations;

namespace CafeGameAPI.Data.Dtos
{
    public record ReservationDto(int Id, string Name, DateTime Start, DateTime End);
    public record CreateReservationDto([Required] string Name, [Required] DateTime Start, [Required] DateTime End);
    public record UpdateReservationDto([Required] string Name);
}
