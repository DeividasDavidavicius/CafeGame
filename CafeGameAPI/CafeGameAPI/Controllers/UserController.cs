using CafeGameAPI.Auth.Models;
using CafeGameAPI.Data.Dtos;
using CafeGameAPI.Data.Entities;
using CafeGameAPI.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace CafeGameAPI.Controllers
{
    [ApiController]
    [Route("api/v1/user/reservations")]
    public class UserController : ControllerBase
    {
        private readonly IReservationsRepository _reservationsRepository;

        public UserController(IReservationsRepository reservationsRepository)
        {
            _reservationsRepository = reservationsRepository;
        }

        [HttpGet]
        [Authorize(Roles = UserRoles.RegisteredUser)]
        public async Task<ActionResult<IEnumerable<ReservationDto>>> GetManyUser()
        {
            var UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var reservations = await _reservationsRepository.GetUserAsync(UserId);

            return Ok(reservations.Select(reservation => new FullReservationDto(reservation.Id, reservation.Name, reservation.Start, reservation.End, reservation.UserId, reservation.Computer.Id, reservation.Computer.InternetCafe.Id)));
        }
    }
}
