// Esperar a que se cargue el DOM
document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencias a los elementos del DOM
    const taskInput = document.getElementById("textTodo");
    const addTodoButton = document.getElementById("addTodo");
    const totalTasks = document.getElementById("dato");
    const completedTasks = document.getElementById("completedTasks");
    const taskTableBody = document.querySelector(".result-tareas tbody");

    // Variable para almacenar las tareas
    const tasks = [];

    // Función para actualizar el contador de tareas totales
    function updateTotalTasks() {
        totalTasks.textContent = tasks.length;
        }

    // Función para actualizar el contador de tareas completadas
    function updateCompletedTasks() {
        const completedCount = tasks.filter(function(task) {
        return task.completed;
        }).length;

    completedTasks.textContent = completedCount;
}

// Función para crear una nueva fila de tarea en la tabla
function createTaskRow(task) {
    const taskRow = document.createElement("tr");

    const taskIdCell = document.createElement("td");
    taskIdCell.textContent = task.id;

    const taskNameCell = document.createElement("td");
    taskNameCell.textContent = task.name;

    const taskActionCell = document.createElement("td");
    const taskCheckbox = document.createElement("input");

    taskCheckbox.type = "checkbox";
    taskCheckbox.checked = task.completed;

    taskCheckbox.addEventListener("change", function() {
    task.completed = taskCheckbox.checked;
    updateCompletedTasks();
    });

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    deleteIcon.addEventListener("click", function() {
        const rowIndex = tasks.indexOf(task);
        if (rowIndex !== -1) {
            tasks.splice(rowIndex, 1);
            taskTableBody.removeChild(taskRow);
            updateTotalTasks();
            updateCompletedTasks();
        }
    });

    taskActionCell.appendChild(taskCheckbox);
    taskActionCell.appendChild(deleteIcon);

    taskRow.appendChild(taskIdCell);
    taskRow.appendChild(taskNameCell);
    taskRow.appendChild(taskActionCell);

    return taskRow;
}

    // Agregar un evento al botón cuando se haga clic
    addTodoButton.addEventListener("click", function() {
        const newTaskName = taskInput.value.trim(); // Obtener el valor de la nueva tarea

        if (newTaskName !== "") {
        const newTask = {
            id: tasks.length + 1,
            name: newTaskName,
            completed: false
        };

        tasks.push(newTask); // Agregar la nueva tarea al arreglo

        // Crear una nueva fila de tarea y agregarla a la tabla
        const newTaskRow = createTaskRow(newTask);
        taskTableBody.appendChild(newTaskRow);

        taskInput.value = ""; // Limpiar el campo de entrada

        updateTotalTasks();
        }
    });
});
