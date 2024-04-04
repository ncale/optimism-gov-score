import { IconContext } from "react-icons/lib";
import { LuArrowUpDown } from "react-icons/lu";
import { LuHelpCircle } from "react-icons/lu";
import { LuShare } from "react-icons/lu";
import { LuExternalLink } from "react-icons/lu";
import { LuCheckCircle2 } from "react-icons/lu";
import { LuMinusCircle } from "react-icons/lu";
import { LuXCircle } from "react-icons/lu";

export function FilterIcon() {
  return (
    <IconContext.Provider value={{ size: "1.15em" }}>
      <LuArrowUpDown />
    </IconContext.Provider>
  );
}
export function HelpIcon() {
  return (
    <IconContext.Provider value={{ size: "0.9em" }}>
      <LuHelpCircle />
    </IconContext.Provider>
  );
}
export function ShareIcon() {
  return (
    <IconContext.Provider value={{ size: "0.8em" }}>
      <LuShare />
    </IconContext.Provider>
  );
}
export function LinkIcon() {
  return (
    <IconContext.Provider value={{ size: "0.8em" }}>
      <LuExternalLink />
    </IconContext.Provider>
  );
}
export function CheckIcon() {
  return (
    <IconContext.Provider value={{ color: "green", size: "1.15em" }}>
      <LuCheckCircle2 />
    </IconContext.Provider>
  );
}
export function MinusIcon() {
  return (
    <IconContext.Provider value={{ color: "orange", size: "1.15em" }}>
      <LuMinusCircle />
    </IconContext.Provider>
  );
}
export function XMarkIcon() {
  return (
    <IconContext.Provider value={{ color: "red", size: "1.15em" }}>
      <LuXCircle />
    </IconContext.Provider>
  );
}
