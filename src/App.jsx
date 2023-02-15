import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const App = () => {
    const prevItems = [
        {
            id: uuidv4(),
            name: "Data Structures",
            done: false,
        },
        {
            id: uuidv4(),
            name: "OOP",
            done: false,
        },
        {
            id: uuidv4(),
            name: "DSA",
            done: false,
        },
    ];
    const [todoInput, setTodoInput] = useState("");
    const [todoItems, setTodoItems] = useState(prevItems);
    // const [todoItems, setTodoItems] = useState([]);
    const [editedItem, setEditedItem] = useState(null);

    // Step 1 => set user input to useState
    const handleInput = (e) => {
        setTodoInput(e.target.value);
    };

    // Step 2 => Handle Add new item to previous todos list

    const handleSubmit = () => {
        // agr edit wala item hoga to ye list me jark us item ko find krega or usko update kr ke new list me daal dega then all todos ko update krdega
        if (editedItem && todoInput && todoInput.trim() !== "") {
            // console.log("inside edit submit");
            const asdsa = todoItems.map((item) => {
                let returnItem = {};
                if (item.id !== editedItem.id) {
                    // console.log("id not matched");
                    returnItem = item;
                } else {
                    // baqi properties ko chordega sirf name update krega
                    // console.log("id matched");
                    // console.log("todfo input: ", todoInput);
                    returnItem = { ...item, name: todoInput };
                }
                // console.log("returned item: , ", returnItem);
                return returnItem;
            });

            console.log(asdsa);
            setTodoItems(asdsa);
            setEditedItem(null);
        }
        // todoInput = New todo item
        // previous wale me new add hojaiga
        else if (todoInput && todoInput.trim() !== "") {
            const newItem = {
                id: uuidv4(),
                name: todoInput,
                done: false,
            };

            setTodoItems([newItem, ...todoItems]);
            setTodoInput("");
        }
    };

    // Step 3=> Delete Item from todos list
    const handleDelete = (deleteId) => {
        // console.log("Previous Todos: ", todoItems);
        // console.log("Delete  id : ", id);

        // jiski id same hogi usko chor dega
        const filterTodos = todoItems.filter((item) => item.id != deleteId);

        setTodoItems(filterTodos);
        // console.log(filterTodos);
    };

    // Step 5=> Set Status to Done
    const handleDone = (itemId) => {
        const filterTodos = todoItems.map((item) => {
            let returnItem = {};
            if (item.id !== itemId) {
                returnItem = item;
            } else {
                returnItem = { ...item, done: true };
            }

            return returnItem;
        });

        setTodoItems(filterTodos);
    };

    // Step 4=> Edit Item from todos list
    const handleEdit = (editId) => {
        // console.log("Previous Todos: ", todoItems);
        // console.log("Delete  id : ", id);

        // jiski id same hogi usko chor dega
        const editItem = todoItems.filter((item) => item.id == editId);

        // Array [ {…} ]
        //  0: Object { id: "0a7046f2-193e-4fd4-a129-c38df8d4ba97",
        // name: "Data Structures", done: false }

        console.log(editItem[0]);
        setTodoInput(editItem[0].name);
        setEditedItem(editItem[0]);
        // console.log(filterTodos);
        console.log(editedItem);
    };
    return (
        <div className=" bg-gray-100">
            <div className="container mx-auto h-screen">
                <div className=" flex flex-col items-center py-20">
                    <h1 className="text-blue-700 font-bold text-4xl mb-10">
                        Todo List
                    </h1>

                    <div>
                        <div className="flex items-center space-x-3">
                            <input
                                type="text"
                                id="first_name"
                                class="bg-gray-50 border w-96 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="John"
                                required
                                value={todoInput}
                                onChange={(e) => handleInput(e)}
                            />

                            <button
                                type="button"
                                class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 "
                                onClick={() => handleSubmit()}
                            >
                                Add Item
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-4 items-center">
                    {todoItems.map((item) => {
                        return (
                            // item.done means todo done he or jiska item.done true hoga usko yellow krdega else blue
                            <div className="flex items-center space-x-3">
                                <div
                                    class={`p-4  text-sm font-semibold text-blue-800 rounded-lg ${
                                        item.done
                                            ? "bg-yellow-400"
                                            : "bg-blue-200"
                                    }  w-96`}
                                    role="alert"
                                >
                                    {item.name}
                                </div>

                                <button
                                    type="button"
                                    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center  w-24"
                                    onClick={() => handleEdit(item.id)}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2  w-24"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2  w-24"
                                    onClick={() => handleDone(item.id)}
                                >
                                    Done
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default App;
