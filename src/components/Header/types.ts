export interface HeaderProps {
  items: Array<string>;
  selectedItem: string;

  onSelect: (item: string) => void;
}
