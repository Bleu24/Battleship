import "normalize.css";
import "./styles.css";
import { Home } from "./ui/home.js";
import { SessionService } from "./services/SessionService.js";

SessionService.clearSession();

document.body.append(Home);
