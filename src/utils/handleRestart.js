function handleRestart(setCount, setClickedItems, didIwin) {
  if (didIwin) {
    console.log('you win');
  }
  console.log('you lost');
  setCount(0);
  setClickedItems([]);
}
export default handleRestart;
