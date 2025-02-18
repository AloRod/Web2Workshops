const Course = require("../models/courseModel");

// Obtener todos los cursos o un curso por ID
const getCourses = async (req, res) => {
  try {
    if (req.query.id) {
      const course = await Course.findById(req.query.id).populate('teacher');
      if (!course) return res.status(404).json({ error: "Curso no encontrado" });
      return res.json(course);
    }

    const courses = await Course.find().populate('teacher');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener cursos" });
  }
};

// Crear un nuevo curso
const createCourse = async (req, res) => {
  try {
    const { name, code, description, teacher } = req.body;
    const newCourse = new Course({ name, code, description, teacher });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ error: "Error al crear el curso" });
  }
};

// Editar un curso
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedCourse) return res.status(404).json({ error: "Curso no encontrado" });
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ error: "Error al actualizar el curso" });
  }
};

// Eliminar un curso
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    
    if (!deletedCourse) return res.status(404).json({ error: "Curso no encontrado" });
    res.json({ message: "Curso eliminado correctamente" });
  } catch (err) {
    res.status(400).json({ error: "Error al eliminar el curso" });
  }
};

module.exports = { getCourses, createCourse, updateCourse, deleteCourse };
