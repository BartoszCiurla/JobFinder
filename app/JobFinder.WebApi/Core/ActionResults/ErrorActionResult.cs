using System.Collections.Generic;

namespace JobFinder.WebApi.Core.ActionResults
{
    public class ErrorActionResult
    {
        public IEnumerable<ErrorActionResultItem> Errors { get; }

        public ErrorActionResult(IEnumerable<ErrorActionResultItem> errors)
        {
            Errors = errors;
        }
    }
}
