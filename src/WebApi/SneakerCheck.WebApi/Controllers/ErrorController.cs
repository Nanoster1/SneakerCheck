using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using SneakerCheck.WebApi.Controllers.Common;

namespace SneakerCheck.WebApi.Controllers;

[AllowAnonymous]
[Route(Routes.ErrorController.Prefix)]
public class ErrorController : ApiController
{
    [HttpGet]
    public ActionResult<ProblemDetails> Error()
    {
        return Problem();
    }
}