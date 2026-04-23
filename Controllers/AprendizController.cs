using Microsoft.AspNetCore.Mvc;

namespace Sena_Pay.Controllers
{
    public class AprendizController : Controller
    {
        public IActionResult Perfil()
        {
            // Datos de ejemplo (Hardcoded por ahora)
            ViewBag.Nombre = "SANTIAGO ALEXANDER";
            ViewBag.Documento = "1023456789";
            ViewBag.Saldo = 15500;
            ViewBag.Ficha = "2827102"; // Ejemplo de número de ficha

            return View();
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
