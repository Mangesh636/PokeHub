import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FilterProps {
  onSortChange: (sortOption: string) => void;
}

export const Filter = ({ onSortChange }: FilterProps) => {
  return (
    <Select onValueChange={onSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort options" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ascending</SelectLabel>
          <SelectItem value="orderByIdAsc">
            <span>Order by ID</span>
          </SelectItem>
          <SelectItem value="orderByNameAsc">
            <span>Order by Name</span>
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Descending</SelectLabel>
          <SelectItem value="orderByIdDesc">
            <span>Order by ID</span>
          </SelectItem>
          <SelectItem value="orderByNameDesc">
            <span>Order by Name</span>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
