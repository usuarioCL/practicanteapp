// Realizar una solicitud a la API para obtener los datos
fetch('/dashboard/api/data')
  .then(response => response.json())
  .then(data => {
    // Gráfico de Practicantes por Carrera
    const practPorCarrera = data.practPorCarrera;
    const nombresCarreras = practPorCarrera.map(c => c.nombre);
    const totalCarreras = practPorCarrera.map(c => c.total);

    const ctxCarrera = document.getElementById('practicantesPorCarrera').getContext('2d');
    new Chart(ctxCarrera, {
      type: 'bar',
      data: {
        labels: nombresCarreras,
        datasets: [{
          label: 'Practicantes por Carrera',
          data: totalCarreras,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
      },
    });

  })
  .catch(error => {
    console.error('Error al cargar los datos del dashboard:', error);
  });


  // Validación de Bootstrap
  (function () {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  })();
