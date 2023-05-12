export interface SidebarProps {
  items: Array<string>;
  selectedItem: string;

  onSelect: (item: string) => void;
}
