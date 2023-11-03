using CafeGameAPI.Auth.Models;
using CafeGameAPI.Data.Dtos;
using CafeGameAPI.Data.Entities;
using CafeGameAPI.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeGameAPI.Controllers
{
    [ApiController]
    [Route("api/v1/internetcafes/{internetCafeId}/computers")]
    public class ComputersController : ControllerBase
    {
        private readonly IInternetCafesRepository _internetCafesRepository;
        private readonly IComputersRepository _computersRepository;

        public ComputersController(IInternetCafesRepository internetCafesRepository, IComputersRepository computersRepository)
        {
            _internetCafesRepository = internetCafesRepository;
            _computersRepository = computersRepository;
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<ComputerDto>> Create(int internetCafeId, CreateComputerDto createComputerDto)
        {
            var internetCafe = await _internetCafesRepository.GetAsync(internetCafeId);

            if (internetCafe == null)
            {
                return NotFound();
            }

            var computer = new Computer 
            {
                Ram = createComputerDto.Ram,
                Cpu = createComputerDto.Cpu,
                Gpu = createComputerDto.Gpu,
                MonitorResolution = createComputerDto.MonitorResolution,
                MonitorRefreshRate = createComputerDto.MonitorRefreshRate,
                InternetCafe = internetCafe
            };

            await _computersRepository.CreateAsync(computer);

            return Created($"/api/v1/internetCafes/{internetCafeId}/computers/{computer.Id}", 
                new ComputerDto(computer.Id, computer.Ram, computer.Cpu, computer.Gpu, computer.MonitorResolution, computer.MonitorRefreshRate));
        }

        [HttpGet]
        [Route("{computerId}")]
        public async Task<ActionResult<ComputerDto>> Get(int internetCafeId, int computerId)
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

            return Ok(new ComputerDto(computer.Id, computer.Ram, computer.Cpu, computer.Gpu, computer.MonitorResolution, computer.MonitorRefreshRate));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ComputerDto>>> GetMany(int internetCafeId)
        {
            var internetCafe = await _internetCafesRepository.GetAsync(internetCafeId);

            if (internetCafe == null)
            {
                return NotFound();
            }

            var computers = await _computersRepository.GetManyAsync(internetCafeId);

            return Ok(computers.Select(computer => new ComputerDto(computer.Id, computer.Ram, computer.Cpu, computer.Gpu, computer.MonitorResolution, computer.MonitorRefreshRate)));
        }

        [HttpPut]
        [Authorize(Roles = UserRoles.Admin)]
        [Route("{computerId}")]
        public async Task<ActionResult<ComputerDto>> Update(int internetCafeId, int computerId, UpdateComputerDto updateComputerDto)
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

            computer.Ram = updateComputerDto.Ram;
            computer.Cpu = updateComputerDto.Cpu;
            computer.Gpu = updateComputerDto.Gpu;
            computer.MonitorResolution = updateComputerDto.MonitorResolution;
            computer.MonitorRefreshRate = updateComputerDto.MonitorRefreshRate;

            await _computersRepository.UpdateAsync(computer);

            return Ok(new ComputerDto(computer.Id, computer.Ram, computer.Cpu, computer.Gpu, computer.MonitorResolution, computer.MonitorRefreshRate));
        }

        [HttpDelete]
        [Authorize(Roles = UserRoles.Admin)]
        [Route("{computerId}")]
        public async Task<ActionResult> Delete(int internetCafeId, int computerId)
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

            await _computersRepository.DeleteAsync(computer);

            return NoContent();
        }
    }
}
