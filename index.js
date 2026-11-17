const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let cars = [
  {
    id: 1,
    name: "Toyota Camry",
    location: "New York",
    color: "Blue",
  },
  {
    id: 2,
    name: "Honda Civic",
    location: "Los Angeles",
    color: "Red",
  },
  {
    id: 3,
    name: "Corrolla",
    location: "Chicago",
    color: "Black",
  },
  {
    id: 4,
    name: "BMW X5",
    location: "Houston",
    color: "White",
  },
];

// get all cars
app.get("/api/cars", (req, res) => {
  res.json(cars);
});

// get car by id
app.get("/api/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const car = cars.find((c) => c.id === carId);

  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

// add a new car
app.post("/api/cars", (req, res) => {
  const newCar = req.body;
  cars.push(newCar);
  res.status(200).json({
    message: "Car added successfully",
    data: newCar,
  });
});

// update a car by id
app.put("/api/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const updatedCar = req.body;
  const carIndex = cars.findIndex((c) => c.id === carId);

  if (carIndex !== -1) {
    cars[carIndex] = { ...cars[carIndex], ...updatedCar };
    res.json({
      message: "Car updated successfully",
      data: cars[carIndex],
    });
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

// delete a car by id
app.delete("/api/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const carIndex = cars.findIndex((c) => c.id === carId);

  if (carIndex !== -1) {
    cars.splice(carIndex, 1);
    res.json({ message: "Car deleted successfully" });
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

// patch a car by id
app.patch("/api/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const updatedFields = req.body;
  const carIndex = cars.findIndex((c) => c.id === carId);

  if (carIndex !== -1) {
    cars[carIndex] = { ...cars[carIndex], ...updatedFields };
    res.json({
      message: "Car updated successfully",
      data: cars[carIndex],
    });
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
