import Router from "./Routes/RouteConfig";
import Toast from "./Utils/CustomToasts/Toast";
import UserSearchContext from "./Context/UserSearchContext";
import RideRequestNotifications from "./Components/Driver/Notifications/RideRequestNotifications";
import DriverLocation from "./Context/DriverLocation";

function App() {
  return (
    <div className="App ">
      <Toast />
      <DriverLocation>
      <UserSearchContext>
        <Router/>
      </UserSearchContext>
      </DriverLocation>
    </div>
  );
}

export default App;
