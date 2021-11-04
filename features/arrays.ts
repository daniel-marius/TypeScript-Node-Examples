const carMakers = ['car1', 'car2', 'car3'];
const dates = [new Date(), new Date()];

const carsByMake: string[][] = [];

// Help with inference when extraction values
const car = carMakers[0];
const myCar = carMakers.pop();

// Prevent incompatible values
carMakers.push(100);

carMakers.map((car: string): string => {
  return car.toUpperCase();
});

// Flexible types
const importantDates: (Date | string)[] = [new Date(), '2030-09-09'];
importantDates.push('2030-01-01');
importantDates.push(new Date());
