document.addEventListener("DOMContentLoaded", () => {
   const taskInput = document.getElementById("task-input");
   const taskButton = document.getElementById("add-task-button");
   const taskList = document.getElementById("task-list");

   const saveTasksToLocal = () => {
      const tasks = Array.from(taskList.children).map((taskItem) => ({
         text: taskItem.querySelector(".text-data").textContent,
         isChecked: taskItem.querySelector(".checkbox-input").checked,
      }));
      localStorage.setItem("tasks", JSON.stringify(tasks));
   };

   const createTaskElement = (text, isChecked = false) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-collection");

      const textSpan = document.createElement("span");
      textSpan.classList.add("text-data");
      textSpan.textContent = text;

      const completeButton = document.createElement("input");
      completeButton.classList.add("checkbox-input");
      completeButton.type = "checkbox";
      completeButton.checked = isChecked;

      completeButton.addEventListener("change", saveTasksToLocal);
      completeButton.addEventListener("click", () => {
         alert("Task has been completed");
      });

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.textContent = "Delete";

      deleteButton.addEventListener("click", () => {
         taskList.removeChild(taskItem);
         saveTasksToLocal();
      });

      taskItem.appendChild(textSpan);
      taskItem.appendChild(completeButton);
      taskItem.appendChild(deleteButton);

      return taskItem;
   };

   const loadTasksFromLocal = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(({ text, isChecked }) => {
         const taskItem = createTaskElement(text, isChecked);
         taskList.appendChild(taskItem);
      });
   };

   taskButton.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (!taskText) {
         alert("Task cannot be empty!");
         return;
      }

      const taskItem = createTaskElement(taskText);
      taskList.appendChild(taskItem);
      taskInput.value = "";
      saveTasksToLocal();
   });

   loadTasksFromLocal();
});
