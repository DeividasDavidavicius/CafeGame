using CafeGameAPI.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace CafeGameAPI.Data.Repositories
{
    public interface IInternetCafesRepository
    {
        Task CreateAsync(InternetCafe internetCafe);
        Task DeleteAsync(InternetCafe internetCafe);
        Task<InternetCafe?> GetAsync(int internetCafeId);
        Task<IReadOnlyList<InternetCafe>> GetManyAsync();
        Task UpdateAsync(InternetCafe internetCafe);
    }

    public class InternetCafesRepository : IInternetCafesRepository
    {
        private readonly CafeGameDbContext _cafeGameDbContext;
        public InternetCafesRepository(CafeGameDbContext cafeGameDbContext)
        {
            _cafeGameDbContext = cafeGameDbContext;
        }

        public async Task CreateAsync(InternetCafe internetCafe)
        {
            _cafeGameDbContext.InternetCafes.Add(internetCafe);
            await _cafeGameDbContext.SaveChangesAsync();
        }

        public async Task<InternetCafe?> GetAsync(int internetCafeId)
        {
            return await _cafeGameDbContext.InternetCafes.FirstOrDefaultAsync(internetCafe => internetCafe.Id == internetCafeId);
        }

        public async Task<IReadOnlyList<InternetCafe>> GetManyAsync()
        {
            return await _cafeGameDbContext.InternetCafes.ToListAsync();
        }

        public async Task UpdateAsync(InternetCafe internetCafe)
        {
            _cafeGameDbContext.InternetCafes.Update(internetCafe);
            await _cafeGameDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(InternetCafe internetCafe)
        {
            _cafeGameDbContext.InternetCafes.Remove(internetCafe);
            await _cafeGameDbContext.SaveChangesAsync();
        }
    }
}
