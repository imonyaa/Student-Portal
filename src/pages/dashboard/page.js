import React, { useEffect, useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  //------------------------ states------------------------------------------------
  const [Eaten, setEaten] = useState(0);

  const [mealsList, setMealsList] = useState([
    { mealName: "Fries1", calories: 100, isEaten: 1 },
    { mealName: "Fries2", calories: 200, isEaten: 1 },
    { mealName: "Fries3", calories: 300, isEaten: 1 },
  ]);

  const [typedMeal, setTypedMeal] = useState("");
  const [typedCal, setTypedCal] = useState(0);
  //------------------------- useEffect---------------------------------------------
  useEffect(() => {
    let totalMeals = 0;
    for (let meal of mealsList) {
      totalMeals++;
    }
    let totalScores = 0;
    for (let i = 0; i < totalMeals; i++) {
      totalScores += mealsList[i].isEaten;
    }
    setEaten(totalScores - totalMeals);
  }, [mealsList]);

  //------------------------- handlers---------------------------------------------
  const eatMealHandler = (index) => {
    setMealsList((prevMealsList) => {
      let newMealsList = [...prevMealsList];
      newMealsList[index].isEaten = 2;
      return newMealsList; 
    });
  };
  //lopp
  const submitHandler = (e) => {
    e.preventDefault();
    setMealsList((prevMealsList) => {
      let newMealsList = [...prevMealsList];
      newMealsList.push({
        mealName: typedMeal,
        calories: typedCal,
        isEaten: 1,
      });
      return newMealsList;
    });
    e.target.reset();
    
  };

  const handleChangeMeal = (value) => {
    setTypedMeal(value);
  };

  const handleChangeCal = (value) => {
    setTypedCal(value);
  };

  //------------------------- components---------------------------------------------
  const MealComponent = ({ mealsList }) => {
    return (
      <div>
        {mealsList.map((mealItem, index) => (
          <div key={index}>
            <p>
              Dish number {index + 1}: {mealItem.mealName}, {mealItem.calories}{" "}
              calories
            </p>
            <button
              className="mealButton"
              onClick={() => eatMealHandler(index)}
            >
              {mealItem.isEaten === 1 ? "Eat it!" : "Eaten."}
            </button>
          </div>
        ))}
      </div>
    );
  };

  //------------------------- render---------------------------------------------
  return (
    <div>
      <div className="dashboard1">
        <MealComponent mealsList={mealsList} />
      </div>

      <div className="dashboard2">
        <h> Total meals Eaten is: {Eaten}</h>
      </div>

      <div className="dashboard1">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Meal"
            value={typedMeal}
            onChange={(e) => handleChangeMeal(e.target.value)}
          />
          <input
            type="number"
            placeholder="Calories"
            value={typedCal}
            onChange={(e) => handleChangeCal(e.target.value)}
          />
          <input
            type="submit"
            value="Add meal"
            disabled={(typedMeal == "") | (typedCal == 0) ? true : false}
          ></input>
        </form>
      </div>
    </div>
  );
};
// comment uwu
export default Dashboard;
