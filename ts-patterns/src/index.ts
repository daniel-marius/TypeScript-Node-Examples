import { RecordHandler, loader } from "./loader";

interface BeforeSetEvent<T> {
  value: T;
  newValue: T;
}

interface AfterSetEvent<T> {
  value: T;
}

interface Pokemon {
  id: string;
  attack: number;
  defense: number;
}

interface BaseRecord {
  id: string;
}

interface Database<T extends BaseRecord> {
  // newValue has to have an id
  set(newValue: T): void;
  get(id: string): T | undefined;

  onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
  onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;

  visit(visitor: (item: T) => void): void;
  selectBest(scoreStrategy: (item: T) => number): T | undefined;
}

// Observer Pattern
type Listener<EventType> = (ev: EventType) => void;
function createObserver<EventType>(): {
  subscribe: (listener: Listener<EventType>) => () => void;
  publish: (event: EventType) => void;
} {
  let listeners: Listener<EventType>[] = [];

  return {
    subscribe: (listener: Listener<EventType>): (() => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    publish: (event: EventType) => {
      listeners.forEach((l) => l(event));
    },
  };
}

// Factory Pattern
function createDatabase<T extends BaseRecord>() {

  class InMemoryDatabase implements Database<T> {
    private db: Record<string, T> = {};

    private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
    private afterAddListeners = createObserver<AfterSetEvent<T>>();

    static instance: InMemoryDatabase = new InMemoryDatabase();

    public set(newValue: T): void {
      this.beforeAddListeners.publish({
        newValue,
        value: this.db[newValue.id],
      });
      this.db[newValue.id] = newValue;

      this.afterAddListeners.publish({
        value: newValue,
      });
    }

    public get(id: string): T | undefined {
      return this.db[id];
    }

    onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
      return this.beforeAddListeners.subscribe(listener);
    }
    onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void  {
      return this.afterAddListeners.subscribe(listener);
    }

    // Strategy Pattern
    selectBest(scoreStrategy: (item: T) => number): T | undefined {
      const found: {
        max: number;
        item: T | undefined;
      } = {
        max: 0,
        item: undefined
      };

      Object.values(this.db).reduce((f, item) => {
        const score = scoreStrategy(item);
        if (score >= f.max) {
          f.max = score;
          f.item = item;
        }
        return f;
      }, found);

      return found.item;
    }

    // Visitor Pattern
    visit(visitor: (item: T) => void): void {
      Object.values(this.db).forEach(visitor);
    }
  }

  // Singleton Pattern
  // const db = new InMemoryDatabase();
  // return db;
  return InMemoryDatabase;
}

const PokemonDB = createDatabase<Pokemon>();

// Adapter Pattern
class PokemonDBAdapter implements RecordHandler<Pokemon> {
  addRecord(record: Pokemon) {
    PokemonDB.instance.set(record);
  }
}

const unsubscribe = PokemonDB.instance.onAfterAdd(({ value }) => {
  console.log(value);
});

loader("./data.json", new PokemonDBAdapter());

PokemonDB.instance.set({
  id: "id1",
  attack: 50,
  defense: 10,
});

// PokemonDB.instance.onAfterAdd(({ value }) => {
//   console.log(value);
// });

unsubscribe();

PokemonDB.instance.set({
  id: "id2",
  attack: 150,
  defense: 120,
});

// console.log(PokemonDB.instance.get("id"));

PokemonDB.instance.visit((item) => {
  console.log(item.id);
});

// const bestDefensive = PokemonDB.instance.selectBest(({ defense }) => defense);
// const bestAttack = PokemonDB.instance.selectBest(({ attack }) => attack);
//
// console.log(`Best defense = ${bestDefensive?.id}`);
// console.log(`Best attack = ${bestAttack?.id}`);
