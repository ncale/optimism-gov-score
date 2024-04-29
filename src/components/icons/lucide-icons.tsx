import {
  ArrowUpDown,
  CircleCheck,
  CircleHelp,
  CircleMinus,
  CircleX,
  ExternalLink,
  Filter,
  Share,
  SquareChevronDown,
  SquareChevronUp,
} from "lucide-react";

export function SortArrowsIcon() {
  return <ArrowUpDown size={16} />;
}
export function SortUpIcon() {
  return <SquareChevronUp size={16} />;
}
export function SortDownIcon() {
  return <SquareChevronDown size={16} />;
}
export function FilterIcon() {
  return <Filter />;
}
export function HelpIcon() {
  return <CircleHelp />;
}
export function ShareIcon() {
  return <Share />;
}
export function LinkIcon() {
  return <ExternalLink size={12} strokeWidth={2.25} />;
}
export function CheckIcon() {
  return <CircleCheck size={16} color="green" />;
}
export function MinusIcon() {
  return <CircleMinus size={16} color="orange" />;
}
export function XMarkIcon() {
  return <CircleX size={16} color="red" />;
}
