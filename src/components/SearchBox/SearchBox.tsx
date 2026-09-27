import type { SearchBoxProps } from "../../types/note";
import css from "./SearchBox.module.css";



export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <input
      value={value}
      onChange={(event) => onSearch(event.target.value)}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}