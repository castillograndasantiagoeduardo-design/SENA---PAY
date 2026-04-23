using Microsoft.AspNetCore.Mvc;

namespace Sena_Pay.Controllers
{
    public class AccountController : Controller
    {
        // Esta acción solo devuelve la vista al usuario
        public IActionResult Login()
        {
            return View();
        }
    }
}

