function Animal(name) {
  this.name = name;
}

Animal.prototype.sayHello = function () {
  return `Hello, I'm ${this.name}`;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// 类似于这样写，只是JS不允许访问[[Prototype]]
// const obj = {};
// obj.[[Prototype]] = Animal.prototype;
Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.constructor = Dog;
Dog.prototype.sayBreed = function () {
  return `${this.name} is a ${this.breed}`;
};

const dog = new Dog("旺财", "柴犬");

console.log(dog.sayHello());
console.log(dog.sayBreed());

const dogPrototype = Object.getPrototypeOf(dog);
const dogSuperPrototype = Object.getPrototypeOf(dogPrototype);

const DogProto = Dog.prototype;
const AnimalProto = Animal.prototype;

console.log("done");
