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

export function IconSortArrows() {
  return <ArrowUpDown size={16} />;
}
export function IconSortUp() {
  return <SquareChevronUp size={16} />;
}
export function IconSortDown() {
  return <SquareChevronDown size={16} />;
}
export function IconFilter() {
  return <Filter />;
}
export function IconHelp() {
  return <CircleHelp />;
}
export function IconShare() {
  return <Share />;
}
export function IconLink() {
  return <ExternalLink size={12} strokeWidth={2.25} />;
}
export function IconCheck() {
  return <CircleCheck size={16} color="green" />;
}
export function IconMinus() {
  return <CircleMinus size={16} color="orange" />;
}
export function IconXMark() {
  return <CircleX size={16} color="red" />;
}
