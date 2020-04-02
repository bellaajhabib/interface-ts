interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse'
    runningSpeed: number;
}

type  Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;

    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;

    }
    console.log(speed);
}

moveAnimal({type: 'bird', flyingSpeed: 20});

const paragraph = document.querySelector('p');
const paragraphID = document.getElementById('message-output');

console.log(paragraphID);

interface ErrorContainer {
    email: 'Not avalid email',
    usernale: 'Must start with a charactet!'
}

