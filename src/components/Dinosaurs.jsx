import { useEffect, useRef, useState } from 'react';
import handleRestart from '../utils/handleRestart';
import DinoArr from '../utils/FetchDino';

function shuffleCards(cards) {
  const shuffled = [...cards];
  const length = shuffled.length;
  for (let i = length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
function Dinosaurs() {
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(0);
  const [clickedItems, setClickedItems] = useState([]);

  function handleClickonCards(id) {
    const didIwin = count == 10;
    if (clickedItems.includes(id) || didIwin) {
      handleRestart(setCount, setClickedItems, didIwin);
      setCards(shuffleCards(cards));
      return;
    }
    setCount(prev => prev + 1);
    setClickedItems(prev => [...prev, id]);
    setCards(shuffleCards(cards));
  }

  useEffect(() => {
    setCards(shuffleCards(DinoArr));
  }, []);

  return (
    <div className="flex max-h-screen flex-col bg-[#191c29]">
      <Header count={count} />
      <div className="cards-container grid h-screen w-screen grid-cols-5 gap-4 p-4">
        {cards.map((item, index) => {
          return (
            <IndividualCards
              key={item.id}
              handleClick={handleClickonCards}
              imgsrc={item.imgSrc}
              name={item.name}
              id={item.id}
            />
          );
        })}
      </div>
    </div>
  );
}

function IndividualCards({ handleClick, id, imgsrc, name }) {
  return (
    <div
      onClick={() => handleClick(id)}
      className="individual-cards flex h-[250px] w-[1/5] cursor-pointer flex-col justify-between rounded-2xl border border-black bg-[#2a2d3a] p-2 duration-300 ease-in-out hover:scale-[1.05] hover:transition-transform"
    >
      <div className="flex h-40 w-full items-center justify-center rounded-2xl bg-gray-100">
        <img src={imgsrc} className="max-h-9/10 max-w-full object-cover" />
      </div>
      <p className="font-Mountains text-center text-2xl font-bold text-white">{name}</p>
    </div>
  );
}

function Header({ count }) {
  const initialCount = useRef(0);
  if (count > initialCount.current) {
    initialCount.current = count;
  }
  return (
    <div className="flex">
      <h1 className="mt-2 mr-auto mb-6 ml-auto text-center text-4xl font-bold text-white">
        Dinosaur Collection
      </h1>
      <div className="mr-10 flex flex-col">
        <p className="text-xl text-white">
          Best Score: {count > initialCount.current ? count : initialCount.current}
        </p>
        <p className="text-xl text-white">Score: {count}</p>
      </div>
    </div>
  );
}

export default Dinosaurs;
