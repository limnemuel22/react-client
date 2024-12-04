import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Accordion from "../../Components/Accordion/Accordion";
import Button from "../../Components/Button/Button";
import HomeModals from "../../Components/HomeModals/HomeModals";
import { FaPlus } from "react-icons/fa";
import generateAccordionItems from "../../Utils/GenerateAccordionItems";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import CategoryService from "../../Services/Category/Category";
import { useToast } from "../../Context/ToastContext";

const Home = () => {
  const setToast = useToast();
  const [categories, setCategories] = useState([]); // Holds categories and tasks

  const navigate = useNavigate();
  const handleNavigation = (url) => navigate(url);

  const [modals, setModals] = useState({
    createCategory: false,
    deleteTask: { isOpen: false, taskTitle: "", taskId: null },
    deleteCategory: { isOpen: false, categoryName: "", categoryId: null },
    updateTask: { isOpen: false, taskTitle: "" },
    updateCategory: { isOpen: false, categoryName: "" },
  });

  const openModal = (modalName, payload = null) => {
    // refactor this
    setModals((prev) => {
      if (payload)
        return { ...prev, [modalName]: { isOpen: true, ...payload } };
      return { ...prev, [modalName]: true };
    });
  };

  const closeModal = (modalName) => {
    // refactor this
    setModals((prev) => {
      if (typeof prev[modalName] === "object")
        return { ...prev, [modalName]: { isOpen: false } };
      return { ...prev, [modalName]: false };
    });
  };

  useEffect(() => {
    const categories = [
      {
        taskCount: 1,
        categoryId: 1,
        name: "Today",
        tasks: [
          {
            title: "Today Task 1",
            description: "Hello",
            taskId: 2,
            status: "Pending",
            dueDate: "2024-12-03T00:00:00.000Z",
            categoryId: 1,
            categoryName: "Today",
          },
          {
            title: "Sample today",
            description: "Hello",
            taskId: 13,
            status: "Pending",
            dueDate: "2024-12-03T07:58:04.833Z",
            categoryId: 1,
            categoryName: "Today",
          },
          {
            title: "Sample today",
            description: "Hello",
            taskId: 14,
            status: "Pending",
            dueDate: "2024-12-03T07:58:06.590Z",
            categoryId: 1,
            categoryName: "Today",
          },
          {
            title: "Sample today",
            description: "Description here",
            taskId: 15,
            status: "Pending",
            dueDate: "2024-12-03T08:18:20.547Z",
            categoryId: 1,
            categoryName: "Today",
          },
          {
            title: "Sample today",
            description: "Description here",
            taskId: 18,
            status: "Pending",
            dueDate: "2024-12-03T08:18:21.443Z",
            categoryId: 1,
            categoryName: "Today",
          },
          {
            title: "Sample today",
            description: "Description here",
            taskId: 23,
            status: "Pending",
            dueDate: "2024-12-03T08:18:23.383Z",
            categoryId: 1,
            categoryName: "Today",
          },
        ],
      },
      {
        taskCount: 1,
        categoryId: 2,
        name: "This week",
        tasks: [
          {
            title: "This Week Task 1",
            description: "Hello",
            taskId: 5,
            status: "Pending",
            dueDate: "2024-12-04T00:00:00.000Z",
            categoryId: 2,
            categoryName: "This week",
          },
          {
            title: "This Week Task 2",
            description: "Hello",
            taskId: 6,
            status: "Pending",
            dueDate: "2024-12-06T00:00:00.000Z",
            categoryId: 2,
            categoryName: "This week",
          },
        ],
      },
      {
        taskCount: 1,
        categoryId: 3,
        name: "This month",
        tasks: [
          {
            title: "This Month Task 1",
            description: "Hello",
            taskId: 8,
            status: "Pending",
            dueDate: "2024-12-13T00:00:00.000Z",
            categoryId: 3,
            categoryName: "This month",
          },
          {
            title: "This Month Task 2",
            description: "Hello",
            taskId: 9,
            status: "Pending",
            dueDate: "2024-12-18T00:00:00.000Z",
            categoryId: 3,
            categoryName: "This month",
          },
          {
            title: "This Month Task 3",
            description: "Hello",
            taskId: 10,
            status: "Pending",
            dueDate: "2024-12-23T00:00:00.000Z",
            categoryId: 3,
            categoryName: "This month",
          },
        ],
      },
      {
        taskCount: 0,
        categoryId: 8,
        name: "Test",
        tasks: [],
      },
    ];

    setCategories(categories);
  }, []);

  const accordionItems = generateAccordionItems(
    categories,
    openModal,
    handleNavigation,
    setToast,
    setCategories
  );

  return (
    <div className="custom-container">
      <Navbar />
      <section className="mt-5">
        <div className="d-flex justify-content-between mb-3">
          <h1 className="d-inline">All categories</h1>
          <Button
            variant="success"
            size="sm"
            className="add-category-btn"
            onClick={() => openModal("createCategory")}
          >
            <FaPlus />
          </Button>
        </div>

        <HomeModals
          modalData={modals}
          closeModal={closeModal}
          setCategories={setCategories}
        />
        <Accordion items={accordionItems} />
      </section>
    </div>
  );
};

export default Home;
