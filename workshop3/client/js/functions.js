async function getTeachers() {
  fetch('http://localhost:3000/teachers')  // Llamamos a la API
    .then(response => response.json())  // Convertimos la respuesta a JSON
    .then(data => {
      const resultList = document.getElementById('result');  // Seleccionamos la lista donde mostraremos los datos
      const selectElement = document.getElementById('profesor'); // Seleccionamos el select donde se cargarán los profesores
      resultList.innerHTML = '';  // Limpiamos la lista antes de agregar nuevos datos
      selectElement.innerHTML = '<option value="">Seleccione un profesor</option>';  // Limpiamos el select y agregamos la opción por defecto

      if (data.length === 0) {
        resultList.innerHTML = '<li>No hay profesores registrados.</li>';
        return;
      }

      // Iteramos sobre los profesores y los mostramos en la lista
      data.forEach(teacher => {
        // Agregamos los profesores al select
        let option = document.createElement('option');
        option.value = teacher.id;  // Asumimos que el id del profesor es único
        option.textContent = `${teacher.first_name} ${teacher.last_name} - Cédula: ${teacher.cedula}`;
        selectElement.appendChild(option);

        // También los mostramos en la lista
        let listItem = document.createElement('li');
        listItem.textContent = `Nombre: ${teacher.first_name} ${teacher.last_name} - Cédula: ${teacher.cedula} - Edad: ${teacher.age}`;
        resultList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error al obtener los profesores:', error));
}

async function createTeacher() {
  let teacher =  {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    cedula: document.getElementById('cedula').value,
    age: document.getElementById('age').value
  };

  const response = await fetch("http://localhost:3000/teachers", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teacher)
  });

  if (response && response.status == 201) {
    teacher = await response.json();
    console.log('Teacher saved', teacher);
    alert('Usuario guardado');
  } else {
    alert("¡Error al guardar el profesor!");
  }
}

async function createCourse() {
  let course = {
    name: document.getElementById('name').value,
    codigo: document.getElementById('codigo').value,
    descripcion: document.getElementById('descripcion').value,
    profesor: document.getElementById('profesor').value  // Obtenemos el ID del curso seleccionado
  };

  const response = await fetch("http://localhost:3000/courses", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(course)
  });

  if (response && response.status === 201) {
    course = await response.json();
    console.log('Curso guardado', course);
    alert('Curso guardado');
  } else {
    alert("¡Error al guardar el curso!");
  }
}

async function getCourses() {
  fetch('http://localhost:3000/courses')  // Llamamos a la API
    .then(response => response.json())  // Convertimos la respuesta a JSON
    .then(data => {
      const resultList = document.getElementById('result');  // Seleccionamos la lista donde mostraremos los cursos
      resultList.innerHTML = '';  // Limpiamos la lista antes de agregar nuevos cursos

      if (data.length === 0) {
        resultList.innerHTML = '<li>No hay cursos registrados.</li>';
        return;
      }

      // Iteramos sobre los cursos y los mostramos en la lista
      data.forEach(course => {
        let listItem = document.createElement('li');
        listItem.textContent = `Nombre: ${course.name} - Código: ${course.codigo} - Descripción: ${course.descripcion} - Profesor: ${course.profesor}`;
        resultList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error al obtener los cursos:', error));
}

document.addEventListener('DOMContentLoaded', function () {
  getTeachers();  // Cargar los profesores al cargar la página
  getCourses();   // Cargar los cursos al cargar la página
});


