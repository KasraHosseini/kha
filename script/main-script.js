import documentDayMode from "./modules/Change_theme.js";
import * as slider from "./modules/Slider.js";
import * as timer from "./modules/Timer.js";
import toggleBtn from "./modules/Toggle-text.js";
documentDayMode();
timer.dateTimer(23, 30, "#date_timer");
toggleBtn("#open-desc", "#footer-text", 100);
