using Microsoft.AspNetCore.Mvc;
using CafeGameAPI.Data.Dtos;
using CafeGameAPI.Data.Repositories;
using CafeGameAPI.Data.Entities;

namespace CafeGameAPI.Controllers
{
    [ApiController]
    [Route("api/v1/internetcafes")]
    public class InternetCafesController : ControllerBase
    {
        private readonly IInternetCafesRepository _internetCafesRepository;
        public InternetCafesController(IInternetCafesRepository internetCafesRepository)
        {
            _internetCafesRepository = internetCafesRepository;
        }

        [HttpPost]
        public async Task<ActionResult<InternetCafeDto>> Create(CreateInternetCafeDto createInternetCafeDto)
        {
            var internetCafe = new InternetCafe 
            { 
                Name = createInternetCafeDto.Name,
                Address = createInternetCafeDto.Address 
            };

            await _internetCafesRepository.CreateAsync(internetCafe);

            return Created($"/api/v1/internetCafes/{internetCafe.Id}", new InternetCafeDto(internetCafe.Id, internetCafe.Name, internetCafe.Address));
        }

        [HttpGet]
        [Route("{internetCafeId}")]
        public async Task<ActionResult<InternetCafeDto>> Get(int internetCafeId)
        {
            var internetCafe = await _internetCafesRepository.GetAsync(internetCafeId);

            if(internetCafe == null)
            {
                return NotFound();
            }

            return Ok(new InternetCafeDto(internetCafe.Id, internetCafe.Name, internetCafe.Address));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InternetCafeDto>>> GetMany()
        {
            var internetCafes = await _internetCafesRepository.GetManyAsync();

            return Ok(internetCafes.Select(internetCafe => new InternetCafeDto(internetCafe.Id, internetCafe.Name, internetCafe.Address)));
        }

        [HttpPut]
        [Route("{internetCafeId}")]
        public async Task<ActionResult<InternetCafeDto>> Update(int internetCafeId, UpdateInternetCafeDto updateInternetCafeDto)
        {
            var internetCafe = await _internetCafesRepository.GetAsync(internetCafeId);

            if (internetCafe == null)
            {
                return NotFound();
            }

            internetCafe.Name = updateInternetCafeDto.Name;
            internetCafe.Address = updateInternetCafeDto.Address;
            await _internetCafesRepository.UpdateAsync(internetCafe);

            return Ok(new InternetCafeDto(internetCafe.Id, internetCafe.Name, internetCafe.Address));
        }

        [HttpDelete]
        [Route("{internetCafeId}")]
        public async Task<ActionResult> Delete(int internetCafeId)
        {
            var internetCafe = await _internetCafesRepository.GetAsync(internetCafeId);

            if (internetCafe == null)
            {
                return NotFound();
            }

            await _internetCafesRepository.DeleteAsync(internetCafe);

            return NoContent();
        }
    }
}
