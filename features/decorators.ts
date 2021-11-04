@classDecorator
class Boat {
  @testDecorator
  color: string = 'red';

  @testDecorator
  get formattedColor(): string {
    return `This boat has color ${this.color}`;
  }

  // @logError('Error')
  // pilot(@parameterDecorator speed: string, @parameterDecorator generateWake: boolean): void {
  //   if (speed === 'fast') {
  //     console.log('fdgsd');
  //   } else {
  //     console.log('adsfas');
  //   }
  // }
}

function classDecorator(constructor: typeof Boat) {
  console.log(constructor);
}

function parameterDecorator(target: any, key: string, index:number) {
  console.log(key, index);
}

function testDecorator(target: any, key: string) {
  console.log(target);
  console.log(key);
}

// function logError(errorMessage: string) {
//   return function (target: any, key: string, desc: PropertyDecorator): void {
//     const method = desc.value;
//
//     desc.value = () => {
//       try {
//         method();
//       } catch (error) {
//         console.log(errorMessage);
//       }
//     };
//   }
// }
new Boat();
