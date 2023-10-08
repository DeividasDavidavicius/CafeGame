using CafeGameAPI.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace CafeGameAPI.Data.Repositories
{
    public interface IReservationsRepository
    {
        Task CreateAsync(Reservation reservation);
        Task DeleteAsync(Reservation reservation);
        Task<Reservation?> GetAsync(int computerId, int reservationId);
        Task<IReadOnlyList<Reservation>> GetManyAsync(int computerId);
        Task UpdateAsync(Reservation reservation);
    }

    public class ReservationsRepository : IReservationsRepository
    {
        private readonly CafeGameDbContext _cafeGameDbContext;
        public ReservationsRepository(CafeGameDbContext cafeGameDbContext)
        {
            _cafeGameDbContext = cafeGameDbContext;
        }

        public async Task CreateAsync(Reservation reservation)
        {
            _cafeGameDbContext.Reservations.Add(reservation);
            await _cafeGameDbContext.SaveChangesAsync();
        }

        public async Task<Reservation?> GetAsync(int computerId, int reservationId)
        {
            return await _cafeGameDbContext.Reservations.FirstOrDefaultAsync(reservation => reservation.Id == reservationId && reservation.Computer.Id == computerId);
        }

        public async Task<IReadOnlyList<Reservation>> GetManyAsync(int computerId)
        {
            return await _cafeGameDbContext.Reservations.Where(reservation => reservation.Computer.Id == computerId).ToListAsync();
        }

        public async Task UpdateAsync(Reservation reservation)
        {
            _cafeGameDbContext.Reservations.Update(reservation);
            await _cafeGameDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Reservation reservation)
        {
            _cafeGameDbContext.Reservations.Remove(reservation);
            await _cafeGameDbContext.SaveChangesAsync();
        }
    }
}
