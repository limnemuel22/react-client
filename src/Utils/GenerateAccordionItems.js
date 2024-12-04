import Card from "../Components/Card/Card";
import Button from "../Components/Button/Button";
import TaskService from "../Services/Task/Task";
import CategoryService from "../Services/Category/Category";
import "./GenerateAccordionItems.css";

const generateAccordionItems = (
  dbCategories,
  openModal,
  handleNavigation,
  setToast,
  setCategories
) => {
  console.log(dbCategories, "dbCategories");
  return dbCategories.map((category, index) => ({
    title: category.name,
    numberOfTasks: category.tasks.length,
    content: (
      <>
        <div className="d-flex flex-row justify-content-evenly cat-card-content">
          {category.tasks.slice(0, 3).map((task, idx) => (
            <Card
              className="card-gap"
              key={`db-${index}-${idx}`}
              title={task.title}
              content={task.description}
              showCheck={true}
              showX={true}
              showEdit={true}
              onX={() =>
                openModal("deleteTask", {
                  taskTitle: task.title,
                  taskId: task.taskId,
                  taskDueDate: task.dueDate,
                  taskCategory: task.categoryId,
                })
              }
              onEdit={() =>
                openModal("updateTask", {
                  title: task.title,
                  description: task.description,
                  dueDate: task.dueDate,
                  taskId: task.taskId,
                  categoryId: task.categoryId,
                  categoryName: task.categoryName,
                })
              }
              onCheck={async () => {
                try {
                  const taskId = task.taskId;
                  await TaskService.CompleteTask(taskId);
                  setToast({
                    id: Date.now(),
                    title: "Update task",
                    message: "Completed task successfully",
                    type: "success",
                    duration: 1000,
                  });

                  const categories =
                    await CategoryService.fetchCategoriesForAccordion();
                  setCategories(categories);
                } catch (err) {
                  setToast({
                    title: "Please try again",
                    message: err.message,
                    type: "danger",
                  });
                }
              }}
            />
          ))}
        </div>
        <div className="d-flex justify-content-around mt-5 accordion-buttons">
          <Button
            variant="danger"
            size="sm"
            className="shadow"
            onClick={() =>
              openModal("deleteCategory", {
                categoryName: category.name,
                categoryId: category.categoryId,
              })
            }
          >
            Delete
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="shadow"
            onClick={() =>
              openModal("updateCategory", {
                categoryId: category.categoryId,
                categoryName: category.name,
              })
            }
          >
            Update
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="shadow"
            onClick={() => handleNavigation("/tasks")}
          >
            View more
          </Button>
        </div>
      </>
    ),
    isOpen: index === 0 ? true : category.isOpen || false,
  }));
};

export default generateAccordionItems;
