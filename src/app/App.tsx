import { useState, useEffect } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [tips, setTips] = useState(0);

  function calTips(a: number, b: number) {
    let result = (a + b) / 2;
    setTips(result);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Tip Calculator
          </h1>
          <p className="text-slate-400">Calculate your bill with tips easily</p>
        </div>
        
        <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl shadow-2xl shadow-black/30 p-8 space-y-6">
          <Bill bill={bill} onChangeBill={setBill} />
          <ServiceFeel
            calTips={calTips}
            bill={bill}
            setBill={setBill}
            tips={tips}
          />
        </div>
      </div>
    </div>
  );
}

function Bill({ bill, onChangeBill }: { bill: number; onChangeBill: (value: number) => void }) {
  return (
    <div className="space-y-2">
      <label className="block text-slate-300 mb-2">
        How much is the bill?
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">$</span>
        <input
          type="number"
          value={bill || ""}
          onChange={(e) =>
            onChangeBill(
              !isNaN(Number(e.target.value)) ? Number(e.target.value) : 0
            )
          }
          placeholder="0.00"
          className="w-full pl-9 pr-4 py-3.5 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-white placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}

function ServiceFeel({
  calTips,
  bill,
  setBill,
  tips,
}: {
  calTips: (a: number, b: number) => void;
  bill: number;
  setBill: (value: number) => void;
  tips: number;
}) {
  const [youTips, setYouTips] = useState(20);
  const [friendTips, setFriendTips] = useState(20);

  function handleReset() {
    setBill(0);
    setYouTips(20);
    setFriendTips(20);
  }

  useEffect(() => {
    calTips(youTips, friendTips);
  }, [youTips, friendTips]);

  return (
    <div className="space-y-6">
      <People name="you" tips={youTips} setTip={setYouTips} />
      <People name="your friend" tips={friendTips} setTip={setFriendTips} />
      
      <div className="pt-4 border-t border-slate-700">
        <PaidTotal bill={bill} tips={tips} />
      </div>
      
      <Reset bill={bill} handleReset={handleReset} />
    </div>
  );
}

function People({
  name,
  setTip,
  tips,
}: {
  name: string;
  tips: number;
  setTip: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-slate-300 capitalize">
        How did {name} like the service?
      </label>
      <select
        value={tips}
        onChange={(e) => setTip(Number(e.target.value))}
        className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all appearance-none cursor-pointer text-white"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.75rem center',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '3rem'
        }}
      >
        <option value="20">Absolutely amazing! (20%)</option>
        <option value="10">It was good! (10%)</option>
        <option value="5">Normal (5%)</option>
        <option value="0">Too bad! (0%)</option>
      </select>
    </div>
  );
}

function PaidTotal({ bill, tips }: { bill: number; tips: number }) {
  let tipsPrice = bill * (tips / 100);
  return (
    <div className="text-center py-4">
      {bill === 0 ? (
        <p className="text-slate-500 text-lg">Enter your bill amount to start</p>
      ) : (
        <div className="space-y-2">
          <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            ${(bill + tipsPrice).toFixed(2)}
          </p>
          <p className="text-slate-400">
            ${bill.toFixed(2)} + ${tipsPrice.toFixed(2)} tip ({tips}%)
          </p>
        </div>
      )}
    </div>
  );
}

function Reset({ bill, handleReset }: { bill: number; handleReset: () => void }) {
  if (bill === 0) return null;
  
  return (
    <div className="pt-2">
      <button
        onClick={handleReset}
        className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-xl transition-all duration-200 shadow-lg shadow-emerald-900/30 hover:shadow-xl hover:shadow-emerald-900/40 active:scale-[0.98]"
      >
        Reset Calculator
      </button>
    </div>
  );
}