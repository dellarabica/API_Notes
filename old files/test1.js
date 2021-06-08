let people = [
{name: "JB", age:12},
{name: "Balthazar", age:23}
];

people.forEach(person, => {
  if(${person.age} > 20){
    console.log(`${person.name} a ${person.age} ans`);
  }
});
