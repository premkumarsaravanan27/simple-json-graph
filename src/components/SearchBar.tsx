import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (path: string) => void;
  searchResult: string;
}

export const SearchBar = ({ onSearch, searchResult }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search path (e.g., $.user.name)"
        className="w-64 font-mono text-sm"
      />
      <Button onClick={handleSearch} size="sm" variant="secondary">
        <Search className="h-4 w-4" />
      </Button>
      {searchResult && (
        <span className={`text-sm ${searchResult.includes("found") && !searchResult.includes("No") ? "text-green-600" : "text-destructive"}`}>
          {searchResult}
        </span>
      )}
    </div>
  );
};
