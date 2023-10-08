using CafeGameAPI.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace CafeGameAPI.Data.Repositories
{
    public interface IComputersRepository
    {
        Task CreateAsync(Computer computer);
        Task DeleteAsync(Computer computer);
        Task<Computer?> GetAsync(int internetCafeId, int computerId);
        Task<IReadOnlyList<Computer>> GetManyAsync(int internetCafeId);
        Task UpdateAsync(Computer computer);
    }

    public class ComputersRepository : IComputersRepository
    {
        private readonly CafeGameDbContext _cafeGameDbContext;
        public ComputersRepository(CafeGameDbContext cafeGameDbContext)
        {
            _cafeGameDbContext = cafeGameDbContext;
        }

        public async Task CreateAsync(Computer computer)
        {
            _cafeGameDbContext.Computers.Add(computer);
            await _cafeGameDbContext.SaveChangesAsync();
        }

        public async Task<Computer?> GetAsync(int internetCafeId, int computerId)
        {
            return await _cafeGameDbContext.Computers.FirstOrDefaultAsync(computer => computer.Id == computerId && computer.InternetCafe.Id == internetCafeId);
        }

        public async Task<IReadOnlyList<Computer>> GetManyAsync(int internetCafeId)
        {
            return await _cafeGameDbContext.Computers.Where(computer => computer.InternetCafe.Id == internetCafeId).ToListAsync();
        }

        public async Task UpdateAsync(Computer computer)
        {
            _cafeGameDbContext.Computers.Update(computer);
            await _cafeGameDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Computer computer)
        {
            _cafeGameDbContext.Computers.Remove(computer);
            await _cafeGameDbContext.SaveChangesAsync();
        }
    }
}
