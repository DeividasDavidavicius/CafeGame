using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;

namespace CafeGameAPI.Filters
{
    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                if (context.ModelState.ContainsKey("$"))
                {
                    context.Result = new BadRequestObjectResult(context.ModelState);
                }
                else
                {
                    context.Result = new UnprocessableEntityObjectResult(context.ModelState);
                }
            }
        }

        private static bool IsDataError(ModelError error)
        {
            // You can customize this logic based on your requirements
            // For example, check if the error message contains specific keywords
            if (error.ErrorMessage.Contains("$")) return false;
            return error.ErrorMessage.Contains("required", StringComparison.OrdinalIgnoreCase);
        }

        private static Dictionary<string, List<string>> GetModelErrors(ActionExecutingContext context)
        {
            return context.ModelState
                .Where(entry => entry.Value.Errors.Any())
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToList()
                );
        }
    }
}
