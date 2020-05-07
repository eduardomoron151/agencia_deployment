const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
  const testimoniales = await Testimonial.findAll()
  res.render('testimoniales', {
    pagina: 'Testimoniales',
    testimoniales
  })
}

exports.agregarTestimonial = async (req, res) => {
  // Validar que los campos esten llenos
  let {nombre, correo, mensaje} = req.body;

  let errores = [];

  if(!nombre) {
    errores.push({'mensaje': 'Agrega tu Nombre'});
  }
  if(!correo) {
    errores.push({'mensaje': 'Agrega tu Correo'});
  }
  if(!mensaje) {
    errores.push({'mensaje': 'Agrega un Mensaje'});
  }

  //Revisar errores
  if(errores.length > 0 ) {
    // Muestra la vista con errores
    const testimoniales = await Testimonial.findAll()
      res.render('testimoniales', {
        errores,
        nombre,
        correo,
        mensaje,
        pagina: 'Testimoniales',
        testimoniales
      })
  } else {
    // Almacenar en la base de datos
    Testimonial.create({
      nombre,
      correo,
      mensaje
    })
    .then(Testimonial => res.redirect('/testimoniales'))
    .catch(error => console.log(error))

  }
}