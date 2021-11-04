import { NumbersCollection } from './NumbersCollection';
import { CharatersCollection } from './CharactersCollection';
import { LinkedList } from './LinkedList';

const numbersCollection = new NumbersCollection([10, 3, -5, 0]);
numbersCollection.sort();
console.log(numbersCollection.data);

const charatersCollection = new CharatersCollection('XaaVb');
charatersCollection.sort();
console.log(charatersCollection.data);

const linkedList = new LinkedList();
linkedList.add(500);
linkedList.add(-10);
linkedList.add(-3);

linkedList.sort();
linkedList.print();
