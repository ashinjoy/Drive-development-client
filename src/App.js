import Router from "./Routes/UserRouteConfig";
import Toast from "./Utils/CustomToasts/Toast";

function App() {
  return (
    <div className="App ">
      <Toast/>
      <Router />
    </div>
  );
}

export default App;
