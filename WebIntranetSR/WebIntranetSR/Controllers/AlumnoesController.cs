using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebIntranetSR.Data;
using WebIntranetSR.Models;
using WebIntranetSR.ModelsClass;

namespace WebIntranetSR.Controllers
{
    public class AlumnoesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private AlumnoModels alumnoModels;


        public AlumnoesController(ApplicationDbContext context)
        {
            _context = context;
            alumnoModels = new AlumnoModels(_context);
        }
        public IActionResult Validate()
        {
            return View();
        }
        public IActionResult Edit()
        {
            return View();
        }
        public IActionResult Delete()
        {
            return View();
        }

        // GET: Alumnoes
        public async Task<IActionResult> Index()
        {
            return View(await _context.Alumno.ToListAsync());
        }


        public List<object[]> filtrarDatos(int numPagina, string valor)
        {

            return alumnoModels.filtrarDatos(numPagina, valor);

        }
        // GET: Alumnoes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var alumno = await _context.Alumno
                .SingleOrDefaultAsync(m => m.AlumnoID == id);
            if (alumno == null)
            {
                return NotFound();
            }

            return View(alumno);
        }
        public List<IdentityError> guardarAlumno(
            string nombre, string apellPa,
        string apellMa, string dni, string grado,
        string seccion, int edad, string direccion,
        int ubigeo, int estado)
        {
           return alumnoModels.guardarAlumno(nombre, apellPa, apellMa,
                dni, grado, seccion, edad, direccion, ubigeo,
                estado);
        }
        // GET: Alumnoes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var alumno = await _context.Alumno.SingleOrDefaultAsync(m => m.AlumnoID == id);
            if (alumno == null)
            {
                return NotFound();
            }
            return View(alumno);
        }

        // POST: Alumnoes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("AlumnoID,Nombre,ApellPa,ApellMa,DNI,Grado,Seccion,Edad,direccion,Ubigeo,Estado")] Alumno alumno)
        {
            if (id != alumno.AlumnoID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(alumno);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AlumnoExists(alumno.AlumnoID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(alumno);
        }

        // GET: Alumnoes/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var alumno = await _context.Alumno
                .SingleOrDefaultAsync(m => m.AlumnoID == id);
            if (alumno == null)
            {
                return NotFound();
            }

            return View(alumno);
        }

        // POST: Alumnoes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var alumno = await _context.Alumno.SingleOrDefaultAsync(m => m.AlumnoID == id);
            _context.Alumno.Remove(alumno);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AlumnoExists(int id)
        {
            return _context.Alumno.Any(e => e.AlumnoID == id);
        }
    }
}
