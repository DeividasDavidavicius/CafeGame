using CafeGameAPI.Data.Dtos;
using CafeGameAPI.Data.Entities;
using CafeGameAPI.Data.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CafeGameAPI.Controllers
{
    [ApiController]
    [Route("api/v1/internetcafes/{internetCafeId}/computers/{computerId}/reservations")]
    public class ReservationsController : ControllerBase
    {
        private readonly IInternetCafesRepository _internetCafesRepository;
        private readonly IComputersRepository _computersRepository;
        private readonly IReservationsRepository _reservationsRepository;

        public ReservationsController(IInternetCafesRepository internetCafesRepository, IComputersRepository computersRepository, IReservationsRepository reservationsRepository)
        {
            _internetCafesRepository = internetCafesRepository;
            _computersRepository = computersRepository;
            _reservationsRepository = reservationsRepository;
        }

        [HttpPost]
        public async Task<ActionResult<ReservationDto>> Create(int internetCafeId, int computerId, CreateReservationDto createReservationDto)
        {
            var internetCafe = await _internetCafesRepository.GetAsync(internetCafeId);

            if (internetCafe == null)
            {
                return NotFound();
            }

            var computer = await _computersRepository.GetAsync(internetCafeId, computerId);

            if (computer == null)
            {
                return UnprocessableEntity();
            }

            if(createReservationDto.Start >= createReservationDto.End)
            {
                var errorResponse = new { ErrorMessage = "Reservation Start date must be older than End date" };
                return UnprocessableEntity(errorResponse);
            }

            var reservations = await _reservationsRepository.GetManyAsync(computerId);
            
            if(!IsNewReservationTimeValid(createReservationDto.Start, createReservationDto.End, reservations))
            {    
                var errorResponse = new { ErrorMessage = "This reservation overlaps an already created reservation" };
                return UnprocessableEntity(errorResponse);
            }
           
            var reservation = new Reservation
            {
                Name = createReservationDto.Name,
                Start = createReservationDto.Start,
                End = createReservationDto.End,
                Computer = computer
            };

            await _reservationsRepository.CreateAsync(reservation);

            return Created($"/api/v1/internetCafes/{internetCafeId}/computers/{computer.Id}/reservations/{reservation.Id}", 
                new ReservationDto(reservation.Id, reservation.Name, reservation.Start, reservation.End));
        }

        [HttpGet]
        [Route("{reservationId}")]
        public async Task<ActionResult<ReservationDto>> Get(int internetCafeId, int computerId, int reservationId)
        {
            var internetCafe = await _internetCafesRepository.GetAsync(internetCafeId);

            if (internetCafe == null)
            {
                return NotFound();
            }

            var computer = await _computersRepository.GetAsync(internetCafeId, computerId);

            if (computer == null)
            {
                return NotFound();
            }

            var reservation = await _reservationsRepository.GetAsync(computerId, reservationId);

            if (reservation == null)
            {
                return NotFound();
            }

            return Ok(new ReservationDto(reservation.Id, reservation.Name, reservation.Start, reservation.End));
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReservationDto>>> GetMany(int internetCafeId, int computerId)
        {
            var internetCafe = await _internetCafesRepository.GetAsync(internetCafeId);

            if (internetCafe == null)
            {
                return NotFound();
            }

            var computer = await _computersRepository.GetAsync(internetCafeId, computerId);

            if (computer == null)
            {
                return NotFound();
            }

            var reservations = await _reservationsRepository.GetManyAsync(computerId);

            return Ok(reservations.Select(reservation => new ReservationDto(reservation.Id, reservation.Name, reservation.Start, reservation.End)));
        }
        
        [HttpPatch]
        [Route("{reservationId}")]
        public async Task<ActionResult<ReservationDto>> Update(int internetCafeId, int computerId, int reservationId, UpdateReservationDto updateReservationDto)
        {
            var internetCafe = await _internetCafesRepository.GetAsync(internetCafeId);

            if (internetCafe == null)
            {
                return NotFound();
            }

            var computer = await _computersRepository.GetAsync(internetCafeId, computerId);

            if (computer == null)
            {
                return NotFound();
            }

            var reservation = await _reservationsRepository.GetAsync(computerId, reservationId);

            if (reservation == null)
            {
                return NotFound();
            }

            reservation.Name = updateReservationDto.Name;

            await _reservationsRepository.UpdateAsync(reservation);

            return Ok(new ReservationDto(reservation.Id, reservation.Name, reservation.Start, reservation.End));
        }

        [HttpDelete]
        [Route("{reservationId}")]
        public async Task<ActionResult> Delete(int internetCafeId, int computerId, int reservationId)
        {
            var internetCafe = await _internetCafesRepository.GetAsync(internetCafeId);

            if (internetCafe == null)
            {
                return NotFound();
            }

            var computer = await _computersRepository.GetAsync(internetCafeId, computerId);

            if (computer == null)
            {
                return NotFound();
            }

            var reservation = await _reservationsRepository.GetAsync(computerId, reservationId);

            if (reservation == null)
            {
                return NotFound();
            }

            await _reservationsRepository.DeleteAsync(reservation);

            return NoContent();
        }

        public bool IsNewReservationTimeValid(DateTime newStart, DateTime newEnd, IReadOnlyList<Reservation> existingReservations)
        {
            foreach (var existingReservation in existingReservations)
            {
                if (newEnd <= existingReservation.Start)
                {
                    continue;
                }

                if (newStart >= existingReservation.End)
                {
                    continue;
                }

                return false;
            }

            return true;
        }
    }
}
