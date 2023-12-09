using System.ComponentModel.DataAnnotations;

namespace CafeGameAPI.Data.Dtos
{
    public record ReservationDto(int Id, string Name, DateTime Start, DateTime End, string UserId);
    public record FullReservationDto(int Id, string Name, DateTime Start, DateTime End, string UserId, int InternetCafeId, int ComputerId);

    public record CreateReservationDto([Required] string Name, [Required] DateTime Start, [Required] DateTime End);
    public record UpdateReservationDto([Required] string Name);
}
