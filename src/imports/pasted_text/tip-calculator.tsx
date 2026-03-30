import { useState } from "react";
import "./styles.css";

export default function App() {
  const [bill, setBill] = useState(0);
  const [tips, setTips] = useState(0);

  function calTips(a, b) {
    let result = (a + b) / 2;
    setTips(result);
  }
  //console.log(bill);
  //console.log(tips);

  return (
    <div>
      <Bill bill={bill} onChangeBill={setBill} />
      <ServiceFeel
        calTips={calTips}
        bill={bill}
        setBill={setBill}
        tips={tips}
      />
    </div>
  );
}

function Bill({ bill, onChangeBill }) {
  return (
    <div>
      <span>How much is the paid? </span>
      <input
        value={!isNaN(Number(bill)) ? Number(bill) : 0}
        onChange={(e) =>
          onChangeBill(
            !isNaN(Number(e.target.value)) ? Number(e.target.value) : 0
          )
        }
        placeholder="0"
      />
    </div>
  );
}

function ServiceFeel({ calTips, bill, setBill, tips }) {
  const [youTips, setYouTips] = useState(20);
  const [friendTips, setFriendTips] = useState(20);

  function handleReset() {
    setBill(0);
    setYouTips(20);
    setFriendTips(20);
  }

  calTips(youTips, friendTips);

  return (
    <div>
      <People name="you" tips={youTips} setTip={setYouTips} />
      <People name="your friend" tips={friendTips} setTip={setFriendTips} />
      <PaidTotal bill={bill} tips={tips} />
      <Reset bill={bill} setBill={setBill} handleReset={handleReset} />
    </div>
  );
}

function People({ name, setTip, tips }) {
  return (
    <div>
      <span>How did {name} like the service? </span>
      <select value={tips} onChange={(e) => setTip(Number(e.target.value))}>
        <option value="20">Absolutely amazing! (20%)</option>
        <option value="10">It was good! (10%)</option>
        <option value="5">Normal (5%)</option>
        <option value="0">Too bad! (0%)</option>
      </select>
    </div>
  );
}

function PaidTotal({ bill, tips }) {
  let tipsPrice = bill * (tips / 100);
  return (
    <>
      <h1>
        {bill == false
          ? "Pay your bill!"
          : `You pay $${bill + tipsPrice} ($${bill} + $${tipsPrice.toFixed(
              2
            )} tips)`}
      </h1>
    </>
  );
}

function Reset({ bill, handleReset }) {
  return (
    <div>
      {bill == 0 || bill === "" ? null : (
        <button onClick={() => handleReset()}>reset</button>
      )}
    </div>
  );
}
