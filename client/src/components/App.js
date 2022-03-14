import History from "./History";
import ChartData from "./ChartData";

function App() {
    return (
        <div className="App">
            <h1>ETH/USDT 선물 자동매매</h1>
            <ChartData></ChartData>
            <History></History>
        </div>
    );
}

export default App;
